import test from 'node:test';
import assert from 'node:assert/strict';
import { runXOR } from '../js/algorithms/xor.js';

test('XOR Algoritması Testleri', async (t) => {
    await t.test('ASCII metin şifreleme ve çözme (Round-trip)', () => {
        const text = "HELLO";
        const key = "KEY";
        
        const encResult = runXOR(text, key, 'encrypt');
        assert.ok(encResult.result);
        
        const decResult = runXOR(encResult.result, key, 'decrypt');
        assert.strictEqual(decResult.result, text);
    });

    await t.test('Türkçe UTF-8 karakter şifreleme ve çözme (Round-trip)', () => {
        const text = "ŞĞÜİÖÇşğüıöç";
        const key = "GİZLİ";
        
        const encResult = runXOR(text, key, 'encrypt');
        const decResult = runXOR(encResult.result, key, 'decrypt');
        
        assert.strictEqual(decResult.result, text);
    });

    await t.test('Deterministik sonuç', () => {
        const text = "A"; // 65
        const key = "B"; // 66
        const encResult = runXOR(text, key, 'encrypt');
        assert.strictEqual(encResult.result, "03");
    });

    await t.test('Boş metin hatası', () => {
        assert.throws(() => runXOR("", "key", "encrypt"));
    });

    await t.test('Boş anahtar hatası', () => {
        assert.throws(() => runXOR("text", "", "encrypt"));
    });

    await t.test('Geçersiz HEX girdisi hatası (Harf/Rakam dışı)', () => {
        assert.throws(() => runXOR("XX", "key", "decrypt"));
    });

    await t.test('Tek uzunluklu HEX girdisi hatası', () => {
        assert.throws(() => runXOR("A", "key", "decrypt"));
    });
});
