import test from 'node:test';
import assert from 'node:assert/strict';
import { runAtbash } from '../js/algorithms/atbash.js';

test('Atbash Algoritması Testleri', async (t) => {
    await t.test('Latin alfabesi eşleşmeleri', () => {
        const { result } = runAtbash('ABCXYZ', 'EN');
        assert.strictEqual(result, 'ZYXCBA');
    });

    await t.test('Türk alfabesi şifreleme ve çözme', () => {
        const original = 'TÜRKÇE ŞİFRELEME';
        const { result: encrypted } = runAtbash(original, 'TR');
        const { result: decrypted } = runAtbash(encrypted, 'TR');
        assert.strictEqual(decrypted, original);
    });

    await t.test('İşlemin iki kez uygulanması orijinal metni verir', () => {
        const original = 'HELLO WORLD';
        const { result: encrypted } = runAtbash(original, 'EN');
        const { result: decrypted } = runAtbash(encrypted, 'EN');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Büyük-küçük harf koruması', () => {
        const { result } = runAtbash('AbcXyZ', 'EN');
        assert.strictEqual(result, 'ZyxCbA');
    });

    await t.test('Özel karakterlerin korunması', () => {
        const { result } = runAtbash('A!B.C?', 'EN');
        assert.strictEqual(result, 'Z!Y.X?');
    });
});
