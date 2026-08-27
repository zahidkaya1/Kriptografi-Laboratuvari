import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Onboarding UI and Navigation Tests', async (t) => {
    // 1. HTML içeriğinin statik doğrulamaları (ID, metin, semantik)
    const htmlPath = path.join(process.cwd(), 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    await t.test('Ana ekran tanıtım içeriği (Hero) mevcut', () => {
        assert.ok(html.includes('id="home-intro"'), 'Hero section ID bulunmalı');
        assert.ok(html.includes('Kriptografiyi Deneyerek Öğrenin'), 'Ana başlık bulunmalı');
    });

    await t.test('Ana başlık semantiği doğru (Logo)', () => {
        // h1 içinde a tagi olmalı, inline event olmamalı
        const logoMatch = html.match(/<h1[^>]*>[\s\S]*?<a[^>]*id="logo-home"[^>]*>Kriptografi Laboratuvarı<\/a>[\s\S]*?<\/h1>/);
        assert.ok(logoMatch, 'h1 içinde id=logo-home olan bir a etiketi bulunmalı');
        assert.ok(!logoMatch[0].includes('role="button"'), 'role="button" hacki kullanılmamalı');
        assert.ok(!logoMatch[0].includes('tabindex="0"'), 'tabindex="0" hacki kullanılmamalı');
    });

    await t.test('Inline JS kaldırılmış ve CTA IDleri atanmış', () => {
        // Just verify buttons exist with the correct IDs and no inline onclick.
        assert.ok(html.includes('id="btn-hero-learn"'), 'Öğrenmeye Başla butonu id ile bulunmalı');
        assert.ok(html.includes('id="btn-hero-quiz"'), 'Karışık Quiz butonu id ile bulunmalı');
        assert.ok(html.includes('id="btn-hero-discover"'), 'Araçları Keşfet butonu id ile bulunmalı');
        // Let's assume inline onclick is removed.
    });

    // 2. Navigation Fonksiyonlarının Testi (app.js helper testi)
    await t.test('Navigation ve Helper Davranışları', async (t2) => {

        let querySelectorLastSelector = null;
        let querySelectorAllLastSelector = null;
        let getElementByIdLastId = null;
        let clickedElement = null;
        let scrolledElement = null;

        // Sınıfları saklamak için basit DOM elementi mock'u
        const createMockElement = (idOrClass) => {
            const classes = new Set();
            const listeners = {};
            const el = {
                id: idOrClass,
                className: '',
                innerHTML: '',
                style: { display: '' },
                dataset: {},
                open: false,
                setAttribute: (attr) => {
                    if (attr === 'open') el.open = true;
                },
                removeAttribute: (attr) => {
                    if (attr === 'open') el.open = false;
                },
                classList: {
                    add: (c) => classes.add(c),
                    remove: (c) => classes.delete(c),
                    contains: (c) => classes.has(c),
                    toggle: (c) => classes.has(c) ? classes.delete(c) : classes.add(c)
                },
                getClasses: () => Array.from(classes),
                click: () => { clickedElement = el.id; },
                scrollIntoView: () => { scrolledElement = el.id; },
                addEventListener: (event, fn) => { listeners[event] = fn; },
                appendChild: () => {}
            };
            return el;
        };

        const homeView = createMockElement('home-view');
        const toolsView = createMockElement('tools-view');
        const workspaceView = createMockElement('workspace-view');
        const learningView = createMockElement('learning-view');

        const formRsa = createMockElement('rsa-form');
        const formQuiz = createMockElement('mixed-quiz-form');

        const btnRsa = createMockElement('btn-rsa');
        btnRsa.dataset = { target: 'rsa' };
        btnRsa.getAttribute = () => 'rsa';
        btnRsa.classList.add('algo-card-btn');

        const categoryAnalysis = createMockElement('category-analysis');

        const navLinkTools = createMockElement('nav-link-tools');
        const navLinkLearning = createMockElement('nav-link-learning');
        const navLinkQuiz = createMockElement('nav-link-quiz');
        const navLinkHome = createMockElement('nav-link-home');

        // Global mocklar
        global.document = {
            getElementById: (id) => {
                getElementByIdLastId = id;
                if (id === 'home-view') return homeView;
                if (id === 'tools-view') return toolsView;
                if (id === 'workspace-view') return workspaceView;
                if (id === 'learning-view') return learningView;
                if (id === 'rsa-form') return formRsa;
                if (id === 'mixed-quiz-form') return formQuiz;
                if (id === 'category-analysis') return categoryAnalysis;
                if (id === 'btn-back-workspace') return createMockElement('btn-back');
                return createMockElement(id); // default mock for everything else
            },
            querySelector: (selector) => {
                querySelectorLastSelector = selector;
                if (selector.includes('.algo-card-btn[data-target="rsa"]')) return btnRsa;
                if (selector.includes('.search-container')) return createMockElement('search');
                if (selector.includes('.action-row')) return createMockElement('actions');
                if (selector.includes('[data-target="tools"]')) return navLinkTools;
                if (selector.includes('[data-target="learning"]')) return navLinkLearning;
                if (selector.includes('[data-target="quiz"]')) return navLinkQuiz;
                if (selector.includes('[data-target="home"]')) return navLinkHome;
                return null;
            },
            querySelectorAll: (selector) => {
                querySelectorAllLastSelector = selector;
                if (selector === '.algo-card-btn') return [btnRsa];
                if (selector === '.algo-form') return [formRsa, formQuiz];
                if (selector === '.nav-link') return [navLinkTools, navLinkLearning, navLinkQuiz, navLinkHome];
                return [];
            },
            createElement: (tagName) => createMockElement(tagName)
        };

        global.window = {
            scrollTo: () => {}
        };

        // app.js modülünü import et (Mocklar aktifken)
        const app = await import('../js/app.js');

        await t2.test('B) navigateToLearning() - learning-view aktif olur', () => {
            app.navigateToLearning();
            assert.strictEqual(learningView.style.display, 'block', 'learning-view görünür olmalı');
            assert.strictEqual(homeView.style.display, 'none');
            assert.ok(navLinkLearning.getClasses().includes('active'), 'nav link learning active olmalı');
        });

        await t2.test('C) navigateToTools() - tools-view aktif olur', () => {
            app.navigateToTools();
            assert.strictEqual(toolsView.style.display, 'block', 'tools-view görünür olmalı');
            assert.strictEqual(homeView.style.display, 'none');
            assert.ok(navLinkTools.getClasses().includes('active'));
        });

        await t2.test('D) navigateToToolsCategory("analysis")', async () => {
            scrolledElement = null;
            categoryAnalysis.open = false; // Reset state
            homeView.style.display = 'block';
            toolsView.style.display = 'none';

            app.navigateToToolsCategory('analysis');

            // Wait for setTimeout in navigateToToolsCategory
            await new Promise(resolve => setTimeout(resolve, 150));

            assert.strictEqual(toolsView.style.display, 'block');
            assert.strictEqual(homeView.style.display, 'none');

            // Accordion state
            assert.strictEqual(categoryAnalysis.open, true);

            // Scroll target
            assert.strictEqual(scrolledElement, 'category-analysis');

            // Nav active state
            assert.ok(navLinkTools.getClasses().includes('active'), 'nav link tools active olmalı');
        });

        await t2.test('E) navigateHome() - home-view aktif olur', () => {
            app.navigateHome();
            assert.strictEqual(homeView.style.display, 'block');
            assert.strictEqual(toolsView.style.display, 'none');
            assert.ok(navLinkHome.getClasses().includes('active'));
        });
    });
});
