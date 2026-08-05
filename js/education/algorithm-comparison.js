import { ALGORITHM_CATALOG } from '../utils/algorithm-catalog.js';

/**
 * Mevcut algoritma katalogundan sadece karşılaştırılabilir olan gerçek algoritmaları getirir.
 * Analiz ve eğitim araçlarını filtreler.
 */
export function getComparableAlgorithms() {
    return ALGORITHM_CATALOG.filter(a => a.meta !== undefined);
}

/**
 * Geçersiz ve tekrarlı kimlikleri temizler, en fazla 4 seçim kalacak şekilde kırpar.
 * Geçerli seçimleri array olarak döndürür.
 */
export function sanitizeSelection(selectionIds) {
    if (!Array.isArray(selectionIds)) return [];
    const validIds = getComparableAlgorithms().map(a => a.id);
    const unique = [...new Set(selectionIds)];
    const valid = unique.filter(id => validIds.includes(id));
    return valid.slice(0, 4);
}

/**
 * Karşılaştırma seçimi geçerli mi kontrol eder. En az 2 olmalı.
 */
export function validateSelection(selectionIds) {
    const sanitized = sanitizeSelection(selectionIds);
    if (sanitized.length < 2) {
        throw new Error("Karşılaştırma yapabilmek için en az 2 algoritma seçmelisiniz.");
    }
    if (selectionIds.length > 4) {
        throw new Error("En fazla 4 algoritma seçebilirsiniz.");
    }
    return sanitized;
}

/**
 * Karşılaştırma ölçütlerini tanımlar (satırlar)
 */
export const COMPARISON_FIELDS = [
    { key: 'baseType', label: 'Temel Tür' },
    { key: 'purpose', label: 'Kullanım Amacı' },
    { key: 'keyType', label: 'Anahtar Türü' },
    { key: 'keyRequired', label: 'Anahtar Gerekli mi?' },
    { key: 'operationType', label: 'İşlem Biçimi' },
    { key: 'supportsDecryption', label: 'Şifre Çözme' },
    { key: 'supportsTR', label: 'Türkçe Desteği' },
    { key: 'supportsEN', label: 'Latin Desteği' },
    { key: 'changesChars', label: 'Harfleri Değiştirir mi?' },
    { key: 'changesPositions', label: 'Yerlerini Değiştirir mi?' },
    { key: 'securityStatus', label: 'Güvenlik Durumu' },
    { key: 'weakness', label: 'Temel Zayıflık' },
    { key: 'educationNote', label: 'Eğitim Notu' }
];

/**
 * Seçilen algoritmalar için satır verilerini oluşturur.
 */
export function generateComparisonRows(selectionIds, diffOnly = false) {
    const ids = sanitizeSelection(selectionIds);
    const algos = ids.map(id => ALGORITHM_CATALOG.find(a => a.id === id));
    
    const rows = [];
    
    COMPARISON_FIELDS.forEach(field => {
        const values = algos.map(a => a.meta[field.key]);
        const allSame = values.every(v => v === values[0]);
        
        if (diffOnly && allSame) {
            return; // Farklılıkları göster seçeneğinde aynı olanları atla
        }
        
        rows.push({
            key: field.key,
            label: field.label,
            values: values
        });
    });
    
    return {
        headers: algos.map(a => a.name),
        rows: rows
    };
}

/**
 * Karşılaştırma tablosunu panoya kopyalanabilecek markdown formatına çevirir.
 */
export function generateMarkdownOutput(selectionIds, diffOnly = false) {
    const ids = sanitizeSelection(selectionIds);
    if (ids.length < 2) return "";
    
    const { headers, rows } = generateComparisonRows(ids, diffOnly);
    
    let md = `| Ölçüt | ${headers.join(' | ')} |\n`;
    md += `|---|${headers.map(() => '---').join('|')}|\n`;
    
    rows.forEach(row => {
        md += `| **${row.label}** | ${row.values.join(' | ')} |\n`;
    });
    
    return md;
}

/**
 * Kategoriye göre algoritmaları filtreler.
 * all, modern, classic, substitution, transposition, key_exchange
 */
export function filterByCategory(filterType) {
    const algos = getComparableAlgorithms();
    switch (filterType) {
        case 'modern':
            return algos.filter(a => a.category.includes('Modern'));
        case 'classic':
            return algos.filter(a => a.category.includes('Klasik'));
        case 'substitution':
            return algos.filter(a => a.category.includes('Yerine Koyma') || (a.meta && a.meta.baseType.includes('Yerine Koyma')));
        case 'transposition':
            return algos.filter(a => a.category.includes('Transpozisyon'));
        case 'key_exchange':
            return algos.filter(a => a.meta && a.meta.baseType.includes('Anahtar Değişimi'));
        default:
            return algos;
    }
}
