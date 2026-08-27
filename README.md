# 🔐 Kriptografi Laboratuvarı

Etkileşimli kriptografi algoritmaları, analiz araçları ve eğitim modülleri sunan web tabanlı kriptografi laboratuvarı.

[![Sürüm](https://img.shields.io/github/v/release/zahidkaya1/Kriptografi-Laboratuvari?color=blue&label=S%C3%BCr%C3%BCm)](https://github.com/zahidkaya1/Kriptografi-Laboratuvari/releases/latest)
![Durum](https://img.shields.io/badge/Durum-Feature_Complete-success)
![Test](https://img.shields.io/badge/Test-325_/_325-success)
![JavaScript](https://img.shields.io/badge/Code-JavaScript-F7DF1E?logo=javascript&logoColor=black)
[![Canlı Site](https://img.shields.io/badge/Canl%C4%B1_Site-GitHub_Pages-blue?logo=github)](https://zahidkaya1.github.io/Kriptografi-Laboratuvari/)

<br/>

🌐 **[Canlı Uygulamayı Aç](https://zahidkaya1.github.io/Kriptografi-Laboratuvari/)** &nbsp;|&nbsp; 📦 **[Son Sürüm](https://github.com/zahidkaya1/Kriptografi-Laboratuvari/releases/latest)**

Modern ve klasik kriptografi algoritmalarını tarayıcı üzerinde eğitim amaçlı deneyimlemenizi sağlayan, JavaScript tabanlı açık kaynaklı bir uygulamadır. v1.5.0 ile birlikte proje **Final / Feature Complete (Özellik Tamamlanmış)** durumuna ulaşmış olup, kapsamlı bir eğitim deneyimi ve güvenilir araçlar sunmaktadır.

> [!WARNING]
> Bu proje tamamen eğitim amaçlı geliştirilmiştir. Matematiksel limitleri JavaScript dilinin yetenekleriyle (veya tarayıcı tabanlı büyük sayı işlemleriyle) sınırlıdır. **Gerçek dünya güvenliği için kullanılamaz.**

## ✨ Özellikler ve Araçlar
Toplam **21** interaktif ekrandan oluşan Kriptografi Laboratuvarı, aşağıdaki alt kategorilere ayrılmıştır:
- **Kategoriler:** Toplam 14 ana şifreleme/kodlama/hash algoritması, 2 analiz aracı ve 5 eğitim aracı mevcuttur.
- **Arama:** Gelişmiş algoritma arama sistemi ile büyük-küçük harfe ve Türkçe karakterlere duyarlı arama yapabilirsiniz.
- **Favoriler:** Sık kullandığınız algoritmaları favorilerinize ekleyerek hızlı erişim sağlayabilirsiniz.
- **Detaylı Adımlar:** Şifreleme veya çözme işlemlerinin arka plandaki tüm matematiksel/dönüşüm adımlarını tablolar halinde gösterir.
- **Sıfır Bağımlılık (Zero-Dependency):** Test altyapısı da dahil olmak üzere (`node:test`) herhangi bir harici kütüphane kullanılmamıştır.
- **Mobil Uyumluluk & Temalar:** Koyu/Açık tema desteği ve 375px'den 1440px'e kadar tam duyarlı tasarım.

## 🎓 Eğitim Deneyimi (v1.4.0 Yenilikleri)

### 1. Rehberli Öğrenme
Kriptografiye yeni başlayanlar için hazırlanmış **17 derslik yapılandırılmış bir öğrenme yoludur.**
- Başlangıç, Orta ve İleri seviyeler.
- Her ders için Tamamlandı / Tamamlanmadı durumu.
- Sistemin size "Sıradaki Ders" olarak öneride bulunması.

### 2. Karışık Quiz Sistemi
Öğrendiklerinizi test etmek için tasarlanmış, **17 farklı konu ve toplam 255 quiz sorusu** içeren zengin bir soru havuzudur.
- **Konu Filtresi:** İster belirli bir algoritmayı, ister tüm konuları seçin.
- **Zorluk Filtresi:** Kolay, Orta, Zor ve Karışık seçenekleri.
- **Dinamik Soru Sayısı:** Havuzdaki soru durumuna göre otomatik ayarlanan 5, 10 veya 15 soruluk quiz boyutları.
- Anlık Türkçe Doğru/Yanlış geribildirimi.

### 3. Mini Alıştırmalar
Kriptografi teorisi hakkında interaktif soru-cevap aracıdır. Doğruluk oranı, güncel seri ve geliştirilebilecek konularınızı analiz eder.

### 4. Eğitim İlerlemesi Ekranı
Rehberli Öğrenme, Mini Alıştırmalar ve Karışık Quiz istatistiklerinizi tek bir ekranda görebileceğiniz özet panosudur. Size otomatik olarak sonraki adımı önerir.

> [!NOTE]
> **Gizlilik ve Veri Saklama (Privacy):** Eğitim ilerlemeniz, favorileriniz ve ayarlarınız tamamen tarayıcınızın Yerel Depolamasında (LocalStorage) saklanır. Ham quiz cevaplarınız veya işlem yaptığınız şifreli metinler asla kaydedilmez veya bir sunucuya gönderilmez. Sadece ilerleme yüzdesi ve doğru/yanlış sayıları gibi özet istatistikler tutulur (Local-first yaklaşım).

## 🧰 v1.5.1 Bakım Güncellemesi

v1.5.1, Feature Complete durumundaki projenin kullanıcı deneyimi, navigasyon, görsel tutarlılık ve regresyon güvenliğine odaklanan bakım sürümüdür.

- Ana Sayfa, Araçlar, Öğrenme ve Karışık Quiz akışları daha belirgin hale getirildi.
- Açık/koyu tema, kartlar, formlar, butonlar ve navigasyon bileşenleri görsel olarak iyileştirildi.
- Bağlama duyarlı geri dönüş bağlantıları ve mobil navigasyon geliştirildi.
- Rehberli Öğrenme ve Mini Alıştırmalar içindeki son görsel tutarsızlıklar giderildi.
- Otomatik test kapsamı **325 / 325** başarılı teste çıkarıldı.

## 🛡️ v1.5.0 Kalite Özellikleri
- **Mobil Uyum (Responsive):** 375px'den geniş ekranlara kadar kayıpsız çalışan form ve kart düzenleri.
- **Erişilebilirlik (A11y):** `focus-visible` ile tam destekli klavye navigasyonu.
- **Güvenli Render:** Kullanıcı girdilerinde ve şifreleme çıktılarında XSS ve script injection risklerine karşı sıkılaştırılmış escape katmanları.
- **Sağlamlık:** Kodlama (UTF-8), sözdizimi ve 293 adet otomatik regression testinden geçen kararlı (stable) yapı.


## 🔍 Desteklenen Algoritmalar

### Modern / Matematiksel
- **RSA, Diffie-Hellman, XOR Şifreleme**

### Klasik Şifreler
- **Vigenère, Sezar, ROT13, Atbash, Affine, Playfair, Hill**

### Transpozisyon Şifreleri
- **Rail Fence (Zikzak), Sütunlu Transpozisyon**

### Veri Dönüşümü ve Özet
- **Base64 Kodlama, Hash Fonksiyonları (SHA-256, SHA-384, SHA-512)**

### Analiz Araçları
- **Frekans Analizi, Sezar Şifresi Kırma (Brute Force)**

### Eğitim Araçları
- **Algoritma Karşılaştırma, Rehberli Öğrenme, Karışık Quiz, Mini Alıştırmalar, Eğitim İlerlemesi**

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
*Not: Şu anda toplam 325 otomatik test sıfır hatayla başarıyla geçilmektedir.*

## 📜 Değişiklik Günlüğü
Yapılan sürüm güncellemeleri, eklenen yeni algoritmalar ve özellikler için lütfen [CHANGELOG.md](CHANGELOG.md) dosyasını inceleyin.

## ⚠️ Güvenlik Uyarıları
**Bu proje yalnızca eğitim ve öğrenim amaçlı geliştirilmiştir.** Gerçek dünyada veya üretim ortamında kullanılmamalıdır. Gerçek kriptografi algoritmaları, burada kullanılan küçük asallar ve basit üreteçler yerine çok yüksek bitli güvenli parametreler ve standart (örneğin padding) gerektirir.

## 👥 Geliştiriciler
- Mehmet Zahid KAYA

## 📄 Lisans
Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Serbestçe kullanılabilir, değiştirilebilir ve dağıtılabilir.
