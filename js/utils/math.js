/**
 * Kriptografik işlemler için temel matematiksel fonksiyonlar.
 * Eğitsel amaçlı olduğu için çok büyük sayılar yerine genel performans/anlaşılırlık dengesi gözetilmiştir.
 */

/**
 * En Büyük Ortak Bölen (EBOB) - Euclidean Algorithm
 * @param {number|bigint} a 
 * @param {number|bigint} b 
 * @returns {number|bigint}
 */
export function gcd(a, b) {
    if (typeof a === 'bigint' || typeof b === 'bigint') {
        let x = BigInt(a);
        let y = BigInt(b);
        while (y !== 0n) {
            let temp = y;
            y = x % y;
            x = temp;
        }
        return x < 0n ? -x : x;
    }
    
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

/**
 * Genişletilmiş Öklid Algoritması
 * ax + by = gcd(a, b) denklemini sağlayan gcd, x, y değerlerini döndürür.
 * @param {bigint} a 
 * @param {bigint} b 
 * @returns {Object} { g, x, y }
 */
export function extendedGcd(a, b) {
    if (a === 0n) return { g: b, x: 0n, y: 1n };
    let { g, x: x1, y: y1 } = extendedGcd(b % a, a);
    let x = y1 - (b / a) * x1;
    let y = x1;
    return { g, x, y };
}

/**
 * Modüler ters bulma
 * (a * x) % m == 1 denklemini sağlayan x'i bulur.
 * EBOB 1 değilse tersi yoktur, null döner.
 * @param {bigint} a 
 * @param {bigint} m 
 * @returns {bigint|null}
 */
export function modularInverse(a, m) {
    let { g, x } = extendedGcd(a, m);
    if (g !== 1n) return null; // Ters yok
    return (x % m + m) % m; // Pozitif sonuç garanti etmek için
}

/**
 * Hızlı Modüler Üs Alma (Square and Multiply)
 * (base^exp) % mod
 * @param {bigint} base 
 * @param {bigint} exp 
 * @param {bigint} mod 
 * @returns {bigint}
 */
export function modularExponentiation(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        exp = exp / 2n;
        base = (base * base) % mod;
    }
    return result;
}

/**
 * Basit Asallık Kontrolü (Eğitsel amaçlı makul boyuttaki sayılar için)
 * @param {number} n 
 * @returns {boolean}
 */
export function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

/**
 * Negatif sayıların da modülünü doğru alır. Örn: mod(-5, 26) = 21
 * @param {number} val 
 * @param {number} mod 
 * @returns {number}
 */
export function normalizeModulo(val, mod) {
    return ((val % mod) + mod) % mod;
}
