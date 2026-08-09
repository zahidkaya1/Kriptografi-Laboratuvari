export function runBase64(text, mode) {
    if (!text) {
        throw new Error("Lütfen işlenecek metni girin.");
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    let steps = [];

    steps.push(`Uyarı: Base64 bir şifreleme algoritması değildir! Yalnızca binary veya metinsel verileri, yazdırılabilir ASCII karakterleri olarak temsil eden bir kodlama yöntemidir.`);

    if (mode === 'encode') {
        const utf8Bytes = encoder.encode(text);
        let binaryString = "";
        for (let i = 0; i < utf8Bytes.byteLength; i++) {
            binaryString += String.fromCharCode(utf8Bytes[i]);
        }
        result = btoa(binaryString);
    } else { // decode
        try {
            const binaryString = atob(text);
            const utf8Bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                utf8Bytes[i] = binaryString.charCodeAt(i);
            }
            result = decoder.decode(utf8Bytes);
        } catch (e) {
            throw new Error("Girdi geçerli bir Base64 dizgesi değil.");
        }
    }

    return {
        result: result,
        steps: steps // Adımlar paneli gizlenecek ama fallback olarak döndürelim
    };
}
