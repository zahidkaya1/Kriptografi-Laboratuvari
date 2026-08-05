import { gcd, modularInverse, normalizeModulo } from '../utils/math.js';
import { ALPHABETS } from '../utils/alphabets.js';
import { isLowerCase, toLowerCase, toUpperCase } from '../utils/text.js';

export function runAffine(text, a, b, alphabet = "TR", mode = "encrypt") {
    if (!text) throw new Error("Metin boş olamaz.");
    a = parseInt(a, 10);
    b = parseInt(b, 10);
    if (isNaN(a) || isNaN(b)) throw new Error("Geçersiz 'a' veya 'b' anahtar değeri.");

    const selectedAlphabet = ALPHABETS[alphabet];
    if (!selectedAlphabet) throw new Error("Geçersiz alfabe seçimi.");

    const alphaLen = selectedAlphabet.length;
    
    // Normalize a and b just in case they are negative or very large
    a = normalizeModulo(a, alphaLen);
    b = normalizeModulo(b, alphaLen);

    // Check gcd
    const g = gcd(a, alphaLen);
    if (g !== 1n && g !== 1) {
        throw new Error(`Geçersiz 'a' değeri. 'a' (${a}) ile alfabe uzunluğu (${alphaLen}) aralarında asal olmalıdır (EBOB = ${g}). Lütfen başka bir 'a' değeri seçiniz.`);
    }

    const inv = modularInverse(BigInt(a), BigInt(alphaLen));
    if (inv === null) {
         throw new Error(`Geçersiz 'a' değeri. Modüler tersi bulunamadı.`);
    }
    const a_inv = Number(inv);

    let resultText = "";
    const stepTable = [];

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        const isLower = isLowerCase(char, alphabet);
        const upperChar = toUpperCase(char, alphabet);
        
        const textCharIndex = selectedAlphabet.indexOf(upperChar);

        if (textCharIndex === -1) {
            resultText += char;
            continue;
        }

        let newCharIndex;
        let operationStr = "";

        if (mode === "encrypt") {
            newCharIndex = normalizeModulo((a * textCharIndex) + b, alphaLen);
            operationStr = `(${a} × ${textCharIndex} + ${b}) mod ${alphaLen}`;
        } else {
            // Decrypt: a_inv * (y - b) mod m
            newCharIndex = normalizeModulo(a_inv * (textCharIndex - b), alphaLen);
            operationStr = `${a_inv} × (${textCharIndex} - ${b}) mod ${alphaLen}`;
        }

        let newChar = selectedAlphabet[newCharIndex];
        
        if (isLower) {
            newChar = toLowerCase(newChar, alphabet);
        }

        resultText += newChar;

        stepTable.push({
            textChar: char,
            textIdx: textCharIndex,
            operation: operationStr,
            resultIdx: newCharIndex,
            resultChar: newChar
        });
    }

    return {
        result: resultText,
        steps: stepTable,
        m: alphaLen,
        gcdVal: Number(g),
        aInv: a_inv
    };
}
