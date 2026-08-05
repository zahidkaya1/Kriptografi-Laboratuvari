# Kriptografi Laboratuvarı

Bu proje, temel kriptografi algoritmalarının nasıl çalıştığını görselleştirmek, adım adım incelemek ve öğrenmek amacıyla geliştirilmiş interaktif bir eğitim uygulamasıdır.

- **Canlı Demo:** [https://zahidkaya1.github.io/Kriptografi-Laboratuvari/](https://zahidkaya1.github.io/Kriptografi-Laboratuvari/)
- **GitHub Deposu:** [https://github.com/zahidkaya1/Kriptografi-Laboratuvari](https://github.com/zahidkaya1/Kriptografi-Laboratuvari)

## 🚀 Özellikler
- **Modern ve Temiz Arayüz**: Tüm cihazlarda (Mobil/Tablet/Masaüstü) uyumlu tasarım.
- **Koyu / Açık Tema Desteği**: Göz yormayan tema seçenekleri.
- **Adım Adım İzleme**: Yapılan tüm matematiksel işlemlerin formülleri ve hesaplama adımları listelenir.
- **Güçlü Hata Yönetimi**: Hatalı veya güvensiz girdilere anında anlamlı Türkçe uyarılar verir.
- **Node.js Test Altyapısı**: Algoritmaların doğruluğu yerleşik `node:test` ile doğrulanmıştır.

## 🔐 Desteklenen Algoritmalar

### Modern ve Matematiksel

#### 1. RSA (Rivest–Shamir–Adleman)
Açık anahtarlı şifreleme algoritmasıdır. Eğitim amaçlı simülasyonunda küçük asal sayılar (p, q) kullanılarak anahtar üretimi ve hızlı modüler üs alma ile şifreleme/çözme işlemleri gösterilir. Kullanıcının asal sayıları girmesi sağlanır ve adım adım \(\phi(n)\), \(d\) hesabı yapılır.

#### 2. Diffie-Hellman Anahtar Değişimi
İki tarafın (Alice ve Bob) ortak ve güvensiz bir kanal üzerinden güvenli bir şekilde gizli bir anahtar (K) üzerinde anlaşmasını sağlayan yöntemdir. Asal modül (\(p\)), üreteç (\(g\)) ve tarafların gizli değerleri (\(a, b\)) alınarak süreç gösterilir.

### Klasik Şifreler *(v1.1.0 Geliştirme Aşamasındadır)*

#### 3. Vigenère Şifreleme
Polialfabetik (çoklu alfabeli) bir yerine koyma şifrelemesidir. Kullanıcının belirlediği anahtar, metin uzunluğu kadar tekrarlanır ve harflerin sayısal indeksleri modüler aritmetikle toplanarak şifrelenir. 
- Türkçe (29 Harf) ve İngilizce (26 Harf) alfabelerini destekler.
- Boşluk, rakam ve noktalama işaretlerini korur.

#### 4. Sezar Şifreleme
Tarihin en eski şifreleme yöntemlerinden biridir. Metindeki her harfi alfabede belirli bir miktar kaydırarak çalışır. Türkçe ve Latin alfabelerini destekler.

#### 5. ROT13 Şifreleme
Sezar şifrelemesinin 13 kaydırmalı özel bir türüdür. Sadece Latin alfabesinde çalışır ve şifreleme/çözme işlemleri aynıdır.

#### 6. Atbash Şifreleme
Alfabedeki harflerin baştan ve sondan eşleştirilmesi (ilk harf son harf ile) mantığına dayanır. Türkçe ve Latin alfabelerini destekler.

#### 7. Affine Şifreleme
`E(x) = (a × x + b) mod m` matematiksel formülünü kullanır. Doğru çalışabilmesi için `a` (çarpan anahtarı) ile `m` (alfabe uzunluğu) aralarında asal olmalıdır (EBOB = 1). Türkçe ve Latin alfabelerini destekler.

### Transpozisyon Şifreleri *(v1.1.0 Geliştirme Aşamasındadır)*

#### 8. Rail Fence (Zikzak) Şifreleme
Metni belirlenen sayıdaki raylara (satırlara) zikzak biçiminde yerleştirerek sütun sütun okuyan bir yer değiştirme şifrelemesidir. 

#### 9. Sütunlu Transpozisyon
Metin satırlar halinde bir tabloya yazılır ve sütunlar bir anahtar kelimenin alfabetik sırasına göre aşağı doğru okunarak şifrelenir. Aynı harfin tekrarlarında deterministik olarak soldan sağa öncelik verilir.

## 🛠️ Kullanılan Teknolojiler
- HTML5 & CSS3 (Vanilla, framework kullanılmamıştır)
- Modern JavaScript (ES6+ Modül yapısı, BigInt kullanımı)
- Node.js (Yalnızca testler için yerleşik Test Runner kullanılmıştır)

## 💻 Kurulum ve Çalıştırma

Proje tamamen statik dosyalardan (`.html`, `.css`, `.js`) oluşmaktadır.

**Tarayıcıda Çalıştırmak İçin:**
Projeyi klonladıktan sonra bir HTTP Sunucusu (Örneğin VS Code'da Live Server eklentisi veya Python yerleşik sunucusu) kullanarak çalıştırabilirsiniz.
ES6 Modül import/export kullanıldığı için dosyayı doğrudan `file://` protokolüyle çift tıklayarak açmak, tarayıcıların güvenlik politikaları (CORS) gereği JS dosyalarının yüklenmesini engelleyebilir.

```bash
# Python ile yerel sunucu başlatmak için:
python -m http.server 8000
```
Ardından tarayıcınızda `http://localhost:8000/` adresine gidin.

## 🧪 Testleri Çalıştırma
Algoritmaların arka planındaki matematik fonksiyonlarını ve hata fırlatma durumlarını test etmek için Node.js ortamında testleri çalıştırabilirsiniz.

```bash
npm install # Gerekli değilse de package.json üzerinden
npm test
```

## 📂 Proje Yapısı
```text
├── index.html                  # Ana Kullanıcı Arayüzü
├── css/
│   └── style.css               # Stil dosyası (Tüm UI / UX tasarımları)
├── js/
│   ├── app.js                  # Algoritma çağrıları ve Event Listener'lar
│   ├── utils/
│   │   ├── math.js             # EBOB, Modüler Üs/Ters vb. matematiksel işlemler
│   │   └── ui.js               # Arayüz güncellemeleri, adım listeleme
│   └── algorithms/
│       ├── rsa.js              # RSA Şifreleme / Çözme
│       ├── diffie-hellman.js   # DH Anahtar değişimi
│       └── vigenere.js         # Vigenère Şifreleme
└── tests/                      # Node.js Test Dosyaları
```

## ⚠️ Güvenlik Uyarıları
**Bu proje yalnızca eğitim ve öğrenim amaçlı geliştirilmiştir.** Gerçek dünyada veya üretim ortamında kullanılmamalıdır. Gerçek kriptografi algoritmaları, burada kullanılan küçük asallar ve basit üreteçler yerine çok yüksek bitli güvenli parametreler ve standart (örneğin padding) gerektirir.

## 👥 Geliştiriciler
- Görkem Mert
- Mehmet Zahid KAYA

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Serbestçe kullanılabilir, değiştirilebilir ve dağıtılabilir.
