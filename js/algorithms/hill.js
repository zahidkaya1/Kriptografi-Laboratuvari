import { ALPHABETS } from '../utils/alphabets.js';
import { gcd, modularInverse, normalizeModulo } from '../utils/math.js';

export function runHill(text, a, b, c, d, alphabetCode, mode) {
    if (!text) {
        throw new Error("Lütfen işlenecek metni girin.");
    }
    
    // Parse keys and normalize
    const m = ALPHABETS[alphabetCode].length;
    let kA = normalizeModulo(parseInt(a, 10), m);
    let kB = normalizeModulo(parseInt(b, 10), m);
    let kC = normalizeModulo(parseInt(c, 10), m);
    let kD = normalizeModulo(parseInt(d, 10), m);
    
    if (isNaN(kA) || isNaN(kB) || isNaN(kC) || isNaN(kD)) {
        throw new Error("Lütfen anahtar matrisi için geçerli tam sayılar girin.");
    }

    let det = (kA * kD) - (kB * kC);
    det = normalizeModulo(det, m);
    
    // Test invertibility
    if (gcd(det, m) !== 1) {
        throw new Error("Bu anahtar matrisi seçilen alfabede terslenebilir değildir. gcd(det, m) = 1 olmalıdır.");
    }

    const alphabetStr = ALPHABETS[alphabetCode];
    let steps = [];
    
    steps.push(`Seçilen Alfabe Modülü: m = ${m}`);
    steps.push(`Anahtar Matrisi K (mod ${m}):\n[${kA} ${kB}]\n[${kC} ${kD}]`);
    steps.push(`Determinant = (${kA} * ${kD}) - (${kB} * ${kC}) ≡ ${det} (mod ${m})`);

    let workingMatrix = { a: kA, b: kB, c: kC, d: kD };

    if (mode === 'decrypt') {
        const detInvBig = modularInverse(BigInt(det), BigInt(m));
        if (detInvBig === null) {
            throw new Error("Anahtar matrisi terslenemedi.");
        }
        const detInv = Number(detInvBig);
        // Inverse matrix
        const iA = normalizeModulo(workingMatrix.d * detInv, m);
        const iB = normalizeModulo(-workingMatrix.b * detInv, m);
        const iC = normalizeModulo(-workingMatrix.c * detInv, m);
        const iD = normalizeModulo(workingMatrix.a * detInv, m);
        
        steps.push(`Determinantın Tersi (det^-1) = ${detInv} (mod ${m})`);
        steps.push(`Ters Matris K^-1:\n[${iA} ${iB}]\n[${iC} ${iD}]`);
        
        workingMatrix = { a: iA, b: iB, c: iC, d: iD };
    }

    // Preprocess text: upper case, keep only alphabet chars
    let normalizedText = '';
    const upperText = text.toLocaleUpperCase(alphabetCode === 'TR' ? 'tr-TR' : 'en-US');
    for (let char of upperText) {
        if (alphabetStr.includes(char)) {
            normalizedText += char;
        }
    }
    
    if (normalizedText.length === 0) {
        throw new Error("Metin geçerli bir harf içermiyor.");
    }

    if (mode === 'decrypt' && normalizedText.length % 2 !== 0) {
        throw new Error("Çözülecek şifreli metnin harf sayısı çift olmalıdır.");
    }

    // Pad if odd (encrypt only)
    let paddedText = normalizedText;
    let didPad = false;
    if (mode === 'encrypt' && paddedText.length % 2 !== 0) {
        paddedText += alphabetCode === 'TR' ? 'Z' : 'X';
        didPad = true;
    }

    steps.push(`İşlenen Normalize Metin: ${paddedText}`);
    if (didPad) {
        steps.push(`Metin uzunluğu tek sayı olduğu için sonuna dolgu eklendi.`);
    }

    let result = '';
    
    for (let i = 0; i < paddedText.length; i += 2) {
        let p1 = alphabetStr.indexOf(paddedText[i]);
        let p2 = alphabetStr.indexOf(paddedText[i+1]);
        
        // C = K * P mod m
        let c1 = (workingMatrix.a * p1 + workingMatrix.b * p2);
        let c2 = (workingMatrix.c * p1 + workingMatrix.d * p2);
        
        let c1Mod = normalizeModulo(c1, m);
        let c2Mod = normalizeModulo(c2, m);
        
        result += alphabetStr[c1Mod] + alphabetStr[c2Mod];
        
        if (i < 10) { // Sadece ilk birkaç işlemi göster
            steps.push(`\nVektör [${paddedText[i]}, ${paddedText[i+1]}] -> [${p1}, ${p2}]^T`);
            steps.push(`  ${workingMatrix.a}*${p1} + ${workingMatrix.b}*${p2} = ${c1} ≡ ${c1Mod} (${alphabetStr[c1Mod]})`);
            steps.push(`  ${workingMatrix.c}*${p1} + ${workingMatrix.d}*${p2} = ${c2} ≡ ${c2Mod} (${alphabetStr[c2Mod]})`);
        } else if (i === 10) {
            steps.push(`... ve diğer vektörler hesaplandı (Adımlar kısaltıldı)`);
        }
    }
    
    return {
        result: result,
        steps: steps,
        normalizedText: paddedText
    };
}
