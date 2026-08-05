# Kriptografi Laboratuvarı

Modern ve klasik kriptografi algoritmalarını tarayıcı üzerinde eğitim amaçlı deneyimlemenizi sağlayan, JavaScript tabanlı açık kaynaklı bir uygulamadır.

**Güncel Sürüm:** `v1.2.0`  
**Canlı Demo:** [zahidkaya1.github.io/Kriptografi-Laboratuvari/](https://zahidkaya1.github.io/Kriptografi-Laboratuvari/)  
**GitHub Deposu:** [github.com/zahidkaya1/Kriptografi-Laboratuvari](https://github.com/zahidkaya1/Kriptografi-Laboratuvari)

> [!WARNING]
> Bu proje tamamen eğitim amaçlı geliştirilmiştir. Matematiksel limitleri JavaScript dilinin yetenekleriyle (veya tarayıcı tabanlı büyük sayı işlemleriyle) sınırlıdır. **Gerçek dünya güvenliği için kullanılamaz.**

## ✨ Özellikler
- **Kategoriler:** Algoritmalar türlerine göre ayrılmış akordeon menülerle listelenir.
- **Arama:** Gelişmiş algoritma arama sistemi ile büyük-küçük harfe ve Türkçe karakterlere duyarlı arama yapabilirsiniz.
- **Favoriler:** Sık kullandığınız algoritmaları favorilerinize ekleyerek hızlı erişim sağlayabilirsiniz (Yerel olarak tarayıcınızda saklanır).
- **Örnek Sistemi:** Her algoritma için hazır örnek girdileri tek tuşla doldurabilirsiniz.
- **Koyu/Açık Tema Desteği:** Sağ üstteki buton ile arayüz temasını değiştirebilirsiniz.
- **Mobil Uyumluluk:** 375 piksel ve üzeri tüm ekranlarda (telefon, tablet, masaüstü) esnek tasarım (Responsive Design).
- **Panoya Kopyalama:** Şifrelenmiş veya çözülmüş metinleri tek tıkla kopyalayabilirsiniz.
- **Detaylı Adımlar:** Şifreleme veya çözme işlemlerinin arka plandaki tüm matematiksel/dönüşüm adımlarını tablolar halinde gösterir.
- **Node.js Test Altyapısı**: Algoritmaların doğruluğu yerleşik `node:test` ile doğrulanmıştır.

## 🔐 Desteklenen Algoritmalar

### Modern ve Matematiksel

#### 1. RSA (Rivest–Shamir–Adleman)
Açık anahtarlı şifreleme algoritmasıdır. Eğitim amaçlı simülasyonunda küçük asal sayılar (p, q) kullanılarak anahtar üretimi ve hızlı modüler üs alma ile şifreleme/çözme işlemleri gösterilir. Kullanıcının asal sayıları girmesi sağlanır ve adım adım \(\phi(n)\), \(d\) hesabı yapılır.

#### 2. Diffie-Hellman Anahtar Değişimi
İki tarafın (Alice ve Bob) ortak ve güvensiz bir kanal üzerinden güvenli bir şekilde gizli bir anahtar (K) üzerinde anlaşmasını sağlayan yöntemdir. Asal modül (\(p\)), üreteç (\(g\)) ve tarafların gizli değerleri (\(a, b\)) alınarak süreç gösterilir.

### Klasik Şifreler

#### 3. Vigenère Şifreleme
Polialfabetik (çoklu alfabeli) bir yerine koyma şifrelemesidir. Kullanıcının belirlediği anahtar, metin uzunluğu kadar tekrarlanır ve harflerin sayısal indeksleri modüler aritmetikle toplanarak şifrelenir. 
- Türkçe (29 Harf) ve İngilizce (26 Harf) alfabelerini destekler.
- Boşluk, rakam ve noktalama işaretlerini korur.

#### 4. Sezar Şifreleme
Tarihin en eski şifreleme yöntemlerinden biridir. Metindeki her harfi alfabede belirli bir miktar kaydırarak çalışır. Türkçe ve Latin alfabelerini destekler.

### Analiz Araçları

#### 5. Frekans Analizi
Metin içindeki harflerin kullanım sıklığını ve yüzdelik oranlarını hesaplar. Türkçe ve İngilizce alfabelerini destekler. Harf sıklıklarını yatay çubuk grafiklerle görselleştirir.

#### 6. Sezar Şifresi Kırma (Brute Force)
Şifrelenmiş bir metni tüm olası Sezar kaydırmalarını deneyerek kırar. Sonuçları Türkçe veya İngilizce dil yapılarına (harf frekanslarına) olan uygunluk puanlarına (Ki-kare yöntemi) göre yaklaşık olarak sıralar.

#### 5. ROT13 Şifreleme
Sezar şifrelemesinin 13 kaydırmalı özel bir türüdür. Sadece Latin alfabesinde çalışır ve şifreleme/çözme işlemleri aynıdır.

#### 6. Atbash Şifreleme
Alfabedeki harflerin baştan ve sondan eşleştirilmesi (ilk harf son harf ile) mantığına dayanır. Türkçe ve Latin alfabelerini destekler.

#### 7. Affine Şifreleme
`E(x) = (a × x + b) mod m` matematiksel formülünü kullanır. Doğru çalışabilmesi için `a` (çarpan anahtarı) ile `m` (alfabe uzunluğu) aralarında asal olmalıdır (EBOB = 1). Türkçe ve Latin alfabelerini destekler.

### Eğitim Araçları

#### 7. Algoritma Karşılaştırma
Farklı şifreleme algoritmalarının yapısal, matematiksel ve güvenlik özelliklerini yan yana karşılaştırmanızı sağlayan eğitim aracıdır.

#### 8. Mini Alıştırmalar
Kriptografi bilginizi sınamak için interaktif soru-cevap aracıdır. Seviyelere (kolay, orta, zor) ayrılmış çoktan seçmeli ve açık uçlu sorular içerir.

### Transpozisyon Şifreleri

#### 8. Rail Fence (Zikzak) Şifreleme
Metni belirlenen sayıdaki raylara (satırlara) zikzak biçiminde yerleştirerek sütun sütun okuyan bir yer değiştirme şifrelemesidir. 

#### 9. Sütunlu Transpozisyon
Metin satırlar halinde bir tabloya yazılır ve sütunlar bir anahtar kelimenin alfabetik sırasına göre aşağı doğru okunarak şifrelenir. Aynı harfin tekrarlarında deterministik olarak soldan sağa öncelik verilir.

## 🛠️ Kullanılan Teknolojiler
- HTML5 & CSS3 (Vanilla, framework kullanılmamıştır)
- Modern JavaScript (ES6+ Modül yapısı, BigInt kullanımı, LocalStorage)
- `node:test` ile Sıfır Bağımlılık (Zero-Dependency) Test Altyapısı

## 💻 Kurulum ve Çalıştırma

Proje tamamen statik dosyalardan (`.html`, `.css`, `.js`) oluşmaktadır.

**Tarayıcıda Çalıştırmak İçin:**
Projeyi klonladıktan sonra bir HTTP Sunucusu (Örneğin VS Code'da Live Server eklentisi veya Python yerleşik sunucusu) kullanarak çalıştırabilirsiniz.

```bash
# Python ile yerel sunucu başlatmak için:
python -m http.server 8000
```
Ardından tarayıcınızda `http://localhost:8000/` adresine gidin.

## 🧪 Test Sistemi
Projeye ait algoritmalar ve yardımcı modüller için kapsamlı otomatik testler bulunmaktadır.

Testleri yerelinizde çalıştırmak için (Node.js 18+ gerektirir):
```bash
npm install
npm test
```
*Not: Şu anda toplam 135 otomatik test başarıyla geçilmektedir.*

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
