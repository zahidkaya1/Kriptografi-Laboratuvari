export function runXOR(text, key, mode) {
    if (!text) {
        throw new Error("Lütfen bir metin veya şifreli veri girin.");
    }
    if (!key) {
        throw new Error("XOR şifrelemesi için bir anahtar zorunludur.");
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder('utf-8');

    let inputBytes;
    const keyBytes = encoder.encode(key);
    
    let result = '';
    let steps = [];

    steps.push(`Anahtar (UTF-8): [${keyBytes.join(', ')}]`);

    if (mode === 'encrypt') {
        inputBytes = encoder.encode(text);
        steps.push(`Girdi (UTF-8): [${inputBytes.join(', ')}]`);
        
        let outputBytes = new Uint8Array(inputBytes.length);
        let hexOutput = '';
        
        for (let i = 0; i < inputBytes.length; i++) {
            const k = keyBytes[i % keyBytes.length];
            const xorVal = inputBytes[i] ^ k;
            outputBytes[i] = xorVal;
            const hexByte = xorVal.toString(16).padStart(2, '0').toUpperCase();
            hexOutput += hexByte;
            
            if (i < 15) {
                steps.push(`Adım ${i+1}: Girdi Byte(${inputBytes[i]}) ⊕ Anahtar Byte(${k}) = Sonuç(${xorVal}) => HEX(${hexByte})`);
            } else if (i === 15) {
                steps.push(`... ve ${inputBytes.length - 15} adım daha (Çok uzun çıktılar için adımlar kısaltıldı)`);
            }
        }
        
        result = hexOutput;
        steps.push(`\nŞifreli Çıktı (HEX): ${result}`);
        steps.push(`\nNot: Basit XOR (özellikle kısa anahtarlarla), günümüz standartlarında güvenli bir şifreleme algoritması değildir. Anahtar tekrarlandığı için analiz edilebilir.`);
        
    } else { // decrypt
        // input must be valid hex
        const hexRegex = /^[0-9A-Fa-f]+$/;
        if (!hexRegex.test(text)) {
            throw new Error("Geçersiz HEX girdisi. Çözme işlemi için girdinin HEX formatında (sadece 0-9, A-F) olması gerekir.");
        }
        if (text.length % 2 !== 0) {
            throw new Error("Geçersiz HEX girdisi. HEX karakter sayısı çift olmalıdır.");
        }

        inputBytes = new Uint8Array(text.length / 2);
        for (let i = 0; i < text.length; i += 2) {
            inputBytes[i/2] = parseInt(text.substr(i, 2), 16);
        }
        steps.push(`Şifreli Girdi (Byte): [${inputBytes.join(', ')}]`);

        let outputBytes = new Uint8Array(inputBytes.length);
        
        for (let i = 0; i < inputBytes.length; i++) {
            const k = keyBytes[i % keyBytes.length];
            const xorVal = inputBytes[i] ^ k;
            outputBytes[i] = xorVal;
            
            if (i < 15) {
                steps.push(`Adım ${i+1}: Şifreli Byte(${inputBytes[i]}) ⊕ Anahtar Byte(${k}) = Çözülen Byte(${xorVal})`);
            } else if (i === 15) {
                steps.push(`... ve ${inputBytes.length - 15} adım daha (Çok uzun çıktılar için adımlar kısaltıldı)`);
            }
        }
        
        try {
            result = decoder.decode(outputBytes);
            steps.push(`\nÇözülen Metin (UTF-8): ${result}`);
        } catch (e) {
            throw new Error("Şifre çözme sonucu geçerli bir UTF-8 metni oluşturamadı. Anahtar veya şifreli veri yanlış olabilir.");
        }
    }

    return {
        result: result,
        steps: steps
    };
}
