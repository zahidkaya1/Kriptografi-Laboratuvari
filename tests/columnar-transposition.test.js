import test from 'node:test';
import assert from 'node:assert/strict';
import { runColumnarTransposition } from '../js/algorithms/columnar-transposition.js';

test('Sütunlu Transpozisyon Algoritması Testleri', async (t) => {
    await t.test('Şifreleme ve çözme tur testi', () => {
        const original = 'HELLOWORLD';
        const { result: encrypted } = runColumnarTransposition(original, 'KEY', 'EN', 'encrypt');
        const { result: decrypted } = runColumnarTransposition(encrypted, 'KEY', 'EN', 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Eksik son satır', () => {
        const original = 'TENLETTERS';
        const { result: encrypted } = runColumnarTransposition(original, 'BLUE', 'EN', 'encrypt');
        const { result: decrypted } = runColumnarTransposition(encrypted, 'BLUE', 'EN', 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Tekrarlı anahtar karakterleri', () => {
        const original = 'THISISAMESSAGE';
        const { result: encrypted } = runColumnarTransposition(original, 'APPLE', 'EN', 'encrypt');
        const { result: decrypted } = runColumnarTransposition(encrypted, 'APPLE', 'EN', 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Türkçe karakterler', () => {
        const original = 'TÜRKÇE ŞİFRELEME';
        const { result: encrypted } = runColumnarTransposition(original, 'ANAHTAR', 'TR', 'encrypt');
        const { result: decrypted } = runColumnarTransposition(encrypted, 'ANAHTAR', 'TR', 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Boşluk ve noktalama işaretleri', () => {
        const original = 'HELLO, WORLD!';
        const { result: encrypted } = runColumnarTransposition(original, 'KEY', 'EN', 'encrypt');
        const { result: decrypted } = runColumnarTransposition(encrypted, 'KEY', 'EN', 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Boş veya tek karakterli anahtar', () => {
        assert.throws(() => {
            runColumnarTransposition('TEST', 'A', 'EN', 'encrypt');
        }, /en az 2 karakter olmalıdır/);
        
        assert.throws(() => {
            runColumnarTransposition('TEST', '', 'EN', 'encrypt');
        }, /en az 2 karakter olmalıdır/);
    });

    await t.test('Büyük-küçük harf içeren anahtarın deterministik sıralanması', () => {
        const { result: res1 } = runColumnarTransposition('MESSAGE', 'kEy', 'EN', 'encrypt');
        const { result: res2 } = runColumnarTransposition('MESSAGE', 'KEY', 'EN', 'encrypt');
        assert.strictEqual(res1, res2);
    });
});
