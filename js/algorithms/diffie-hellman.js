import { isPrime, modularExponentiation } from '../utils/math.js';

/**
 * Diffie-Hellman Anahtar Değişimi algoritmasını çalıştırır.
 * @param {number} p Asal modül
 * @param {number} g Üreteç
 * @param {number} a Alice'in gizli anahtarı
 * @param {number} b Bob'un gizli anahtarı
 * @returns {Object} Sonuçlar ve adımlar
 */
export function runDiffieHellman(p, g, a, b) {
    const steps = [];

    // 1. Doğrulamalar
    if (p > 10000) {
        throw new Error("Eğitim amaçlı simülasyon sınırları gereği asal modül (p) 10.000'den küçük olmalıdır.");
    }
    if (!isPrime(p)) throw new Error("p değeri asal bir sayı olmalıdır.");
    if (g <= 1 || g >= p) throw new Error(`g (üreteç) değeri 1 ile ${p - 1} arasında olmalıdır.`);
    if (a <= 0 || a >= p) throw new Error(`a (Alice'in gizli anahtarı) 0 ile ${p - 1} arasında olmalıdır.`);
    if (b <= 0 || b >= p) throw new Error(`b (Bob'un gizli anahtarı) 0 ile ${p - 1} arasında olmalıdır.`);

    const pBig = BigInt(p);
    const gBig = BigInt(g);
    const aBig = BigInt(a);
    const bBig = BigInt(b);

    steps.push(`Ortak parametreler: p = ${p} (Asal), g = ${g} (Üreteç)`);
    steps.push(`Alice'in gizli anahtarı: a = ${a}`);
    steps.push(`Bob'un gizli anahtarı: b = ${b}`);
    steps.push(`(Not: Gizli anahtarlar asla taraflar arasında paylaşılmaz.)`);

    // 2. Alice'in açık değeri A'yı hesaplaması
    const A = modularExponentiation(gBig, aBig, pBig);
    steps.push(`Alice'in hesapladığı açık değer (A) = g^a mod p = ${g}^${a} mod ${p} = ${A}`);

    // 3. Bob'un açık değeri B'yi hesaplaması
    const B = modularExponentiation(gBig, bBig, pBig);
    steps.push(`Bob'un hesapladığı açık değer (B) = g^b mod p = ${g}^${b} mod ${p} = ${B}`);

    steps.push(`Alice, A değerini (${A}) Bob'a gönderir.`);
    steps.push(`Bob, B değerini (${B}) Alice'e gönderir.`);

    // 4. Ortak anahtar hesaplamaları
    const K1 = modularExponentiation(B, aBig, pBig);
    steps.push(`Alice ortak anahtarı hesaplar (K1) = B^a mod p = ${B}^${a} mod ${p} = ${K1}`);

    const K2 = modularExponentiation(A, bBig, pBig);
    steps.push(`Bob ortak anahtarı hesaplar (K2) = A^b mod p = ${A}^${b} mod ${p} = ${K2}`);

    // Eşitlik kontrolü
    if (K1 === K2) {
        steps.push(`Başarılı! Her iki taraf da aynı ortak anahtara ulaştı: ${K1}`);
    } else {
        steps.push(`Hata! Ortak anahtarlar eşleşmedi. K1: ${K1}, K2: ${K2}`);
    }

    const info = "Diffie–Hellman doğrudan bir şifreleme algoritması değil, iki tarafın güvensiz bir kanalda güvenli bir şekilde ortak anahtar (K) oluşturmasını sağlayan bir yöntemdir.";

    return {
        A: A.toString(),
        B: B.toString(),
        K1: K1.toString(),
        K2: K2.toString(),
        isMatch: K1 === K2,
        steps: steps,
        info: info
    };
}
