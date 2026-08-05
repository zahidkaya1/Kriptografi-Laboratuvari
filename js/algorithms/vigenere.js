import { normalizeModulo } from '../utils/math.js';
import { ALPHABETS } from '../utils/alphabets.js';
import { isLowerCase, toLowerCase, toUpperCase } from '../utils/text.js';

/**
 * Vigenère şifreleme/çözme algoritması
 * @param {string} text Şifrelenecek veya çözülecek metin
 * @param {string} key Anahtar
 * @param {string} alphabet Seçilen alfabe ("TR" veya "EN")
 * @param {string} mode "encrypt" veya "decrypt"
 * @returns {Object} Sonuç metni ve işlem tablosu (adımlar)
 */
export function runVigenere(text, key, alphabet = "TR", mode = "encrypt") {
    if (!text) throw new Error("Metin boş olamaz.");
    if (!key || key.trim() === "") throw new Error("Anahtar boş olamaz.");

    const selectedAlphabet = ALPHABETS[alphabet];
    if (!selectedAlphabet) throw new Error("Geçersiz alfabe seçimi.");

    const alphaLen = selectedAlphabet.length;

    // Anahtarı seçili alfabeye uygun büyük harfe çevirelim
    const upperKey = toUpperCase(key, alphabet);
    
    // Anahtarın içindeki karakterlerin alfabede olup olmadığını kontrol et
    for (let i = 0; i < upperKey.length; i++) {
        if (selectedAlphabet.indexOf(upperKey[i]) === -1) {
            throw new Error(`Anahtar, seçili alfabede olmayan geçersiz bir karakter içeriyor: '${upperKey[i]}'`);
        }
    }

    let resultText = "";
    const stepTable = [];
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        const isLower = isLowerCase(char, alphabet);
        const upperChar = toUpperCase(char, alphabet);
        
        const textCharIndex = selectedAlphabet.indexOf(upperChar);

        // Karakter alfabede yoksa (boşluk, rakam, noktalama), olduğu gibi bırak ve anahtarı ilerletme
        if (textCharIndex === -1) {
            resultText += char;
            continue;
        }

        const currentKeyChar = upperKey[keyIndex % upperKey.length];
        const keyCharIndex = selectedAlphabet.indexOf(currentKeyChar);

        let newCharIndex;
        let operationStr = "";

        if (mode === "encrypt") {
            newCharIndex = normalizeModulo(textCharIndex + keyCharIndex, alphaLen);
            operationStr = `(${textCharIndex} + ${keyCharIndex}) mod ${alphaLen}`;
        } else {
            newCharIndex = normalizeModulo(textCharIndex - keyCharIndex, alphaLen);
            operationStr = `(${textCharIndex} - ${keyCharIndex}) mod ${alphaLen}`;
        }

        let newChar = selectedAlphabet[newCharIndex];
        
        if (isLower) {
            newChar = toLowerCase(newChar, alphabet);
        }

        resultText += newChar;

        stepTable.push({
            textChar: char,
            keyChar: currentKeyChar,
            textIdx: textCharIndex,
            keyIdx: keyCharIndex,
            operation: operationStr,
            resultChar: newChar
        });

        keyIndex++;
    }

    return {
        result: resultText,
        steps: stepTable,
        alphabetLength: alphaLen
    };
}
