import { runCaesar } from '../algorithms/caesar.js';
import { TR_FREQUENCIES, EN_FREQUENCIES } from './language-frequencies.js';

export const MAX_BREAKER_LENGTH = 10000;

export function breakCaesar(text, alphabetType = 'TR') {
    if (!text || text.trim() === '') {
        throw new Error("Kırılacak şifreli metin boş olamaz.");
    }
    if (text.length > MAX_BREAKER_LENGTH) {
        throw new Error(`Metin uzunluğu ${MAX_BREAKER_LENGTH} karakteri aşamaz.`);
    }

    const alphabetSize = alphabetType === 'TR' ? 29 : 26;
    const refFreq = alphabetType === 'TR' ? TR_FREQUENCIES : EN_FREQUENCIES;
    
    // Check if there are any letters in the text for the chosen alphabet
    // We can do a quick check
    let letterCount = 0;
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let upperChar;
        if (char === 'i') upperChar = 'İ';
        else if (char === 'ı') upperChar = 'I';
        else upperChar = char.toLocaleUpperCase('tr-TR');
        if (refFreq[upperChar] !== undefined) letterCount++;
    }

    const candidates = [];

    // Her kaydırma için (1'den n'e kadar veya 0'dan n-1'e kadar. 0 orijinal metindir, genelde dahil edilir veya 1'den başlanır. 
    // Şifre kırmada 1..N-1 yeterli ama tamlık için 0..N-1 yapalım.)
    for (let shift = 0; shift < alphabetSize; shift++) {
        // runCaesar şifre çözme modunda ('decrypt') çalıştırılacak
        const { result } = runCaesar(text, shift, alphabetType, 'decrypt');
        
        let score = NaN;
        
        // Puan hesaplama (Ki-kare benzeri)
        // Eğer metinde harf varsa hesapla
        if (letterCount > 0) {
            // Çözülmüş metin (result) içindeki harflerin frekansını say
            const counts = {};
            Object.keys(refFreq).forEach(c => counts[c] = 0);
            
            for (let char of result) {
                let upperChar;
                if (char === 'i') upperChar = 'İ';
                else if (char === 'ı') upperChar = 'I';
                else upperChar = char.toLocaleUpperCase('tr-TR');
                
                if (counts[upperChar] !== undefined) counts[upperChar]++;
            }
            
            let chiSquare = 0;
            for (const [char, expectedPercent] of Object.entries(refFreq)) {
                const expectedCount = (expectedPercent / 100) * letterCount;
                const observedCount = counts[char];
                
                if (expectedCount > 0) {
                    chiSquare += Math.pow(observedCount - expectedCount, 2) / expectedCount;
                }
            }
            score = chiSquare;
        }

        candidates.push({
            shift,
            text: result,
            score
        });
    }

    // Puan eşitliğinde küçük kaydırma önce gelsin diye shift'i de kriter alıyoruz
    // Ancak dışarıda sıralama seçeneği sunacağız, o yüzden veriyi ham liste (kaydırma sırası)
    // ve puana göre sıralı (en olası) olmak üzere verebiliriz.
    const sortedCandidates = [...candidates].sort((a, b) => {
        if (isNaN(a.score) && isNaN(b.score)) return a.shift - b.shift;
        if (isNaN(a.score)) return 1;
        if (isNaN(b.score)) return -1;
        
        if (a.score === b.score) {
            return a.shift - b.shift;
        }
        return a.score - b.score;
    });

    return {
        letterCount,
        candidates,
        bestCandidate: sortedCandidates[0]
    };
}
