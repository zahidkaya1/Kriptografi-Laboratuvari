import test from 'node:test';
import assert from 'node:assert/strict';
import { runHash } from '../js/hashing/hash.js';

test('Hash Fonksiyonu Testleri', async (t) => {
    await t.test('SHA-256 bilinen vektör (deterministik sonuç)', async () => {
        const text = "abc";
        const expected = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
        const result = await runHash(text, "SHA-256");
        assert.strictEqual(result.result, expected);
    });

    await t.test('SHA-384 bilinen vektör', async () => {
        const text = "abc";
        const expected = "cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7";
        const result = await runHash(text, "SHA-384");
        assert.strictEqual(result.result, expected);
    });

    await t.test('SHA-512 bilinen vektör', async () => {
        const text = "abc";
        const expected = "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";
        const result = await runHash(text, "SHA-512");
        assert.strictEqual(result.result, expected);
    });

    await t.test('Farklı girişler -> farklı hash', async () => {
        const r1 = await runHash("test1", "SHA-256");
        const r2 = await runHash("test2", "SHA-256");
        assert.notStrictEqual(r1.result, r2.result);
    });

    await t.test('Türkçe UTF-8 karakter destekli hash', async () => {
        const result = await runHash("ğüşıöç", "SHA-256");
        assert.ok(result.result);
        assert.strictEqual(result.result.length, 64);
    });

    await t.test('Geçersiz algoritma hatası', async () => {
        await assert.rejects(runHash("test", "MD5"));
    });
    
    await t.test('Boş girdi hatası', async () => {
        await assert.rejects(runHash("", "SHA-256"));
    });
});
