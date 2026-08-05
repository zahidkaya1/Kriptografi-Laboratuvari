export function runRailFence(text, rails, mode = "encrypt") {
    if (!text) throw new Error("Metin boş olamaz.");
    rails = parseInt(rails, 10);
    if (isNaN(rails) || rails < 2) throw new Error("Ray sayısı en az 2 olmalıdır.");
    if (rails > 100) throw new Error("Ray sayısı görselleştirme sınırlarını aşıyor (Maks: 100).");

    const len = text.length;
    // Görselleştirme için matris
    const matrix = Array.from({ length: rails }, () => Array(len).fill(null));
    
    let resultText = "";

    if (mode === "encrypt") {
        let row = 0;
        let direction = 1; // 1: aşağı, -1: yukarı

        for (let i = 0; i < len; i++) {
            matrix[row][i] = text[i];
            
            if (row === 0) direction = 1;
            else if (row === rails - 1) direction = -1;
            
            // Eğer ray sayısı metin uzunluğundan büyükse hep aşağı gider (sınırı aşmamak kaydıyla)
            // Ama yön değişimi row == rails - 1 olunca tetiklendiği için sorun olmaz.
            // Yalnız rails > len ise bile matematik çalışır.
            row += direction;
        }

        for (let r = 0; r < rails; r++) {
            for (let c = 0; c < len; c++) {
                if (matrix[r][c] !== null) {
                    resultText += matrix[r][c];
                }
            }
        }
    } else { // decrypt
        let row = 0;
        let direction = 1;

        for (let i = 0; i < len; i++) {
            matrix[row][i] = '*'; // işaretleyici
            
            if (row === 0) direction = 1;
            else if (row === rails - 1) direction = -1;
            
            row += direction;
        }

        let index = 0;
        for (let r = 0; r < rails; r++) {
            for (let c = 0; c < len; c++) {
                if (matrix[r][c] === '*' && index < len) {
                    matrix[r][c] = text[index++];
                }
            }
        }

        row = 0;
        direction = 1;
        for (let i = 0; i < len; i++) {
            resultText += matrix[row][i];
            
            if (row === 0) direction = 1;
            else if (row === rails - 1) direction = -1;
            
            row += direction;
        }
    }

    return {
        result: resultText,
        matrix: matrix,
        rails: rails
    };
}
