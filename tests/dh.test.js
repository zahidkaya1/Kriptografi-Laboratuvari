import test from 'node:test';
import assert from 'node:assert';
import { runDiffieHellman } from '../js/algorithms/diffie-hellman.js';

test('Diffie-Hellman Algoritması Testleri', async (t) => {
    
    await t.test('Başarılı Ortak Anahtar Eşleşmesi', () => {
        // Örnek: p=23, g=5, a=6, b=15
        const result = runDiffieHellman(23, 5, 6, 15);
        
        assert.strictEqual(result.A, "8");
        assert.strictEqual(result.B, "19");
        assert.strictEqual(result.K1, "2");
        assert.strictEqual(result.K2, "2");
        assert.strictEqual(result.isMatch, true);
    });

    await t.test('Geçersiz Asal Modül (p)', () => {
        assert.throws(() => runDiffieHellman(24, 5, 6, 15), /asal/);
    });

    await t.test('Geçersiz Üreteç (g) veya Gizli Anahtarlar', () => {
        assert.throws(() => runDiffieHellman(23, 24, 6, 15), /g \(üreteç\) değeri/);
        assert.throws(() => runDiffieHellman(23, 5, 25, 15), /a \(Alice/);
    });

});
