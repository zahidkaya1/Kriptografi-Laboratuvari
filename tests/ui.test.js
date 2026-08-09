import test from 'node:test';
import assert from 'node:assert';

test('UI Copy Button State Helper Testleri', async (t) => {
    
    // Node.js ortamı için basit bir DOM mock'u
    global.document = {
        getElementById: () => null,
        createElement: () => ({})
    };
    
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
