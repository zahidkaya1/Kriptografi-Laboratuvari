import test from 'node:test';
import assert from 'node:assert/strict';
import { runBase64 } from '../js/encoding/base64.js';

test('Base64 Kodlama Testleri', async (t) => {
    await t.test('ASCII metin encode ve decode (Round-trip)', () => {
        const text = "Hello World!";
        const encoded = runBase64(text, 'encode');
        assert.strictEqual(encoded.result, "SGVsbG8gV29ybGQh");
        
        const decoded = runBase64(encoded.result, 'decode');
        assert.strictEqual(decoded.result, text);
    });

    await t.test('Türkçe UTF-8 karakter encode ve decode (Round-trip)', () => {
        const text = "Çiçek Şemsiye Ğü İö";
        const encoded = runBase64(text, 'encode');
        
        const decoded = runBase64(encoded.result, 'decode');
        assert.strictEqual(decoded.result, text);
    });

    await t.test('Standart bilinen Base64 örneği', () => {
        const encoded = runBase64("A", 'encode');
        assert.strictEqual(encoded.result, "QQ==");
        
        const decoded = runBase64("QQ==", 'decode');
        assert.strictEqual(decoded.result, "A");
    });

    await t.test('Boş metin hatası', () => {
        assert.throws(() => runBase64("", "encode"));
    });

    await t.test('Geçersiz Base64 hatası', () => {
        assert.throws(() => runBase64("???", "decode"));
    });
});
