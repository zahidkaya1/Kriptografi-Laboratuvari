import test from 'node:test';
import assert from 'node:assert/strict';

test('UI Regression Tests - Phase 3', async (t) => {
    let scrolledElement = null;
    let clickedElement = null;

    const createMockElement = (idOrClass) => {
        const classes = new Set();
        const listeners = {};
        const dataset = {};
        const style = {};

        const el = {
            id: idOrClass,
            className: '',
            innerHTML: '',

            get textContent() { return el.innerHTML; },
            set textContent(val) { el.innerHTML = val; },
            style: style,
            dataset: dataset,
            disabled: false,
            open: false,
            classList: {
                add: (c) => { classes.add(c); el.className = Array.from(classes).join(' '); },
                remove: (c) => { classes.delete(c); el.className = Array.from(classes).join(' '); },
                contains: (c) => classes.has(c)
            },
            getClasses: () => Array.from(classes),
            getAttribute: (attr) => dataset[attr] || (attr === 'data-target' ? idOrClass : null),
            setAttribute: (attr, val) => {
                if (attr.startsWith('data-')) {
                    dataset[attr.replace('data-', '')] = val;
                }
                if (attr === 'open') el.open = true;
            },
            removeAttribute: (attr) => {
                if (attr === 'open') el.open = false;
            },
            click: function(e) {
                clickedElement = this;
                if (listeners['click']) listeners['click'].forEach(cb => cb(e || { target: this, preventDefault: () => {} }));
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
        'tools-view': createMockElement('tools-view'),
        'learning-view': createMockElement('learning-view'),
        'workspace-view': createMockElement('workspace-view'),
        'workspace-nav': createMockElement('workspace-nav'),
        'message-area': createMockElement('message-area'),
        'result-output': createMockElement('result-output'),
        'steps-output': createMockElement('steps-output'),
        'btn-copy': createMockElement('btn-copy'),
        'btn-clear': createMockElement('btn-clear'),
        'btn-calculate': createMockElement('btn-calculate'),
        'btn-example': createMockElement('btn-example'),
        'category-analysis': createMockElement('category-analysis'),
        '.action-row': createMockElement('.action-row'),
        '.actions': createMockElement('.actions'),
        '.output-section': createMockElement('.output-section'),
        '.steps-card': createMockElement('.steps-card'),
        '.content-wrapper': createMockElement('.content-wrapper')
    };

    // querySelectorAll
    const mockAlgoBtns = ['mixed-quiz', 'guided-learning', 'exercises', 'education-progress', 'rsa'].map(target => {
        const btn = createMockElement(target);
        btn.dataset['target'] = target;
        btn.classList.add('algo-card-btn');
        return btn;
    });

    const mockForms = ['mixed-quiz-form', 'guided-learning-form', 'exercises-form', 'education-progress-form', 'rsa-form'].map(id => {
        const form = createMockElement(id);
        mockElements[id] = form;
        return form;
    });

    global.document = {
        body: createMockElement('body'),
        getElementById: (id) => {
            return mockElements[id] || createMockElement(id);
        },
        createElement: (tag) => {
            return createMockElement(tag);
        },
        querySelector: (sel) => {
            if (sel.includes('.algo-card-btn')) {
                const target = sel.match(/data-target="([^"]+)"/)?.[1];
                if (target) {
                    return mockAlgoBtns.find(b => b.dataset['target'] === target) || createMockElement(sel);
                }
            }
            return mockElements[sel] || createMockElement(sel);
        },
        querySelectorAll: (sel) => {
            if (sel.includes('.algo-card-btn')) return mockAlgoBtns;
            if (sel === '.algo-form') return mockForms;
            return [];
        }
    };

    global.localStorage = {
        getItem: () => '{}',
        setItem: () => {}
    };
    global.window = {
        localStorage: global.localStorage,
        scrollTo: () => {}
    };
    Object.defineProperty(global, 'navigator', {
        value: {
            clipboard: { writeText: async () => {} }
        },
        writable: true
    });

    // Yükle
    const app = await import('../js/app.js');
    const ui = await import('../js/utils/ui.js');

    await t.test('1. Action Row Navigation Regression Test', async (t2) => {
        await t2.test('A) navigateTo(mixed-quiz) -> action-row hidden', () => {
            app.navigateTo('mixed-quiz');
            assert.strictEqual(mockElements['home-view'].style.display, 'none');
            assert.strictEqual(mockElements['workspace-view'].style.display, 'block');
            assert.strictEqual(mockElements['.action-row'].style.display, 'none');
        });

        await t2.test('B) navigateTo(guided-learning) -> action-row hidden', () => {
            app.navigateTo('guided-learning');
            assert.strictEqual(mockElements['.action-row'].style.display, 'none');
        });

        await t2.test('C) navigateTo(exercises) -> action-row hidden', () => {
            app.navigateTo('exercises');
            assert.strictEqual(mockElements['.action-row'].style.display, 'none');
        });

        await t2.test('D) navigateTo(education-progress) -> action-row hidden', () => {
            app.navigateTo('education-progress');
            assert.strictEqual(mockElements['.action-row'].style.display, 'none');
        });

        await t2.test('E) navigateTo(rsa) -> action-row visible and F) State consistency', () => {
            app.navigateTo('rsa');
            assert.strictEqual(mockElements['.action-row'].style.display, '');

            app.navigateTo('mixed-quiz');
            assert.strictEqual(mockElements['.action-row'].style.display, 'none');
        });
    });

    await t.test('2. Analysis CTA Regression Test', async (t2) => {
        const catAnalysis = document.getElementById('category-analysis');
        const homeView = mockElements['home-view'];
        const toolsView = mockElements['tools-view'];
        const workspaceView = mockElements['workspace-view'];
        const learningView = mockElements['learning-view'];
        const actionRow = mockElements['.action-row'];

        await t2.test('A) navigateToTools() behavior (02 CTA)', () => {
            scrolledElement = null;
            catAnalysis.open = false; // Reset state
            app.navigateToTools();

            assert.strictEqual(toolsView.style.display, 'block');
            assert.strictEqual(homeView.style.display, 'none');
            // navigateToTools shouldn't force open the analysis accordion
            assert.strictEqual(catAnalysis.open, false);
        });

        await t2.test('B) navigateToToolsCategory("analysis") behavior (04 CTA)', async () => {
            scrolledElement = null;
            catAnalysis.open = false; // Reset state
            homeView.style.display = 'block';
            toolsView.style.display = 'none';

            app.navigateToToolsCategory('analysis');

            // Wait for setTimeout in navigateToToolsCategory
            await new Promise(resolve => setTimeout(resolve, 150));

            // View states
            assert.strictEqual(toolsView.style.display, 'block');
            assert.strictEqual(homeView.style.display, 'none');
            assert.strictEqual(workspaceView.style.display, 'none');
            assert.strictEqual(learningView.style.display, 'none');

            // Accordion state
            assert.strictEqual(catAnalysis.open, true);

            // Scroll target
            assert.strictEqual(scrolledElement, catAnalysis);

            // Generic tool action row (should not be visible because we haven't opened a specific tool)
            assert.notEqual(actionRow.style.display, 'flex');
        });
    });

    await t.test('3. Result Empty State Regression Test', () => {
        const resultOutput = mockElements['result-output'];
        const btnCopy = mockElements['btn-copy'];

        // Show
        ui.showResult('TEST');
        assert.strictEqual(resultOutput.classList.contains('empty-state'), false, 'empty-state removed');
        assert.strictEqual(resultOutput.textContent, 'TEST', 'Result should be TEST');
        assert.strictEqual(btnCopy.style.display, 'inline-block', 'Copy button visible');
        assert.strictEqual(btnCopy.disabled, false, 'Copy button enabled');

        // Clear
        ui.clearResult();
        assert.strictEqual(resultOutput.classList.contains('empty-state'), true, 'empty-state added back');
        assert.strictEqual(resultOutput.textContent, 'Hesaplama sonucu burada görünecek...', 'Placeholder text restored');
        assert.strictEqual(btnCopy.style.display, 'none', 'Copy button hidden');
        assert.strictEqual(btnCopy.disabled, true, 'Copy button disabled');

        // Show again
        ui.showResult('NEW TEST');
        assert.strictEqual(resultOutput.classList.contains('empty-state'), false);
        assert.strictEqual(resultOutput.textContent, 'NEW TEST');
    });

    await t.test('4. Steps / Clear State Regression Test', () => {
        const stepsOutput = mockElements['steps-output'];

        ui.renderSteps(['Step 1']);
        assert.strictEqual(stepsOutput.classList.contains('empty-state'), false);
        assert.ok(stepsOutput.innerHTML.includes('Step 1'), 'Steps content present');

        ui.clearSteps();
        assert.strictEqual(stepsOutput.classList.contains('empty-state'), true, 'empty-state added back');
        assert.strictEqual(stepsOutput.innerHTML, '<div class="step-placeholder">İşlem adımları burada görünecek...</div>', 'Placeholder HTML restored');
    });

    await t.test('5. Copy State Feedback Test', () => {
        const btnCopy = mockElements['btn-copy'];
        ui.showResult('TEST');

        btnCopy.dataset.originalHtml = '<span>Kopyala</span>';
        btnCopy.innerHTML = '<span>Kopyalandı!</span>';

        ui.resetCopyButton(btnCopy);

        assert.strictEqual(btnCopy.innerHTML, '<span>Kopyala</span>');
    });
});
