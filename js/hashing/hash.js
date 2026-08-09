export async function runHash(text, algorithm) {
    if (!text) {
        throw new Error("Lütfen hash'i alınacak metni girin.");
    }
    
    const validAlgorithms = ['SHA-256', 'SHA-384', 'SHA-512'];
    if (!validAlgorithms.includes(algorithm)) {
        throw new Error("Desteklenmeyen hash algoritması.");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Tarayıcıdaki Web Crypto API'yi kullan
    let hashBuffer;
    try {
        hashBuffer = await crypto.subtle.digest(algorithm, data);
    } catch (e) {
        // Fallback for tests if crypto.subtle is not available in test environment
        if (typeof crypto !== 'undefined' && crypto.createHash) {
             const hash = crypto.createHash(algorithm.toLowerCase().replace('-', ''));
             hash.update(text, 'utf8');
             const hex = hash.digest('hex');
             return { result: hex, steps: [] };
        }
        throw new Error("Hash hesaplama bu ortamda desteklenmiyor.");
    }

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return {
        result: hashHex,
        steps: [
            "Uyarı: Hash fonksiyonları (özet fonksiyonları) tek yönlüdür ve şifreleme algoritması değildir. Şifrelenmiş verinin aksine, orijinal haline geri döndürülemezler (decrypt edilemezler)."
        ]
    };
}

export function compareHash(hash1, hash2) {
    if (!hash1 || !hash2) return false;
    // Normalize to lowercase for comparison
    return hash1.trim().toLowerCase() === hash2.trim().toLowerCase();
}
