import test from 'node:test';
import assert from 'node:assert/strict';

// Mock document for UI tests
const createMockElement = (id) => {
    let _innerHTML = '';
    let _textContent = '';
    const children = [];
    const listeners = {};
    return {
        id,
        style: {},
        className: '',
        dataset: {},
        classList: { add: () => {}, remove: () => {} },
        get innerHTML() { return _innerHTML; },
        set innerHTML(val) { _innerHTML = val; },
        get textContent() { return _textContent; },
        set textContent(val) { _textContent = val; },
        appendChild: (child) => {
            children.push(child);
            _innerHTML += child.innerHTML;
        },
        value: '',
        addEventListener: (event, cb) => {
            if (!listeners[event]) listeners[event] = [];
            listeners[event].push(cb);
        },
        click: async function() {
            if (listeners['click']) {
                for (let cb of listeners['click']) await cb({ preventDefault: () => {} });
            }
        }
    };
};

const mockElements = {
    'result-output': createMockElement('result-output'),
    'message-area': createMockElement('message-area'),
    'steps-output': createMockElement('steps-output'),
    'btn-copy': createMockElement('btn-copy'),
    'rsa-p': createMockElement('rsa-p'),
    'rsa-q': createMockElement('rsa-q'),
    'rsa-e': createMockElement('rsa-e'),
    'rsa-message': createMockElement('rsa-message'),
    'rsa-mode': createMockElement('rsa-mode'),
    'dh-p': createMockElement('dh-p'),
    'dh-g': createMockElement('dh-g'),
    'dh-a': createMockElement('dh-a'),
    'dh-b': createMockElement('dh-b'),
    'btn-calculate': createMockElement('btn-calculate'),
    'current-algo-display': createMockElement('current-algo-display'),
    'tools-section': createMockElement('tools-section')
};

global.document = {
    getElementById: (id) => mockElements[id] || createMockElement(id),
    createElement: (tag) => createMockElement(tag),
    querySelector: () => createMockElement('div'),
    querySelectorAll: () => []
};
global.window = {
    scrollTo: () => {},
    location: { hash: '' }
};
global.localStorage = { getItem: () => null, setItem: () => {} };

test('Regression Tests (Phase 2)', async (t) => {

    await t.test('Frequency Analysis XSS Regression', async (t2) => {
        const ui = await import('../js/utils/ui.js');

        const mockResult = {
            totalCharacters: 10,
            totalLetters: 10,
            distinctLetters: 1,
            mostFrequent: { char: '<script>alert(1)</script>', count: 10, percent: 100 },
            leastFrequent: { char: '<img src=x onerror=alert(1)>', count: 0, percent: 0 },
            frequencyOrder: [],
            alphabetOrder: []
        };

        ui.renderFrequencyAnalysis(mockResult, 'freq');
        const output = mockElements['result-output'].innerHTML;

        await t2.test('<script> etiketleri güvenli render edilmeli', () => {
            assert.ok(output.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'Script etiketi escape edilmeli');
            assert.ok(!output.includes('<script>'), 'Ham script etiketi bulunmamalı');
        });

        await t2.test('<img onerror> etiketleri güvenli render edilmeli', () => {
            assert.ok(output.includes('&lt;img src=x onerror=alert(1)&gt;'), 'Img etiketi escape edilmeli');
            assert.ok(!output.includes('<img '), 'Ham img etiketi bulunmamalı');
        });

        const mockResultTr = {
            totalCharacters: 5,
            totalLetters: 5,
            distinctLetters: 1,
            mostFrequent: { char: 'ŞĞÜİÖÇşğüıöç', count: 5, percent: 100 },
            leastFrequent: null,
            frequencyOrder: [],
            alphabetOrder: []
        };

        ui.renderFrequencyAnalysis(mockResultTr, 'freq');
        const outputTr = mockElements['result-output'].innerHTML;

        await t2.test('Türkçe karakterler bozulmamalı', () => {
            assert.ok(outputTr.includes('ŞĞÜİÖÇşğüıöç'), 'Türkçe harfler aynen korunmalı');
        });

        const mockResultEmoji = {
            totalCharacters: 5,
            totalLetters: 5,
            distinctLetters: 1,
            mostFrequent: { char: '🔐', count: 5, percent: 100 },
            leastFrequent: null,
            frequencyOrder: [],
            alphabetOrder: []
        };

        ui.renderFrequencyAnalysis(mockResultEmoji, 'freq');
        const outputEmoji = mockElements['result-output'].innerHTML;

        await t2.test('Emojiler bozulmamalı', () => {
            assert.ok(outputEmoji.includes('🔐'), 'Emoji aynen korunmalı');
        });
    });

    await t.test('App.js Input Validation Regression', async (t2) => {
        const app = await import('../js/app.js');

        const btnCalculate = mockElements['btn-calculate'];
        const messageArea = mockElements['message-area'];

        await t2.test('Boş girdilerde NaN patlaması olmamalı, "Lütfen tüm RSA alanlarını doldurunuz." mesajı dönmeli', async () => {
            messageArea.textContent = '';
            mockElements['rsa-p'].value = '';
            mockElements['rsa-q'].value = '';
            mockElements['rsa-e'].value = '';
            mockElements['rsa-message'].value = '';

            await btnCalculate.click();
            assert.strictEqual(messageArea.textContent, "Lütfen tüm RSA alanlarını doldurunuz.", "Boşluklar için doğru hata döndürülmeli");
            assert.ok(messageArea.className.includes("error"));
        });

        await t2.test('NaN (Sayı olmayan) girdilerde "Lütfen geçerli sayısal değerler giriniz." mesajı dönmeli', async () => {
            messageArea.textContent = '';
            mockElements['rsa-p'].value = 'abc';
            mockElements['rsa-q'].value = 'def';
            mockElements['rsa-e'].value = 'xyz';
            mockElements['rsa-message'].value = 'gizli';

            await btnCalculate.click();
            assert.strictEqual(messageArea.textContent, "Lütfen geçerli sayısal değerler giriniz.", "NaN için sayısal değerler hatası döndürülmeli");
            assert.ok(messageArea.className.includes("error"));
        });

        await t2.test('Aşırı büyük geçersiz değerlerde sayı kontrolü çalışmalı', async () => {
            messageArea.textContent = '';
            mockElements['rsa-p'].value = '10e1000';
            mockElements['rsa-q'].value = 'Infinity';
            mockElements['rsa-e'].value = 'NaN';
            mockElements['rsa-message'].value = 'gizli';

            await btnCalculate.click();
            assert.strictEqual(messageArea.textContent, "Lütfen geçerli sayısal değerler giriniz.", "NaN olan değerler engellenmeli");
        });
    });
});
