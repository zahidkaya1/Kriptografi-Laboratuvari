import test from 'node:test';
import assert from 'node:assert/strict';
import { runROT13 } from '../js/algorithms/rot13.js';

test('ROT13 Algoritması Testleri', async (t) => {
    await t.test('HELLO -> URYYB', () => {
        const { result } = runROT13('HELLO');
        assert.strictEqual(result, 'URYYB');
    });

    await t.test('URYYB -> HELLO', () => {
        const { result } = runROT13('URYYB');
        assert.strictEqual(result, 'HELLO');
    });

    await t.test('Küçük harf koruması', () => {
        const { result } = runROT13('Hello');
        assert.strictEqual(result, 'Uryyb');
    });

    await t.test('Noktalama işaretlerinin korunması', () => {
        const { result } = runROT13('HELLO, WORLD!');
        assert.strictEqual(result, 'URYYB, JBEYQ!');
    });

    await t.test('İşlemin iki kez uygulanması orijinal metni verir', () => {
        const original = 'SECRET MESSAGE';
        const { result: encrypted } = runROT13(original);
        const { result: decrypted } = runROT13(encrypted);
        assert.strictEqual(decrypted, original);
    });
});
