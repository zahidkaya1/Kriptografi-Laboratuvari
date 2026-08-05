export function runColumnarTransposition(text, key, alphabet = "TR", mode = "encrypt") {
    if (!text) throw new Error("Metin boş olamaz.");
    if (!key || key.length < 2) throw new Error("Anahtar kelime en az 2 karakter olmalıdır.");
    if (key.length > 50) throw new Error("Anahtar kelime sınırları aşıyor (Maks: 50 karakter).");

    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);

    const locale = alphabet === "TR" ? 'tr-TR' : 'en-US';
    
    let keyChars = Array.from(key).map((char, index) => ({
        char: char,
        lowerChar: char.toLocaleLowerCase(locale),
        originalIndex: index,
        order: 0
    }));

    keyChars.sort((a, b) => {
        const cmp = a.lowerChar.localeCompare(b.lowerChar, locale);
        if (cmp === 0) {
            return a.originalIndex - b.originalIndex;
        }
        return cmp;
    });

    keyChars.forEach((item, i) => {
        item.order = i + 1;
    });

    keyChars.sort((a, b) => a.originalIndex - b.originalIndex);

    let resultText = "";
    
    const matrix = Array.from({ length: numRows }, () => Array(numCols).fill(''));

    if (mode === "encrypt") {
        let index = 0;
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                if (index < text.length) {
                    matrix[r][c] = text[index++];
                }
            }
        }

        for (let currentOrder = 1; currentOrder <= numCols; currentOrder++) {
            const colIndex = keyChars.findIndex(k => k.order === currentOrder);
            
            for (let r = 0; r < numRows; r++) {
                if (matrix[r][colIndex] !== '') {
                    resultText += matrix[r][colIndex];
                }
            }
        }
    } else { // decrypt
        const emptyCells = (numRows * numCols) - text.length;
        
        let index = 0;
        
        for (let currentOrder = 1; currentOrder <= numCols; currentOrder++) {
            const colIndex = keyChars.findIndex(k => k.order === currentOrder);
            
            const hasEmptyCell = colIndex >= (numCols - emptyCells);
            const cellsInThisColumn = hasEmptyCell ? numRows - 1 : numRows;
            
            for (let r = 0; r < cellsInThisColumn; r++) {
                if (index < text.length) {
                    matrix[r][colIndex] = text[index++];
                }
            }
        }

        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                if (matrix[r][c] !== '') {
                    resultText += matrix[r][c];
                }
            }
        }
    }

    return {
        result: resultText,
        matrix: matrix,
        keyInfo: keyChars
    };
}
