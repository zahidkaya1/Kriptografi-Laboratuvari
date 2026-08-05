export const ALGORITHM_CATALOG = [
    {
        id: 'rsa',
        name: 'RSA',
        category: 'Modern ve Matematiksel',
        keywords: ['rsa', 'asimetrik', 'modern', 'matematiksel', 'açık anahtar'],
        meta: {
            baseType: 'Asimetrik Şifreleme',
            purpose: 'Açık anahtarlı veri şifreleme ve dijital imza',
            keyType: 'Açık (e, n) ve Özel (d, n) sayısal anahtarlar',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet (Sayısal veya Karakter)',
            supportsEN: 'Evet (Sayısal veya Karakter)',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Modern (Uygun parametrelerle güvenli)',
            weakness: 'Küçük asal sayılar ve dolgu eksikliği (Uygulamadaki hali)',
            educationNote: 'Bu uygulamadaki küçük sayılar yalnızca eğitim amaçlıdır. Gerçek güvenlik için çok büyük asal sayılar (örn. 2048-bit) gerektirir.'
        }
    },
    {
        id: 'dh',
        name: 'Diffie-Hellman',
        category: 'Modern ve Matematiksel',
        keywords: ['dh', 'diffie', 'hellman', 'anahtar değişimi', 'modern', 'matematiksel'],
        meta: {
            baseType: 'Ortak Anahtar Değişimi',
            purpose: 'Güvensiz kanalda ortak gizli anahtar oluşturma',
            keyType: 'Asal modül (p), üreteç (g) ve gizli anahtarlar',
            keyRequired: 'Evet',
            operationType: 'Anahtar Değişimi',
            supportsDecryption: 'Hayır (Sadece anahtar üretir)',
            supportsTR: 'Uygulanamaz (Sayısal)',
            supportsEN: 'Uygulanamaz (Sayısal)',
            changesChars: 'Uygulanamaz',
            changesPositions: 'Uygulanamaz',
            securityStatus: 'Modern (Uygun parametrelerle güvenli)',
            weakness: 'Kimlik doğrulama olmadan aradaki adam saldırısı (Man-in-the-middle)',
            educationNote: 'Doğrudan veri şifrelemek için kullanılmaz. İki tarafın aynı şifreleme anahtarına sahip olmasını sağlar.'
        }
    },
    {
        id: 'vigenere',
        name: 'Vigenère',
        category: 'Klasik Yerine Koyma Şifreleri',
        keywords: ['vigenere', 'vigenère', 'klasik', 'yerine koyma', 'polialfabetik'],
        meta: {
            baseType: 'Polialfabetik Yerine Koyma',
            purpose: 'Kelime bazlı tekrarlayan kaydırma ile metin şifreleme',
            keyType: 'Metin tabanlı kelime anahtarı',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Zayıf (Tarihsel)',
            weakness: 'Frekans analizi ve Kasiski testi ile kırılabilir',
            educationNote: 'Farklı harflerin aynı harfe dönüşebilmesi sayesinde Sezar şifresinden daha güvenlidir, ancak modern standartlarda güvenlik sağlamaz.'
        }
    },
    {
        id: 'caesar',
        name: 'Sezar',
        category: 'Klasik Yerine Koyma Şifreleri',
        keywords: ['sezar', 'caesar', 'klasik', 'yerine koyma', 'monoalfabetik', 'kaydırma'],
        meta: {
            baseType: 'Monoalfabetik Yerine Koyma',
            purpose: 'Sabit değerli alfabetik kaydırma',
            keyType: 'Sayısal kaydırma değeri (1-N)',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Çok Zayıf (Tarihsel)',
            weakness: 'Çok az anahtar olasılığı (Brute force) ve Frekans analizi',
            educationNote: 'Şifreleme mantığını anlamak için temel bir algoritmadır, fakat tüm olasılıklar elle bile denenebilir.'
        }
    },
    {
        id: 'rot13',
        name: 'ROT13',
        category: 'Klasik Yerine Koyma Şifreleri',
        keywords: ['rot13', 'rot', '13', 'klasik', 'yerine koyma'],
        meta: {
            baseType: 'Monoalfabetik Yerine Koyma',
            purpose: '13 karakterlik sabit simetrik kaydırma',
            keyType: 'Yok (Sabit 13)',
            keyRequired: 'Hayır',
            operationType: 'Dönüşüm (Şifreleme ve Çözme aynı işlemdir)',
            supportsDecryption: 'Evet',
            supportsTR: 'Hayır (Sadece 26 harfli alfabede çalışır)',
            supportsEN: 'Evet',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Güvenli Değil (Dönüşüm)',
            weakness: 'Anahtar eksikliği',
            educationNote: 'Gizlilik sağlamaz, yalnızca metni ilk bakışta okunmaz hale getirmek için internet forumlarında kullanılmıştır.'
        }
    },
    {
        id: 'atbash',
        name: 'Atbash',
        category: 'Klasik Yerine Koyma Şifreleri',
        keywords: ['atbash', 'klasik', 'yerine koyma', 'ters', 'simetrik'],
        meta: {
            baseType: 'Monoalfabetik Yerine Koyma',
            purpose: 'Alfabeyi ters çevirerek eşleştirme',
            keyType: 'Yok',
            keyRequired: 'Hayır',
            operationType: 'Dönüşüm (Şifreleme ve Çözme aynı işlemdir)',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Güvenli Değil (Tarihsel)',
            weakness: 'Anahtar eksikliği ve yapısal basitlik',
            educationNote: 'İbranice metinlerde kullanılmış çok eski bir şifreleme yöntemidir. Gizlilik sağlamaz.'
        }
    },
    {
        id: 'affine',
        name: 'Affine',
        category: 'Klasik Yerine Koyma Şifreleri',
        keywords: ['affine', 'doğrusal', 'klasik', 'yerine koyma', 'matematiksel'],
        meta: {
            baseType: 'Matematiksel Yerine Koyma',
            purpose: 'Doğrusal fonksiyon E(x) = (ax + b) mod m ile şifreleme',
            keyType: 'Çarpan (a) ve Kaydırma (b) sayıları',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet (m=29)',
            supportsEN: 'Evet (m=26)',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Zayıf (Tarihsel)',
            weakness: 'Frekans analizi ve bilinen düz metin saldırısı',
            educationNote: 'Modüler aritmetiğin kriptografide nasıl kullanıldığını gösteren klasik bir örnektir.'
        }
    },
    {
        id: 'railfence',
        name: 'Rail Fence',
        category: 'Transpozisyon Şifreleri',
        keywords: ['rail', 'fence', 'zikzak', 'transpozisyon', 'yer değiştirme'],
        meta: {
            baseType: 'Transpozisyon (Yer Değiştirme)',
            purpose: 'Metni zikzak (diyagonal) okuyarak karıştırma',
            keyType: 'Sayısal (Ray adedi)',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Hayır',
            changesPositions: 'Evet',
            securityStatus: 'Zayıf (Tarihsel)',
            weakness: 'Deneme yanılma (Brute force) ile çözülebilir',
            educationNote: 'Harflerin değiştirilmesi yerine yerlerinin değiştirildiği algoritmaların en basit örneğidir.'
        }
    },
    {
        id: 'columnar',
        name: 'Sütunlu Transpozisyon',
        category: 'Transpozisyon Şifreleri',
        keywords: ['sütunlu', 'transpozisyon', 'columnar', 'yer değiştirme'],
        meta: {
            baseType: 'Anahtarlı Transpozisyon',
            purpose: 'Metni ızgaraya yazıp anahtar sırasına göre sütun sütun okuma',
            keyType: 'Metin tabanlı kelime anahtarı',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Hayır',
            changesPositions: 'Evet',
            securityStatus: 'Zayıf (Tarihsel)',
            weakness: 'Sütun anagramlama analizi ile çözülebilir',
            educationNote: 'Anahtar kelimedeki harflerin alfabetik sırasının, okuma sırasını belirlediği yapısal bir şifredir.'
        }
    },
    {
        id: 'freq-analysis',
        name: 'Frekans Analizi',
        category: 'Analiz Araçları',
        keywords: ['frekans', 'analiz', 'harf sayımı', 'istatistik']
    },
    {
        id: 'caesar-breaker',
        name: 'Sezar Şifresi Kırma',
        category: 'Analiz Araçları',
        keywords: ['sezar', 'kırma', 'brute force', 'şifre çözme', 'kırıcı', 'analiz']
    },
    {
        id: 'algo-compare',
        name: 'Algoritma Karşılaştırma',
        category: 'Eğitim Araçları',
        keywords: ['karşılaştırma', 'algoritma karşılaştır', 'farklar', 'eğitim']
    },
    {
        id: 'exercises',
        name: 'Mini Alıştırmalar',
        category: 'Eğitim Araçları',
        keywords: ['alıştırma', 'test', 'quiz', 'soru', 'eğitim']
    }
];
