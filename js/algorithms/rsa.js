import { gcd, extendedGcd, modularInverse, modularExponentiation, isPrime } from '../utils/math.js';

/**
 * Metni sayısal dizilere dönüştürür.
 * @param {string} text 
 * @returns {bigint[]}
 */
function textToBlocks(text) {
    const blocks = [];
    for (let i = 0; i < text.length; i++) {
        blocks.push(BigInt(text.charCodeAt(i)));
    }
    return blocks;
}

/**
 * Sayısal dizileri metne dönüştürür.
 * @param {bigint[]} blocks 
 * @returns {string}
 */
function blocksToText(blocks) {
    let text = "";
    for (let i = 0; i < blocks.length; i++) {
        text += String.fromCharCode(Number(blocks[i]));
    }
    return text;
}

/**
 * RSA algoritmasını çalıştırır.
 * @param {number} p Asal sayı 1
 * @param {number} q Asal sayı 2
 * @param {number} e Açık üs
 * @param {string|number} message Şifrelenecek metin veya sayı
 * @param {string} mode "encrypt" veya "decrypt"
 * @returns {Object} Sonuçlar ve adımlar
 */
export function runRSA(p, q, e, message, mode = "encrypt") {
    const steps = [];

    // 1. Doğrulamalar
    if (!isPrime(p)) throw new Error("p değeri asal bir sayı olmalıdır.");
    if (!isPrime(q)) throw new Error("q değeri asal bir sayı olmalıdır.");
    if (p === q) throw new Error("p ve q aynı olamaz, farklı asal sayılar seçiniz.");
    
    steps.push(`p = ${p} ve q = ${q} değerleri asal olarak kabul edildi.`);

    const pBig = BigInt(p);
    const qBig = BigInt(q);
    const eBig = BigInt(e);

    // 2. n hesabı
    const n = pBig * qBig;
    steps.push(`n = p × q = ${p} × ${q} = ${n}`);

    // 3. φ(n) hesabı (Euler Totient)
    const phi = (pBig - 1n) * (qBig - 1n);
    steps.push(`φ(n) = (p - 1) × (q - 1) = ${p - 1} × ${q - 1} = ${phi}`);

    // 4. e doğrulaması
    if (eBig <= 1n || eBig >= phi) {
        throw new Error(`e değeri 1 ile ${phi} (φ(n)) arasında olmalıdır.`);
    }

    const gcdVal = gcd(eBig, phi);
    steps.push(`gcd(e, φ(n)) = gcd(${e}, ${phi}) = ${gcdVal}`);
    
    if (gcdVal !== 1n) {
        throw new Error(`e değeri geçerli değil. gcd(e, φ(n)) = 1 olmalıdır, ancak ${gcdVal} bulundu.`);
    }

    // 5. d hesabı (Özel Üs)
    const d = modularInverse(eBig, phi);
    if (d === null) {
        throw new Error("Geçerli bir d (özel üs) değeri bulunamadı.");
    }
    steps.push(`Genişletilmiş Öklid Algoritması ile özel üs d hesaplandı. d = ${d}`);
    steps.push(`Açık Anahtar (Public Key): (e: ${e}, n: ${n})`);
    steps.push(`Özel Anahtar (Private Key): (d: ${d}, n: ${n})`);

    // 6. Şifreleme / Çözme
    let result = "";
    
    if (mode === "encrypt") {
        steps.push(`İşlem: Şifreleme (M^e mod n)`);
        
        let blocks = [];
        let isNumberInput = false;

        if (!isNaN(message) && message.toString().trim() !== "") {
            // Sadece sayı girilmişse
            blocks = [BigInt(message)];
            isNumberInput = true;
            steps.push(`Girdi sayısal olarak algılandı: ${message}`);
        } else {
            // Metin girilmişse
            blocks = textToBlocks(message.toString());
            steps.push(`Girdi metin olarak algılandı. Karakter kodlarına dönüştürüldü: [${blocks.join(", ")}]`);
        }

        const encryptedBlocks = [];
        for (let i = 0; i < blocks.length; i++) {
            const m = blocks[i];
            if (m >= n) {
                throw new Error(`Şifrelenecek değer (${m}), n (${n}) değerinden küçük olmalıdır. Lütfen daha büyük asallar (p, q) seçin.`);
            }
            const c = modularExponentiation(m, eBig, n);
            encryptedBlocks.push(c);
            steps.push(`Blok ${i + 1}: ${m}^${e} mod ${n} = ${c}`);
        }

        result = encryptedBlocks.join(" ");
        steps.push(`Şifreli Veri: ${result}`);

    } else if (mode === "decrypt") {
        steps.push(`İşlem: Şifre Çözme (C^d mod n)`);
        
        // Şifreli veri boşluklarla ayrılmış sayılar olmalı
        const parts = message.toString().trim().split(/\s+/);
        const encryptedBlocks = parts.map(p => BigInt(p));
        steps.push(`Şifreli bloklar ayrıştırıldı: [${encryptedBlocks.join(", ")}]`);

        const decryptedBlocks = [];
        for (let i = 0; i < encryptedBlocks.length; i++) {
            const c = encryptedBlocks[i];
            const m = modularExponentiation(c, d, n);
            decryptedBlocks.push(m);
            steps.push(`Blok ${i + 1}: ${c}^${d} mod ${n} = ${m}`);
        }

        // Metin veya sayı çözümü
        // Kullanıcı şifrelerken sayı girdiyse, çözüm de sayıdır. Ama ayrım için genelde ikisini de gösteririz.
        const textResult = blocksToText(decryptedBlocks);
        const numResult = decryptedBlocks.join(" ");
        
        result = `Sayısal Çözüm: ${numResult}\nMetin Çözümü: ${textResult}`;
        steps.push(`Çözülmüş Veri: ${numResult}`);
        steps.push(`Metin Karşılığı: ${textResult}`);
    }

    return {
        n: n.toString(),
        phi: phi.toString(),
        d: d.toString(),
        publicKey: { e: e.toString(), n: n.toString() },
        privateKey: { d: d.toString(), n: n.toString() },
        result: result,
        steps: steps
    };
}
