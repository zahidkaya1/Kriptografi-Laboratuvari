import test from 'node:test';
import assert from 'node:assert/strict';
import { runPlayfair, generatePlayfairMatrix, preprocessPlayfairText } from '../js/algorithms/playfair.js';

test('Playfair Algoritması Testleri', async (t) => {
    await t.test('Anahtar matrisi J->I ve unique harfler (25)', () => {
        const grid = generatePlayfairMatrix('JUPITER');
        const flat = grid.flat().join('');
        assert.strictEqual(flat.length, 25);
        assert.ok(!flat.includes('J'));
        assert.ok(flat.startsWith('IUPTER'));
    });

    await t.test('Tekrar eden anahtar harflerinin kaldırılması', () => {
        const grid = generatePlayfairMatrix('HELLO WORLD');
        const flat = grid.flat().join('');
        assert.ok(flat.startsWith('HELOWRD'));
    });

    await t.test('Aynı çiftte tekrar eden harfe X eklenmesi', () => {
        const digraphs = preprocessPlayfairText('BALLOON');
        // BA, LX, LO, ON
        assert.deepEqual(digraphs, ['BA', 'LX', 'LO', 'ON']);
    });

    await t.test('Tek uzunlukta plaintext padding', () => {
        const digraphs = preprocessPlayfairText('ABC');
        assert.deepEqual(digraphs, ['AB', 'CX']);
    });

    await t.test('Bilinen PLAYFAIR EXAMPLE vektörü (Şifreleme)', () => {
        const { result } = runPlayfair('HIDE THE GOLD IN THE TREE STUMP', 'PLAYFAIR EXAMPLE', 'encrypt');
        assert.strictEqual(result, 'BMODZBXDNABEKUDMUIXMMOUVIF');
    });

    await t.test('Bilinen PLAYFAIR EXAMPLE vektörü (Çözme)', () => {
        const { result } = runPlayfair('BMODZBXDNABEKUDMUIXMMOUVIF', 'PLAYFAIR EXAMPLE', 'decrypt');
        // HIDE THE GOLD IN THE TREX E STUMP -> HIDETHEGOLDINTHETREXESTUMP
        assert.strictEqual(result, 'HIDETHEGOLDINTHETREXESTUMP');
    });

    await t.test('Şifreleme/çözme temel round-trip', () => {
        const key = 'SECRET';
        const plain = 'KRYPTOS'; // -> KR YP TO SX
        const enc = runPlayfair(plain, key, 'encrypt');
        const dec = runPlayfair(enc.result, key, 'decrypt');
        assert.strictEqual(dec.result, 'KRYPTOSX');
    });

    await t.test('Tek uzunlukta ciphertext reddi', () => {
        assert.throws(() => runPlayfair('ABC', 'KEY', 'decrypt'));
    });

    await t.test('Boş metin hatası', () => {
        assert.throws(() => runPlayfair('', 'KEY', 'encrypt'));
    });

    await t.test('Deterministik sonuç', () => {
        const r1 = runPlayfair('A', 'B', 'encrypt');
        const r2 = runPlayfair('A', 'B', 'encrypt');
        assert.strictEqual(r1.result, r2.result);
    });
});
