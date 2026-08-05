import test from 'node:test';
import assert from 'node:assert/strict';
import { runAffine } from '../js/algorithms/affine.js';

test('Affine Algoritması Testleri', async (t) => {
    await t.test('Standart Latin örneği', () => {
        const { result, m, gcdVal, aInv } = runAffine('AFFINECIPHER', 5, 8, 'EN', 'encrypt');
        assert.strictEqual(result, 'IHHWVCSWFRCP');
        assert.strictEqual(m, 26);
        assert.strictEqual(gcdVal, 1);
        assert.strictEqual(aInv, 21);
    });

    await t.test('Şifreleme ve çözme tur testi (EN)', () => {
        const original = 'HELLOWORLD';
        const { result: encrypted } = runAffine(original, 7, 2, 'EN', 'encrypt');
        const { result: decrypted } = runAffine(encrypted, 7, 2, 'EN', 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Türk alfabesi tur testi (TR)', () => {
        const original = 'TÜRKÇE ŞİFRE';
        const { result: encrypted } = runAffine(original, 5, 10, 'TR', 'encrypt');
        const { result: decrypted } = runAffine(encrypted, 5, 10, 'TR', 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Geçersiz a değeri (gcd != 1)', () => {
        assert.throws(() => {
            runAffine('TEST', 13, 5, 'EN', 'encrypt');
        }, /aralarında asal olmalıdır/);
    });

    await t.test('Negatif a veya b normalizasyonu', () => {
        const { result: res1 } = runAffine('TEST', -21, -18, 'EN', 'encrypt'); // -21 mod 26 = 5, -18 mod 26 = 8
        const { result: res2 } = runAffine('TEST', 5, 8, 'EN', 'encrypt');
        assert.strictEqual(res1, res2);
    });

    await t.test('Büyük-küçük harf koruması', () => {
        const { result } = runAffine('AfFiNe', 5, 8, 'EN', 'encrypt');
        assert.strictEqual(result, 'IhHwVc');
    });

    await t.test('Noktalama işaretlerinin korunması', () => {
        const { result } = runAffine('HELLO, WORLD!', 5, 8, 'EN', 'encrypt');
        assert.strictEqual(result, 'RCLLA, OAPLX!');
    });
});
