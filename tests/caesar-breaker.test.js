import test from 'node:test';
import assert from 'node:assert/strict';
import { breakCaesar, MAX_BREAKER_LENGTH } from '../js/analysis/caesar-breaker.js';

test('Sezar Kırma Testleri', async (t) => {

    await t.test('Latin alfabesinde 26 aday üretimi', () => {
        const result = breakCaesar('A', 'EN');
        assert.strictEqual(result.candidates.length, 26);
    });

    await t.test('Türk alfabesinde 29 aday üretimi', () => {
        const result = breakCaesar('A', 'TR');
        assert.strictEqual(result.candidates.length, 29);
    });

    await t.test('KHOOR ZRUOG adayları arasında HELLO WORLD bulunması', () => {
        const result = breakCaesar('KHOOR ZRUOG', 'EN');
        const correctCandidate = result.candidates.find(c => c.text === 'HELLO WORLD');
        assert.ok(correctCandidate);
        assert.strictEqual(correctCandidate.shift, 3);
    });

    await t.test('Büyük-küçük harf koruması ve Noktalama işaretleri', () => {
        const result = breakCaesar('Khoor, Zruog!', 'EN');
        const correctCandidate = result.candidates.find(c => c.shift === 3);
        assert.strictEqual(correctCandidate.text, 'Hello, World!');
    });

    await t.test('Boş metin doğrulaması', () => {
        assert.throws(() => breakCaesar('', 'EN'), /boş olamaz/i);
    });

    await t.test('Deterministik aday sıralaması ve eşit puanda küçük kaydırmanın öne geçmesi', () => {
        // Harf içermeyen metinde herkesin puanı NaN olur.
        const result = breakCaesar('123', 'EN');
        assert.strictEqual(result.candidates[0].shift, 0);
        assert.strictEqual(result.candidates[1].shift, 1);
        assert.ok(Number.isNaN(result.bestCandidate.score));
    });

    await t.test('Ki-kare puanının geçerli sayı üretmesi', () => {
        const result = breakCaesar('TESTING', 'EN');
        result.candidates.forEach(c => {
            assert.ok(!Number.isNaN(c.score), "Score should be a valid number");
            assert.ok(isFinite(c.score));
        });
    });

    await t.test('Çok kısa metinde çökmemesi', () => {
        const result = breakCaesar('A', 'EN');
        assert.ok(result.bestCandidate);
        assert.ok(isFinite(result.bestCandidate.score));
    });

    await t.test('10.000 karakter sınırı ve aşımı', () => {
        const longText = 'A'.repeat(MAX_BREAKER_LENGTH);
        const result = breakCaesar(longText, 'EN');
        assert.strictEqual(result.candidates.length, 26);
        
        const tooLong = 'A'.repeat(MAX_BREAKER_LENGTH + 1);
        assert.throws(() => breakCaesar(tooLong, 'EN'), /aşamaz/i);
    });
});
