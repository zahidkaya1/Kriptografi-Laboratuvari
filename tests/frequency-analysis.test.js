import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeFrequency, MAX_ANALYSIS_LENGTH } from '../js/analysis/frequency-analysis.js';

test('Frekans Analizi Testleri', async (t) => {

    await t.test('Latin harf adetleri ve Büyük-küçük harf duyarsızlığı', () => {
        const result = analyzeFrequency('HeLlo WorlD', 'EN');
        assert.strictEqual(result.totalLetters, 10);
        assert.strictEqual(result.totalCharacters, 11);
        
        const lFreq = result.frequencyOrder.find(f => f.char === 'L');
        assert.strictEqual(lFreq.count, 3);
        assert.strictEqual(lFreq.percent, 30);
    });

    await t.test('Türkçe harf adetleri ve I/İ ayrımı', () => {
        const result = analyzeFrequency('ışık İLİŞKİ', 'TR');
        const i_dotless = result.frequencyOrder.find(f => f.char === 'I');
        const i_dotted = result.frequencyOrder.find(f => f.char === 'İ');
        const s_cedilla = result.frequencyOrder.find(f => f.char === 'Ş');
        
        assert.strictEqual(i_dotless.count, 2);
        assert.strictEqual(i_dotted.count, 3);
        assert.strictEqual(s_cedilla.count, 2);
        assert.strictEqual(result.totalLetters, 10);
    });

    await t.test('Noktalama ve rakamların yok sayılması', () => {
        const result = analyzeFrequency('A1! B2@ C3#', 'EN');
        assert.strictEqual(result.totalLetters, 3);
        assert.strictEqual(result.distinctLetters, 3);
    });

    await t.test('Yüzdelerin toplamının yaklaşık yüzde 100 olması', () => {
        const result = analyzeFrequency('TESTING PERCENTAGES IN THIS STRING', 'EN');
        const sum = result.frequencyOrder.reduce((acc, curr) => acc + curr.percent, 0);
        assert.ok(Math.abs(sum - 100) < 0.001);
    });

    await t.test('Kullanılmayan harflerin sıfır olması', () => {
        const result = analyzeFrequency('ABC', 'EN');
        const zFreq = result.frequencyOrder.find(f => f.char === 'Z');
        assert.strictEqual(zFreq.count, 0);
        assert.strictEqual(zFreq.percent, 0);
    });

    await t.test('Frekans sıralaması doğruluğu', () => {
        const result = analyzeFrequency('AAABBC', 'EN');
        assert.strictEqual(result.frequencyOrder[0].char, 'A');
        assert.strictEqual(result.frequencyOrder[1].char, 'B');
        assert.strictEqual(result.frequencyOrder[2].char, 'C');
    });

    await t.test('Boş metin reddi', () => {
        assert.throws(() => analyzeFrequency('', 'EN'), /boş olamaz/i);
        assert.throws(() => analyzeFrequency('   ', 'EN'), /boş olamaz/i);
    });

    await t.test('Yalnızca özel karakter içeren metin', () => {
        assert.throws(() => analyzeFrequency('123 !@#', 'EN'), /bulunamadı/i);
    });

    await t.test('10.000 karakter sınırı', () => {
        const longText = 'A'.repeat(MAX_ANALYSIS_LENGTH);
        const result = analyzeFrequency(longText, 'EN');
        assert.strictEqual(result.totalLetters, MAX_ANALYSIS_LENGTH);
    });

    await t.test('Sınır aşımı', () => {
        const tooLong = 'A'.repeat(MAX_ANALYSIS_LENGTH + 1);
        assert.throws(() => analyzeFrequency(tooLong, 'EN'), /aşamaz/i);
    });
});
