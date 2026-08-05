import test from 'node:test';
import assert from 'node:assert/strict';
import { runRailFence } from '../js/algorithms/rail-fence.js';

test('Rail Fence Algoritması Testleri', async (t) => {
    await t.test('Standart 3 ray örneği', () => {
        const { result } = runRailFence('WEAREDISCOVEREDFLEEATONCE', 3, 'encrypt');
        assert.strictEqual(result, 'WECRLTEERDSOEEFEAOCAIVDEN');
    });

    await t.test('Şifreleme ve çözme tur testi', () => {
        const original = 'WEAREDISCOVEREDFLEEATONCE';
        const { result: encrypted } = runRailFence(original, 3, 'encrypt');
        const { result: decrypted } = runRailFence(encrypted, 3, 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('2 ray testi', () => {
        const original = 'HELLOWORLD';
        const { result: encrypted } = runRailFence(original, 2, 'encrypt');
        assert.strictEqual(encrypted, 'HLOOLELWRD');
        const { result: decrypted } = runRailFence(encrypted, 2, 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Türkçe karakterler', () => {
        const { result } = runRailFence('ĞÜŞİÖÇ', 3, 'encrypt');
        const { result: decrypted } = runRailFence(result, 3, 'decrypt');
        assert.strictEqual(decrypted, 'ĞÜŞİÖÇ');
    });

    await t.test('Boşluk ve noktalama işaretleri', () => {
        const original = 'HELLO, WORLD!';
        const { result: encrypted } = runRailFence(original, 3, 'encrypt');
        const { result: decrypted } = runRailFence(encrypted, 3, 'decrypt');
        assert.strictEqual(decrypted, original);
    });

    await t.test('Geçersiz ray sayısı', () => {
        assert.throws(() => {
            runRailFence('TEST', 1, 'encrypt');
        }, /en az 2 olmalıdır/);
    });

    await t.test('Ray sayısının metin uzunluğuna yakın olduğu durum', () => {
        const original = 'TEST';
        const { result: encrypted } = runRailFence(original, 5, 'encrypt');
        assert.strictEqual(encrypted, 'TEST');
        const { result: decrypted } = runRailFence(encrypted, 5, 'decrypt');
        assert.strictEqual(decrypted, original);
    });
});
