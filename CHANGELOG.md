# Değişiklik Günlüğü

## [1.4.0] - 2026-08-10

### Eklendi
- 17 derslik Rehberli Öğrenme
- 3 seviyeli öğrenme yolu
- Karışık Quiz
- 255 soruluk quiz havuzu
- 17 quiz konusu
- dinamik quiz soru sayısı
- Eğitim İlerlemesi
- quiz progress sistemi

### İyileştirildi
- eğitim ekranları arası SPA navigasyonu
- kullanıcı dostu konu isimleri
- quiz question runtime contract
- true/false Türkçe feedback
- eğitim ekranlarının kullanıcı deneyimi

### Düzeltildi
- Karışık Quiz ve Eğitim İlerlemesi boş ekran sorunu
- quiz içinde undefined soru sorunu
- 1/5 sonrası oturumun erken bitmesi
- ham internal ID gösterimi
- çalışmayan eğitim navigasyon butonları

## [1.3.0] - 2026-08-09

### Eklendi (Added)
- XOR Şifreleme
- Base64 Laboratuvarı
- Hash Laboratuvarı (SHA-256, SHA-384, SHA-512)
- Playfair Şifresi
- Hill Şifresi

### Geliştirildi (Improved)
- Algoritma katalog/kategori entegrasyonu.
- Yeni araçların arama ve favori desteği eklendi.
- Algoritma Karşılaştırma metadata güncellemeleri yapıldı (Base64 ve Hash, şifreleme olarak işaretlenmedi).
- Playfair/Hill menü entegrasyonu düzeltildi.
- Merkezi ve deterministik copy feedback sistemi oluşturuldu.
- Encoding kontrolü yaygın Mojibake dizilerini kapsayacak şekilde genişletildi.

### Düzeltildi (Fixed)
- Playfair ve Hill algoritmalarının menüde görünmemesi sorunu giderildi.
- Runtime panoya kopyalama sonrasında yaşanan emoji encoding (Mojibake) hatası, innerHTML restore mekanizmasıyla kökünden çözüldü.
- Kalan Türkçe karakter/encoding kalıntıları temizlendi.

## [1.2.0] - 2026-08-05

### Eklendi

- Frekans Analizi
- Sezar Şifresi Kırma
- Algoritma Karşılaştırma
- Mini Alıştırmalar
- Algoritma ve zorluk filtreleri
- Ki-kare tabanlı yaklaşık Sezar aday sıralaması
- Kalıcı alıştırma ilerlemesi
- Analiz Araçları kategorisi
- Eğitim Araçları kategorisi

### Değiştirildi

- Algoritma kataloğu analiz ve eğitim araçlarını kapsayacak biçimde genişletildi.
- Geliştirici bilgisi yalnızca Mehmet Zahid KAYA olarak güncellendi.
- Arama ve favori sistemi yeni araçlarla entegre edildi.
- Eğitim içerikleri ve güvenlik açıklamaları geliştirildi.

### Teknik

- Toplam test sayısı 135'e çıkarıldı ve tamamı başarıyla geçildi (135/135).
- Hiçbir harici bağımlılık eklenmeden geliştirildi.
- Analiz araçlarında (Frekans analizi ve Sezar kırma) güvenlik ve performans amacıyla 10.000 karakterlik üst sınır uygulandı.
- Yeni saf ve test edilebilir analiz/eğitim modülleri yazıldı.

## [1.1.0] - 2026-08-05

### Eklendi

- Sezar şifreleme
- ROT13
- Atbash
- Affine şifreleme
- Rail Fence
- Sütunlu Transpozisyon
- Algoritma kategorileri
- Açılır/kapanır kategori menüleri
- Algoritma arama sistemi
- Favori algoritmalar
- Standart örnek doldurma sistemi
- Yeni otomatik testler

### Değiştirildi

- Vigenère ortak alfabe yardımcılarını kullanacak şekilde düzenlendi.
- Mobil algoritma seçimi geliştirildi.
- İşlem tabloları ve algoritma bilgi alanları standartlaştırıldı.

### Teknik

- 84 test çalıştırıldı ve tamamı başarıyla geçildi (84/84).
- Yeni özelliklerde herhangi bir dış bağımlılık eklenmeden standart HTML, CSS, ve yerel Vanilla JS API'leri (LocalStorage vb.) kullanıldı.

## [1.0.0] - 2026-08-05

- RSA, Diffie–Hellman ve Vigenère algoritmalarının ilk kararlı sürümü.
- Responsive arayüz, tema sistemi ve otomatik test altyapısı.
