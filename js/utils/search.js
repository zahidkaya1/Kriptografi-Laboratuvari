import { ALGORITHM_CATALOG } from './algorithm-catalog.js';

/**
 * Metni normalize eder (küçük harfe çevirir, Türkçe karakterleri İngilizce eşdeğerlerine yaklaştırır veya
 * Locale tabanlı lowercasing yapar).
 */
export function normalizeText(text) {
    if (!text) return '';
    return text.toLocaleLowerCase('tr-TR');
}

/**
 * Arama sorgusuna göre algoritmaları filtreler.
 * @param {string} query Aranacak metin
 * @returns {Array} Eşleşen algoritmaların id listesi
 */
export function searchAlgorithms(query) {
    if (!query || query.trim() === '') {
        return ALGORITHM_CATALOG.map(a => a.id);
    }

    const normalizedQuery = normalizeText(query.trim());

    return ALGORITHM_CATALOG.filter(algo => {
        const nameMatch = normalizeText(algo.name).includes(normalizedQuery);
        const categoryMatch = normalizeText(algo.category).includes(normalizedQuery);
        const keywordMatch = algo.keywords.some(kw => normalizeText(kw).includes(normalizedQuery));
        
        return nameMatch || categoryMatch || keywordMatch;
    }).map(a => a.id);
}
