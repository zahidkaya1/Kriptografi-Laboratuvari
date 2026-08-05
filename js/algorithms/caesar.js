import { normalizeModulo } from '../utils/math.js';
import { ALPHABETS } from '../utils/alphabets.js';
import { isLowerCase, toLowerCase, toUpperCase } from '../utils/text.js';

export function runCaesar(text, shift, alphabet = "TR", mode = "encrypt") {
    if (!text) throw new Error("Metin boş olamaz.");
    shift = parseInt(shift, 10);
    if (isNaN(shift)) throw new Error("Geçersiz kaydırma miktarı.");

    const selectedAlphabet = ALPHABETS[alphabet];
    if (!selectedAlphabet) throw new Error("Geçersiz alfabe seçimi.");

    const alphaLen = selectedAlphabet.length;
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
            newCharIndex = normalizeModulo(textCharIndex + shift, alphaLen);
            operationStr = `(${textCharIndex} + ${shift}) mod ${alphaLen}`;
        } else {
            newCharIndex = normalizeModulo(textCharIndex - shift, alphaLen);
            operationStr = `(${textCharIndex} - ${shift}) mod ${alphaLen}`;
        }

        let newChar = selectedAlphabet[newCharIndex];
        
        if (isLower) {
            newChar = toLowerCase(newChar, alphabet);
        }

        resultText += newChar;

        stepTable.push({
            textChar: char,
            textIdx: textCharIndex,
            shift: shift,
            resultIdx: newCharIndex,
            resultChar: newChar,
            operation: operationStr
        });
    }

    return {
        result: resultText,
        steps: stepTable
    };
}
