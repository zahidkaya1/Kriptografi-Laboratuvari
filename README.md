# Kriptografi Laboratuvarı

Modern ve klasik kriptografi algoritmalarını tarayıcı üzerinde eğitim amaçlı deneyimlemenizi sağlayan, JavaScript tabanlı açık kaynaklı bir uygulamadır.

**Güncel Sürüm:** `v1.3.0`
**Canlı Demo:** [zahidkaya1.github.io/Kriptografi-Laboratuvari/](https://zahidkaya1.github.io/Kriptografi-Laboratuvari/)
**GitHub Deposu:** [github.com/zahidkaya1/Kriptografi-Laboratuvari](https://github.com/zahidkaya1/Kriptografi-Laboratuvari)

> [!WARNING]
> Bu proje tamamen eğitim amaçlı geliştirilmiştir. Matematiksel limitleri JavaScript dilinin yetenekleriyle (veya tarayıcı tabanlı büyük sayı işlemleriyle) sınırlıdır. **Gerçek dünya güvenliği için kullanılamaz.**

## ✨ Özellikler
- **Kategoriler:** Algoritmalar türlerine göre ayrılmış akordeon menülerle listelenir. Toplam 14 ana algoritma, 2 analiz aracı ve 2 eğitim aracı (toplam 18 etkileşimli ekran) mevcuttur.
- **Arama:** Gelişmiş algoritma arama sistemi ile büyük-küçük harfe ve Türkçe karakterlere duyarlı arama yapabilirsiniz.
- **Favoriler:** Sık kullandığınız algoritmaları favorilerinize ekleyerek hızlı erişim sağlayabilirsiniz (Yerel olarak tarayıcınızda saklanır).
- **Örnek Sistemi:** Her algoritma için hazır örnek girdileri tek tuşla doldurabilirsiniz.
- **Koyu/Açık Tema Desteği:** Sağ üstteki buton ile arayüz temasını değiştirebilirsiniz.
- **Mobil Uyumluluk:** 375 piksel ve üzeri tüm ekranlarda (telefon, tablet, masaüstü) esnek tasarım (Responsive Design).
- **Panoya Kopyalama:** Şifrelenmiş veya çözülmüş metinleri tek tıkla kopyalayabilirsiniz.
- **Detaylı Adımlar:** Şifreleme veya çözme işlemlerinin arka plandaki tüm matematiksel/dönüşüm adımlarını tablolar halinde gösterir.
- **Node.js Test Altyapısı**: Algoritmaların doğruluğu yerleşik `node:test` ile doğrulanmıştır.

## 🔐 Desteklenen Algoritmalar

### Modern / Matematiksel
- **1. RSA:** Açık anahtarlı şifreleme algoritmasıdır. Eğitim amaçlı simülasyonunda küçük asal sayılar kullanılarak süreç gösterilir.
- **2. Diffie-Hellman:** İki tarafın güvenli bir şekilde gizli bir anahtar (K) üzerinde anlaşmasını sağlayan yöntemdir.
- **3. XOR Şifreleme:** Verilerin bit/byte seviyesinde anahtarla XOR işlemine tabi tutulduğu yöntemdir. (Not: Basit repeating-key XOR tek başına modern güvenli bir şifreleme değildir).

### Kodlama ve Veri Dönüşümü
- **4. Base64 Laboratuvarı:** Verileri 64 karakterlik ASCII alfabesi ile kodlar. **Base64 bir şifreleme algoritması değildir**, yalnızca bir veri dönüşüm / kodlama (encoding) standartıdır.

### Özet (Hash) Fonksiyonları
- **5. Hash Laboratuvarı (SHA-256, SHA-384, SHA-512):** Girdileri sabit uzunlukta özet değerlerine dönüştürür. **Hash işlemleri tek yönlüdür ve şifreleme değildir.** "Şifre çözme" özelliği yoktur.

### Klasik Şifreler
- **6. Vigenère Şifreleme:** Çoklu alfabeli bir yerine koyma şifrelemesidir.
- **7. Sezar Şifreleme:** Harflerin belirli bir miktar kaydırılmasıyla çalışır.
- **8. ROT13:** Sezar şifresinin 13 kaydırmalı özel bir türüdür.
- **9. Atbash:** Alfabedeki harflerin baştan ve sondan eşleştirilmesi mantığına dayanır.
- **10. Affine:** Matematiksel `E(x) = (a × x + b) mod m` fonksiyonunu kullanır.
- **11. Playfair Şifresi:** 5x5 matris (I ve J harfleri birleştirilir) kullanarak digrafik yerine koyma yapan klasik bir yöntemdir. Dolgu X harfi ile belirsizlik eklenebilir.
- **12. Hill Şifresi:** 2x2 matris cebiri kullanarak (Latin mod 26, Türkçe mod 29) şifreleme yapar. Anahtar matrisinin modüler tersinin olması zorunludur.

### Transpozisyon Şifreleri
- **13. Rail Fence (Zikzak):** Metni zikzak şeklinde satırlara dağıtarak şifreler.
- **14. Sütunlu Transpozisyon:** Metni anahtar kelimenin alfabetik sırasına göre sütun sütun şifreler.

### Analiz ve Eğitim Araçları
- **15. Frekans Analizi:** Metindeki harflerin kullanım sıklığını gösterir.
- **16. Sezar Şifresi Kırma:** Kaba kuvvet (brute force) ile Sezar şifresini çözmeye çalışır.
- **17. Algoritma Karşılaştırma:** Seçilen algoritmaların performans ve özelliklerini yan yana karşılaştırır.
- **18. Mini Alıştırmalar:** Kriptografi teorisi hakkında soru-cevap aracıdır.

## 🛠️ Kullanılan Teknolojiler
- HTML5 & CSS3 (Vanilla, framework kullanılmamıştır)
- Modern JavaScript (ES6+ Modül yapısı, BigInt kullanımı, LocalStorage)
- `node:test` ile Sıfır Bağımlılık (Zero-Dependency) Test Altyapısı

## 💻 Kurulum ve Çalıştırma

Proje tamamen statik dosyalardan (`.html`, `.css`, `.js`) oluşmaktadır.

**Tarayıcıda Çalıştırmak İçin:**
Proje dizininde bir HTTP Sunucusu (Örn. `python -m http.server 8000`) çalıştırın ve tarayıcıda `http://localhost:8000` adresine gidin.

## 🧪 Test Sistemi
Proje için yazılan otomatik testleri çalıştırmak için (Node.js 18+ gerektirir):
```bash
npm install
npm test
```
*Not: Şu anda toplam 205 otomatik test başarıyla geçilmektedir.*

## 📂 Proje Yapısı
```
Kriptografi-Laboratuvari/
│
├── index.html                 # Ana arayüz ve DOM yapısı
├── package.json               # Proje metadata ve npm test betiği
├── CHANGELOG.md               # Sürüm notları (Değişiklik Günlüğü)
│
├── css/
│   └── style.css              # Tema ve grid stilleri
│
├── js/
│   ├── app.js                 # Ana uygulama mantığı, olay dinleyicileri
│   ├── algorithms/            # Her algoritmanın bağımsız modülleri (rsa, vigenere vb.)
│   └── utils/                 # Ortak matematik fonksiyonları (math.js), arama/favoriler (search.js, favorites.js vb.)
│
└── tests/                     # Tüm algoritmalara ait unit test (node:test) dosyaları
```

## 📜 Değişiklik Günlüğü
Yapılan sürüm güncellemeleri, eklenen yeni algoritmalar ve özellikler için lütfen [CHANGELOG.md](CHANGELOG.md) dosyasını inceleyin.

## ⚠️ Güvenlik Uyarıları
**Bu proje yalnızca eğitim ve öğrenim amaçlı geliştirilmiştir.** Gerçek dünyada veya üretim ortamında kullanılmamalıdır. Gerçek kriptografi algoritmaları, burada kullanılan küçük asallar ve basit üreteçler yerine çok yüksek bitli güvenli parametreler ve standart (örneğin padding) gerektirir.

## 👥 Geliştiriciler
- Mehmet Zahid KAYA

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Serbestçe kullanılabilir, değiştirilebilir ve dağıtılabilir.
