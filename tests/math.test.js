import test from 'node:test';
import assert from 'node:assert';
import { gcd, extendedGcd, modularInverse, modularExponentiation, isPrime, normalizeModulo } from '../js/utils/math.js';

test('Matematik Yardımcıları Testleri', async (t) => {
    
    await t.test('gcd - En Büyük Ortak Bölen', () => {
        assert.strictEqual(gcd(54, 24), 6);
        assert.strictEqual(gcd(17n, 53n), 1n);
    });

    await t.test('extendedGcd - Genişletilmiş Öklid', () => {
        const result = extendedGcd(17n, 3120n);
        assert.strictEqual(result.g, 1n);
        // 17 * (-550) + 3120 * 3 = 1 => mod 3120'de tersi -550 -> 2570
        // Sadece gcd=1 kısmı test ediliyor
    });

    await t.test('modularInverse - Modüler Ters', () => {
        assert.strictEqual(modularInverse(17n, 3120n), 2753n); 
        // Düzeltme: 17 * 2753 = 46801. 46801 % 3120 = 1.
        
        assert.strictEqual(modularInverse(3n, 11n), 4n); // 3*4=12 % 11 = 1
        assert.strictEqual(modularInverse(2n, 4n), null); // Aralarında asal değiller
    });

    await t.test('modularExponentiation - Modüler Üs Alma', () => {
        // 65 ^ 17 mod 3233 = 2790
        assert.strictEqual(modularExponentiation(65n, 17n, 3233n), 2790n);
        // 2790 ^ 2753 mod 3233 = 65
        assert.strictEqual(modularExponentiation(2790n, 2753n, 3233n), 65n);
    });

    await t.test('isPrime - Asallık Kontrolü', () => {
        assert.strictEqual(isPrime(61), true);
        assert.strictEqual(isPrime(53), true);
        assert.strictEqual(isPrime(1), false);
        assert.strictEqual(isPrime(4), false);
        assert.strictEqual(isPrime(15), false);
    });

    await t.test('normalizeModulo - Negatif Mod', () => {
        assert.strictEqual(normalizeModulo(-5, 26), 21);
        assert.strictEqual(normalizeModulo(5, 26), 5);
        assert.strictEqual(normalizeModulo(26, 26), 0);
    });
});
