export const LEARNING_PATH = [
    // --- Başlangıç ---
    {
        id: 'lesson-caesar',
        level: 'beginner',
        targetAlgoId: 'caesar',
        title: 'Sezar Şifresi',
        difficulty: 'Başlangıç',
        estimatedTime: '5 dk',
        objectives: [
            'Kaydırmalı şifreleme mantığını öğren',
            'Anahtar kavramını gör',
            'Şifreleme ve çözme ilişkisini incele'
        ],
        content: [
            { title: 'Nedir?', text: 'Sezar şifresi, alfabedeki her harfin sabit bir sayı kadar kaydırılmasıyla oluşturulan basit bir şifreleme yöntemidir.' },
            { title: 'Nasıl çalışır?', text: 'Bir harfi şifrelemek için alfabede ileri, çözmek için geri kaydırırsınız.' },
            { title: 'Küçük örnek', text: 'Kaydırma 3 ise, A harfi D olur.' },
            { title: 'Güvenlik notu', text: 'Çok zayıftır. Sadece 25 (veya alfabeye göre) farklı anahtar olduğu için kolayca kırılır.' }
        ]
    },
    {
        id: 'lesson-rot13',
        level: 'beginner',
        targetAlgoId: 'rot13',
        title: 'ROT13',
        difficulty: 'Başlangıç',
        estimatedTime: '3 dk',
        objectives: [
            'Sabit kaydırmalı şifrelemeyi anla',
            'Şifreleme ve çözmenin aynı işlem olmasını gör'
        ],
        content: [
            { title: 'Nedir?', text: 'Sezar şifresinin 13 harf kaydırılmış özel bir versiyonudur.' },
            { title: 'Nasıl çalışır?', text: 'İngiliz alfabesi 26 harf olduğu için, bir harfi 13 ileri kaydırmak ile 13 geri kaydırmak aynı sonucu verir.' },
            { title: 'Küçük örnek', text: 'A harfi N olur, N harfi tekrar A olur.' },
            { title: 'Güvenlik notu', text: 'Herhangi bir anahtar gerektirmediği için hiçbir güvenlik sağlamaz, sadece metni gizler.' }
        ]
    },
    {
        id: 'lesson-atbash',
        level: 'beginner',
        targetAlgoId: 'atbash',
        title: 'Atbash',
        difficulty: 'Başlangıç',
        estimatedTime: '3 dk',
        objectives: [
            'Ters alfabe eşleştirmesini öğren',
            'Simetrik dönüşümü kavra'
        ],
        content: [
            { title: 'Nedir?', text: 'Alfabeyi ters çevirerek eşleştirme yapan çok eski bir yöntemdir.' },
            { title: 'Nasıl çalışır?', text: 'İlk harf son harfle, ikinci harf sondan ikinci harfle eşleşir.' },
            { title: 'Küçük örnek', text: 'A harfi Z, B harfi Y olur.' },
            { title: 'Güvenlik notu', text: 'Anahtarı olmadığı için herkes tarafından kolayca çözülebilir.' }
        ]
    },
    {
        id: 'lesson-base64',
        level: 'beginner',
        targetAlgoId: 'base64',
        title: 'Base64',
        difficulty: 'Başlangıç',
        estimatedTime: '5 dk',
        objectives: [
            'Kodlama (encoding) kavramını öğren',
            'Binary veriyi metin olarak ifade etmeyi anla',
            'Kodlama ile şifreleme farkını gör'
        ],
        content: [
            { title: 'Nedir?', text: 'Base64 bir kodlama yöntemidir. Veriyi güvenli şekilde iletilebilecek ASCII karakterlerine dönüştürür.' },
            { title: 'Nasıl çalışır?', text: 'Her 3 baytlık veri (24 bit), 4 adet 6 bitlik parçaya bölünür ve her biri bir harfe karşılık gelir.' },
            { title: 'Küçük örnek', text: '"Hi" metni Base64 ile "SGk=" olur.' },
            { title: 'Güvenlik notu', text: 'Base64 KESİNLİKLE ŞİFRELEME DEĞİLDİR. Veriyi gizlemez, sadece formatını değiştirir.' }
        ]
    },
    {
        id: 'lesson-freq-analysis',
        level: 'beginner',
        targetAlgoId: 'freq-analysis',
        title: 'Frekans Analizi',
        difficulty: 'Başlangıç',
        estimatedTime: '8 dk',
        objectives: [
            'Harf sıklıklarının şifre kırmadaki rolünü öğren',
            'Dillerin istatistiksel yapısını anla'
        ],
        content: [
            { title: 'Nedir?', text: 'Bir dildeki harflerin kullanım sıklıklarını analiz ederek şifrelenmiş metni çözme yöntemidir.' },
            { title: 'Nasıl çalışır?', text: 'Şifreli metindeki en sık geçen harf, o dilin en sık kullanılan harfi (örneğin İngilizce\'de E, Türkçe\'de A) olabilir.' },
            { title: 'Küçük örnek', text: 'Şifreli metinde X harfi %12 oranında geçiyorsa, bunun Türkçe\'deki A harfi olma ihtimali yüksektir.' },
            { title: 'Güvenlik notu', text: 'Monoalfabetik (tek alfabeli) yerine koyma şifreleri frekans analiziyle kolayca kırılır.' }
        ]
    },
    
    // --- Orta ---
    {
        id: 'lesson-vigenere',
        level: 'intermediate',
        targetAlgoId: 'vigenere',
        title: 'Vigenère',
        difficulty: 'Orta',
        estimatedTime: '10 dk',
        objectives: [
            'Polialfabetik şifrelemeyi öğren',
            'Tekrarlanan anahtar mantığını kavra',
            'Frekans analizinden nasıl kaçınıldığını gör'
        ],
        content: [
            { title: 'Nedir?', text: 'Farklı Sezar kaydırmalarının bir kelime anahtarına göre sırayla uygulanmasıdır.' },
            { title: 'Nasıl çalışır?', text: 'Aynı harf, metnin farklı yerlerinde farklı harflere dönüşebilir. Anahtar kelime metin bitene kadar tekrarlanır.' },
            { title: 'Küçük örnek', text: 'Anahtar "KEY" ise, ilk harf K (10), ikinci harf E (4), üçüncü harf Y (24) kadar kayar.' },
            { title: 'Güvenlik notu', text: 'Uzun süre kırılamaz olarak bilinmiş olsa da günümüzde Kasiski testi ile kırılabilmektedir.' }
        ]
    },
    {
        id: 'lesson-affine',
        level: 'intermediate',
        targetAlgoId: 'affine',
        title: 'Affine',
        difficulty: 'Orta',
        estimatedTime: '12 dk',
        objectives: [
            'Doğrusal fonksiyonlarla şifrelemeyi anla',
            'Modüler aritmetiğin temelini gör'
        ],
        content: [
            { title: 'Nedir?', text: 'Her harfin matematiksel bir f(x) = (ax + b) mod m formülüyle şifrelendiği bir yöntemdir.' },
            { title: 'Nasıl çalışır?', text: 'İki anahtarı vardır: a (çarpan) ve b (kaydırma). Çarpanın alfabe uzunluğuyla aralarında asal olması şarttır.' },
            { title: 'Küçük örnek', text: 'f(x) = (5x + 8) mod 26' },
            { title: 'Güvenlik notu', text: 'Sezar\'dan daha fazla anahtar alanı sunsa da frekans analiziyle kolayca çözülür.' }
        ]
    },
    {
        id: 'lesson-playfair',
        level: 'intermediate',
        targetAlgoId: 'playfair',
        title: 'Playfair',
        difficulty: 'Orta',
        estimatedTime: '15 dk',
        objectives: [
            'Harf çiftleri (digraph) ile şifrelemeyi öğren',
            'Matris tabanlı dönüşümü kavra'
        ],
        content: [
            { title: 'Nedir?', text: 'Harfleri tek tek değil, ikişer ikişer (çiftler halinde) şifreleyen bir algoritmadır.' },
            { title: 'Nasıl çalışır?', text: '5x5\'lik bir matris oluşturulur (J harfi I kabul edilir). Harf çiftlerinin matristeki konumlarına göre dikdörtgen, satır veya sütun kuralları uygulanır.' },
            { title: 'Küçük örnek', text: 'Aynı harf yan yana gelirse aralarına X harfi eklenir (örneğin HE LL O -> HE LX LO).' },
            { title: 'Güvenlik notu', text: 'Tek harf frekans analizini bozsa da, harf çifti frekanslarıyla kırılabilir.' }
        ]
    },
    {
        id: 'lesson-railfence',
        level: 'intermediate',
        targetAlgoId: 'railfence',
        title: 'Rail Fence',
        difficulty: 'Orta',
        estimatedTime: '8 dk',
        objectives: [
            'Transpozisyon (yer değiştirme) kavramını anla',
            'Harflerin sırasını bozarak şifrelemeyi öğren'
        ],
        content: [
            { title: 'Nedir?', text: 'Metni zikzak çizerek okuyup farklı sıralarla yazmaya dayalı basit bir yer değiştirme şifresidir.' },
            { title: 'Nasıl çalışır?', text: 'Metin hayali raylar (satırlar) üzerine yukarı aşağı yazılarak, sonra satır satır okunarak şifrelenir.' },
            { title: 'Küçük örnek', text: '2 ray kullanıldığında tüm tek ve çift indeksli harfler birbirinden ayrılır.' },
            { title: 'Güvenlik notu', text: 'Çok az ray (anahtar) olasılığı olduğu için deneme-yanılma ile kolayca çözülür.' }
        ]
    },
    {
        id: 'lesson-columnar',
        level: 'intermediate',
        targetAlgoId: 'columnar',
        title: 'Sütunlu Transpozisyon',
        difficulty: 'Orta',
        estimatedTime: '10 dk',
        objectives: [
            'Anahtarlı transpozisyonu öğren',
            'Sütunların sırasının nasıl karıştırıldığını kavra'
        ],
        content: [
            { title: 'Nedir?', text: 'Metnin bir tabloya yazılıp sütunların belirli bir anahtar kelimeye göre karıştırıldığı bir şifredir.' },
            { title: 'Nasıl çalışır?', text: 'Anahtar kelimedeki harflerin alfabetik sırası, sütunların hangi sırayla okunacağını belirler.' },
            { title: 'Küçük örnek', text: 'Anahtar "ZEBRA" ise, önce A(5. sütun), sonra B(3. sütun)... okunur.' },
            { title: 'Güvenlik notu', text: 'Anagram analizi ile çözülebilir.' }
        ]
    },
    {
        id: 'lesson-caesar-breaker',
        level: 'intermediate',
        targetAlgoId: 'caesar-breaker',
        title: 'Sezar Kırma',
        difficulty: 'Orta',
        estimatedTime: '10 dk',
        objectives: [
            'Kaba kuvvet (brute force) saldırısını anla',
            'Tüm olasılıkların nasıl denendiğini gör'
        ],
        content: [
            { title: 'Nedir?', text: 'Sezar şifresindeki 25 ihtimalin tümünü deneyerek doğru metni bulma yöntemidir.' },
            { title: 'Nasıl çalışır?', text: 'Tüm kaydırma değerleri uygulanır ve sonuçlar dil yapısına (harf frekanslarına) göre puanlanarak en olası sonuç en üste çıkarılır.' },
            { title: 'Küçük örnek', text: 'Bilinmeyen şifre denendiğinde, anlamlı bir kelime (puanı yüksek) elde edildiğinde kırılmış olur.' },
            { title: 'Güvenlik notu', text: 'Anahtar uzayı (olasılıklar) çok küçük olan algoritmaların ne kadar güvensiz olduğunu gösterir.' }
        ]
    },
    
    // --- İleri ---
    {
        id: 'lesson-xor',
        level: 'advanced',
        targetAlgoId: 'xor',
        title: 'XOR',
        difficulty: 'İleri',
        estimatedTime: '12 dk',
        objectives: [
            'Bit/Byte düzeyinde işlemleri anla',
            'Modern simetrik şifrelemenin temelini öğren'
        ],
        content: [
            { title: 'Nedir?', text: 'İki bitin karşılaştırılarak şifrelendiği mantıksal "Özel VEYA" (Exclusive OR) işlemidir.' },
            { title: 'Nasıl çalışır?', text: 'Aynı bitler 0, farklı bitler 1 üretir. Bir veriye aynı anahtarla iki kez XOR işlemi uygulanırsa orijinal veri elde edilir.' },
            { title: 'Küçük örnek', text: 'A XOR B = C, C XOR B = A.' },
            { title: 'Güvenlik notu', text: 'Repeating-key (tekrarlayan anahtar) XOR kullanımı modern ve güvenli bir şifreleme değildir, kırılabilir.' }
        ]
    },
    {
        id: 'lesson-hill',
        level: 'advanced',
        targetAlgoId: 'hill',
        title: 'Hill',
        difficulty: 'İleri',
        estimatedTime: '15 dk',
        objectives: [
            'Poligrafik şifrelemeyi anla',
            'Lineer cebir ve matris çarpımını kriptografide gör'
        ],
        content: [
            { title: 'Nedir?', text: 'Harfleri vektör olarak kabul edip bir anahtar matrisle çarparak şifreleyen bir algoritmadır.' },
            { title: 'Nasıl çalışır?', text: '2x2 (veya daha büyük) matris kullanılarak metin bloklar halinde dönüştürülür. Çözüm için modüler matris tersi gerekir.' },
            { title: 'Küçük örnek', text: 'Anahtar matrisin tersinin alınabilmesi için determinantının alfabe uzunluğuyla aralarında asal olması zorunludur.' },
            { title: 'Güvenlik notu', text: 'Bilinen düz metin saldırısına karşı zayıftır, anahtar matris cebirsel olarak çözülebilir.' }
        ]
    },
    {
        id: 'lesson-rsa',
        level: 'advanced',
        targetAlgoId: 'rsa',
        title: 'RSA',
        difficulty: 'İleri',
        estimatedTime: '20 dk',
        objectives: [
            'Asimetrik (Açık Anahtarlı) şifrelemeyi anla',
            'Açık ve gizli anahtar farkını kavra'
        ],
        content: [
            { title: 'Nedir?', text: 'Dünyada en çok kullanılan asimetrik şifreleme algoritmalarından biridir. İki asal sayının çarpımının çarpanlarına ayrılmasının zorluğuna dayanır.' },
            { title: 'Nasıl çalışır?', text: 'Şifrelemek için herkesin bildiği Açık Anahtar (Public Key), çözmek için sadece alıcının bildiği Gizli Anahtar (Private Key) kullanılır.' },
            { title: 'Küçük örnek', text: 'Alice Bob\'a mesaj atacaksa, Bob\'un açık anahtarıyla şifreler, sadece Bob gizli anahtarıyla çözebilir.' },
            { title: 'Güvenlik notu', text: 'Laboratuvardaki uygulama eğitim amaçlıdır ve küçük sayılar kullanır. Gerçekte devasa sayılar (ör. 2048-bit) kullanılmalıdır.' }
        ]
    },
    {
        id: 'lesson-dh',
        level: 'advanced',
        targetAlgoId: 'dh',
        title: 'Diffie-Hellman',
        difficulty: 'İleri',
        estimatedTime: '15 dk',
        objectives: [
            'Anahtar değişimi kavramını anla',
            'Güvensiz ortamda güvenli haberleşmenin temelini öğren'
        ],
        content: [
            { title: 'Nedir?', text: 'İki tarafın güvensiz bir iletişim kanalı üzerinden, ortak ve gizli bir şifreleme anahtarı oluşturmasını sağlayan yöntemdir.' },
            { title: 'Nasıl çalışır?', text: 'Taraflar ortak bir asal modül ve üreteç seçer, ardından kendi gizli sayılarını kullanarak bir hesaplama yapar ve sonuçları paylaşırlar.' },
            { title: 'Küçük örnek', text: 'Doğrudan veri şifrelemez, sadece AES gibi bir algoritma için kullanılacak ortak anahtarı oluşturur.' },
            { title: 'Güvenlik notu', text: 'Laboratuvardaki örnekte küçük sayılar kullanılır (eğitim amaçlı). Ayrıca aradaki adam (MitM) saldırılarına karşı kimlik doğrulama eklenmesi gerekir.' }
        ]
    },
    {
        id: 'lesson-hash',
        level: 'advanced',
        targetAlgoId: 'hash',
        title: 'Hash Fonksiyonları',
        difficulty: 'İleri',
        estimatedTime: '10 dk',
        objectives: [
            'Tek yönlü özet (hash) fonksiyonunu kavra',
            'Veri bütünlüğü kontrolünü öğren'
        ],
        content: [
            { title: 'Nedir?', text: 'Herhangi bir boyuttaki veriyi sabit uzunlukta (örneğin 256-bit) eşsiz bir parmak izine dönüştüren işlemdir.' },
            { title: 'Nasıl çalışır?', text: 'Verideki tek bir harf bile değişse sonuç tamamen farklı olur. İşlem tek yönlüdür, sonuçtan asıl veri elde edilemez.' },
            { title: 'Küçük örnek', text: '"Merhaba" kelimesinin SHA-256 hash değeri her zaman aynı çıkar.' },
            { title: 'Güvenlik notu', text: 'Hash bir ŞİFRELEME DEĞİLDİR, geriye döndürülemez (decrypt edilemez).' }
        ]
    },
    {
        id: 'lesson-algo-compare',
        level: 'advanced',
        targetAlgoId: 'algo-compare',
        title: 'Algoritma Karşılaştırma',
        difficulty: 'İleri',
        estimatedTime: '10 dk',
        objectives: [
            'Farklı şifreleme yöntemlerini kıyasla',
            'Algoritmaların zayıflık ve avantajlarını analiz et'
        ],
        content: [
            { title: 'Nedir?', text: 'Öğrendiğiniz tüm algoritmaları yan yana koyarak özelliklerini karşılaştırabileceğiniz analiz aracıdır.' },
            { title: 'Nasıl çalışır?', text: 'Modern ve klasik algoritmaları seçerek hangi durumlarda neyin kullanıldığını özet olarak görebilirsiniz.' },
            { title: 'Küçük örnek', text: 'Asimetrik RSA ile simetrik AES veya zayıf Sezar\'ı karşılaştırabilirsiniz.' },
            { title: 'Güvenlik notu', text: 'Uygulamadaki eğitim amaçlı zayıflıkları ve gerçek dünyadaki kullanım alanlarını pekiştirir.' }
        ]
    }
];

export const LEVELS = [
    { id: 'beginner', title: 'Başlangıç' },
    { id: 'intermediate', title: 'Orta' },
    { id: 'advanced', title: 'İleri' }
];

export function getPathByLevel(levelId) {
    return LEARNING_PATH.filter(lesson => lesson.level === levelId);
}

export function getLessonById(lessonId) {
    return LEARNING_PATH.find(lesson => lesson.id === lessonId);
}

export function getNextLesson(completedIds) {
    return LEARNING_PATH.find(lesson => !completedIds.includes(lesson.id)) || null;
}
