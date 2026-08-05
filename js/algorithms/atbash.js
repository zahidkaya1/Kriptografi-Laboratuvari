import { ALPHABETS } from '../utils/alphabets.js';
import { isLowerCase, toLowerCase, toUpperCase } from '../utils/text.js';

export function runAtbash(text, alphabet = "TR") {
    if (!text) throw new Error("Metin boş olamaz.");

    const selectedAlphabet = ALPHABETS[alphabet];
    if (!selectedAlphabet) throw new Error("Geçersiz alfabe seçimi.");

    const alphaLen = selectedAlphabet.length;
    const reversedAlphabet = selectedAlphabet.split('').reverse().join('');
    
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

        const newCharIndex = (alphaLen - 1) - textCharIndex;
        let newChar = selectedAlphabet[newCharIndex];
        
        if (isLower) {
            newChar = toLowerCase(newChar, alphabet);
        }

        resultText += newChar;

        stepTable.push({
            textChar: char,
            resultChar: newChar
        });
    }

    return {
        result: resultText,
        steps: stepTable,
        normalAlphabet: selectedAlphabet,
        reversedAlphabet: reversedAlphabet
    };
}
