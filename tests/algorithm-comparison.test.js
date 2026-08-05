import test from 'node:test';
import assert from 'node:assert/strict';
import { 
    sanitizeSelection, 
    validateSelection, 
    generateComparisonRows, 
    generateMarkdownOutput,
    filterByCategory,
    getComparableAlgorithms
} from '../js/education/algorithm-comparison.js';

test('Algoritma Karşılaştırma Testleri', async (t) => {
    
    await t.test('Geçerli iki algoritma seçimi', () => {
        const selection = ['rsa', 'vigenere'];
        const validated = validateSelection(selection);
        assert.deepEqual(validated, ['rsa', 'vigenere']);
    });

    await t.test('Geçerli dört algoritma seçimi', () => {
        const selection = ['rsa', 'dh', 'vigenere', 'caesar'];
        const validated = validateSelection(selection);
        assert.deepEqual(validated, ['rsa', 'dh', 'vigenere', 'caesar']);
    });

    await t.test('İkiden az seçimin reddedilmesi', () => {
        assert.throws(() => validateSelection(['rsa']), /en az 2/i);
        assert.throws(() => validateSelection([]), /en az 2/i);
    });

    await t.test('Dörtten fazla seçimin reddedilmesi', () => {
        assert.throws(() => validateSelection(['rsa', 'dh', 'vigenere', 'caesar', 'rot13']), /en fazla 4/i);
    });

    await t.test('Tekrarlı kimliklerin temizlenmesi', () => {
        const selection = sanitizeSelection(['rsa', 'rsa', 'vigenere']);
        assert.deepEqual(selection, ['rsa', 'vigenere']);
    });

    await t.test('Geçersiz algoritma kimliklerinin temizlenmesi', () => {
        const selection = sanitizeSelection(['rsa', 'invalid_id', 'vigenere']);
        assert.deepEqual(selection, ['rsa', 'vigenere']);
    });

    await t.test('Karşılaştırma satırlarının doğru oluşturulması', () => {
        const { headers, rows } = generateComparisonRows(['rsa', 'vigenere']);
        assert.deepEqual(headers, ['RSA', 'Vigenère']);
        assert.ok(rows.length > 5);
        assert.strictEqual(rows[0].key, 'baseType');
    });

    await t.test('Yalnızca farklılıkların filtrelenmesi', () => {
        // RSA ve Diffie-Hellman "Güvenlik Durumu" vs aynı olabilir
        const normalRows = generateComparisonRows(['rsa', 'dh'], false).rows;
        const diffRows = generateComparisonRows(['rsa', 'dh'], true).rows;
        assert.ok(diffRows.length < normalRows.length, "Farklı olmayan satırlar gizlenmeli");
    });

    await t.test('Kategori filtresi', () => {
        const modern = filterByCategory('modern');
        assert.ok(modern.some(a => a.id === 'rsa'));
        assert.ok(!modern.some(a => a.id === 'caesar'));

        const classic = filterByCategory('classic');
        assert.ok(classic.some(a => a.id === 'caesar'));
        assert.ok(!classic.some(a => a.id === 'rsa'));
    });

    await t.test('Kopyalanabilir Markdown çıktısı', () => {
        const md = generateMarkdownOutput(['rsa', 'vigenere']);
        assert.ok(md.includes('| Ölçüt | RSA | Vigenère |'));
        assert.ok(md.includes('|---|---|---|'));
        assert.ok(md.includes('Temel Tür'));
    });

    await t.test('Seçim sırasının deterministik korunması', () => {
        const { headers } = generateComparisonRows(['vigenere', 'rsa']);
        assert.deepEqual(headers, ['Vigenère', 'RSA']);
    });
});
