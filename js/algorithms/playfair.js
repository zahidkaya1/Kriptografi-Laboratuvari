export function generatePlayfairMatrix(key) {
    let normalizedKey = (key || '').toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    
    if (!normalizedKey) {
        throw new Error("Lütfen geçerli bir anahtar (harf içeren) girin.");
    }
    
    let matrix = [];
    let usedChars = new Set();

    for (let char of normalizedKey) {
        if (!usedChars.has(char)) {
            usedChars.add(char);
            matrix.push(char);
        }
    }

    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // 25 letters, no J
    for (let char of alphabet) {
        if (!usedChars.has(char)) {
            usedChars.add(char);
            matrix.push(char);
        }
    }

    let grid = [];
    for (let i = 0; i < 5; i++) {
        grid.push(matrix.slice(i * 5, i * 5 + 5));
    }
    
    return grid;
}

export function preprocessPlayfairText(text) {
    let normalized = (text || '').toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let digraphs = [];
    
    let i = 0;
    while (i < normalized.length) {
        let char1 = normalized[i];
        let char2 = '';
        
        if (i + 1 < normalized.length) {
            char2 = normalized[i + 1];
            if (char1 === char2) {
                digraphs.push(char1 + 'X');
                i += 1;
            } else {
                digraphs.push(char1 + char2);
                i += 2;
            }
        } else {
            digraphs.push(char1 + 'X');
            i += 1;
        }
    }
    return digraphs;
}

function findPosition(grid, char) {
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (grid[r][c] === char) {
                return { r, c };
            }
        }
    }
    return null;
}

export function runPlayfair(text, key, mode) {
    if (!text) {
        throw new Error("Lütfen işlenecek metni girin.");
    }
    
    const grid = generatePlayfairMatrix(key);
    let steps = [];
    
    steps.push(`Anahtar Matrisi (5x5):`);
    for (let r = 0; r < 5; r++) {
        steps.push(`[ ${grid[r].join(' ')} ]`);
    }

    let result = '';
    
    if (mode === 'encrypt') {
        const digraphs = preprocessPlayfairText(text);
        if (digraphs.length === 0) {
            throw new Error("Metin geçerli bir harf içermiyor.");
        }
        steps.push(`İşlenen Metin (Digraph'lar): ${digraphs.join(' ')}`);
        
        for (let i = 0; i < digraphs.length; i++) {
            let p1 = findPosition(grid, digraphs[i][0]);
            let p2 = findPosition(grid, digraphs[i][1]);
            
            let c1, c2, rule;
            
            if (p1.r === p2.r) {
                c1 = grid[p1.r][(p1.c + 1) % 5];
                c2 = grid[p2.r][(p2.c + 1) % 5];
                rule = 'Aynı Satır';
            } else if (p1.c === p2.c) {
                c1 = grid[(p1.r + 1) % 5][p1.c];
                c2 = grid[(p2.r + 1) % 5][p2.c];
                rule = 'Aynı Sütun';
            } else {
                c1 = grid[p1.r][p2.c];
                c2 = grid[p2.r][p1.c];
                rule = 'Dikdörtgen';
            }
            
            result += c1 + c2;
            
            if (i < 15) {
                steps.push(`Adım ${i+1}: ${digraphs[i]} -> ${c1}${c2} (Kural: ${rule})`);
            } else if (i === 15) {
                steps.push(`... ve ${digraphs.length - 15} adım daha (Görünüm kısaltıldı)`);
            }
        }
    } else {
        const normalized = (text || '').toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        if (normalized.length % 2 !== 0) {
            throw new Error("Çözülecek şifreli metin (harf sayısı) çift uzunlukta olmalıdır.");
        }
        if (normalized.length === 0) {
             throw new Error("Metin geçerli bir harf içermiyor.");
        }
        
        let digraphs = [];
        for (let i = 0; i < normalized.length; i += 2) {
            digraphs.push(normalized.substr(i, 2));
        }
        steps.push(`İşlenen Metin (Digraph'lar): ${digraphs.join(' ')}`);
        
        for (let i = 0; i < digraphs.length; i++) {
            let p1 = findPosition(grid, digraphs[i][0]);
            let p2 = findPosition(grid, digraphs[i][1]);
            
            if (!p1 || !p2) {
                 throw new Error("Şifreli metin içerisinde J karakteri geçersizdir. Klasik Playfair'de J bulunmaz.");
            }
            
            let m1, m2, rule;
            
            if (p1.r === p2.r) {
                m1 = grid[p1.r][(p1.c + 4) % 5];
                m2 = grid[p2.r][(p2.c + 4) % 5];
                rule = 'Aynı Satır';
            } else if (p1.c === p2.c) {
                m1 = grid[(p1.r + 4) % 5][p1.c];
                m2 = grid[(p2.r + 4) % 5][p2.c];
                rule = 'Aynı Sütun';
            } else {
                m1 = grid[p1.r][p2.c];
                m2 = grid[p2.r][p1.c];
                rule = 'Dikdörtgen';
            }
            
            result += m1 + m2;
            
            if (i < 15) {
                steps.push(`Adım ${i+1}: ${digraphs[i]} -> ${m1}${m2} (Kural: ${rule})`);
            } else if (i === 15) {
                steps.push(`... ve ${digraphs.length - 15} adım daha (Görünüm kısaltıldı)`);
            }
        }
        steps.push(`\nNot: Çözüm sonucundaki dolgu X harflerinin hangilerinin özgün metne ait olduğu her zaman kesin olarak belirlenemez.`);
    }

    return {
        result: result,
        steps: steps,
        grid: grid
    };
}
