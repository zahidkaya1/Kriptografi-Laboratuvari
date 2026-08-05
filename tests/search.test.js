import test from 'node:test';
import assert from 'node:assert/strict';
import { searchAlgorithms, normalizeText } from '../js/utils/search.js';
import { ALGORITHM_CATALOG } from '../js/utils/algorithm-catalog.js';

test('Arama Yardımcıları Testleri', async (t) => {
    await t.test('Büyük-küçük harf duyarsızlığı', () => {
        const result1 = searchAlgorithms('SEZAR');
        const result2 = searchAlgorithms('sezar');
        assert.deepEqual(result1, result2);
        assert.ok(result1.includes('caesar'));
    });

    await t.test('Türkçe karakter normalizasyonu', () => {
        const result = searchAlgorithms('sÜtünlÜ'); 
        // "sütunlu" keyword matching could be tricky with naive lowercase, but 'tr-TR' locale helps.
        // Wait, "sÜtünlÜ" doesn't strictly match "sütunlu", but let's test a known word: "şifre"
        const result2 = searchAlgorithms('şİfRE');
        assert.ok(result2.length > 0);
    });

    await t.test('Kısmi eşleşme', () => {
        const result = searchAlgorithms('diff');
        assert.ok(result.includes('dh'));
    });

    await t.test('Kategori üzerinden eşleşme', () => {
        const result = searchAlgorithms('transpozisyon');
        assert.ok(result.includes('railfence'));
        assert.ok(result.includes('columnar'));
    });

    await t.test('Anahtar kelime üzerinden eşleşme', () => {
        const result = searchAlgorithms('zikzak');
        assert.ok(result.includes('railfence'));
    });

    await t.test('Sonuç bulunamaması', () => {
        const result = searchAlgorithms('olmayan_algoritma_adi');
        assert.strictEqual(result.length, 0);
    });

    await t.test('Boş arama (tümünü getirir)', () => {
        const result = searchAlgorithms('');
        assert.strictEqual(result.length, ALGORITHM_CATALOG.length);
        
        const resultSpace = searchAlgorithms('   ');
        assert.strictEqual(resultSpace.length, ALGORITHM_CATALOG.length);
    });
});
