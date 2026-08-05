import test from 'node:test';
import assert from 'node:assert';
import { mojibakeRegex } from '../scripts/check-encoding.cjs';

test('Encoding Control Testleri', async (t) => {
    
    await t.test('Bozuk metinleri yakalamalı', () => {
        // Construct the strings using unicode escapes so this file itself passes the encoding check
        assert.ok(mojibakeRegex.test('Uyar\u00C4\u00B1'));
        assert.ok(mojibakeRegex.test('Sezar Arac\u00C4\u00B1nda A\u00C3\u00A7'));
        assert.ok(mojibakeRegex.test('\u00EF\u00BF\u00BD'));

        assert.ok(mojibakeRegex.test('\ufffd')); // replacement char
    });

    await t.test('Doğru UTF-8 metinlerini kabul etmeli (Hata Vermemeli)', () => {
        assert.strictEqual(mojibakeRegex.test('Uyarı'), false);
        assert.strictEqual(mojibakeRegex.test('Kaydırma'), false);
        assert.strictEqual(mojibakeRegex.test('Sezar Aracında Aç'), false);
        assert.strictEqual(mojibakeRegex.test('çÇ ğĞ ıI iİ öÖ şŞ üÜ'), false);
    });

});
