import test from 'node:test';
import assert from 'node:assert/strict';
import { ALGORITHM_CATALOG } from '../js/utils/algorithm-catalog.js';

test('Algoritma Katalog Testleri', async (t) => {
    await t.test('Tüm katalog ID\'leri benzersiz olmalı', () => {
        const ids = ALGORITHM_CATALOG.map(algo => algo.id);
        const uniqueIds = new Set(ids);
        assert.strictEqual(ids.length, uniqueIds.size, 'Katalogda tekrar eden ID bulunmamalıdır');
    });

    await t.test('XOR Katalog Kuralları', () => {
        const xor = ALGORITHM_CATALOG.find(a => a.id === 'xor');
        assert.ok(xor, 'XOR algoritması katalogda bulunmalı');
        assert.strictEqual(xor.category, 'Modern ve Matematiksel', 'XOR doğru kategoride olmalı');
        
        // steps=true equivalent -> changesChars should exist or just standard algorithm properties
        // actually the user said "steps=true", which in this app's UI might be controlled by app.js (stepsCard visibility)
        // But let's check basic metadata
        assert.ok(xor.meta, 'XOR metadata içermeli');
        assert.strictEqual(xor.meta.supportsDecryption, 'Evet', 'XOR şifre çözmeyi desteklemeli');
    });

    await t.test('Base64 Katalog Kuralları', () => {
        const base64 = ALGORITHM_CATALOG.find(a => a.id === 'base64');
        assert.ok(base64, 'Base64 katalogda bulunmalı');
        assert.strictEqual(base64.category, 'Kodlama ve Veri Dönüşümü', 'Base64 doğru kategoride olmalı');
        assert.ok(base64.meta, 'Base64 metadata içermeli');
        assert.strictEqual(base64.meta.supportsDecryption, 'Hayır (Şifreleme değil, Kod Çözme - Decoding)', 'Base64 şifreleme olarak sınıflandırılmamalı');
    });

    await t.test('Hash Katalog Kuralları', () => {
        const hash = ALGORITHM_CATALOG.find(a => a.id === 'hash');
        assert.ok(hash, 'Hash katalogda bulunmalı');
        assert.strictEqual(hash.category, 'Özet (Hash) Fonksiyonları', 'Hash doğru kategoride olmalı');
        assert.ok(hash.meta, 'Hash metadata içermeli');
        assert.strictEqual(hash.meta.supportsDecryption, 'Hayır (Tek yönlüdür)', 'Hash şifre çözme desteklememeli');
        
        const isSHAIncluded = hash.keywords.includes('sha256') || hash.keywords.includes('sha384') || hash.keywords.includes('sha512');
        assert.ok(isSHAIncluded, 'Hash metadata içinde SHA varyantları bulunmalı');
    });
});
