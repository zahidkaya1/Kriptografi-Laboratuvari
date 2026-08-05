import { ALPHABETS } from '../utils/alphabets.js';

export const MAX_ANALYSIS_LENGTH = 10000;

export function analyzeFrequency(text, alphabetType = 'TR') {
    if (!text || text.trim() === '') {
        throw new Error("Analiz edilecek metin boş olamaz.");
    }
    if (text.length > MAX_ANALYSIS_LENGTH) {
        throw new Error(`Metin uzunluğu ${MAX_ANALYSIS_LENGTH} karakteri aşamaz.`);
    }

    const alphabetStr = ALPHABETS[alphabetType] || ALPHABETS['TR'];
    const alphabet = alphabetStr.split('');

    
    // Yalnızca alfabedeki harfleri filtrele ve say (büyük/küçük harf duyarsız)
    // Türkçe I/i ve İ/i sorunu için locale kullanıyoruz.
    const counts = {};
    alphabet.forEach(char => counts[char] = 0);

    let letterCount = 0;
    
    for (let char of text) {
        let upperChar;
        if (char === 'i') upperChar = 'İ';
        else if (char === 'ı') upperChar = 'I';
        else upperChar = char.toLocaleUpperCase('tr-TR'); // Sadece i/ı hariç kalanı hallet
        
        // Eğer seçili alfabede varsa, say
        if (counts[upperChar] !== undefined) {
            counts[upperChar]++;
            letterCount++;
        }
    }

    if (letterCount === 0) {
        throw new Error("Metinde seçili alfabeye ait harf bulunamadı.");
    }

    // Harfleri dizi formatına dönüştür: { char, count, percent }
    const frequencies = alphabet.map(char => {
        const count = counts[char];
        return {
            char,
            count,
            percent: (count / letterCount) * 100
        };
    });

    let distinctLetterCount = 0;
    let mostFrequent = null;
    let leastFrequent = null;

    frequencies.forEach(f => {
        if (f.count > 0) {
            distinctLetterCount++;
            if (!mostFrequent || f.count > mostFrequent.count) {
                mostFrequent = f;
            }
            if (!leastFrequent || f.count < leastFrequent.count) {
                leastFrequent = f;
            }
        }
    });

    const sortedByFreq = [...frequencies].sort((a, b) => b.count - a.count);
    const topFive = sortedByFreq.slice(0, 5).filter(f => f.count > 0);

    return {
        totalCharacters: text.length,
        totalLetters: letterCount,
        distinctLetters: distinctLetterCount,
        mostFrequent,
        leastFrequent,
        topFive,
        alphabetOrder: frequencies,
        frequencyOrder: sortedByFreq
    };
}
