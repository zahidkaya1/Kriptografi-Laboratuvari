import test from 'node:test';
import assert from 'node:assert/strict';
import { runHill } from '../js/algorithms/hill.js';

test('Hill Algoritması Testleri', async (t) => {
    await t.test('Bilinen [[3,3],[2,5]] HELP -> HIAT örneği', () => {
        const { result } = runHill('HELP', 3, 3, 2, 5, 'EN', 'encrypt');
        assert.strictEqual(result, 'HIAT');
    });

    await t.test('Latin encrypt/decrypt round-trip', () => {
        const enc = runHill('CRYPTOGRAPHY', 3, 3, 2, 5, 'EN', 'encrypt');
        const dec = runHill(enc.result, 3, 3, 2, 5, 'EN', 'decrypt');
        assert.strictEqual(dec.result, 'CRYPTOGRAPHY');
    });

    await t.test('Türkçe alphabet round-trip', () => {
        // [5, 8], [17, 3] -> det = 15 - 136 = -121. -121 mod 29 = 24. gcd(24, 29) = 1.
        const enc = runHill('ŞİFRE', 5, 8, 17, 3, 'TR', 'encrypt');
        const dec = runHill(enc.result, 5, 8, 17, 3, 'TR', 'decrypt');
        assert.strictEqual(dec.result, 'ŞİFREZ'); // Padding expected
    });

    await t.test('Determinant invertibility kontrolü (mod 26)', () => {
        // det = 2*2 - 2*2 = 0
        assert.throws(() => runHill('TEST', 2, 2, 2, 2, 'EN', 'encrypt'));
    });

    await t.test('Mod 26\'da terslenemeyen matris reddi', () => {
        // det = 2*5 - 4*2 = 2, gcd(2, 26) = 2 != 1
        assert.throws(() => runHill('TEST', 2, 4, 2, 5, 'EN', 'encrypt'));
    });

    await t.test('Mod 29\'da doğru ters kontrolü', () => {
        // det = 2, gcd(2, 29) = 1 (valid in mod 29)
        const enc = runHill('TEST', 2, 4, 2, 5, 'TR', 'encrypt');
        assert.ok(enc.result);
    });

    await t.test('Negatif matris değerlerinin normalizasyonu', () => {
        // -23 mod 26 = 3, -23 mod 26 = 3, -24 mod 26 = 2, -21 mod 26 = 5
        const { result } = runHill('HELP', -23, -23, -24, -21, 'EN', 'encrypt');
        assert.strictEqual(result, 'HIAT');
    });

    await t.test('Büyük matris değerlerinin normalizasyonu', () => {
        // 29 mod 26 = 3, 55 mod 26 = 3, 28 mod 26 = 2, 31 mod 26 = 5
        const { result } = runHill('HELP', 29, 55, 28, 31, 'EN', 'encrypt');
        assert.strictEqual(result, 'HIAT');
    });

    await t.test('Tek uzunluk plaintext padding', () => {
        const { normalizedText } = runHill('A', 3, 3, 2, 5, 'EN', 'encrypt');
        assert.strictEqual(normalizedText, 'AX');
    });

    await t.test('Tek uzunluk ciphertext reddi', () => {
        assert.throws(() => runHill('A', 3, 3, 2, 5, 'EN', 'decrypt'));
    });

    await t.test('Boş metin hatası', () => {
        assert.throws(() => runHill('', 3, 3, 2, 5, 'EN', 'encrypt'));
    });

    await t.test('Deterministik sonuç', () => {
        const r1 = runHill('A', 3, 3, 2, 5, 'EN', 'encrypt');
        const r2 = runHill('A', 3, 3, 2, 5, 'EN', 'encrypt');
        assert.strictEqual(r1.result, r2.result);
    });

    await t.test('Ters matrisin identity üretmesi (zımni olarak round-trip ile test ediliyor)', () => {
        const plain = 'MATRIX';
        const a = 9, b = 4, c = 5, d = 7; // det = 63 - 20 = 43 ≡ 17 (mod 26), gcd(17,26)=1
        const enc = runHill(plain, a, b, c, d, 'EN', 'encrypt');
        const dec = runHill(enc.result, a, b, c, d, 'EN', 'decrypt');
        assert.strictEqual(dec.result, plain);
    });
});
