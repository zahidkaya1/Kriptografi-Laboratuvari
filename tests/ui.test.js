import test from 'node:test';
import assert from 'node:assert';

// Node.js ortamı için detaylı DOM mock'u (table render'ı ve button state test etmek için)
// Bu mock, dosyadaki tüm testler için geçerli olacak ve ui.js ilk kez import edildiğinde
// document.getElementById aramalarının null dönmesini engelleyecek.
global.document = {
    getElementById: (id) => {
        return {
            innerHTML: '',
            appendChild: function() {},
            textContent: '',
            className: '',
            style: {},
            dataset: {}
        };
    },
    createElement: (tag) => {
        return {
            tagName: tag.toUpperCase(),
            innerHTML: '',
            textContent: '',
            appendChild: function() {},
            className: '',
            style: {},
            dataset: {}
        };
    }
};

test('UI Copy Button State Helper Testleri', async (t) => {
    const { setCopyButtonState, resetCopyButton } = await import('../js/utils/ui.js');

    // Basit bir mock button nesnesi
    const createMockButton = (html) => ({
        innerHTML: html,
        textContent: '',
        dataset: {},
        copyTimeout: null
    });

    await t.test('Orijinal içerik korunmalı ve geri yüklenmeli', () => {
        const btn = createMockButton('📋');

        // Başlangıç durumu simüle ediliyor (Tıklama anı)
        setCopyButtonState(btn, 'Kopyalandı', null);

        // Success state kontrolü
        assert.strictEqual(btn.textContent, 'Kopyalandı');
        assert.strictEqual(btn.dataset.originalHtml, '📋');

        // Emoji veya checkmark kullanılmadığını doğrula
        assert.strictEqual(btn.textContent.includes('✓'), false);
        assert.strictEqual(btn.textContent.includes('✔'), false);
        assert.strictEqual(btn.textContent.includes('✅'), false);
        assert.strictEqual(btn.textContent.includes('\u00E2\u0153'), false);

        // Reset işlemi simüle ediliyor
        resetCopyButton(btn);

        // Orijinal içeriğin geri geldiğini kontrol et
        assert.strictEqual(btn.innerHTML, '📋');
    });

});

test('UI Input Security Regression Testleri', async (t) => {
    const { escapeHTML, renderCaesarSteps } = await import('../js/utils/ui.js');

    await t.test('A) Script etiketleri (alert) escape edilmeli', () => {
        const input = '<script>alert(1)</script>';
        const expected = '&lt;script&gt;alert(1)&lt;/script&gt;';
        assert.strictEqual(escapeHTML(input), expected, 'Executable HTML kalmamalı');
    });

    await t.test('B) Event handler taşıyan etiketler escape edilmeli', () => {
        const input = '<img src=x onerror=alert(1)>';
        const expected = '&lt;img src=x onerror=alert(1)&gt;';
        assert.strictEqual(escapeHTML(input), expected, 'Gerçek img eventi oluşmamalı');
    });

    await t.test('C) Kritik HTML karakterleri güvenli hale getirilmeli', () => {
        const input = `& < > " '`;
        const expected = `&amp; &lt; &gt; &quot; &#039;`;
        assert.strictEqual(escapeHTML(input), expected, 'Karakterler doğru encode edilmeli');
    });

    await t.test('D) Normal Türkçe metin bozulmamalı', () => {
        const input = 'Şifreleme Öğreniyorum: çğıöşü';
        assert.strictEqual(escapeHTML(input), input, 'Zararsız metin olduğu gibi kalmalı');
    });

    await t.test('E) Gerçek render akışında injection önlenmeli (renderCaesarSteps)', () => {
        const fakeSteps = [
            {
                textChar: '<b>TEST</b>',
                textIdx: 1,
                shift: 3,
                operation: '+',
                resultIdx: 4,
                resultChar: '<script>'
            }
        ];

        // Mock için log oluşturucu (innerHTML değişikliklerini yakalamak için)
        const trMock = {
            tagName: 'TR',
            _innerHTML: '',
            set innerHTML(val) {
                this._innerHTML = val;
            },
            get innerHTML() {
                return this._innerHTML;
            },
            appendChild: function() {}
        };

        const originalCreateElement = global.document.createElement;
        global.document.createElement = (tag) => {
            if (tag === 'tr') {
                return trMock;
            }
            return originalCreateElement(tag);
        };

        // Render işlemini tetikle
        renderCaesarSteps(fakeSteps);

        // Orijinal metoda dön
        global.document.createElement = originalCreateElement;

        // Tr'ye eklenen innerHTML'in güvenli olduğunu kontrol et
        const htmlOutput = trMock.innerHTML;

        assert.strictEqual(htmlOutput.includes('<b>TEST</b>'), false, 'Injection: textChar <b> etiketi çalışmamalı');
        assert.strictEqual(htmlOutput.includes('&lt;b&gt;TEST&lt;/b&gt;'), true, 'textChar başarılı şekilde escape edildi');

        assert.strictEqual(htmlOutput.includes('<script>'), false, 'Injection: resultChar <script> etiketi çalışmamalı');
        assert.strictEqual(htmlOutput.includes('&lt;script&gt;'), true, 'resultChar başarılı şekilde escape edildi');
    });
});
