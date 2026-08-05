import test from 'node:test';
import assert from 'node:assert/strict';
import { runCaesar } from '../js/algorithms/caesar.js';

test('Sezar Algoritması Testleri', async (t) => {
    await t.test('Latin alfabesinde şifreleme', () => {
        const { result } = runCaesar('ABC', 3, 'EN', 'encrypt');
        assert.strictEqual(result, 'DEF');
    });

    await t.test('Latin alfabesinde çözme', () => {
        const { result } = runCaesar('DEF', 3, 'EN', 'decrypt');
        assert.strictEqual(result, 'ABC');
    });

    await t.test('Türk alfabesinde şifreleme ve çözme', () => {
        const { result: encrypted } = runCaesar('ÇĞIÖŞÜ', 5, 'TR', 'encrypt');
        const { result: decrypted } = runCaesar(encrypted, 5, 'TR', 'decrypt');
        assert.strictEqual(decrypted, 'ÇĞIÖŞÜ');
    });

    await t.test('Negatif kaydırma', () => {
        const { result } = runCaesar('DEF', -3, 'EN', 'encrypt');
        assert.strictEqual(result, 'ABC');
    });

    await t.test('Alfabe uzunluğundan büyük kaydırma', () => {
        const { result } = runCaesar('ABC', 29, 'EN', 'encrypt'); // 29 mod 26 = 3
        assert.strictEqual(result, 'DEF');
    });

    await t.test('Büyük-küçük harf koruması', () => {
        const { result } = runCaesar('aBc', 3, 'EN', 'encrypt');
        assert.strictEqual(result, 'dEf');
    });

    await t.test('Noktalama işaretlerinin korunması', () => {
        const { result } = runCaesar('HELLO, WORLD!', 3, 'EN', 'encrypt');
        assert.strictEqual(result, 'KHOOR, ZRUOG!');
    });
});
