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
        assert.ok(html.includes('Kriptografi Laboratuvarı\'na Hoş Geldiniz'), 'Ana başlık bulunmalı');
    });

    await t.test('Ana başlık semantiği doğru (Logo)', () => {
        // h1 içinde a tagi olmalı, inline event olmamalı
        const logoMatch = html.match(/<h1[^>]*>[\s\S]*?<a[^>]*id="logo-home"[^>]*>Kriptografi Laboratuvarı<\/a>[\s\S]*?<\/h1>/);
        assert.ok(logoMatch, 'h1 içinde id=logo-home olan bir a etiketi bulunmalı');
        assert.ok(!logoMatch[0].includes('role="button"'), 'role="button" hacki kullanılmamalı');
        assert.ok(!logoMatch[0].includes('tabindex="0"'), 'tabindex="0" hacki kullanılmamalı');
    });

    await t.test('Inline JS kaldırılmış ve CTA IDleri atanmış', () => {
        const btnOgrenmeyeBaslaMatch = html.match(/<button[^>]*id="btn-hero-learn"[^>]*>Öğrenmeye Başla<\/button>/);
        assert.ok(btnOgrenmeyeBaslaMatch, 'Öğrenmeye Başla butonu id ile bulunmalı');
        assert.ok(!btnOgrenmeyeBaslaMatch[0].includes('onclick'), 'Inline onclick kaldırılmış olmalı');

        const btnQuizMatch = html.match(/<button[^>]*id="btn-hero-quiz"[^>]*>Karışık Quiz<\/button>/);
        assert.ok(btnQuizMatch, 'Karışık Quiz butonu id ile bulunmalı');
        assert.ok(!btnQuizMatch[0].includes('onclick'), 'Inline onclick kaldırılmış olmalı');

        const btnKesfetMatch = html.match(/<button[^>]*id="btn-hero-discover"[^>]*>Araçları Keşfet<\/button>/);
        assert.ok(btnKesfetMatch, 'Araçları Keşfet butonu id ile bulunmalı');
        assert.ok(!btnKesfetMatch[0].includes('onclick'), 'Inline onclick kaldırılmış olmalı');
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
                style: {},
                dataset: {},
                classList: {
                    add: (c) => classes.add(c),
                    remove: (c) => classes.delete(c),
                    contains: (c) => classes.has(c)
                },
                getClasses: () => Array.from(classes),
                getAttribute: (attr) => el.dataset[attr] || (attr === 'data-target' ? idOrClass : null),
                click: function() {
                    clickedElement = this;
                    if (listeners['click']) listeners['click'].forEach(cb => cb({ target: this }));
                },
                scrollIntoView: function() { scrolledElement = this; },
                addEventListener: function(evt, cb) {
                    if (!listeners[evt]) listeners[evt] = [];
                    listeners[evt].push(cb);
                },
                appendChild: function(child) {
                    this.innerHTML += `<div class="${child.className || ''}">${child.innerHTML}</div>`;
                },
                querySelectorAll: function() { return []; },
                querySelector: function() { return null; }
            };
            return el;
        };

        const mockElements = {
            'home-view': createMockElement('home-view'),
            'workspace-view': createMockElement('workspace-view'),
            'workspace-nav': createMockElement('workspace-nav'),
            'home-intro': createMockElement('home-intro'),
            'logo-home': createMockElement('logo-home'),
            'btn-hero-learn': createMockElement('btn-hero-learn'),
            'btn-hero-discover': createMockElement('btn-hero-discover'),
            'btn-hero-quiz': createMockElement('btn-hero-quiz'),
            'favorites-container': createMockElement('favorites-container'),
            'category-favorites': createMockElement('category-favorites'),
            '.search-container': createMockElement('.search-container')
        };

        // querySelectorAll test listeleri
        const btnGuided = createMockElement('guided-learning');
        btnGuided.dataset['target'] = 'guided-learning';
        btnGuided.classList.add('algo-card-btn');

        const btnQuiz = createMockElement('mixed-quiz');
        btnQuiz.dataset['target'] = 'mixed-quiz';
        btnQuiz.classList.add('algo-card-btn');

        const btnAlgo = createMockElement('rsa');
        btnAlgo.dataset['target'] = 'rsa';
        btnAlgo.classList.add('algo-card-btn');

        const mockAlgoBtns = [btnGuided, btnQuiz, btnAlgo];

        const formGuided = createMockElement('guided-learning-form');
        const formQuiz = createMockElement('mixed-quiz-form');
        const formAlgo = createMockElement('rsa-form');

        const mockAlgoForms = [formGuided, formQuiz, formAlgo];

        mockElements['guided-learning-form'] = formGuided;
        mockElements['mixed-quiz-form'] = formQuiz;
        mockElements['rsa-form'] = formAlgo;

        global.document = {
            getElementById: (id) => {
                getElementByIdLastId = id;
                return mockElements[id] || createMockElement(id);
            },
            createElement: (tag) => {
                const el = createMockElement(tag);
                el.setAttribute = () => {};
                return el;
            },
            querySelector: (sel) => {
                querySelectorLastSelector = sel;
                if (sel === '.search-container') return mockElements['.search-container'];
                if (sel === '.algo-card-btn[data-target="guided-learning"]') return btnGuided;
                if (sel === '.algo-card-btn[data-target="mixed-quiz"]') return btnQuiz;
                if (sel === '.algo-card-btn[data-target="rsa"]') return btnAlgo;
                if (sel === '.actions') return createMockElement('actions');
                if (sel === '.output-section') return createMockElement('output-section');
                if (sel === '.steps-card') return createMockElement('steps-card');
                if (sel === '.content-wrapper') return createMockElement('content-wrapper');
                return createMockElement(sel);
            },
            querySelectorAll: (sel) => {
                querySelectorAllLastSelector = sel;
                if (sel === '.algo-card-btn') return mockAlgoBtns;
                if (sel === '.algo-form') return mockAlgoForms;
                return [];
            }
        };

        let storage = '{}';
        global.localStorage = {
            getItem: () => storage,
            setItem: (k, v) => { storage = v; }
        };
        let scrollToArgs = null;
        global.window = {
            localStorage: global.localStorage,
            scrollTo: (args) => { scrollToArgs = args; }
        };

        const app = await import('../js/app.js');

        await t2.test('B) navigateTo(\'guided-learning\') - home gizlenir, workspace aktif olur', () => {
            scrollToArgs = null;
            app.navigateTo('guided-learning');

            assert.strictEqual(mockElements['home-view'].style.display, 'none', 'Home view gizlenmeli');
            assert.strictEqual(mockElements['workspace-view'].style.display, 'block', 'Workspace view görünmeli');
            assert.ok(scrollToArgs !== null, 'window.scrollTo çağrılmalı');
            assert.ok(formGuided.getClasses().includes('active'), 'İlgili form aktif olmalı');
        });

        await t2.test('C) navigateTo(\'mixed-quiz\') - home gizlenir, quiz aktif olur', () => {
            scrollToArgs = null;
            app.navigateTo('mixed-quiz');

            assert.strictEqual(mockElements['home-view'].style.display, 'none');
            assert.strictEqual(mockElements['workspace-view'].style.display, 'block');
            assert.ok(formQuiz.getClasses().includes('active'));
        });

        await t2.test('D) algorithm navigation (rsa) - home gizlenir, tool aktif olur', () => {
            scrollToArgs = null;
            app.navigateTo('rsa');

            assert.strictEqual(mockElements['home-view'].style.display, 'none');
            assert.strictEqual(mockElements['workspace-view'].style.display, 'block');
            assert.ok(formAlgo.getClasses().includes('active'));
        });

        await t2.test('E) navigateHome() - aktif screen kapanır, home discovery geri gelir, scroll top 0 çağrılır', () => {
            scrollToArgs = null;
            app.navigateHome();

            assert.strictEqual(mockElements['home-view'].style.display, 'block', 'Home view geri gelmeli');
            assert.strictEqual(mockElements['workspace-view'].style.display, 'none', 'Workspace gizlenmeli');
            assert.strictEqual(mockElements['home-intro'].style.display, 'block', 'Home intro display block olmalı');
            assert.ok(scrollToArgs !== null, 'window.scrollTo çağrılmalı');
            assert.strictEqual(scrollToArgs.top, 0, 'Scroll top:0 olmalı');

            // Tüm aktif panellerin class'ı temizlenmiş mi?
            assert.ok(mockAlgoBtns.every(b => !b.getClasses().includes('active')), 'Bütün tab butonlarının aktifliği kaldırılmalı');
            assert.ok(mockAlgoForms.every(f => !f.getClasses().includes('active')), 'Bütün tool formlarının aktifliği kaldırılmalı');
        });

        await t2.test('F) handleDiscoverTools() - home görünümü gizlenmez, katalog scroll edilir', () => {
            scrolledElement = null;
            app.handleDiscoverTools();

            assert.strictEqual(querySelectorLastSelector, '.search-container', 'Katalog seçilmeli');
            assert.strictEqual(scrolledElement, mockElements['.search-container'], 'Kataloga scroll edilmeli');
        });

        await t2.test('Favorites Empty State Behavior', () => {
            const favContainer = mockElements['favorites-container'];

            // renderFavorites'i çalıştır ve empty state'i doğrula
            storage = '[]';
            app.renderFavorites();
            assert.ok(favContainer.innerHTML.includes('empty-state'), 'Boşken empty state görünmeli');

            // Favori ekle
            storage = JSON.stringify(['rsa']);
            app.renderFavorites();
            assert.ok(!favContainer.innerHTML.includes('empty-state'), 'Favori eklendiğinde empty state kalkmalı');
            assert.ok(favContainer.innerHTML.includes('algo-card-btn'), 'Favori butonu render edilmeli');

            // Son favoriyi kaldır
            storage = JSON.stringify([]);
            app.renderFavorites();
            assert.ok(favContainer.innerHTML.includes('empty-state'), 'Son favori kaldırılınca empty state tekrar gelmeli');
        });
    });
});
