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
    },
    {
        id: 'guided-learning',
        name: 'Rehberli Öğrenme',
        category: 'Eğitim Araçları',
        keywords: ['rehber', 'öğrenme', 'yol', 'başlangıç', 'orta', 'ileri', 'ders']
    },
    {
        id: 'mixed-quiz',
        name: 'Karışık Quiz',
        category: 'Eğitim Araçları',
        keywords: ['karışık', 'quiz', 'sınav', 'test', 'eğitim', 'soru']
    },
    {
        id: 'education-progress',
        name: 'Eğitim İlerlemesi',
        category: 'Eğitim Araçları',
        keywords: ['ilerleme', 'eğitim', 'gelişim', 'istatistik', 'rapor']
    },
    {
        id: 'playfair',
        name: 'Playfair',
        category: 'Klasik Yerine Koyma Şifreleri',
        keywords: ['playfair', 'klasik', 'yerine koyma', 'digrafik', 'matris'],
        meta: {
            baseType: 'Digrafik Yerine Koyma',
            purpose: 'Harf çiftlerini (digraph) 5x5 matris üzerinde değiştirme',
            keyType: 'Metin tabanlı kelime anahtarı',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Hayır (Sadece klasik 5x5 Latin alfabe)',
            supportsEN: 'Evet (25 harf, J = I)',
            changesChars: 'Evet',
            changesPositions: 'Evet (Çift içinde)',
            securityStatus: 'Zayıf (Tarihsel)',
            weakness: 'Frekans analizi ile kırılabilir',
            educationNote: 'Tek harf yerine harf çiftlerini değiştiren ilk pratik şifreleme yöntemlerinden biridir. Modern kullanım için güvenli değildir.'
        }
    },
    {
        id: 'hill',
        name: 'Hill Şifresi',
        category: 'Klasik Yerine Koyma Şifreleri',
        keywords: ['hill', 'klasik', 'yerine koyma', 'poligrafik', 'matris', 'cebir'],
        meta: {
            baseType: 'Poligrafik Yerine Koyma',
            purpose: 'Lineer cebir ve modüler aritmetik kullanarak şifreleme',
            keyType: '2x2 Sayısal Matris',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet (Anahtar matris terslenebilir ise)',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Evet',
            changesPositions: 'Kısmen (Vektör içinde dağılım)',
            securityStatus: 'Zayıf (Tarihsel)',
            weakness: 'Bilinen düz metin saldırısı ile matris çözülebilir',
            educationNote: 'Kriptografide matris çarpımının ve modüler ters işleminin nasıl kullanıldığını gösteren klasik bir örnektir.'
        }
    },
    {
        id: 'xor',
        name: 'XOR',
        category: 'Modern ve Matematiksel',
        keywords: ['xor', 'dışlamalı veya', 'exclusive or', 'modern', 'matematiksel'],
        meta: {
            baseType: 'Simetrik Şifreleme (Basit)',
            purpose: 'Byte düzeyinde anahtar ile XOR işlemi',
            keyType: 'Metin tabanlı kelime anahtarı',
            keyRequired: 'Evet',
            operationType: 'Şifreleme / Çözme',
            supportsDecryption: 'Evet',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Zayıf (Modern standartlarda tek başına yetersiz)',
            weakness: 'Tekrarlanan anahtar kullanımı durumunda bilinen düz metin veya frekans analizi ile kırılabilir',
            educationNote: 'Modern şifreleme algoritmalarının (AES vb.) kalbinde yatan temel bit düzeyindeki mantığı anlamak için idealdir.'
        }
    },
    {
        id: 'base64',
        name: 'Base64 Kodlama',
        category: 'Kodlama ve Veri Dönüşümü',
        keywords: ['base64', 'kodlama', 'encoding', 'veri', 'dönüşüm'],
        meta: {
            baseType: 'Veri Kodlama (Encoding)',
            purpose: 'Binary veriyi yazdırılabilir ASCII karakterleriyle temsil etme',
            keyType: 'Yok',
            keyRequired: 'Hayır',
            operationType: 'Kodlama / Çözme',
            supportsDecryption: 'Hayır (Şifreleme değil, Kod Çözme - Decoding)',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Evet',
            changesPositions: 'Hayır',
            securityStatus: 'Güvenli Değil (Şifreleme Değildir)',
            weakness: 'Şifreleme olmadığı için gizlilik sağlamaz, herkes tarafından kolayca çözülebilir',
            educationNote: 'Şifreleme (Encryption) ile Kodlama (Encoding) arasındaki farkı anlamak için kritik bir örnektir. Base64 kesinlikle bir şifreleme algoritması değildir.'
        }
    },
    {
        id: 'hash',
        name: 'Hash Fonksiyonları',
        category: 'Özet (Hash) Fonksiyonları',
        keywords: ['hash', 'özet', 'sha256', 'sha', 'tek yönlü', 'sha384', 'sha512'],
        meta: {
            baseType: 'Kriptografik Özet Fonksiyonu',
            purpose: 'Veri bütünlüğünü doğrulama ve tek yönlü özet çıkarma',
            keyType: 'Yok',
            keyRequired: 'Hayır',
            operationType: 'Tek Yönlü Özet (Hashing)',
            supportsDecryption: 'Hayır (Tek yönlüdür)',
            supportsTR: 'Evet',
            supportsEN: 'Evet',
            changesChars: 'Uygulanamaz (Tamamen yeni veri üretir)',
            changesPositions: 'Uygulanamaz',
            securityStatus: 'Modern (SHA ailesi güvenlidir)',
            weakness: 'Kısa girdilerde Rainbow Table ve Brute Force saldırılarına açık olabilir',
            educationNote: 'Şifrelemenin aksine hash işlemi geri döndürülemez (decrypt edilemez). Verinin değişip değişmediğini kontrol etmek için kullanılır.'
        }
    }
];
