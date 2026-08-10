import { runCaesar } from '../algorithms/caesar.js';
import { runROT13 } from '../algorithms/rot13.js';
import { runAtbash } from '../algorithms/atbash.js';
import { runVigenere } from '../algorithms/vigenere.js';
import { runAffine } from '../algorithms/affine.js';
import { runRailFence } from '../algorithms/rail-fence.js';
import { runColumnarTransposition } from '../algorithms/columnar-transposition.js';
import { runRSA } from '../algorithms/rsa.js';
import { runDiffieHellman } from '../algorithms/diffie-hellman.js';
import { analyzeFrequency } from '../analysis/frequency-analysis.js';

/**
 * Alıştırma şablonları (Generator Functions)
 * type: 'text' | 'multiple-choice' | 'true-false'
 * difficulty: 'easy' | 'medium' | 'hard'
 */
export const EXERCISE_TEMPLATES = [
    {
        id: "rot13_e1",
        algoId: "rot13",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "ROT13 şifrelemesinde anahtar değeri nedir?",
            options: ["3","13","26","Anahtar yoktur"],
            answer: "13",
            hint: "Adı üzerinde, alfabede harfleri sabit bir miktar kaydırır.",
            explanation: "ROT13 (Rotate by 13 places), Sezar şifrelemesinin anahtar değerinin 13 olarak sabitlendiği özel bir versiyonudur."
        })
    },
    {
        id: "rot13_e2",
        algoId: "rot13",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "ROT13 algoritması iki kez art arda uygulanırsa orijinal metin elde edilir.",

            answer: "true",
            hint: "Alfabede 26 harf vardır, 13+13=26.",
            explanation: "26 harfli standart alfabede 13 ileri kaydırmak ve bir daha 13 ileri kaydırmak, toplam 26 kaydırma (yani tam bir tur) anlamına gelir. Bu yüzden ROT13 kendi kendisinin tersidir."
        })
    },
    {
        id: "rot13_e3",
        algoId: "rot13",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Aşağıdaki durumlardan hangisinde ROT13 kullanmak GÜVENLİDİR?",
            options: ["Kredi kartı bilgilerini saklarken","Veritabanı şifrelerinde","Spoiler (sürprizbozan) metinleri gizlemede","Askeri iletişimde"],
            answer: "Spoiler (sürprizbozan) metinleri gizlemede",
            hint: "ROT13'ün kriptografik bir güvenliği yoktur. Sadece göz ucuyla okunmayı engeller.",
            explanation: "ROT13'ün anahtarı sabit olduğu için kırmak saniyeler sürer. Yalnızca kazara okunmasını istemediğimiz günlük metinlerde (spoiler gibi) kullanılır."
        })
    },
    {
        id: "rot13_e4",
        algoId: "rot13",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "ROT13 ile 'A' harfi şifrelenirse hangi harf elde edilir? (İngilizce alfabe)",

            answer: "N",
            hint: "A=1, 1+13=14. harf",
            explanation: "A harfi 13 sıra ileri kaydırıldığında N harfine dönüşür."
        })
    },
    {
        id: "rot13_e5",
        algoId: "rot13",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "ROT13 şifrelemesi rakamları ve noktalama işaretlerini de şifreler.",

            answer: "false",
            hint: "'Rotate' işlemi sadece harfler içindir.",
            explanation: "Klasik ROT13 sadece A-Z ve a-z harflerini kaydırır, diğer karakterleri olduğu gibi bırakır."
        })
    },
    {
        id: "rot13_m1",
        algoId: "rot13",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "ROT13 ile şifrelenmiş 'HELLO' kelimesinin şifreli hali nedir?",

            answer: "URYYB",
            hint: "H->U, E->R, L->Y, L->Y, O->B",
            explanation: "Her harf 13 adım kayar: H(8)+13=21(U), E(5)+13=18(R)..."
        })
    },
    {
        id: "rot13_m2",
        algoId: "rot13",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "ROT13 algoritması hangi kriptografik sınıfa girer?",
            options: ["Yerine Koyma (Substitution)","Yer Değiştirme (Transposition)","Asimetrik Şifreleme","Açık Anahtarlı Şifreleme"],
            answer: "Yerine Koyma (Substitution)",
            hint: "Harflerin yerleri değişmiyor, kendileri başka harflerle değişiyor.",
            explanation: "ROT13, her harfin yerine alfabede 13 sıra sonrasındaki harfin konulduğu basit bir yerine koyma (substitution) şifresidir."
        })
    },
    {
        id: "rot13_m3",
        algoId: "rot13",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "ROT13 ile şifrelenmiş 'URYYB' metnini çözerseniz hangi kelime elde edilir?",

            answer: "HELLO",
            hint: "ROT13 kendi kendisinin tersidir.",
            explanation: "ROT13 algoritmasını şifreli metne tekrar uygularsanız (13 kaydırma) orijinal metne ulaşırsınız."
        })
    },
    {
        id: "rot13_m4",
        algoId: "rot13",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Türkçe alfabeye (29 harf) klasik ROT13 mantığını aynen uygularsak, şifreleme ve deşifreleme işlemleri için aynı fonksiyon (13 kaydırma) kullanılamaz.",

            answer: "true",
            hint: "26 harfte 13+13=26 (başa döner). 29 harfte 13+13=26 (başa dönmez).",
            explanation: "ROT13'ün 'kendi kendinin tersi olma' özelliği, alfabedeki harf sayısının yarısı (26/2=13) kadar kaydırma yapmasına dayanır. 29 harfli alfabenin yarısı tam sayı değildir."
        })
    },
    {
        id: "rot13_m5",
        algoId: "rot13",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Bir metne sırasıyla ROT13, Sezar (Anahtar: 5) ve tekrar ROT13 uygularsanız, sonuç aşağıdakilerden hangisine eşdeğer olur?",
            options: ["Metin orijinal haline döner","Sadece Sezar (Anahtar: 5) uygulanmış gibi olur","Sadece ROT13 uygulanmış gibi olur","Sezar (Anahtar: 18) uygulanmış gibi olur"],
            answer: "Sadece Sezar (Anahtar: 5) uygulanmış gibi olur",
            hint: "ROT13'ü iki kere uygulamak hiçbir şey yapmamak demektir.",
            explanation: "ROT13 + ROT13 = 0 kaydırma demektir. Geriye sadece Sezar (Anahtar: 5) kaydırması kalır (toplama işlemi yer değiştirebilir olduğundan sıra önemli değildir)."
        })
    },
    {
        id: "rot13_h1",
        algoId: "rot13",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Modern şifreleme algoritmaları yerine ROT13 kullanılmasının sisteminizde yaratacağı en büyük zafiyet hangisidir?",
            options: ["Anahtar uzayının sadece 1 olması (hemen kırılabilmesi)","Algoritmanın çok yavaş çalışması","Büyük dosyalarda veri kaybı yaşatması","Sadece İngilizce karakterleri desteklemesi"],
            answer: "Anahtar uzayının sadece 1 olması (hemen kırılabilmesi)",
            hint: "Güvenlik anahtarın gizliliğine dayanmalıdır. ROT13'te gizli bir anahtar bile yoktur.",
            explanation: "ROT13'ün gizli bir anahtarı yoktur, her zaman 13 kaydırır. Bu nedenle saldırgan, metnin ROT13 ile şifrelendiğini bildiği an saniyeler içinde çözebilir (Kerckhoffs Prensibi ihlali)."
        })
    },
    {
        id: "rot13_h2",
        algoId: "rot13",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Sadece A-Z harflerini kullanan özel bir alfabemiz 40 harften oluşsaydı, ROT13'ün 'kendi kendisinin tersi olma' özelliğini sağlayan yeni 'ROT-X' algoritması için X kaç olmalıydı?",

            answer: "20",
            hint: "26 harfli alfabede 13.",
            explanation: "Kendi kendisinin tersi olabilmesi için tam bir döngüyü iki adımda tamamlamalıdır. Bu da alfabe uzunluğunun yarısıdır (40/2 = 20)."
        })
    },
    {
        id: "rot13_h3",
        algoId: "rot13",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Kriptografi Laboratuvarı uygulamasında Türkçe karakterler (Ö, Ç, Ş vb.) ROT13 ile nasıl işlenmektedir?",
            options: ["Şifrelenmeden olduğu gibi bırakılır","İngilizce karşılıklarına çevrilip şifrelenir (Ö->O)","Hata verir ve şifrelemez","29 harfli alfabeye göre özel kaydırılır"],
            answer: "Şifrelenmeden olduğu gibi bırakılır",
            hint: "Klasik ROT13 sadece ASCII [a-zA-Z] aralığını hedefler.",
            explanation: "Standart ROT13 implementasyonları sadece İngilizce alfabedeki harfleri kapsar, Türkçe özel karakterleri noktalama işareti gibi değerlendirip değiştirmeden bırakır."
        })
    },
    {
        id: "rot13_h4",
        algoId: "rot13",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde şifrelenmiş çok uzun bir metin var. Frekans analizi yaptığınızda en çok geçen harfin 'R' olduğunu gördünüz. İngilizcede en çok geçen harfin 'E' olduğunu biliyorsanız, bu metin muhtemelen hangi algoritmayla şifrelenmiştir?",
            options: ["ROT13","Sezar (Anahtar: 5)","Vigenere","Atbash"],
            answer: "ROT13",
            hint: "E(5) -> R(18) arasındaki fark nedir? 18-5 = 13.",
            explanation: "İngilizcede en sık geçen harf E'dir. Eğer şifreli metinde en sık R geçiyorsa ve E ile R arasında tam 13 harf fark varsa, bu yüksek ihtimalle ROT13'tür."
        })
    },
    {
        id: "rot13_h5",
        algoId: "rot13",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Bir ROT13 şifreli metnin Vigenère algoritmasıyla (örneğin anahtar 'NNNN' ise) şifresinin çözülmesi matematiksel olarak imkansızdır.",

            answer: "false",
            hint: "N harfi alfabenin neresinde? A=0 ise N=13'tür.",
            explanation: "Vigenère şifrelemesinde anahtarın sadece 'N' harflerinden oluşması, metni sürekli 13 sıra kaydırmak demektir. Yani ROT13 ile tamamen aynı işlemi yapar."
        })
    },
    {
        id: "atbash_e1",
        algoId: "atbash",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Atbash şifrelemesinin temel mantığı nedir?",
            options: ["Alfabeyi sondan başa doğru ters çevirmek","Harfleri 3 sıra ileri kaydırmak","Kelime harflerinin yerini karıştırmak","Matematiksel asal sayılar kullanmak"],
            answer: "Alfabeyi sondan başa doğru ters çevirmek",
            hint: "Z -> A, Y -> B, X -> C",
            explanation: "Atbash, İbranice alfabesinden türemiş tarihi bir şifrelemedir. İlk harf son harfle, ikinci harf sondan ikinci harfle değiştirilir."
        })
    },
    {
        id: "atbash_e2",
        algoId: "atbash",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Atbash algoritmasının şifreleme ve şifre çözme işlemleri tamamen aynıdır.",

            answer: "true",
            hint: "A -> Z yapıyorsa, Z -> ? yapar.",
            explanation: "Alfabe simetrik olarak ters çevrildiği için A yerine Z geliyorsa, Z yerine de doğal olarak A gelir. İşlemi bir kez daha uygulamak orijinal metni verir."
        })
    },
    {
        id: "atbash_e3",
        algoId: "atbash",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Atbash şifrelemesi için kaç farklı anahtar (key) kombinasyonu vardır?",
            options: ["1","26","Sonsuz","256"],
            answer: "1",
            hint: "Seçebileceğiniz bir parametre/şifre var mı?",
            explanation: "Atbash'ın kuralı sabittir (alfabeyi ters çevir). Dışarıdan girilen bir anahtarı olmadığı için yalnızca tek bir kombinasyonu vardır."
        })
    },
    {
        id: "atbash_e4",
        algoId: "atbash",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "İngilizce alfabeye göre Atbash şifrelemesinde 'A' harfi hangi harfe dönüşür?",

            answer: "Z",
            hint: "Alfabenin son harfidir.",
            explanation: "Atbash ilk harfi son harfe eşleştirir."
        })
    },
    {
        id: "atbash_e5",
        algoId: "atbash",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Tarihsel olarak Atbash şifrelemesi ilk hangi dilde kullanılmıştır?",
            options: ["İbranice","Latince","Yunanca","Arapça"],
            answer: "İbranice",
            hint: "Adı Aleph, Tav, Beth, Shin harflerinden gelir.",
            explanation: "Atbash adı İbranice alfabesinin ilk harfi (Aleph) ile son harfinin (Tav), ikinci harfi (Beth) ile sondan ikinci harfinin (Shin) değiştirilmesinden gelmektedir."
        })
    },
    {
        id: "atbash_m1",
        algoId: "atbash",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Atbash ile 'BOY' kelimesini şifrelediğinizde ne elde edersiniz? (İngilizce alfabe)",

            answer: "YLB",
            hint: "B->Y, O->L, Y->B",
            explanation: "B(sondan 25), O(sondan 12), Y(sondan 2). B->Y, O->L, Y->B."
        })
    },
    {
        id: "atbash_m2",
        algoId: "atbash",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Atbash ile aynı şifreleme mantığına sahip olan modern bir yer değiştirme konsepti aşağıdakilerden hangisidir?",
            options: ["Simetrik yerine koyma","Asimetrik anahtarlama","Blok şifreleme zinciri (CBC)","Kriptografik özetleme (Hashing)"],
            answer: "Simetrik yerine koyma",
            hint: "Karşılıklı eşleşme söz konusudur.",
            explanation: "Atbash, çift yönlü ve simetrik bir 'yerine koyma' (substitution) algoritmasıdır."
        })
    },
    {
        id: "atbash_m3",
        algoId: "atbash",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Bir kelime hem şifresiz hem de Atbash ile şifrelendiğinde aynı harflerden oluşuyorsa, bu kelimedeki tüm harfler alfabenin tam ortasındaki iki harf olmalıdır.",

            answer: "false",
            hint: "Alfabenin ilk ve son harfini içeren kelimeler şifrelendiğinde ne olur?",
            explanation: "Örneğin 'AZ' kelimesi Atbash ile 'ZA' olur. Harfler aynı kalmış ama yerleri değişmiştir. Ancak harf bazında değişmemesi isteniyorsa alfabenin ortasında kendine eşleşen harf yoktur (26 harfte)."
        })
    },
    {
        id: "atbash_m4",
        algoId: "atbash",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Atbash algoritmasında 'A' harfi 1. sırada, 'Z' harfi 26. sıradadır. Bir harfin sırasına N dersek, şifrelenmiş harfin sırasını veren matematiksel formül (27 - N)'dir. Bu formüle göre 5. sıradaki 'E' harfi kaçıncı sıradaki harfe dönüşür?",

            answer: "22",
            hint: "27 - 5 = ?",
            explanation: "E alfabenin 5. harfidir. Atbash'ta 27 - 5 = 22. harfe (V) dönüşür."
        })
    },
    {
        id: "atbash_m5",
        algoId: "atbash",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer Türkçe alfabeye (29 harf) Atbash uygularsak, şifrelendiğinde değişmeyen TEK harf hangisi olur?",
            options: ["L","M","N","O"],
            answer: "L",
            hint: "29 harfin tam ortasındaki (15.) harf hangisidir?",
            explanation: "29 harfli alfabenin ortasındaki 15. harf 'L'dir. Baştan 15. harf ile sondan 15. harf aynı olduğu için Atbash işleminde 'L' harfi yine 'L' olarak kalır."
        })
    },
    {
        id: "atbash_h1",
        algoId: "atbash",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Atbash algoritması bir Affine (Afin) şifresi olarak matematiksel olarak nasıl ifade edilebilir? (E(x) = (ax + b) mod 26)",
            options: ["a = 25, b = 25","a = 1, b = 25","a = 25, b = 1","a = -1, b = 0"],
            answer: "a = 25, b = 25",
            hint: "25, modulo 26'da -1'e denktir.",
            explanation: "Atbash alfabeyi ters çevirir, bu E(x) = (-x - 1) mod 26 olarak düşünülebilir. -1 mod 26'da 25'tir. Bu yüzden formül E(x) = (25x + 25) mod 26'dır."
        })
    },
    {
        id: "atbash_h2",
        algoId: "atbash",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Eğer 'Z' harfinin 0'a denk geldiği 0-25 indeksli bir sistem kullansaydık, 'A' harfi Atbash sonucunda hangi indekse dönüşürdü? (A=25)",

            answer: "0",
            hint: "Son harf Z(0) ise, ilk harf A(25)'tir.",
            explanation: "Standart 0-25 haritalamasında A=0, Z=25'tir ve Atbash 25-x'tir. Eğer tersten Z=0, A=25 tanımlarsak A'nın Atbash eşleşmesi (yani Z) 0 numaralı indeks olacaktır."
        })
    },
    {
        id: "atbash_h3",
        algoId: "atbash",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Frekans analizi kullanarak, sadece Atbash ve Sezar algoritmalarıyla şifrelenmiş iki farklı uzun metni ayırt etmek mümkündür.",

            answer: "true",
            hint: "Atbash'ta en çok geçen harf Z olur mu?",
            explanation: "İngilizcede E en sık geçen harftir. Atbash'ta V'ye dönüşür, Atbash'ın tek bir sonucu vardır. Sezar ise anahtara göre E'yi herhangi bir harfe dönüştürebilir. Ortak harf dağılımı desenlerinden bu ikisi ayrıştırılabilir."
        })
    },
    {
        id: "atbash_h4",
        algoId: "atbash",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "İkili (binary) sistemde, Atbash mantığındaki 'tersine çevirme' işlemi hangi mantıksal kapıya (logic gate) benzer?",
            options: ["NOT (Değil)","AND (Ve)","XOR (Dışlayan Veya)","OR (Veya)"],
            answer: "NOT (Değil)",
            hint: "0'ı 1, 1'i 0 yapar.",
            explanation: "Atbash bir spektrumun bir ucunu diğer ucuna yansıtır. İkili sistemde (sadece 0 ve 1) bu işlemi yapan kapı NOT kapısıdır (0->1, 1->0)."
        })
    },
    {
        id: "atbash_h5",
        algoId: "atbash",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde şifreli 'ZYX' metni var. Bunun sırasıyla Atbash, Atbash ve tekrar Atbash ile şifrelendiğini biliyorsunuz. Orijinal metin nedir?",
            options: ["ABC","ZYX","CBA","XYZ"],
            answer: "ABC",
            hint: "Atbash'ı tek sayıda (1,3,5...) uygulamak, bir kere uygulamakla aynıdır.",
            explanation: "Atbash + Atbash birbirini iptal eder (orijinale döner). Geriye sadece sonuncu Atbash kalır. ZYX'in Atbash ile çözülmüş (ters çevrilmiş) hali ABC'dir."
        })
    },
    {
        id: "caesar_e1",
        algoId: "caesar",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Sezar Şifresi (Caesar Cipher) hangi tür bir kriptografik algoritmadır?",
            options: ["Yerine Koyma (Substitution)","Simetrik Olmayan (Asimetrik)","Kriptografik Özet (Hash)","Açık Anahtarlı"],
            answer: "Yerine Koyma (Substitution)",
            hint: "Harfler alfabede kaydırılarak yerlerine yenileri konur.",
            explanation: "Sezar şifresi, her harfin alfabede belirli bir sayı (anahtar) kadar ileri kaydırıldığı klasik bir 'yerine koyma' şifresidir."
        })
    },
    {
        id: "caesar_e2",
        algoId: "caesar",
        difficulty: "easy",
        type: "numeric",
        generate: () => ({
            question: "Klasik Jül Sezar'ın askeri iletişimde kullandığı orijinal kaydırma (anahtar) değeri kaçtır?",

            answer: "3",
            hint: "A harfi D harfine dönüşüyordu.",
            explanation: "Tarihsel olarak Jül Sezar mesajlarını alfabede 3 harf sağa kaydırarak şifrelemiştir."
        })
    },
    {
        id: "caesar_e3",
        algoId: "caesar",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Anahtar değeri 1 olan Sezar şifresi ile 'HAL' kelimesini şifrelerseniz hangi kelimeyi elde edersiniz? (İngilizce)",

            answer: "IBM",
            hint: "H'den sonra I, A'dan sonra B, L'den sonra M gelir.",
            explanation: "Film tarihine geçmiş ünlü bir göndermedir (2001 A Space Odyssey). H->I, A->B, L->M."
        })
    },
    {
        id: "caesar_e4",
        algoId: "caesar",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Sezar şifresi günümüzde kredi kartı şifrelerini korumak için güvenle kullanılabilir.",

            answer: "false",
            hint: "En ilkel şifreleme yöntemlerinden biridir.",
            explanation: "Sadece 25 (İngilizce için) olası anahtarı vardır. Bilgisayarlar tarafından milisaniyeler içinde kırılabildiği için günümüzde güvenliği yoktur."
        })
    },
    {
        id: "caesar_e5",
        algoId: "caesar",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Sezar şifrelemesinde anahtar değeri alfabedeki harf sayısına (örn. 26) eşit olursa ne olur?",
            options: ["Metin şifrelenmeden orijinal halinde kalır","Metin tamamen rastgele karakterlere dönüşür","Hata mesajı alınır","Metin ters çevrilir"],
            answer: "Metin şifrelenmeden orijinal halinde kalır",
            hint: "26 saat sonra saat yine aynı saati gösterir.",
            explanation: "26 harfli alfabede 26 kez kaydırmak, tam bir tur atıp tekrar başlangıç noktasına (orijinal harfe) dönmek demektir. Buna matematikte 'modüler aritmetik' denir."
        })
    },
    {
        id: "caesar_m1",
        algoId: "caesar",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Sezar algoritması (Anahtar = 2) ile şifrelenmiş 'CDE' metninin orijinal (şifresiz) hali nedir?",

            answer: "ABC",
            hint: "Şifreyi çözmek için 2 adım GERİ gitmelisiniz.",
            explanation: "Şifrelerken 2 ileri gidildiyse (A->C, B->D, C->E), çözerken 2 geri (C->A, D->B, E->C) gidilir."
        })
    },
    {
        id: "caesar_m2",
        algoId: "caesar",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Anahtarı -1 (eksi bir) olan bir Sezar şifrelemesi, anahtarı kaç olan pozitif bir Sezar şifrelemesi ile tamamen aynı sonucu verir? (26 harfli alfabede)",
            options: ["25","1","26","13"],
            answer: "25",
            hint: "-1 adım geri gitmek = 25 adım ileri gitmek.",
            explanation: "Modüler aritmetikte -1 ≡ 25 (mod 26). 1 harf geriye gitmekle 25 harf ileriye gitmek alfabede aynı noktaya ulaştırır."
        })
    },
    {
        id: "caesar_m3",
        algoId: "caesar",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Sezar şifresini brute-force (kaba kuvvet) yöntemiyle kırmak, bir insanın kalem kağıt kullanarak yapamayacağı kadar uzun sürer.",

            answer: "false",
            hint: "Kaç tane ihtimal var?",
            explanation: "En fazla 25 farklı anahtar vardır. Bir insan 25 denemeyi dakikalar içinde kağıt üzerinde yapabilir, bu yüzden çok kolay kırılır."
        })
    },
    {
        id: "caesar_m4",
        algoId: "caesar",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Anahtarı 5 olan Sezar şifresi ile art arda 3 kez şifrelenmiş bir mesaj, anahtarı kaç olan tek bir Sezar şifresiyle şifrelenmiş gibi çözülebilir?",

            answer: "15",
            hint: "5 + 5 + 5",
            explanation: "Sezar şifrelemeleri toplanabilir (additive). 3 kere 5 kaydırmak toplamda 15 kaydırmaya eşdeğerdir."
        })
    },
    {
        id: "caesar_m5",
        algoId: "caesar",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde Sezar algoritmasıyla şifrelenmiş ve Türkçeye özgü karakterler içeren (örn: Ş, Ç, Ö) bir metin var. Kriptografi Laboratuvarı'ndaki standart Sezar implementasyonu bu özel karakterlere nasıl davranır?",
            options: ["Sadece İngilizce A-Z aralığını kaydırır, diğerlerini sabit bırakır","Türkçe alfabeye göre (29 harf) kaydırma yapar","Özel karakterleri ASCII değerine göre sayıya çevirir","Hata verir"],
            answer: "Sadece İngilizce A-Z aralığını kaydırır, diğerlerini sabit bırakır",
            hint: "Klasik kriptografi algoritmaları ASCII alfabe kullanır.",
            explanation: "Uygulamadaki klasik Sezar şifresi, sadece standart Latin harflerini (A-Z) kaydırır, boşlukları, sayıları ve Türkçe gibi özel karakterleri değiştirmeden aynı bırakır."
        })
    },
    {
        id: "caesar_h1",
        algoId: "caesar",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "E(x) = (x + k) mod 26 formülünde k, Sezar anahtarıdır. Eğer bir mesaj önce k=10 ile şifrelenir, sonra k=17 ile şifresi ÇÖZÜLÜRSE, bu işlemin nihai eşdeğeri hangi şifreleme anahtarıdır?",
            options: ["Anahtar = 19","Anahtar = 27","Anahtar = 7","Anahtar = 3"],
            answer: "Anahtar = 19",
            hint: "10 ileri, 17 geri. Net hareket -7. Mod 26'da -7 nedir?",
            explanation: "10 - 17 = -7. Modulo 26 aritmetiğinde -7, 19'a eşittir (-7 + 26 = 19). Yani tek adımda k=19 ile şifrelemekle aynıdır."
        })
    },
    {
        id: "caesar_h2",
        algoId: "caesar",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Sezar şifresi, modern AES algoritmasının kullandığı 'S-Box (Substitution Box)' yapısının çok ilkel bir versiyonu olarak düşünülebilir.",

            answer: "true",
            hint: "İkisi de belirli bir girdiyi sabit bir kurala göre farklı bir çıktı ile değiştirir (Substitution).",
            explanation: "AES'teki S-Box karmaşık matematiksel dönüşümler yapsa da, temelinde Sezar gibi bir 'yerine koyma' (substitution) tablosudur. Sezar bu tablonun düz lineer halidir."
        })
    },
    {
        id: "caesar_h3",
        algoId: "caesar",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Anahtarı k olan bir Sezar şifresi uygulanmış metni Frekans Analizi ile kıracaksınız. Şifreli metindeki en sık geçen harf 'H' (alfabede 8. harf). İngilizcede en sık geçen harf 'E' (alfabede 5. harf). k anahtarı muhtemelen kaçtır? (Rakamla yazın)",

            answer: "3",
            hint: "8 - 5 = ?",
            explanation: "Eğer E harfi H harfine dönüştüyse, kaydırma miktarı H(8) - E(5) = 3'tür."
        })
    },
    {
        id: "caesar_h4",
        algoId: "caesar",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Alice, Bob'a Sezar algoritmasıyla bir şifre gönderiyor ama anahtarı iletmeyi unutuyor. Eve aradaki trafiği dinliyor. Hangi durumda Eve'in şifreyi çözmesi ZORLAŞIR?",
            options: ["Alice rastgele kelimeler yerine düzgün İngilizce cümleler kullanırsa","Mesaj çok uzunsa","Mesaj 3-4 harflik rastgele bir kelimeyse","Alice sadece ünlü harfleri şifrelerse"],
            answer: "Mesaj 3-4 harflik rastgele bir kelimeyse",
            hint: "Frekans analizi veya mantıksal tahmin için bağlam gerekir.",
            explanation: "Metin kısaldıkça ve anlamsızlaştıkça dilin frekans özellikleri (E, T, A çok çıkması gibi) kaybolur. 25 ihtimali deneseniz bile hangisinin doğru rastgele kelime olduğunu bilemezsiniz. Uzun ve anlamlı metinler çok daha kolay kırılır."
        })
    },
    {
        id: "caesar_h5",
        algoId: "caesar",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Anahtarı 14 olan Sezar şifresini ÇÖZMEK (decrypt) için, yeni bir şifreleme (encrypt) anahtarı kullanmak istiyorsunuz. Bu işlemi yapacak 'şifreleme' anahtarı kaç olmalıdır? (26 harfli sistemde)",

            answer: "12",
            hint: "14 + X = 26",
            explanation: "14 adım ileri gidilmiş bir şifreyi çözmek için 14 adım geri (decrypt) gidebilirsiniz veya (26 - 14) = 12 adım daha İLERİ (encrypt) giderek turu 26'ya tamamlayabilirsiniz. İki yöntem de orijinal metni verir."
        })
    },
    {
        id: "vigenere_e1",
        algoId: "vigenere",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Vigenère şifrelemesinin Sezar şifrelemesinden en temel farkı nedir?",
            options: ["Tek bir anahtar değeri yerine kelime (çoklu anahtar) kullanması","Matematiksel asal sayılar kullanması","Sadece sayıları şifreleyebilmesi","Şifre çözmenin imkansız olması"],
            answer: "Tek bir anahtar değeri yerine kelime (çoklu anahtar) kullanması",
            hint: "Vigenere bir 'Polialfabetik' şifredir.",
            explanation: "Sezar şifresi tüm metni tek bir sayıyla (örn: 3) kaydırırken, Vigenère bir kelimenin her harfi için farklı bir kaydırma değeri kullanır."
        })
    },
    {
        id: "vigenere_e2",
        algoId: "vigenere",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Vigenère algoritmasında kullanılan anahtar, mesajdan daha kısaysa anahtar kelime tekrar edilerek mesaja uzatılır.",

            answer: "true",
            hint: "Mesaj: MERHABA, Anahtar: KEY. KEYKEYK şeklinde eşleştirilir.",
            explanation: "Vigenère tablosu her harfi eşleştirmek için anahtarı ardışık olarak tekrar ettirir. (Padding mantığı)"
        })
    },
    {
        id: "vigenere_e3",
        algoId: "vigenere",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "'Vigenère Tablosu' (Tabula Recta) boyut olarak nasıldır?",
            options: ["26x26'lık harf matrisi","10x10'luk rakam matrisi","2x2'lik ikili sistem matrisi","5x5'lik alfabe ızgarası"],
            answer: "26x26'lık harf matrisi",
            hint: "Latin alfabesinde kaç harf varsa matris o kadardır.",
            explanation: "Vigenère tablosu, her satırda bir harf sola kaydırılmış alfabeden oluşan 26x26'lık dev bir matristir. X ekseni anahtarı, Y ekseni düz metni temsil eder."
        })
    },
    {
        id: "vigenere_e4",
        algoId: "vigenere",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Vigenère şifrelemesinde anahtar olarak sadece 'A' harfini kullanırsanız (A=0 kaydırma), mesaj nasıl değişir? (Hiç değişmez, Ters döner, Silinir vs.)",

            answer: "Hiç değişmez",
            hint: "A harfinin alfabedeki sıfırıncı (0) eleman olduğunu düşünün.",
            explanation: "A harfi 0 kaydırmaya karşılık gelir. Anahtarın tümü A ise, tüm harfler 0 kaydırılır ve mesaj orijinal haliyle kalır."
        })
    },
    {
        id: "vigenere_e5",
        algoId: "vigenere",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Vigenère uzun süre 'Kırılamaz Şifre' (Le Chiffre Indéchiffrable) olarak anılmıştır.",

            answer: "true",
            hint: "Yaklaşık 3 asır boyunca kırılmadığı düşünülüyordu.",
            explanation: "Vigenère şifresi, çoklu alfabe yapısı sayesinde klasik frekans analizini bozduğu için 19. yüzyılda Kasiski analizi bulunana kadar güvenli kabul edilmiştir."
        })
    },
    {
        id: "vigenere_m1",
        algoId: "vigenere",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Mesaj: 'HELLO', Anahtar: 'A'. Şifrelenmiş metin nedir?",

            answer: "HELLO",
            hint: "'A' harfi 0 kaydırma demektir.",
            explanation: "Anahtar 'A' olduğunda kaydırma miktarı 0'dır, dolayısıyla 'HELLO' hiç değişmeden kalır."
        })
    },
    {
        id: "vigenere_m2",
        algoId: "vigenere",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Vigenère algoritmasında bir metni kırmak için saldırganın (analistin) öncelikle neyi bulması gerekir?",
            options: ["Anahtarın uzunluğunu","Kullanılan dili","Metnin içindeki boşlukları","Büyük-küçük harf oranını"],
            answer: "Anahtarın uzunluğunu",
            hint: "Kasiski metodu veya Friedman testinde ilk adım budur.",
            explanation: "Vigenère şifresini kırmanın ilk adımı anahtar uzunluğunu tespit etmektir. Uzunluk bulunduktan sonra metin, o uzunluktaki sütunlara bölünerek bir dizi basit Sezar şifresi gibi frekans analiziyle çözülebilir."
        })
    },
    {
        id: "vigenere_m3",
        algoId: "vigenere",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Vigenère algoritmasında, anahtar uzunluğu mesajın uzunluğu ile tam olarak BİREBİR aynıysa ve anahtar tamamen rastgele seçilip yalnızca bir kez kullanılırsa, bu algoritma 'One-Time Pad' (Tek Kullanımlık Şerit) haline gelir.",

            answer: "true",
            hint: "Shannon'ın 'Mükemmel Güvenlik' tanımı.",
            explanation: "Eğer Vigenère anahtarı mesaj kadar uzun, tamamen rastgele ve bir daha kullanılmıyorsa, bu sistem kriptografik olarak kırılamaz olan 'One-Time Pad'e dönüşür."
        })
    },
    {
        id: "vigenere_m4",
        algoId: "vigenere",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Mesaj 20 harf, Vigenère anahtarı ise 6 harf uzunluğundadır. Anahtarın son harfi mesajdaki kaçıncı harf ile eşleşir? (1 tabanlı dizin)",

            answer: "6",
            hint: "İlk döngü 1'den 6'ya biter. İkinci döngü 7'den 12'ye...",
            explanation: "Anahtar her 6 harfte bir tekrar eder. 6. harf, anahtarın son harfiyle eşleşir. Aynı şekilde 12., 18. harfler de anahtarın son harfiyle eşleşir."
        })
    },
    {
        id: "vigenere_m5",
        algoId: "vigenere",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Aşağıdaki saldırı yöntemlerinden hangisi özellikle Vigenère şifresini kırmak için geliştirilmiştir?",
            options: ["Kasiski İncelemesi (Kasiski Examination)","Meet-in-the-Middle (Ortada Buluşma)","Doğrusal (Linear) Kriptanaliz","Asal Çarpanlara Ayırma"],
            answer: "Kasiski İncelemesi (Kasiski Examination)",
            hint: "Aynı harf dizilerinin tekrarlanma aralıklarına bakan tarihsel yöntem.",
            explanation: "1863'te Friedrich Kasiski tarafından yayımlanan yöntem, şifreli metindeki tekrarlayan harf gruplarının arasındaki mesafeyi ölçerek Vigenère anahtarının uzunluğunu bulmaya yarar."
        })
    },
    {
        id: "vigenere_h1",
        algoId: "vigenere",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "E(m, k) = (m + k) mod 26 formülünde m mesaj, k anahtar karakterinin sayısal değeridir. Vigenère'de şifre çözme formülü (Decryption) aşağıdakilerden hangisidir?",
            options: ["D(c, k) = (c - k + 26) mod 26","D(c, k) = (c + k) mod 26","D(c, k) = (c * k) mod 26","D(c, k) = (c / k) mod 26"],
            answer: "D(c, k) = (c - k + 26) mod 26",
            hint: "Geriye (eksiye) giderken negatif sayıları düzeltmek için alfabenin uzunluğunu eklersiniz.",
            explanation: "Şifrelerken k kadar eklediğimiz için, çözerken k kadar çıkarmalıyız (c - k). Negatif sonuç çıkmasını engellemek için JavaScript ve matematikte + 26 eklenerek modulo (mod 26) işlemi güvene alınır."
        })
    },
    {
        id: "vigenere_h2",
        algoId: "vigenere",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Vigenère şifrelemesinde aynı düz metin kelimesi (örneğin 'GİZLİ'), metnin farklı yerlerinde geçerse her zaman aynı şifreli kelimeye dönüşür.",

            answer: "false",
            hint: "Anahtar kelimenin kelimenin üstüne denk geldiği pozisyon aynı mı?",
            explanation: "Vigenère'in gücü buradadır. 'GİZLİ' kelimesi anahtarın neresine denk geldiğine bağlı olarak farklı şekillerde şifrelenir, bu da frekans analizini altüst eder."
        })
    },
    {
        id: "vigenere_h3",
        algoId: "vigenere",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Anahtarı 'BC' (sırasıyla +1 ve +2 kaydırma) olan Vigenère şifresiyle 'AAAA' şifrelenirse sonuç ne olur?",

            answer: "BCBC",
            hint: "1. A->B, 2. A->C, 3. A->B, 4. A->C",
            explanation: "Anahtar sırasıyla 1, 2, 1, 2 ekliyor. A=0 olduğu için, çıktı doğrudan anahtar dizisinin tekrarlanan halini verir."
        })
    },
    {
        id: "vigenere_h4",
        algoId: "vigenere",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Friedman Testi, Vigenère algoritmasına karşı nasıl çalışır?",
            options: ["Metnin Tesadüf İndeksini (Index of Coincidence) ölçerek anahtar uzunluğunu tahmin eder","Kelimelerin İngilizce sözlükte olup olmadığına bakar","Tüm olası anahtarları tek tek dener (Brute Force)","Anahtarı asal çarpanlara ayırır"],
            answer: "Metnin Tesadüf İndeksini (Index of Coincidence) ölçerek anahtar uzunluğunu tahmin eder",
            hint: "Matematiksel varyans veya harflerin birbirine çarpma ihtimalini kullanır.",
            explanation: "William Friedman, bir dilde rastgele seçilen iki harfin aynı olma olasılığını (IC) hesaplamıştır. Bu istatistiksel indeks kullanılarak çoklu alfabe (polyalphabetic) yapısının anahtar uzunluğu çok hassas tahmin edilebilir."
        })
    },
    {
        id: "vigenere_h5",
        algoId: "vigenere",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Anahtar uzunluğu 4 olan bir Vigenère ile 100 harflik bir metin şifrelenmiştir. Bir analist bu metni kaç farklı klasik 'Sezar' alt-grubuna ayırarak frekans analizi yapabilir?",

            answer: "4",
            hint: "Her k. harf bir grubu oluşturur.",
            explanation: "Anahtar uzunluğu 4 ise, şifreli metindeki 1., 5., 9. vb. harfler hep anahtarın 1. harfiyle şifrelenmiştir. Bu yüzden metin 4 ayrı Sezar bloğuna bölünerek ayrı ayrı kırılır."
        })
    },
    {
        id: "affine_e1",
        algoId: "affine",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Affine (Afin) algoritmasının formülü olan E(x) = (ax + b) mod m denkleminde 'b' harfi kriptografik olarak hangi işlemin karşılığıdır?",
            options: ["Sezar Şifresi gibi düz bir kaydırma (Shift)","Çarpma (Multiplication) işlemi","Anahtar uzayını küçültme işlemi","Alfabeyi ters çevirme"],
            answer: "Sezar Şifresi gibi düz bir kaydırma (Shift)",
            hint: "Formülde '+ b' kısmı vardır. Toplama işlemi alfabede kaymak demektir.",
            explanation: "ax kısmı çarpımsal bir yayılma yaparken, +b kısmı tipik bir Sezar (Caesar) kaydırması işlemidir. Affine aslında Çarpımsal Şifre ile Sezar Şifresinin birleşimidir."
        })
    },
    {
        id: "affine_e2",
        algoId: "affine",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Affine şifrelemesinde 'a' değeri rastgele herhangi bir sayı seçilebilir, hiçbir matematiksel kuralı yoktur.",

            answer: "false",
            hint: "Aksi halde farklı harfler aynı harfe dönüşerek şifre çözülemez hale gelebilir.",
            explanation: "'a' değeri ile alfabe uzunluğu (m=26) aralarında asal (coprime) olmak ZORUNDADIR. Yani En Büyük Ortak Bölenleri (EBOB) 1 olmalıdır. Aksi halde şifre çözülemez (Decryption imkansızlaşır)."
        })
    },
    {
        id: "affine_e3",
        algoId: "affine",
        difficulty: "easy",
        type: "numeric",
        generate: () => ({
            question: "E(x) = (ax + b) mod 26 formülünde a=1 ve b=3 olursa, bu algoritma aslında hangi bilindik algoritmaya dönüşmüş olur? (Sezar anahtarı olarak düşünün)",

            answer: "3",
            hint: "1 * x + 3 = x + 3.",
            explanation: "a=1 olduğunda çarpımsal etki kaybolur. Geriye sadece x+3 kalır. Bu da klasik anahtarı 3 olan Sezar şifresidir."
        })
    },
    {
        id: "affine_e4",
        algoId: "affine",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Affine algoritmasında kullanılan anahtar kaç parçadan (parametre) oluşur?",
            options: ["2 (a ve b)","1 (sadece k)","3 (a, b ve m)","Çoklu (kelime uzunluğunda)"],
            answer: "2 (a ve b)",
            hint: "Formüle E(x) = (ax + b) dışarıdan hangi değerleri giriyoruz?",
            explanation: "Affine şifresinde kullanıcıdan iki adet anahtar (parametre) istenir: Çarpan (a) ve Kaydırma (b) değeri."
        })
    },
    {
        id: "affine_e5",
        algoId: "affine",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Affine şifresi, harf frekans analizini (örneğin İngilizcedeki E harfinin çokluğunu) tamamen gizleyerek Vigenère'den daha güvenli hale gelir.",

            answer: "false",
            hint: "Afin formülü her X için her zaman aynı Y'yi üretir.",
            explanation: "Affine bir 'Monoalfabetik' (tek alfabeli) yerine koyma şifresidir. Yani bir metindeki tüm E harfleri aynı şifreli harfe dönüşür. Bu yüzden frekans analiziyle kolayca kırılır, Vigenere gibi güvenli değildir."
        })
    },
    {
        id: "affine_m1",
        algoId: "affine",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "İngilizce alfabesinde (m=26) Affine algoritması için 'a' (çarpan) değeri olarak aşağıdakilerden hangisi SEÇİLEMEZ?",
            options: ["13","3","5","7"],
            answer: "13",
            hint: "13 ile 26'nın ortak böleni var mıdır?",
            explanation: "'a' değeri m (26) ile aralarında asal olmalıdır. 13 ile 26'nın EBOB'u 13'tür (aralarında asal değillerdir). Eğer a=13 seçilirse, şifre çözülemez."
        })
    },
    {
        id: "affine_m2",
        algoId: "affine",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "E(x) = (3x + 2) mod 26 formülünde A harfi (x=0) hangi harfe dönüşür? (A=0, B=1, C=2...)",

            answer: "C",
            hint: "3 * 0 + 2 = 2. İndeksi 2 olan harf hangisidir?",
            explanation: "x=0 için, 3(0) + 2 = 2. Alfabe sırasına göre indeks 0'dan başladığında C=2'dir. Yani A -> C."
        })
    },
    {
        id: "affine_m3",
        algoId: "affine",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Affine şifrelemesinde (a=3, b=5), deşifre (şifre çözme) formülündeki katsayılar basitçe (a=-3, b=-5) yapılarak elde edilir.",

            answer: "false",
            hint: "Ters modüler aritmetik (Modüler İnvers) toplama çıkarmadaki gibi düz işaret değiştirmez.",
            explanation: "a'nın (çarpanın) tersini almak için 'Modüler Ters' (Modular Inverse) hesabı yapılmalıdır. 3'ün mod 26'daki tersi -3 değildir, 9'dur (çünkü 3*9 = 27 = 1 mod 26)."
        })
    },
    {
        id: "affine_m4",
        algoId: "affine",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "26 harfli alfabe kullanıldığında, Affine algoritması için seçilebilecek KAÇ FARKLI geçerli 'a' (çarpan) değeri vardır? (İpucu: 26 ile aralarında asal olan 26'dan küçük pozitif tam sayı adedi)",

            answer: "12",
            hint: "1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25 sayıları 26 ile aralarında asaldır.",
            explanation: "Euler'in Totient Fonksiyonu φ(26) hesaplandığında, 26 ile aralarında asal 12 sayı olduğu bulunur. Bu nedenle 'a' için yalnızca 12 geçerli ihtimal vardır."
        })
    },
    {
        id: "affine_m5",
        algoId: "affine",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "D(y) = a^-1 (y - b) mod m. Bu Affine şifre çözme (decryption) formülündeki 'a^-1' neyi ifade eder?",
            options: ["'a' değerinin mod m'deki modüler tersini (Modular Multiplicative Inverse)","'a' sayısının eksi birinci kuvvetini (1/a ondalık sayısını)","b - a matematiksel farkını","Matrisin tersini"],
            answer: "'a' değerinin mod m'deki modüler tersini (Modular Multiplicative Inverse)",
            hint: "Şifrelerken çarptığımız için, çözerken tam sayı bölmesi yapamayız.",
            explanation: "Modüler aritmetikte bölme işlemi yoktur. Bunun yerine, sayının çarpımsal tersi (modular inverse) bulunur ve onunla çarpılır."
        })
    },
    {
        id: "affine_h1",
        algoId: "affine",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde Affine ile şifrelenmiş bir metin var. Düz metnin ilk iki harfinin 'HE' (x_1=7, x_2=4) olduğunu biliyorsunuz. Şifreli metnin ilk iki harfi 'RC' (y_1=17, y_2=2) ise, bu algoritma bir tür denklem sistemine dönüşür. Bu saldırı türüne ne ad verilir?",
            options: ["Known-Plaintext Attack (Bilinen Açık Metin Saldırısı)","Ciphertext-Only Attack (Yalnızca Şifreli Metin)","Chosen-Ciphertext Attack (Seçilmiş Şifreli Metin)","Brute-Force Attack (Kaba Kuvvet)"],
            answer: "Known-Plaintext Attack (Bilinen Açık Metin Saldırısı)",
            hint: "Hem düz metni (plain) hem şifreliyi (cipher) biliyorsunuz.",
            explanation: "Bir şifreli metnin belli bir kısmının orijinalini (düz metnini) biliyorsanız bu 'Known-Plaintext' saldırısıdır. Affine şifresinde iki harfin eşleşmesi bilinirse, iki bilinmeyenli iki denklem (17 = 7a+b, 2 = 4a+b) çözülerek (a,b) anahtarı saniyeler içinde kırılır."
        })
    },
    {
        id: "affine_h2",
        algoId: "affine",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Modüler aritmetikte 'a' sayısının tersini (a^-1) bulmak için genellikle 'Genişletilmiş ... Algoritması' (Extended ... Algorithm) kullanılır. Boş bırakılan yere hangi ünlü matematikçinin adı gelir?",

            answer: "Öklid",
            hint: "EBOB bulmak için öğretilen temel algoritmanın adıdır (Euclid).",
            explanation: "Genişletilmiş Öklid Algoritması (Extended Euclidean Algorithm), iki sayının EBOB'unu bulurken aynı zamanda modüler terslerini hesaplamak için standart kriptografik yöntemdir."
        })
    },
    {
        id: "affine_h3",
        algoId: "affine",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "E(x) = (5x + 8) mod 26. Şifresi çözülmek istenen denklem D(y) = 21(y - 8) mod 26'dır. Burada 5'in mod 26'daki tersinin 21 olduğunu görüyoruz. Sağlamasını yaparsak; 5 * 21 = 105. 105 mod 26 kaça eşittir?",

            answer: "1",
            hint: "105 / 26 = 4. Kalan kaçtır?",
            explanation: "5 * 21 = 105. 26 * 4 = 104. 105 - 104 = 1. Bir sayının tersiyle çarpımının modüldeki karşılığı daima 1 olmalıdır."
        })
    },
    {
        id: "affine_h4",
        algoId: "affine",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Affine şifresi, 'a' değeri 26 (alfabe uzunluğu) ile aralarında asal olmama şartını ihlal etse bile (örneğin a=2), eğer b=0 seçilirse sadece tek harfler şifrelenebilir ve sistem yarım da olsa hatasız çalışır.",

            answer: "false",
            hint: "A ve N harfleri a=2 olduğunda aynı sonuca ulaşır mı?",
            explanation: "Eğer a=2 seçilirse (aralarında asal değil), E(0)=0 ve E(13)=26=0 olur. Yani A ve N harflerinin ikisi de A harfine şifrelenir. Deşifre eden kişi bunun A mı N mi olduğunu asla bilemez. Sistem tamamen çöker."
        })
    },
    {
        id: "affine_h5",
        algoId: "affine",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Affine anahtar uzayının büyüklüğü (26 harf için) tam olarak kaçtır?",
            options: ["312","676","12","26"],
            answer: "312",
            hint: "12 farklı 'a' değeri, 26 farklı 'b' değeri var.",
            explanation: "'a' için geçerli 12 değer (aralarında asal olanlar), 'b' için geçerli 26 değer vardır. Toplam kombinasyon: 12 * 26 = 312 farklı anahtar ihtimalidir."
        })
    },
    {
        id: "railfence_e1",
        algoId: "railfence",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Rail Fence (Demiryolu Çiti) şifrelemesi kriptografide hangi kategoriye girer?",
            options: ["Yer Değiştirme (Transposition)","Yerine Koyma (Substitution)","Açık Anahtar (Public Key)","Özetleme (Hash)"],
            answer: "Yer Değiştirme (Transposition)",
            hint: "Harfler değişmez, sadece sıraları karışır.",
            explanation: "Rail Fence algoritmasında orijinal metindeki harfler değiştirilmez, sadece zig-zag şeklinde yazılarak okuma sıraları değiştirilir (Transposition)."
        })
    },
    {
        id: "railfence_e2",
        algoId: "railfence",
        difficulty: "easy",
        type: "numeric",
        generate: () => ({
            question: "Rail Fence algoritmasında kullanıcının girmesi gereken 'anahtar' ne tür bir parametredir?",

            answer: "Sayı",
            hint: "Kaç tane 'ray' veya 'satır' olacağını belirtir.",
            explanation: "Anahtar, zig-zag çizilecek satır (veya ray) sayısını ifade eden bir tam sayıdır (örn: 3)."
        })
    },
    {
        id: "railfence_e3",
        algoId: "railfence",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Rail Fence algoritmasında, şifrelenmiş metindeki harfler ile orijinal metindeki harfler tamamen aynıdır; sadece yerleri değişmiştir.",

            answer: "true",
            hint: "Yer değiştirme (transposition) şifrelerinin temel özelliği budur.",
            explanation: "Harfler alfabe içinde başka harflere kaydırılmaz. Bu nedenle bir metnin Rail Fence mi yoksa Substitution mı olduğunu anlamak için harf frekansına bakmak yeterlidir (harfler normalse Rail Fence'tir)."
        })
    },
    {
        id: "railfence_e4",
        algoId: "railfence",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "2 raylı (anahtar=2) Rail Fence ile 'ABCD' kelimesi şifrelenirse ilk harf hangisi olur?",

            answer: "A",
            hint: "İlk raydaki ilk harf yine kelimenin başlangıcıdır.",
            explanation: "Kelimeler raylara A-B-C-D olarak yukarı aşağı dağılır. 1. ray: A C. 2. ray: B D. Şifreli metin: ACBD. İlk harf A'dır."
        })
    },
    {
        id: "railfence_e5",
        algoId: "railfence",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Rail Fence algoritmasında metnin uzunluğu, anahtar (ray) sayısından küçük veya eşit olursa sonuç ne olur?",
            options: ["Metin hiç değişmeden olduğu gibi kalır","Program hata verir ve çöker","Metin sondan başa tersine döner","Sonsuz döngüye girer"],
            answer: "Metin hiç değişmeden olduğu gibi kalır",
            hint: "Aşağı inerken metin biterse zig-zag geri dönme şansı bulamaz.",
            explanation: "Metin, ray sayısından küçük veya ona eşitse, harfler yukarıdan aşağıya tek bir dikey sütun (veya çapraz) şeklinde inip biter. Satır satır okunduğunda yine orijinal sırasını korur."
        })
    },
    {
        id: "railfence_m1",
        algoId: "railfence",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "3 raylı (anahtar=3) Rail Fence ile 'HELLO' şifrelenirse sonuç nedir?",

            answer: "HOELL",
            hint: "H(1), E(2), L(3), L(2), O(1) şeklinde raylara yerleşir.",
            explanation: "Raylar: 1. ray: H O, 2. ray: E L, 3. ray: L. Satırları birleştirirsek: HO + EL + L = HOELL."
        })
    },
    {
        id: "railfence_m2",
        algoId: "railfence",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Bir saldırganın Rail Fence ile şifrelenmiş bir metni Brute-Force (Kaba Kuvvet) ile kırması, Sezar algoritmasına kıyasla nasıldır?",
            options: ["Daha hızlı kırılır","Yaklaşık aynı zorluktadır, anahtar uzayı mesaj uzunluğuna bağlıdır","Matematiksel olarak kırılamazdır","Kırmak aylar sürer"],
            answer: "Yaklaşık aynı zorluktadır, anahtar uzayı mesaj uzunluğuna bağlıdır",
            hint: "Denemesi gereken anahtar sayısı 2'den başlayıp mesaj uzunluğuna kadar gider.",
            explanation: "Maksimum ray sayısı mesajın uzunluğu kadar olabilir. Çok uzun olmayan mesajlar için bilgisayarlar bu birkaç yüz veya bin ihtimali saniyeler içinde deneyebilir."
        })
    },
    {
        id: "railfence_m3",
        algoId: "railfence",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Rail Fence (zig-zag) algoritması, frekans analizi (harflerin kullanım sıklığı) yapılarak KISA SÜREDE kırılabilir.",

            answer: "false",
            hint: "Frekans analizi harflerin yerlerini bulmaz, hangi harfin hangi harfe DÖNÜŞTÜĞÜNÜ bulur.",
            explanation: "Frekans analizi yerine koyma (substitution) şifrelerinde işe yarar. Rail Fence bir yer değiştirme (transposition) şifresidir; E harfi hala E'dir, sadece yeri değişmiştir. Bu nedenle frekans analizi tek başına şifreyi çözemez."
        })
    },
    {
        id: "railfence_m4",
        algoId: "railfence",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Bir periyot (tam bir in-çık döngüsü, yani birinci raydan en alt raya inip tekrar birinci raya dönene kadar geçen harf sayısı) hangi formülle bulunur? (n = ray sayısı)",

            answer: "2n-2",
            hint: "Örneğin 3 rayda 1-2-3-2-1 döngüsü 4 harf sürer.",
            explanation: "Döngü uzunluğu (period) formülü (2 * Ray Sayısı) - 2'dir. Örneğin 4 ray için: 2*4 - 2 = 6 (1, 2, 3, 4, 3, 2)."
        })
    },
    {
        id: "railfence_m5",
        algoId: "railfence",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer bir metinde bol miktarda boşluk varsa, Rail Fence algoritmasını daha güvenli hale getirmek için klasik kriptografide en sık başvurulan yöntem nedir?",
            options: ["Boşlukları kaldırmak veya yerlerine 'X' koymak","Ray sayısını boşluk sayısına eşitlemek","Boşlukları sayısal '0' ile değiştirmek","Sistemi iki kez çalıştırmak"],
            answer: "Boşlukları kaldırmak veya yerlerine 'X' koymak",
            hint: "Boşlukların kalması kelime uzunluklarının tahmin edilmesini kolaylaştırır.",
            explanation: "Boşluklar ve noktalama işaretleri orijinal kelime yapıları ve metnin şekli hakkında saldırgana ipucu verir. Klasik şifrelemede genellikle boşluklar tamamen silinerek analiz zorlaştırılır."
        })
    },
    {
        id: "railfence_h1",
        algoId: "railfence",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Şifreli bir Rail Fence metninde, İKİNCİ raydaki (satırdaki) harflerin arasındaki mesafe her zaman sabit midir?",
            options: ["Evet, her zaman sabittir","Hayır, zig ve zag döngülerinden dolayı mesafeler farklı (dalgalı) olabilir","Sadece anahtar tek sayıysa sabittir","Mesafe tamamen rastgeledir"],
            answer: "Hayır, zig ve zag döngülerinden dolayı mesafeler farklı (dalgalı) olabilir",
            hint: "En üst ve en alt rayda sabittir ama ortadaki raylarda durum farklıdır.",
            explanation: "En üst ve en alt raylardaki harfler arası mesafe hep (2n-2)'dir. Ancak ortadaki raylarda (örneğin 2. ray), aşağı inerken gelen harf ile yukarı çıkarken gelen harf arası mesafe farklıdır. Bu, metni okurken dalgalı bir formül gerektirir."
        })
    },
    {
        id: "railfence_h2",
        algoId: "railfence",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Elinizde n=3 (3 ray) ile şifrelenmiş, 13 harfli (H1, H2... H13) bir metin var. Düz metindeki (orijinal) harflerden kaç tanesi BİRİNCİ (en üst) raya yerleşir?",

            answer: "4",
            hint: "Döngü periyodu (2*3-2) = 4'tür. 1., 5., 9., 13. harfler ilk raya düşer.",
            explanation: "Periyot 4'tür. 13'e kadar olan dizide: 1, 5, 9, 13 numaralı harfler 1. raya (en tepeye) yerleşir. Toplam 4 harf."
        })
    },
    {
        id: "railfence_h3",
        algoId: "railfence",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Rail Fence algoritmasını art arda FARKLI iki anahtarla uygulamak (örneğin önce 3 ray, sonra 4 ray), şifrenin güvenliğini katlanarak artırır ve 'Route Cipher' gücüne ulaştırır.",

            answer: "false",
            hint: "İki yer değiştirme işleminin birleşimi yine basit bir yer değiştirmedir.",
            explanation: "İki transposition şifresini birleştirmek güvenliği bir miktar artırsa da katlanarak artırmaz. İki matematiksel karıştırma işlemi, analistin blok büyüklüklerini bularak hala bilgisayar gücüyle çok kolay çözebileceği tek bir karmaşık yer değiştirmeye eşdeğer kalır."
        })
    },
    {
        id: "railfence_h4",
        algoId: "railfence",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde sadece Rail Fence ile şifrelenmiş olduğunu bildiğiniz anlamsız görünen bir şifreli metin var. Düz metindeki ilk harfin (örneğin T), şifreli metinde nerede olduğunu KESİN olarak söyleyebilir misiniz?",
            options: ["Evet, daima şifreli metnin en başındadır","Hayır, anahtara göre tamamen değişir","Evet, daima en sondadır","Sadece metin uzunluğu çift sayıysa en baştadır"],
            answer: "Evet, daima şifreli metnin en başındadır",
            hint: "Rail Fence dizilimi nasıl başlıyor? 1. rayın 1. harfi.",
            explanation: "Rail Fence algoritmasında, düz metnin 1. harfi ZORUNLU olarak 1. raya (en üste) gider. Şifreli metin de rayların yukarıdan aşağıya doğru birleştirilmesiyle oluştuğu için, düz metnin ilk harfi DAİMA şifreli metnin de en ilk harfi olur (Güvenlik zafiyeti)."
        })
    },
    {
        id: "railfence_h5",
        algoId: "railfence",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "n (ray sayısı) uzunluğunda, tamamen aynı harflerden oluşan bir metni n raylı Rail Fence ile şifrelerseniz, algoritma ne kadar işlem yapmış olursa olsun sonuçta elde edilen metindeki herhangi bir harfin orijinal yerinden ne kadar uzakta olduğunu gösteren yer değiştirme sayısı kaçtır? (Mantıksal çıkarım sorusu)",

            answer: "0",
            hint: "Aynı harfler (AAAA) yer değiştirirse sonuç ne olur?",
            explanation: "Eğer metin tamamen aynı karakterlerden (örn. 'AAAA') oluşuyorsa, yer değiştirme şifrelerinin (Transposition) hiçbiri metnin görünümünü değiştiremez. Görsel olarak yer değiştiren harf 0'dır."
        })
    },
    {
        id: "columnar_e1",
        algoId: "columnar",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Sütunlu Transpozisyon (Columnar Transposition) algoritması temelde ne yapar?",
            options: ["Metni sütunlara yazar ve harfleri değiştirir","Metni sütunlara yazar, ancak sütunların sırasını karıştırarak okur","Sütunlardaki her harfi modüler aritmetikle kaydırır","Matrisin tersini alır"],
            answer: "Metni sütunlara yazar, ancak sütunların sırasını karıştırarak okur",
            hint: "Adı üzerinde 'Sütunlu' Yer Değiştirme.",
            explanation: "Metin bir tabloya (matrise) satır satır yazılır. Ardından anahtarın belirlediği sıralamaya göre sütunlar teker teker yukarıdan aşağıya okunarak şifreli metin elde edilir."
        })
    },
    {
        id: "columnar_e2",
        algoId: "columnar",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Sütunlu Transpozisyon yönteminde anahtar kelimedeki harflerin alfabetik sırası, sütunların okunma sırasını belirler.",

            answer: "true",
            hint: "Anahtar = ZEBRA ise alfabetik sıra: A(1), B(2), E(3), R(4), Z(5).",
            explanation: "Sütunların hangi sırayla çekileceği (okunacağı), anahtar kelimedeki harflerin A'dan Z'ye alfabetik dizilimiyle belirlenir."
        })
    },
    {
        id: "columnar_e3",
        algoId: "columnar",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "'KAZAN' kelimesini Sütunlu Transpozisyon için anahtar olarak kullanırsak, alfabetik sıraya göre HANGİ harfin sütunu İLK olarak okunur?",
            options: ["K","A (İlk 'A')","Z","N"],
            answer: "A (İlk 'A')",
            hint: "Alfabetik olarak A harfi en öndedir.",
            explanation: "KAZAN kelimesindeki harfler: A, A, K, N, Z. Alfabetik sıraya konduğunda ilk sırada 'A' harfleri gelir. İlk 'A'nın bulunduğu sütun ilk olarak okunacaktır."
        })
    },
    {
        id: "columnar_e4",
        algoId: "columnar",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Eğer şifrelenecek metin, tabloyu (matrisi) tam doldurmuyorsa, eksik kalan kutucuklara genellikle ne tür bir dolgu (padding) karakteri eklenir? (Örn. klasik kriptografide en çok kullanılan harf)",

            answer: "X",
            hint: "Anlamsız, nadir kullanılan bir harftir.",
            explanation: "Geleneksel kriptografide matrisin boş kalan yerleri (özellikle son satır) genellikle 'X' karakteriyle doldurulur, böylece sütun uzunlukları eşitlenir."
        })
    },
    {
        id: "columnar_e5",
        algoId: "columnar",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Sütunlu Transpozisyon şifrelemesi, mesajdaki harfleri başka harflere dönüştürerek gizlediği için frekans analiziyle doğrudan kırılamaz.",

            answer: "false",
            hint: "Transpozisyon şifreleri harfleri değiştirir mi?",
            explanation: "Bu bir yer değiştirme (Transposition) şifresidir. Harflerin kendisi değişmez, sadece yeri değişir. Dolayısıyla İngilizcedeki E harfinin çokluğu metinde hala aynıdır, frekans analizine dayanıklılığı azdır."
        })
    },
    {
        id: "columnar_m1",
        algoId: "columnar",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Anahtar 'BCA' (Alfabetik sıra: A=1, B=2, C=3 => 2,3,1). Düz metin: '123456'. Sütunlar tam dolacak şekilde 'X' eklenebilir. Tablonun ilk satırı '123', ikinci satırı '456'. Şifreli metin ne olur?",

            answer: "361425",
            hint: "A(3. sütun) -> 3,6. B(1. sütun) -> 1,4. C(2. sütun) -> 2,5.",
            explanation: "Tablo: 123 / 456. Sütun sıralaması BCA = 2, 3, 1 (yani 3. sütun 1 numara, 1. sütun 2 numara, 2. sütun 3 numara). Okuma sırası: Sütun 3 (3,6), Sütun 1 (1,4), Sütun 2 (2,5). Sonuç: 361425."
        })
    },
    {
        id: "columnar_m2",
        algoId: "columnar",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer Sütunlu Transpozisyon anahtar kelimesinde aynı harften birden fazla varsa (Örn: 'APPLE' kelimesindeki 'P'ler), sütunların okuma sırası nasıl belirlenir?",
            options: ["Aynı harflerden kelimede İLK geçeni (soldakini) daha önce okunur","Aynı harflerden SON geçeni daha önce okunur","Hata verir, aynı harf kullanılamaz","Sütunlar toplanarak tek sütun yapılır"],
            answer: "Aynı harflerden kelimede İLK geçeni (soldakini) daha önce okunur",
            hint: "Soldan sağa doğru okuma mantığı.",
            explanation: "Standart implementasyonlarda eşit harf olduğunda, kelimenin orijinalinde daha solda bulunan (ilk yazılan) harf öncelik alır. APPLE (1-P1-P2-L-E) -> A(1), E(2), L(3), P1(4), P2(5) olur."
        })
    },
    {
        id: "columnar_m3",
        algoId: "columnar",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Sütunlu Transpozisyon algoritmasını iki kez üst üste FARKLI veya AYNI anahtarlarla uygulamak (Double Transposition), güvenliği önemli ölçüde artırır ve II. Dünya Savaşı'nda yaygın kullanılmıştır.",

            answer: "true",
            hint: "Satır satır okunup tekrar farklı sütunlara dağıtılması işi çok karmaşıklaştırır.",
            explanation: "'Çifte Sütunlu Transpozisyon', basit bir versiyonu olmasına rağmen anagramlama işlemlerini çok zorlaştırdığı için I. ve II. Dünya Savaşlarında askeri sistemlerde yoğun olarak (örn. ÜVIC) kullanılmıştır."
        })
    },
    {
        id: "columnar_m4",
        algoId: "columnar",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Anahtar kelimenin uzunluğu 5 harf ise ve düz metin 14 harf ise, Sütunlu Transpozisyon matrisi kaç satırdan oluşur? (Dolgu yapılacağını varsayın)",

            answer: "3",
            hint: "14 harf, 5'er 5'er satırlara dizilecek. 14 / 5 = ?",
            explanation: "14 harfi her satırda 5 harf (sütun sayısı) olacak şekilde dizerseniz: 5 + 5 + 4. Son satırı doldurmak için 1 kutu daha gerekir. Toplamda 3 tam satır elde edersiniz."
        })
    },
    {
        id: "columnar_m5",
        algoId: "columnar",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Saldırgan (analist) Sütunlu Transpozisyon'u kırmak için (anagramlama yaparken) genellikle ne tür ipuçlarından yararlanır?",
            options: ["Dildeki yaygın ikili ve üçlü harf gruplarının (örn. 'TH', 'ING') parçalanmış hallerini birleştirme","Sadece en çok geçen harfin 'E' olduğunu bulma","Anahtar kelimenin asal çarpanlarını hesaplama","Sütunlardaki tüm sayısal toplamları eşitleme"],
            answer: "Dildeki yaygın ikili ve üçlü harf gruplarının (örn. 'TH', 'ING') parçalanmış hallerini birleştirme",
            hint: "Sütunlar ayrıldığına göre, orijinal kelimeler de kopmuştur.",
            explanation: "Transpozisyon şifrelerinde harf frekansları (E'nin çokluğu vb.) değişmediğinden frekans analizi yaramaz. Onun yerine sütunların sırası tahmin edilerek (anagram) kelime veya hece öbekleri (bigram/trigram) oluşturulmaya çalışılır."
        })
    },
    {
        id: "columnar_h1",
        algoId: "columnar",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "'Dolgu Yapılmayan' (Incomplete) Sütunlu Transpozisyon, 'Dolgulu' (Complete) olana göre neden KRİPTOGRAFİK OLARAK DAHA GÜVENLİDİR?",
            options: ["Çünkü bazı sütunlar diğerlerinden daha uzun olur ve analistin anagram (sütun birleştirme) yapmasını zorlaştırır","Çünkü şifre çözme imkansızdır","Çünkü eksik kutular otomatik şifrelenir","Çünkü harfler rastgele değişir"],
            answer: "Çünkü bazı sütunlar diğerlerinden daha uzun olur ve analistin anagram (sütun birleştirme) yapmasını zorlaştırır",
            hint: "Sütunların uzunluklarının eşit olmaması hizalamayı bozar.",
            explanation: "Eğer X dolgusu yapılmazsa, son satırda bazı sütunlarda harf vardır, bazılarında yoktur. Bu durum 'Kısa Sütun' ve 'Uzun Sütun' kavramlarını doğurur. Analist hangi harfin hangi satıra ait olduğunu (hizasını) bulmakta çok daha fazla zorlanır."
        })
    },
    {
        id: "columnar_h2",
        algoId: "columnar",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Anahtarınız 'KEY' (K=2, E=1, Y=3). Şifreli metniniz 6 harf: '142536'. Dolgulu bir Sütunlu Transpozisyon uygulandığını biliyorsunuz. Deşifre (Decryption) işlemi yaparken, şifreli metnin İLK harfi olan '1' numaralı karakter, düz metin matrisinde kaçıncı SÜTUNA (Soldan sağa, 1 tabanlı) yazılmalıdır?",

            answer: "2",
            hint: "E harfi 1 numaraydı, Y 3 numara. E kelimede kaçıncı sırada?",
            explanation: "KEY kelimesinde sıralama: E(1), K(2), Y(3). Okuma sırası önce E'dir (yani 2. sütun). Demek ki şifreli metindeki ilk blok (ilk sütun) aslen tablonun 2. sütununa yerleşmelidir."
        })
    },
    {
        id: "columnar_h3",
        algoId: "columnar",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Çok uzun bir mesajda, Sütunlu Transpozisyon anahtarının uzunluğu 2 (örneğin 'AB') ise, bu algoritma tamamen 'Rail Fence' (2 raylı) ile eşdeğer (aynı çıktıyı veren) hale gelir.",

            answer: "false",
            hint: "Okuma ve yazma yönlerini iyi düşünün.",
            explanation: "2 raylı Rail Fence'te metin yukarı aşağı (zig-zag) yazılarak satır satır okunur. Sütunlu'da ise satır satır (soldan sağa) yazılıp sütun sütun (yukarıdan aşağı) okunur. Şekilsel olarak benzer görünse de harflerin dizilim yerleri (indeksleri) farklıdır, tam eşdeğer değillerdir."
        })
    },
    {
        id: "columnar_h4",
        algoId: "columnar",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Sütunlu Transpozisyonda, anahtar kelimenin uzunluğu (n) ve sütunların permütasyonu düşünüldüğünde, kaba kuvvet (brute-force) saldırısı ile denenmesi gereken MAKSİMUM olası sütun dizilimi sayısı nasıl hesaplanır?",
            options: ["n! (n faktöriyel)","2^n (2 üzeri n)","n^2 (n kare)","n * 26"],
            answer: "n! (n faktöriyel)",
            hint: "3 eleman kaç farklı şekilde sıralanabilir? 3*2*1.",
            explanation: "n adet sütunun yan yana kaç farklı şekilde dizilebileceği n! (faktöriyel) ile hesaplanır. Örneğin 5 harfli anahtarda 5! = 120 farklı permütasyon vardır."
        })
    },
    {
        id: "columnar_h5",
        algoId: "columnar",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Anahtarı 'ZA' olan bir Sütunlu Transpozisyon düşünün. Alfabetik sıraya göre (A=1, Z=2) sütunların okunma sırası 2. sütun ve 1. sütun olur. Şifreli metin: 'ABCD'. Tabloyu yeniden kurarsanız şifresiz orijinal metin ne çıkar? (Dolgusuz/Tam dolu matris)",

            answer: "CADB",
            hint: "Tablo 2x2. İkinci sütun 'AB', Birinci sütun 'CD' olmuş.",
            explanation: "Şifreli metin 'ABCD' ve sıra 2, 1 olduğuna göre: 'AB' kısmı tablonun 2. sütunudur (sağ taraf). 'CD' kısmı tablonun 1. sütunudur (sol taraf). Tabloyu birleştirirsek: [C A / D B]. Satır satır okuduğumuzda: CADB."
        })
    },
    {
        id: "rsa_e1",
        algoId: "rsa",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "RSA (Rivest–Shamir–Adleman) şifreleme algoritması kriptografinin hangi büyük kategorisine aittir?",
            options: ["Simetrik Şifreleme (Gizli Anahtarlı)","Asimetrik Şifreleme (Açık Anahtarlı)","Yer Değiştirme Şifresi (Transpozisyon)","Kriptografik Özetleme (Hashing)"],
            answer: "Asimetrik Şifreleme (Açık Anahtarlı)",
            hint: "Şifrelerken herkesin bilebileceği bir anahtar, çözerken sadece sizin bildiğiniz bir anahtar.",
            explanation: "RSA, iki farklı anahtarın (Açık/Public ve Gizli/Private) kullanıldığı Asimetrik Şifreleme (Public-Key Cryptography) ailesinin en bilinen örneğidir."
        })
    },
    {
        id: "rsa_e2",
        algoId: "rsa",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "RSA şifrelemesinde, herkesin size şifreli mesaj gönderebilmesi için Gizli Anahtarınızı (Private Key) internette açıkça yayınlamanız gerekir.",

            answer: "false",
            hint: "Adı üstünde, 'Gizli' anahtar.",
            explanation: "Herkesin size mesaj gönderebilmesi için Açık Anahtarınızı (Public Key) yayınlarsınız. Bu mesajı yalnızca kendi sizde kalan Gizli Anahtarınızla (Private Key) çözebilirsiniz."
        })
    },
    {
        id: "rsa_e3",
        algoId: "rsa",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "RSA algoritmasının güvenliği, matematiksel olarak hangi işlemin günümüz bilgisayarları için GÜÇ (çok uzun sürmesi) olmasına dayanır?",
            options: ["İki dev asal sayıyı birbiriyle çarpmak","Çok büyük bir sayıyı (modül n) asal çarpanlarına ayırmak","Büyük sayıların karesini almak","Matris determinantı hesaplamak"],
            answer: "Çok büyük bir sayıyı (modül n) asal çarpanlarına ayırmak",
            hint: "n = p * q işlemi kolaydır, peki ya n'den p ve q'yu bulmak?",
            explanation: "RSA'nın temel güvenlik varsayımı 'Asal Çarpanlara Ayırma Problemi'dir (Integer Factorization Problem). Çok büyük iki asal sayının çarpımı (n) olan bir sayıyı, asallarına (p ve q) geri çevirmek imkansıza yakındır."
        })
    },
    {
        id: "rsa_e4",
        algoId: "rsa",
        difficulty: "easy",
        type: "numeric",
        generate: () => ({
            question: "RSA algoritmasında, şifreleme (Encryption) ve şifre çözme (Decryption) işlemleri genellikle çok büyük sayıların 'M......' aritmetiği (kalanlı bölme) kurallarıyla yapıldığını belirtiriz. Bu kelimenin baş harfi nedir? (Sadece sayıyı değil kelimenin kökünden ipucu: Mod...) Kısacası bu matematik sistemine ne denir? (Sadece 3 harfli kısa adını yazın)",

            answer: "mod",
            hint: "M ile başlar, 'kalan' demektir.",
            explanation: "RSA tamamen 'Modüler Aritmetik' (Modulo) işlemleri üzerine kuruludur. Tüm işlemler (mod n) tabanında yapılır."
        })
    },
    {
        id: "rsa_e5",
        algoId: "rsa",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "RSA algoritmasını kullanarak metin mesajlarını (örneğin 'MERHABA') şifrelemek mümkündür, bunun için harfler önce sayılara dönüştürülmelidir.",

            answer: "true",
            hint: "Bilgisayarda harfler nasıl saklanır?",
            explanation: "RSA sadece büyük sayılar üzerinde çalışır. Bu nedenle metinler (harfler) önce ASCII, UTF-8 veya benzeri bir yöntemle sayısal bloklara (integer) dönüştürülür, ardından şifrelenir."
        })
    },
    {
        id: "rsa_m1",
        algoId: "rsa",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "RSA anahtar üretiminde ilk adım olarak seçilen 'p' ve 'q' değerleri ne tür sayılar olmak zorundadır?",
            options: ["Rastgele seçilmiş çift sayılar","Büyük asal sayılar (Prime Numbers)","Büyük çift tam sayılar","Aralarında asal olan herhangi iki küçük sayı"],
            answer: "Büyük asal sayılar (Prime Numbers)",
            hint: "Matematiğin yapı taşları olan sayılar.",
            explanation: "RSA'nın güvenliği için p ve q rastgele seçilmiş, birbirinden farklı, çok büyük (genellikle 1024 veya 2048 bit) asal sayılar olmalıdır. Bu asal sayıların çarpımı 'n' modülünü oluşturur."
        })
    },
    {
        id: "rsa_m2",
        algoId: "rsa",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "RSA'da Açık Anahtar (Public Key) genellikle (e, n) çiftinden oluşur. Gizli Anahtar (Private Key) ise (d, n) çiftinden. 'n' değerinin formülü p ve q asallarının ne işlemine sokulmasıyla bulunur?",

            answer: "çarpım",
            hint: "p ... q = n",
            explanation: "n (modülüs), p ve q asal sayılarının birbiriyle çarpılması (p * q) sonucunda elde edilir."
        })
    },
    {
        id: "rsa_m3",
        algoId: "rsa",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "RSA şifreleme fonksiyonu C = (M^e) mod n şeklindedir. Şifre çözme fonksiyonu ise M = (C^d) mod n'dir.",

            answer: "true",
            hint: "C(Ciphertext), M(Message).",
            explanation: "Bu iki formül RSA'nın temel yapısıdır. Açık anahtar olan 'e' üssü ile şifrelenir (C), gizli anahtar olan 'd' üssü ile şifre çözülür (M). Euler Teoremi sayesinde C^d (mod n) işlemi M'yi geri verir."
        })
    },
    {
        id: "rsa_m4",
        algoId: "rsa",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "RSA hesaplamalarında önemli bir yer tutan ve φ(n) (Euler'in Totient Fonksiyonu) olarak bilinen değerin p ve q bilindiğinde (p ve q farklı asallar) hesaplanma formülü (p-1) * (q-X)'tir. X kaçtır?",

            answer: "1",
            hint: "p eksi bir çarpı q eksi bir.",
            explanation: "Farklı iki asal sayının çarpımı olan n'in (n=p*q) totient fonksiyonu φ(n) = (p-1)(q-1) formülü ile hesaplanır."
        })
    },
    {
        id: "rsa_m5",
        algoId: "rsa",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Uygulamada RSA algoritması ile devasa boyuttaki dosyalar (örneğin 1 GB'lık bir video) şifrelenmek istendiğinde ne yapılır?",
            options: ["RSA ile dosya küçük 1 baytlık bloklara bölünüp tek tek şifrelenir","RSA doğrudan tüm dosya üzerinde uygulanır","AES gibi hızlı simetrik bir algoritma ile dosya şifrelenir, RSA sadece AES anahtarını şifrelemek için kullanılır","Dosya asallara ayrılarak şifrelenir"],
            answer: "AES gibi hızlı simetrik bir algoritma ile dosya şifrelenir, RSA sadece AES anahtarını şifrelemek için kullanılır",
            hint: "RSA çok güvenlidir ama devasa matematik işlemleri nedeniyle ÇOK YAVAŞTIR.",
            explanation: "Pratikte (SSL/TLS gibi) 'Hibrit Şifreleme' (Hybrid Encryption) kullanılır. Devasa veriler hızlı simetrik algoritmalarla (AES) şifrelenir, sadece o simetrik anahtarı güvenle karşıya iletmek için RSA (asimetrik) kullanılır."
        })
    },
    {
        id: "rsa_h1",
        algoId: "rsa",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Bir siber güvenlik senaryosunda, Alice Bob'a bir RSA mesajı gönderiyor. Ancak saldırgan Eve, (e, n) açık anahtarını ve şifreli 'C' mesajını ele geçiriyor. Eve, olası tüm 'M' (mesaj) değerlerini tek tek tahmin edip (M^e mod n) işlemi yaparak C ile karşılaştırırsa, bu saldırının adı nedir?",
            options: ["Chosen-Ciphertext Saldırısı","Dictionary (Sözlük) veya Guessing (Tahmin) Saldırısı","Padding Oracle Saldırısı","Zamanlama (Timing) Saldırısı"],
            answer: "Dictionary (Sözlük) veya Guessing (Tahmin) Saldırısı",
            hint: "Sözlükteki kelimeleri tek tek şifreleyip eşleşme arama.",
            explanation: "Eğer mesajın boyutu küçükse veya bilinen kelimelerden oluşuyorsa (örn: 'EVET', 'HAYIR'), saldırgan olası cevapları açık anahtarla şifreleyip şifreli metinle eşleştirebilir. Bunu önlemek için RSA'da 'Padding' (örn. OAEP rastgeleliği) eklenmesi zorunludur."
        })
    },
    {
        id: "rsa_h2",
        algoId: "rsa",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "RSA'da seçilen açık üs (e) değeri genellikle 65537 gibi küçük bir asal sayı olarak tercih edilir, çünkü bu sayı şifreleme işlemini bilgisayarlar (özellikle küçük işlemciler) için inanılmaz hızlandırır.",

            answer: "true",
            hint: "65537 ikili (binary) sistemde nasıl yazılır? Sadece iki tane 1 biti vardır.",
            explanation: "e=65537 (veya 2^16 + 1) ikili sistemde sadece iki tane 1 içerir (10000000000000001). Square-and-multiply (kare al ve çarp) algoritmasında çok az çarpma işlemi gerektirir, bu da şifrelemeyi çok hızlandırır ve belirli ataklara karşı e=3'ten daha güvenlidir."
        })
    },
    {
        id: "rsa_h3",
        algoId: "rsa",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Gizli üs 'd' hesaplanırken e * d ≡ 1 (mod φ(n)) formülü kullanılır. Bu denklemde 'd', 'e' sayısının (mod φ(n)) tabanındaki nesidir?",

            answer: "tersi",
            hint: "Modüler multiplikatif ...",
            explanation: "'d' sayısı 'e' sayısının 'modüler çarpımsal tersidir' (modular multiplicative inverse). Genişletilmiş Öklid Algoritması ile bulunur."
        })
    },
    {
        id: "rsa_h4",
        algoId: "rsa",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer RSA'da seçtiğiniz iki asal sayı p ve q birbirine çok yakın (örneğin aralarındaki fark küçük bir sayı) seçilirse, RSA hangi matematiksel saldırıya karşı anında savunmasız kalır?",
            options: ["Fermat'nın Çarpanlara Ayırma (Factorization) Yöntemi","Kaba Kuvvet (Brute Force) Harf Tahmini","Frekans Analizi","Kasiski Testi"],
            answer: "Fermat'nın Çarpanlara Ayırma (Factorization) Yöntemi",
            hint: "İki sayı yakınsa n, bir tam kareye (x^2) çok yakındır.",
            explanation: "Eğer p ve q birbirine çok yakınsa, (n = p*q) değeri (x+y)(x-y) = x^2 - y^2 formülüne göre kolayca asal çarpanlarına ayrılabilir (Fermat's Factorization). Bu yüzden p ve q farklı ve rastgele büyüklüklerde seçilmelidir."
        })
    },
    {
        id: "rsa_h5",
        algoId: "rsa",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Basit ve küçük sayılarla bir RSA kuralım. p=5, q=11 olsun. n=55'tir. φ(n) = (5-1)*(11-1) = 40. Eğer e=7 seçersek, şifreleme formülü M^7 mod 55 olur. Mesajımız M=2 olsun. Şifrelenmiş metin (C) kaç olur?",

            answer: "18",
            hint: "2^7 = 128. 128'in 55'e bölümünden kalan kaçtır?",
            explanation: "M=2, e=7, n=55. C = (2^7) mod 55. 2^7 = 128. 128 = 55*2 + 18. Kalan 18'dir. C = 18."
        })
    },
    {
        id: "dh_e1",
        algoId: "dh",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Diffie-Hellman (DH) algoritmasının kriptografideki TEMEL amacı nedir?",
            options: ["Bir dosyayı AES ile şifrelemek","Açık ve güvensiz bir kanal üzerinden iki tarafın güvenli bir şekilde ortak anahtar (Secret Key) oluşturması","Mesajların dijital olarak imzalanması ve kimlik doğrulanması","Şifreleri geri alınamaz hash'lere çevirmek"],
            answer: "Açık ve güvensiz bir kanal üzerinden iki tarafın güvenli bir şekilde ortak anahtar (Secret Key) oluşturması",
            hint: "Anahtar 'Değişimi' veya 'Anlaşması' olarak bilinir.",
            explanation: "Diffie-Hellman bir 'şifreleme' (encryption) aracı değil, bir 'Anahtar Anlaşması' (Key Exchange/Agreement) protokolüdür. Taraflar, aralarındaki iletişim dinlense bile ortak bir anahtarda uzlaşabilirler."
        })
    },
    {
        id: "dh_e2",
        algoId: "dh",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Diffie-Hellman algoritmasında, tarafların internet (veya açık kanal) üzerinden birbirlerine gönderdikleri sayılar (A ve B) 'Açık' anahtarlardır ve dinleyen bir saldırgan (Eve) tarafından görülebilir.",

            answer: "true",
            hint: "DH'nin bütün sihri herkesin gördüğü sayılardan yola çıkarak gizli bir şey üretmektir.",
            explanation: "Taraflar genel parametreleri (g ve p) ve kendi ürettikleri açık değerleri (A ve B) internetten gönderirler. Saldırgan bunları görse de 'gizli' anahtara ulaşamaz."
        })
    },
    {
        id: "dh_e3",
        algoId: "dh",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Diffie-Hellman genelde 'Boya Karıştırma' (Paint Mixing) örneğiyle anlatılır. Bu analojide, her iki tarafın baştan anlaştığı ve internetten açıkça paylaştığı 'Ortak Renk' matematiğe göre hangisidir?",
            options: ["Public Base (Taban / jeneratör 'g')","Private Key (Gizli Üs 'a' veya 'b')","Ortak Paylaşılan Sır (Shared Secret 's')","Hash Fonksiyonu"],
            answer: "Public Base (Taban / jeneratör 'g')",
            hint: "Sarı renkle başlayalım, sen kendi gizli rengini kat, ben de kendi gizli rengimi...",
            explanation: "Boya örneğindeki ortak renk (sarı), matematikte iki tarafın baştan anlaştığı ve dinleyicilerin de bildiği 'g' (generator/base) değeridir."
        })
    },
    {
        id: "dh_e4",
        algoId: "dh",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Diffie-Hellman kullanarak iki kişi (Alice ve Bob) güvenli bir ortak sır (sayı) üretti. Bu ortak sır daha sonra genellikle hangi tür şifreleme algoritması (örn. AES) için 'anahtar' olarak kullanılır?",

            answer: "Simetrik",
            hint: "Her iki tarafın da aynı anahtara sahip olduğu şifreleme türü.",
            explanation: "DH ile üretilen ortak sır (shared secret), her iki tarafta da aynı olan bir sayıdır. Bu sayı, AES gibi hızlı Simetrik (Gizli Anahtarlı) şifreleme algoritmalarında anahtar olarak kullanılır."
        })
    },
    {
        id: "dh_e5",
        algoId: "dh",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Diffie-Hellman algoritması, dijital imza (Digital Signature) atmak veya mesajı kimin gönderdiğini doğrulamak (Authentication) için kendi başına yeterlidir.",

            answer: "false",
            hint: "Ortadaki Adam (Man-in-the-Middle) saldırısını düşünün.",
            explanation: "Saf (Klasik) Diffie-Hellman'ın kimlik doğrulama özelliği yoktur. Alice, Bob ile konuştuğunu sanırken aslında aradaki bir saldırganla (Eve) anahtar oluşturuyor olabilir (MitM saldırısı). Bu yüzden RSA veya ECC gibi imzalarla desteklenmelidir."
        })
    },
    {
        id: "dh_m1",
        algoId: "dh",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Diffie-Hellman matematiğinde işlemin temeli olan formül 'A = (g^a) mod p'dir. Burada 'a' nedir?",
            options: ["Açık anahtar","Ortak modül (asal sayı)","Kullanıcının (örneğin Alice'in) rastgele seçtiği ve asla paylaşmadığı GİZLİ üs","Şifreli mesaj"],
            answer: "Kullanıcının (örneğin Alice'in) rastgele seçtiği ve asla paylaşmadığı GİZLİ üs",
            hint: "'a' harfi Alice'in 'private' değerini temsil eder.",
            explanation: "DH algoritmasında 'a' (Alice için) ve 'b' (Bob için), kullanıcıların kendi bilgisayarlarında tuttukları, internetten yollamadıkları gizli sayılardır (Private Key)."
        })
    },
    {
        id: "dh_m2",
        algoId: "dh",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Alice'in gizli sayısı 'a', Bob'un gizli sayısı 'b' olsun. Alice Bob'dan gelen 'B' değerini alır ve kendi gizli üssünü uygular: S = (B^a) mod p. Bob ise Alice'ten gelen 'A' değerine S = (A^b) mod p uygular. İkisi de AYNİ 'S' sayısına ulaşır. Bu eşitliği sağlayan temel üslü sayı (matematik) kuralı nedir? (g üssü ... eşittir g üssü ...)",

            answer: "(g^a)^b = (g^b)^a",
            hint: "Üssün üssü çarpılır.",
            explanation: "DH'nin çalışmasını sağlayan temel kural üslü sayıların (g^a)^b = g^(a*b) = (g^b)^a = g^(b*a) şeklinde değişme (commutative) özelliğine sahip olmasıdır."
        })
    },
    {
        id: "dh_m3",
        algoId: "dh",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Saldırgan Eve, internetten geçen g, p, A (Alice'in açığı) ve B (Bob'un açığı) değerlerinin hepsini görür. Eve, (A * B) mod p işlemini yaparak ortak sır 'S' değerini kolayca bulabilir.",

            answer: "false",
            hint: "A = g^a, B = g^b. (g^a * g^b) = g^(a+b) yapar, g^(a*b) yapmaz.",
            explanation: "Ortak sır S = g^(a*b) mod p'dir. Saldırgan A ve B'yi çarparsa A*B = (g^a * g^b) = g^(a+b) bulur. g^(a*b)'yi bulmak için A veya B'den birinin 'gizli üssünü' (a veya b) bilmesi gerekir ki bu da mümkün değildir."
        })
    },
    {
        id: "dh_m4",
        algoId: "dh",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Çok küçük sayılarla DH yapalım. p=23 (asal modül), g=5 (taban). Alice gizli a=4 seçiyor. A = 5^4 mod 23 hesabını yaparsak, Alice internetten Bob'a hangi sayıyı (A) gönderir? (5^4 = 625)",

            answer: "4",
            hint: "625 / 23 = 27 (621 yapar). Kalan kaçtır?",
            explanation: "625 = 23 * 27 + 4. Kalan (mod 23) 4'tür. Alice internet üzerinden '4' sayısını gönderir."
        })
    },
    {
        id: "dh_m5",
        algoId: "dh",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Diffie-Hellman (DH) güvenliği hangi zor matematiksel probleme (Mathematical Hard Problem) dayanır?",
            options: ["Ayrık Logaritma Problemi (Discrete Logarithm Problem)","Asal Çarpanlara Ayırma (Integer Factorization)","Eliptik Eğri (Elliptic Curve) Eğriliği","Genişletilmiş Öklid (Extended Euclid)"],
            answer: "Ayrık Logaritma Problemi (Discrete Logarithm Problem)",
            hint: "A = g^a (mod p). A, g ve p'yi bilen birinin 'a'yı bulması işlemidir.",
            explanation: "Verilen A, g ve p sayıları için A = g^a (mod p) denklemini sağlayan 'a' üssünü (logaritma) bulmak, çok büyük sayılarda bilgisayarlar için çözülemez bir işlemdir. Buna 'Discrete Logarithm Problem (DLP)' denir."
        })
    },
    {
        id: "dh_h1",
        algoId: "dh",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Modern web tarayıcılarında HTTPS (TLS) bağlantısı kurulurken genellikle 'DHE' veya 'ECDHE' algoritmaları kullanılır. Sondaki 'E' (Ephemeral) kelimesi kriptografik olarak ne anlama gelir?",
            options: ["Geçici (Her oturumda yeni gizli anahtarlar a ve b üretilmesi)","Etkili (Şifrelemenin daha az enerji harcaması)","Uzatılmış (Anahtarın 4096 bit olması)","Hatasız (Error-free aktarım yapılması)"],
            answer: "Geçici (Her oturumda yeni gizli anahtarlar a ve b üretilmesi)",
            hint: "Eğer sunucu anahtarı çalınırsa geçmiş mesajlar çözülmesin diye (Forward Secrecy).",
            explanation: "'Ephemeral' (Geçici) Diffie-Hellman, her bağlantıda (oturumda) yeni ve benzersiz a ve b (gizli anahtarlar) üretilmesi demektir. Bu, sunucunun uzun süreli anahtarı yıllar sonra bile hacklense, geçmişteki trafiklerin (çünkü eski a ve b çöpe atılmıştır) çözülememesini sağlar (Perfect Forward Secrecy)."
        })
    },
    {
        id: "dh_h2",
        algoId: "dh",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Diffie-Hellman algoritmasında p asal modülü yeterince büyük seçilse bile, 'g' (jeneratör) parametresinin 1 veya p-1 gibi zayıf sayılar seçilmesi sistemin anında kırılmasına (tüm matematiğin çökmesine) neden olur.",

            answer: "true",
            hint: "g=1 ise 1'in her kuvveti (1^a, 1^b) daima 1'dir.",
            explanation: "Jeneratör (g) rastgele herhangi bir sayı olamaz. Eğer 1 seçilirse 1^a=1 olur. Genellikle 'p' modülünün bir 'İlkel Kökü' (Primitive Root) veya güvenli büyük bir alt grubu üreten (generator of a prime-order subgroup) özel sayılar (örn. 2, 5) seçilmelidir."
        })
    },
    {
        id: "dh_h3",
        algoId: "dh",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "A = (g^a) mod p işlemi çok büyük (örneğin 2048 bitlik) sayılarda gerçekleştirilirken, a sayısının üssünü alıp sonra modunu almak (g^a sayısının kendisini hafızada hesaplamak) bilgisayarın belleğini aşar (çünkü inanılmaz büyüktür). Bu işlemi hızlı ve bellek taşırmadan yapmak için kullanılan algoritmanın adı '...... ve Çarp' (Square-and-Multiply / Modular Exponentiation) algoritmasıdır. Boşluğa ne gelmeli?",

            answer: "Kare al",
            hint: "Üslü sayıyı 2'nin katları şeklinde parçalayan (binary) yöntem.",
            explanation: "Matematikte bu metoda 'Kare al ve çarp' (Square-and-multiply) veya 'Modüler Üs Alma' (Modular Exponentiation) denir. Ara sonuçların her adımında mod p alınarak sayıların devasa büyümesi engellenir."
        })
    },
    {
        id: "dh_h4",
        algoId: "dh",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Klasik (sonlu cisim) Diffie-Hellman ile ECDH (Eliptik Eğri Diffie-Hellman) arasındaki temel operasyonel fark nedir?",
            options: ["Klasik DH üslü sayılar kullanırken, ECDH eğri üzerindeki noktaların 'toplanması' ve 'skaler çarpımı' ile çalışır","Klasik DH asimetrik, ECDH simetriktir","ECDH internet gerektirmez","Klasik DH sayıları şifreler, ECDH harfleri şifreler"],
            answer: "Klasik DH üslü sayılar kullanırken, ECDH eğri üzerindeki noktaların 'toplanması' ve 'skaler çarpımı' ile çalışır",
            hint: "A = g^a mod p yerine Q = a * G gibi bir işlem.",
            explanation: "Eliptik Eğri matematiğinde 'üs alma' yoktur. Bunun yerine bir 'G' noktası (Generator Point) alınır ve gizli sayı (a) kadar kendisiyle toplanarak (Skaler Çarpım) yeni bir 'Q' noktası elde edilir. Bu daha küçük anahtar boyutlarıyla aynı güvenliği sağlar."
        })
    },
    {
        id: "dh_h5",
        algoId: "dh",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Man-in-the-Middle (Ortadaki Adam) saldırısını yapan Eve, Alice'in yolladığı (A=10) değerini tutup Bob'a kendi ürettiği (E_A=5) değerini yollar. Bob'un yolladığı (B=20) değerini tutup Alice'e kendi (E_B=15) değerini yollar. Bu durumda Alice ve Bob iletişim bitiminde KAÇ TANE ortak (shared) anahtara sahip olurlar?",

            answer: "0",
            hint: "Alice, Eve ile bir anahtar oluşturur. Bob, Eve ile BAŞKA bir anahtar oluşturur. Alice ve Bob'un aynı olan kendi aralarında 'ortak' sırrı var mıdır?",
            explanation: "Saldırı başarılı olursa Alice ve Bob'un ORTAK bir anahtarı oluşmaz (0). Bunun yerine Alice ve Eve arasında 'S1', Bob ve Eve arasında 'S2' olmak üzere iki ayrı anahtar oluşur. Eve tüm mesajları ortada çözüp tekrar şifreler."
        })
    },
    {
        id: "freq_analysis_e1",
        algoId: "freq-analysis",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Frekans Analizi (Harf Sıklığı Analizi) hangi tür şifreleme yöntemlerini kırmak için geliştirilmiş en temel yöntemdir?",
            options: ["Açık Anahtarlı (Asimetrik) şifreler","Tek Alfabeli Yerine Koyma (Monoalphabetic Substitution) şifreleri","Yer Değiştirme (Transposition) şifreleri","Özetleme (Hash) fonksiyonları"],
            answer: "Tek Alfabeli Yerine Koyma (Monoalphabetic Substitution) şifreleri",
            hint: "Sezar şifresi veya gazetedeki kriptogram bulmacaları gibi.",
            explanation: "Frekans analizi, şifreli bir metinde hangi harflerin çok veya az kullanıldığına bakarak, her harfin her zaman aynı şifreli harfe dönüştüğü Sezar, Atbash veya rastgele yerine koyma şifrelerini kırmak için kullanılır."
        })
    },
    {
        id: "freq_analysis_e2",
        algoId: "freq-analysis",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "İngilizce dilinde yazılmış tipik bir düz metinde en sık kullanılan harf 'Z'dir.",

            answer: "false",
            hint: "A, E, I, O, U harfleri daha yaygındır.",
            explanation: "İngilizcede ve birçok batı dilinde en sık kullanılan harf açık ara farkla 'E' harfidir. 'Z' ise en nadir kullanılanlardan biridir."
        })
    },
    {
        id: "freq_analysis_e3",
        algoId: "freq-analysis",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Türkçe bir metinde frekans analizi yaptığımızda genellikle EN SIK karşılaşacağımız sesli harf hangisidir?",
            options: ["A veya E","O veya Ö","U veya Ü","I veya İ"],
            answer: "A veya E",
            hint: "Türkçe kelimelerde en çok kullanılan geniş sesliler.",
            explanation: "Geniş Türkçe dil derlemlerine göre Türkçe'de en sık kullanılan harf genellikle 'A' (bazen 'E') harfidir. (Sesli olarak A ve E, sessiz olarak N, R, L sıkça görülür.)"
        })
    },
    {
        id: "freq_analysis_e4",
        algoId: "freq-analysis",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Şifreli bir metinde en çok geçen harf 'K' ise ve siz İngilizce dilinde yazıldığını bildiğiniz bu metni frekans analiziyle çözmek isterseniz, 'K' harfinin hangi harfi temsil ettiğini tahmin edersiniz? (Tek harf)",

            answer: "E",
            hint: "İngilizcede en sık geçen harf hangisidir?",
            explanation: "Eğer bir şifreleme (monoalphabetic) metnin istatistiklerini değiştirmiyorsa, şifreli metinde en çok geçen harf, dildeki en çok geçen harf (İngilizce için E) olmak zorundadır."
        })
    },
    {
        id: "freq_analysis_e5",
        algoId: "freq-analysis",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Kısa bir kelime olan 'KEDİ' kelimesi tek başına frekans analizi yapmak için yeterli ve güvenilir bir metindir.",

            answer: "false",
            hint: "İstatistik büyük sayılar kanununa ihtiyaç duyar.",
            explanation: "Frekans analizinin çalışması için metnin uzun olması gerekir (en az 100-200 harf). Kısa kelimelerde dildeki genel harf dağılımı yansımaz (Örneğin 'KEDİ' kelimesinde A harfi hiç yoktur)."
        })
    },
    {
        id: "freq_analysis_m1",
        algoId: "freq-analysis",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Sadece harflerin teker teker frekansına bakmak bazen yeterli olmaz. Çift harflerin (ikililerin) frekansına bakmaya ne ad verilir?",
            options: ["Bigram (veya Digraph) analizi","Anagram analizi","Poligram şifreleme","Monoalfabetik kontrol"],
            answer: "Bigram (veya Digraph) analizi",
            hint: "'Bi' öneki iki anlamına gelir.",
            explanation: "Dillerde harflerin tekil frekansı kadar, yan yana gelme sıklıkları da (Bigram/Digraph) çok belirgindir. Örneğin İngilizcede 'TH', 'HE', 'IN' ikilileri, Türkçede 'LA', 'AR' gibi ikililer çok sıktır."
        })
    },
    {
        id: "freq_analysis_m2",
        algoId: "freq-analysis",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Tarihte frekans analizi yöntemini ilk kez 9. yüzyılda kaleme alan ve 'Kriptanalizin Babası' olarak bilinen ünlü Arap alimi kimdir?",

            answer: "El Kindi",
            hint: "(Al-Kindi) 'Kriptografik Mesajların Çözülmesi Üzerine' kitabının yazarı.",
            explanation: "El Kindi (Al-Kindi), MS 800'lü yıllarda Kur'an metinlerinin harf analizini yaparken frekans analizi fikrini bulan ve yazılı olarak belgeleyen ilk kişidir."
        })
    },
    {
        id: "freq_analysis_m3",
        algoId: "freq-analysis",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Vigenère şifresi, çoklu alfabe (polyalphabetic) yapısı sayesinde metnin tekil harf frekans analizini tamamen yok eder (dümdüz (flat) bir grafik oluşturur).",

            answer: "true",
            hint: "Aynı harfin her seferinde farklı bir harfe dönüşmesi grafiği nasıl etkiler?",
            explanation: "Vigenère gibi algoritmalar aynı 'E' harfini anahtardaki harfe göre bazen X'e, bazen B'ye, bazen K'ye dönüştürür. Bu, klasik tek tepeli (E tepesi) grafiği düzleştirerek şifreyi frekans analiziyle doğrudan çözülemez hale getirir."
        })
    },
    {
        id: "freq_analysis_m4",
        algoId: "freq-analysis",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Elinizdeki şifreli İngilizce metnin 1000 harften oluştuğunu varsayalım. Eğer metin standart dil özelliklerini taşıyorsa ve basit bir yerine koyma şifresiyle şifrelenmişse, grafikteki en yüksek çubuğun (tepenin) kabaca KAÇ harfi temsil etmesini beklersiniz? (İngilizce 'E' harfi yaklaşık %12-.13 oranındadır. 1000'in %12'si?)",

            answer: "120",
            hint: "1000 * 0.12",
            explanation: "İngilizcede E harfinin frekansı %12 ile %13 arasındadır. 1000 harflik bir metinde en yüksek frekans yaklaşık 120-130 civarında olacaktır."
        })
    },
    {
        id: "freq_analysis_m5",
        algoId: "freq-analysis",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde şifreli bir metin var. Frekans analizi grafiğine baktınız ve 4-5 tane çok yüksek 'tepe' (sivri uç) gördünüz, diğer harflerin frekansı ise çok düşük. Bu metin BÜYÜK İHTİMALLE ne tür bir şifreleme ile şifrelenmiştir?",
            options: ["Monoalfabetik (Sezar, Rastgele Harf Değişimi vb.)","Polialfabetik (Vigenère vb.)","AES (Gelişmiş Şifreleme Standardı)","Sıkıştırılmış (Ziplenmiş) bir dosya"],
            answer: "Monoalfabetik (Sezar, Rastgele Harf Değişimi vb.)",
            hint: "Dillerin doğasında zaten 4-5 tane çok sık kullanılan sesli harf vardır.",
            explanation: "Eğer grafikte belirgin tepeler (peaks) ve çukurlar (valleys) görüyorsanız, metnin doğal dil yapısı (sesli-sessiz harf dengesi) korunmuş demektir. Bu sadece Sezar veya basit yerine koyma şifrelerinde olur. AES veya Vigenere'de grafik düzdür (rastgeledir)."
        })
    },
    {
        id: "freq_analysis_h1",
        algoId: "freq-analysis",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Kriptografi Laboratuvarı uygulamasındaki Frekans Analizi aracında bir grafiğin (histogram) şekli şifreli metinle eşleşmiyorsa (çok düz bir çizgiye yakınsa), aşağıdakilerden hangisi bunun nedeni OLAMAZ?",
            options: ["Metin Vigenère ile şifrelenmiştir","Metin çok kısadır (örneğin 15 harf)","Metin AES veya benzeri modern bir kripto ile şifrelenmiştir","Metin basit bir Sezar şifresi ile şifrelenmiştir"],
            answer: "Metin basit bir Sezar şifresi ile şifrelenmiştir",
            hint: "Sezar şifresinde grafik düzleşir mi yoksa sadece sağa-sola mı kayar?",
            explanation: "Sezar şifresi harf frekanslarının ORANINI değiştirmez, sadece yerlerini (örneğin E tepesini alıp H pozisyonuna) kaydırır. Grafiğin 'düz (flat)' görünmesinin sebebi Sezar olamaz."
        })
    },
    {
        id: "freq_analysis_h2",
        algoId: "freq-analysis",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "'Lipogram', frekans analizini zorlaştırmak için yazarın bilerek dilde en çok kullanılan harfi (örneğin E) hiç kullanmadan yazdığı metinlere verilen addır ve tarihi bir 'steganografi' (veri gizleme) denemesidir.",

            answer: "true",
            hint: "Ernest Vincent Wright'ın 'Gadsby' romanı 50.000 kelimedir ve hiç E harfi içermez.",
            explanation: "Lipogram, belirli bir harfin (genellikle en çok kullanılan E) hiç kullanılmadığı metinlerdir. Kriptografide frekans analizi grafiklerini şaşırtmak için kullanılan eski ama zor bir tekniktir."
        })
    },
    {
        id: "freq_analysis_h3",
        algoId: "freq-analysis",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "İngilizcedeki frekans sıralaması genellikle ETAOIN SHRDLU şeklinde ezberlenir. Sadece tek harfli kelimeleri bulmak isteseydiniz (şifreli metinde arada boşluk olan tek başına harfler), İngilizce için bu hangi İKİ harften biri olmalıydı? (Alfabetik sırayla ikisini bitişik yazın: örn. AB)",

            answer: "AI",
            hint: "İngilizcede tek harfli anlamlı kelimeler 'A' (bir) ve 'I' (Ben) dir.",
            explanation: "Eğer metindeki boşluklar korunmuşsa, tek harflik şifreli bloklar (Örneğin ' K ') İngilizcede ya 'A' ya da 'I' harfidir. Bu, analiste direkt 2 harfi çözme şansı verir."
        })
    },
    {
        id: "freq_analysis_h4",
        algoId: "freq-analysis",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer bir metin Affine (Afin) algoritması (Örn: 3x+5 mod 26) ile şifrelenirse, ortaya çıkan frekans analizi grafiği Sezar algoritmasıyla şifrelenmiş bir metnin grafiğiyle KESİNLİKLE aynı şekle (sadece kaydırılmış haline) sahip midir?",
            options: ["Evet, çünkü ikisi de yerine koyma şifresidir","Hayır, çünkü Afin şifresindeki çarpım işlemi harflerin aralarındaki mesafeleri açıp karıştırır","Evet, çünkü frekans grafikleri algoritmaya göre değil dile göre değişir","Hayır, çünkü Afin grafiği tamamen düzeltir (rastgeleleştirir)"],
            answer: "Hayır, çünkü Afin şifresindeki çarpım işlemi harflerin aralarındaki mesafeleri açıp karıştırır",
            hint: "A ile B yan yanadır. Afin ile şifrelendiklerinde yan yana kalırlar mı?",
            explanation: "Sezar şifresi grafiğin bütününü (tepeleri ve vadileri) bozmadan sağa veya sola bütün olarak kaydırır. Affine şifresinde (çarpan olduğu için) A, B, C arası mesafeler genişler veya karışır (Örn 3, 6, 9 olur). Bu yüzden grafiğin şekli bozulur (E tepesi ile T tepesi arasındaki mesafe aynı kalmaz)."
        })
    },
    {
        id: "freq_analysis_h5",
        algoId: "freq-analysis",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Frekans analizi kullanarak 26 harfli bir yerine koyma (substitution) şifresini çözmeye çalışıyorsunuz. 'E' harfini buldunuz. İkinci en sık geçen 'T' harfini buldunuz. Metindeki en sık geçen üç harfli heceyi (trigram) arıyorsunuz. İngilizcedeki en yaygın üç harfli kelime nedir? (3 harfli bu kelimenin harf sayısını yazın, elbette 3)",

            answer: "3",
            hint: "'THE' kelimesidir.",
            explanation: "İngilizcede en sık kullanılan üçlü grup 'THE' kelimesidir. Zaten 'T', 'H' ve 'E' en sık kullanılan harfler listesinin başlarındadır."
        })
    },
    {
        id: "caesar_breaker_e1",
        algoId: "caesar-breaker",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Sezar Şifresi Kırıcı (Brute-Force) aracı nasıl çalışır?",
            options: ["Sadece şifreyi yazan kişinin aklını okumaya çalışır","Tüm olası anahtarları (25 adet) tek tek dener ve sonuçları listeler","Ağdaki (İnternetteki) paketleri dinler","Sözlükteki tüm kelimeleri dener"],
            answer: "Tüm olası anahtarları (25 adet) tek tek dener ve sonuçları listeler",
            hint: "Adı üzerinde 'Kaba Kuvvet'.",
            explanation: "Sezar şifresinin sadece 25 (İngilizce için) farklı ihtimali (anahtarı) vardır. Kırıcı araç, hepsini alt alta sıralayarak insanın gözüyle anlamlı olanı bulmasını sağlar."
        })
    },
    {
        id: "caesar_breaker_e2",
        algoId: "caesar-breaker",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Sezar Şifresi Kırıcı aracını kullandığınızda bilgisayar %100 kesinlikle HANGİ metnin doğru olduğunu size tek bir satır olarak verebilir.",

            answer: "false",
            hint: "Bilgisayar Türkçe veya İngilizce anlamı olanı matematiksel olarak kesin seçebilir mi?",
            explanation: "Otomatik dil tespiti veya sözlük (dictionary) analizi kullanılmadığı sürece kaba kuvvet araçları tüm ihtimalleri (25 satır) listeler. Hangi satırın 'anlamlı' bir kelime olduğuna (doğru cevap olduğuna) insan (kullanıcı) bakarak karar verir."
        })
    },
    {
        id: "caesar_breaker_e3",
        algoId: "caesar-breaker",
        difficulty: "easy",
        type: "numeric",
        generate: () => ({
            question: "İngilizce alfabe kullanan bir sistemi 'Kaba Kuvvet' ile kırmak için kaç tane ihtimali denemeniz gerekir? (0 (şifresiz) hariç)",

            answer: "25",
            hint: "Alfabede 26 harf var. 1 ihtimal zaten sıfır (şifresiz).",
            explanation: "Sezar şifresinde anahtar 1 ile 25 arasında olabilir. 26 kaydırmak başa dönmek demektir. Bu yüzden 25 farklı ihtimal vardır."
        })
    },
    {
        id: "caesar_breaker_e4",
        algoId: "caesar-breaker",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Elinizde şifreli bir kelime olan 'BCD' var. Tüm ihtimalleri deneyen kaba kuvvet aracına soktuğunuzda anlamlı bulacağınız kelime muhtemelen ne olur?",

            answer: "ABC",
            hint: "1 harf geriye kayarsa...",
            explanation: "Eğer 1 kaydırma işlemi ile şifrelenmişse 'ABC'ye döner, ki bu da anlamlı bir sıralamadır."
        })
    },
    {
        id: "caesar_breaker_e5",
        algoId: "caesar-breaker",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Sezar kırma işlemi neden modern AES gibi algoritmalar için 'Kaba Kuvvet' ile yapılamaz?",
            options: ["AES kaba kuvvetlere karşı koruyan bir kalkan yazılımıdır","AES'in anahtar sayısı trilyonlarca çarpı trilyonlarca kez daha fazladır (Örn: 2^256)","AES kelimeleri sayılara çevirdiği için denenemez","AES şifreleri internet üzerinden kontrol edilir"],
            answer: "AES'in anahtar sayısı trilyonlarca çarpı trilyonlarca kez daha fazladır (Örn: 2^256)",
            hint: "25 ihtimal nerede, 115 quattuorvigintillion ihtimal nerede?",
            explanation: "Kaba kuvvet, tüm ihtimalleri deneme mantığıdır. Sezar'da bu sayı 25'tir ve çok kısadır. AES'te ise 2^256 (evrendeki atom sayısına yakın) ihtimal vardır, bu yüzden kaba kuvvet (brute-force) ile kırılamaz."
        })
    },
    {
        id: "caesar_breaker_m1",
        algoId: "caesar-breaker",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde 5 kelimelik bir Sezar şifreli cümle var. Ancak metindeki BİRİNCİ kelime Sezar(Anahtar=3) ile, İKİNCİ kelime Sezar(Anahtar=5) ile şifrelenmişse, standart bir Sezar Kırıcı (Brute-Force) bu cümleyi tek seferde okunaklı hale getirebilir mi?",
            options: ["Evet, çünkü ikisi de Sezar'dır","Hayır, çünkü anahtar her kelimede değişmiştir (Bu artık Vigenère benzeri bir yapı olmuştur)","Evet, ama sadece İngilizce kelimeler için","Evet, iki sonucu birleştirir"],
            answer: "Hayır, çünkü anahtar her kelimede değişmiştir (Bu artık Vigenère benzeri bir yapı olmuştur)",
            hint: "Kırıcı, bir satırda TÜM kelimelere aynı anahtarı uygular.",
            explanation: "Sezar kaba kuvvet aracı bir mesajın tamamının aynı anahtarla şifrelendiğini varsayar. Eğer her harf/kelime farklı anahtara sahipse (Polyalphabetic), her kelimenin anlamlı kısmı farklı satırlarda (Shift 3 satırı ve Shift 5 satırı) çıkar, cümle bir bütün olarak asla aynı satırda okunamaz."
        })
    },
    {
        id: "caesar_breaker_m2",
        algoId: "caesar-breaker",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Elinizde Sezar algoritmasıyla şifrelenmiş çok kısa, tek harflik bir mesaj var: 'V'. Kaba kuvvet yaptınız ve 25 satır (A, B, C... Z) elde ettiniz. Bu mesajı çözmek matematiksel/mantıksal olarak mümkün müdür? (Evet/Hayır)",

            answer: "Hayır",
            hint: "'A' harfi de olabilir, 'I' harfi de, 'O' harfi de. Hangisinin kastedildiğini bilemezsiniz.",
            explanation: "Kriptografide 'Unicity Distance' (Teklik Mesafesi) kavramı vardır. Bir harflik (veya çok kısa) şifrelerde, çıkan 25 ihtimalin birçoğu anlamlı (A, I, O vb.) olacağı için hangisinin GERÇEK şifre (anahtar) olduğunu KESİN olarak belirlemek imkansızdır. Kaba kuvvet anlamlı bir kelime (bağlam) arar."
        })
    },
    {
        id: "caesar_breaker_m3",
        algoId: "caesar-breaker",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Otomatik bir 'Sezar Kırıcı' yazılımı (insan gözü kullanmadan), 25 ihtimal içinden doğru satırı bulmak için genellikle dildeki harf frekansı (örn: İngilizce için E'nin çokluğu) bazlı bir skorlama fonksiyonu kullanır.",

            answer: "true",
            hint: "Program hangi satırın mantıklı olduğuna nasıl karar versin?",
            explanation: "İnsansız çalışan kırıcılar (Chi-Square testi vb.), oluşturduğu 25 farklı satırın harf frekansını İngilizce (veya Türkçe) dil frekansıyla karşılaştırır. En çok benzeyen (skoru en yüksek olan) satırı 'Buldum!' diye döndürür."
        })
    },
    {
        id: "caesar_breaker_m4",
        algoId: "caesar-breaker",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Eğer alfabe 26 harf yerine 256 karakterlik (tüm ASCII tablosu) bir Sezar şifresi olsaydı (A+3 yerine !+3), kaba kuvvet aracının toplamda KAÇ ihtimal denemesi gerekirdi? (Şifresiz olan 1 ihtimal hariç)",

            answer: "255",
            hint: "256 - 1 = ?",
            explanation: "Modül (Alfabe büyüklüğü) ne kadarsa, anahtar ihtimali o kadardır. 256 karakterli bir tabloda (kaydırmama hariç) 255 farklı kaydırma (anahtar) ihtimali vardır."
        })
    },
    {
        id: "caesar_breaker_m5",
        algoId: "caesar-breaker",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer 100 harflik şifreli bir metni kaba kuvvet aracına soktuğunuzda 25 satırın HİÇBİRİ anlamlı bir şey (örneğin Türkçe/İngilizce kelime) üretmiyorsa, aşağıdaki sonuçlardan hangisi KESİN çıkarılamaz?",
            options: ["Metin Sezar şifresi DEĞİLDİR","Metnin orijinali zaten anlamsız rastgele harflerden oluşuyordur","Metin çift (Double) Sezar şifrelemesinden geçmiştir (Sezar + Sezar)","Metin farklı bir dilde (örneğin Latince) yazılmış olabilir"],
            answer: "Metin çift (Double) Sezar şifrelemesinden geçmiştir (Sezar + Sezar)",
            hint: "Sezar üstüne Sezar eklendiğinde ne olur?",
            explanation: "İki Sezar şifresinin arka arkaya uygulanması yine tek bir Sezar şifresine eşdeğerdir (Additive). Kaba kuvvet aracı 25 ihtimali denediği için çift Sezar'ı DA kırar. Eğer hiçbir satır anlamlı değilse, bunun sebebi 'Çift Sezar' olması OLAMAZ."
        })
    },
    {
        id: "caesar_breaker_h1",
        algoId: "caesar-breaker",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Claude Shannon'ın bilgi kuramına göre, bir Sezar şifresini sadece istatistik/skorlama kullanarak (kaba kuvvetle) 'Kesin ve Tek Bir Doğru Sonuca' (Unicity Distance) ulaştıracak MİNİMUM metin uzunluğu İngilizce için kabaca ne kadardır?",
            options: ["1-2 harf","2-3 harf","10-15 harf","Yüzlerce harf"],
            answer: "2-3 harf",
            hint: "İngilizcenin entropisi dikkate alındığında 2 harf bazen, 3 harf çoğunlukla tek bir anlamlı kelime çıkarır.",
            explanation: "İngilizce için Unicity Distance (Sezar gibi 25 ihtimalli bir şifre için) hesaplandığında, yaklaşık 2 ile 3 harf (karakter) uzunluğundaki bir mesajın tek bir anlamlı (doğru) çevirisi olma ihtimali neredeyse kesindir."
        })
    },
    {
        id: "caesar_breaker_h2",
        algoId: "caesar-breaker",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Eğer şifreli metin 'A' harfi ve kırıcı (brute force) aracı çalıştırdığınızda Shift=1 satırında 'Z', Shift=2 satırında 'Y', Shift=3 satırında 'X' çıktığını görüyorsanız, bu araç deşifre (decryption) mi yapmaktadır yoksa o harfi ileri doğru şifrelemekte (encryption) midir?",

            answer: "deşifre",
            hint: "A'dan Z'ye, A'dan Y'ye gitmek geriye doğru gitmektir (çıkarmaktır).",
            explanation: "D(y) = (y - k) formülüne göre A(0) - 1 = Z(-1 mod 26 = 25). Yani araç şifreli metni kırmak için geriye (deşifre) doğru adım adım kaydırmaktadır."
        })
    },
    {
        id: "caesar_breaker_h3",
        algoId: "caesar-breaker",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Modern kriptografide, Brute-Force (Kaba Kuvvet) saldırılarından korunmanın TEK yolu (yazılımın hızlanmasını vs. beklemeden) kullanılan Anahtar Uzayını (Key Space) donanımların ve süper bilgisayarların hesaplama gücünün ötesine (Örn: 128-bit veya 256-bit) çıkarmaktır.",

            answer: "true",
            hint: "Kaba kuvvet akılsızca her şeyi denemektir. Tek çözüm denenecek şeylerin sayısını artırmaktır.",
            explanation: "Kaba kuvvet, şifrenin mantığındaki bir zafiyeti aramaz; dümdüz tüm ihtimalleri dener. Buna karşı yapılabilecek tek şey, denenecek anahtar miktarını (Key Space) evrenin yaşı kadar sürecek boyutlara (2^128 gibi) çıkarmaktır."
        })
    },
    {
        id: "caesar_breaker_h4",
        algoId: "caesar-breaker",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Sezar algoritması için geliştirilmiş, Kaba Kuvvet (Brute Force) yerine Düz Metin Frekans Skoru (Chi-Square Statistic) kullanan otomatik bir kırıcı algoritması (bilgisayar), neden ÇOK KISA kelimelerde (örn: 'TV') hata yapma (yanlış anahtarı seçme) eğilimindedir?",
            options: ["'TV' gibi kısaltmalardaki harflerin (T ve V) dildeki genel harf frekanslarına (E, A gibi) uymaması","Bilgisayarın 2 harfi okuyamaması","Chi-Square formülünün 3 harften kısada hata (crash) vermesi","Kısa kelimelerin Sezar'la şifrelenememesi"],
            answer: "'TV' gibi kısaltmalardaki harflerin (T ve V) dildeki genel harf frekanslarına (E, A gibi) uymaması",
            hint: "TV'de en çok geçen harf E midir?",
            explanation: "Frekans skorlama (Chi-Square) algoritmaları, metindeki harf oranlarını İngilizcenin genel harf oranlarına (E çok, Z az) benzetmeye çalışır. 'TV' kelimesinde hiç E yoktur, T ve V vardır. Algoritma bu harflerin genel istatistikten saptığını görür ve muhtemelen 'TV' yerine içinde A, E barındıran tamamen alakasız/anlamsız (ama skoru yüksek) başka bir satırı doğru kabul eder."
        })
    },
    {
        id: "caesar_breaker_h5",
        algoId: "caesar-breaker",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Aşırı gelişmiş bir Kuantum Bilgisayarı kullanılarak Grover Algoritması çalıştırıldığında (Kaba Kuvvet süresini kareköküne indirir), Sezar şifresinin 26 olan (veya İngilizcede 25 ihtimalli) anahtar uzayını kırmak için yaklaşık (√25) kaç adımda sonuç bulunabilir?",

            answer: "5",
            hint: "25'in karekökü.",
            explanation: "Grover'ın kuantum arama algoritması kaba kuvvet sürelerini kabaca O(N) durumundan O(√N) durumuna indirger. N=25 için bu, yaklaşık 5 adımda kırmak demektir (Zaten klasik bilgisayarlar için 25 adım da saniyenin milyarda biri sürer)."
        })
    },
    {
        id: "algo_compare_e1",
        algoId: "algo-compare",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Algoritma Karşılaştırma kavramında, iki farklı kriptografik yöntemi kıyaslarken genellikle hangisi BİR KRİTER (ölçüt) DEĞİLDİR?",
            options: ["Algoritmanın çalışma hızı (Performans)","Anahtar (Key) uzunluğu gereksinimi","Yazılımın rengi veya arayüz tasarımı","Brute-Force'a (Kaba Kuvvete) karşı dayanıklılığı"],
            answer: "Yazılımın rengi veya arayüz tasarımı",
            hint: "Kriptografi matematikle ilgilenir.",
            explanation: "Kriptografik algoritmalar Hız, Güvenlik (Anahtar Boyutu, Atak Dayanıklılığı), Kaynak Tüketimi (CPU/RAM) gibi metriklerle karşılaştırılır."
        })
    },
    {
        id: "algo_compare_e2",
        algoId: "algo-compare",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Genel kural olarak, Asimetrik (RSA vb.) algoritmalar Simetrik (AES, Sezar vb.) algoritmalara göre aynı veriyi şifrelerken çok DAHA HIZLI çalışırlar.",

            answer: "false",
            hint: "Devasa asal sayılarla matematik yapmak mı, yoksa basit bit kaydırmaları mı?",
            explanation: "Asimetrik algoritmalar (RSA) ağır matematik (büyük sayılar, modüler üs alma) gerektirir ve Simetrik (AES, DES) algoritmalara göre 100 ile 1000 kat daha YAVAŞ çalışırlar."
        })
    },
    {
        id: "algo_compare_e3",
        algoId: "algo-compare",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "'Vigenère' algoritmasını 'Sezar' algoritmasıyla güvenlik açısından karşılaştırdığımızda Vigenère neden daha güvenlidir?",
            options: ["Sadece sayılar kullandığı için","Çoklu alfabe (polyalphabetic) kullanıp frekans analizini bozduğu için","Fransızlar tarafından bulunduğu için","Açık anahtarlı olduğu için"],
            answer: "Çoklu alfabe (polyalphabetic) kullanıp frekans analizini bozduğu için",
            hint: "Her harf aynı harfe dönüşmez.",
            explanation: "Sezar (monoalfabetik) frekans analiziyle anında kırılır. Vigenère ise anahtar kelimesi boyunca farklı kaydırmalar yaparak dildeki doğal frekans yapısını gizler."
        })
    },
    {
        id: "algo_compare_e4",
        algoId: "algo-compare",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Diffie-Hellman ile RSA karşılaştırıldığında, hangisi bir 'Şifreleme (Encryption)' aracı olmaktan ziyade, iki kişinin internette güvenli 'Anahtar Paylaşması (Key Exchange)' için üretilmiştir? (Kısa adıyla yazın)",

            answer: "Diffie-Hellman",
            hint: "(DH) Algoritması.",
            explanation: "RSA doğrudan veri veya mesaj şifrelemek için kullanılabilir. Diffie-Hellman (DH) ise sadece iki taraf arasında bir şifre (anahtar) üretip anlaşmak için kullanılır."
        })
    },
    {
        id: "algo_compare_e5",
        algoId: "algo-compare",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Modern bir iletişimde (örn: HTTPS) sadece tek bir algoritma kullanmak yerine (sadece RSA veya sadece AES), avantajlarını birleştirmek için birden fazla algoritma (Hibrit) beraber kullanılır.",

            answer: "true",
            hint: "DH ile anlaş, RSA ile imzala, AES ile şifrele...",
            explanation: "Günümüzde Hibrit Şifreleme (Hybrid Cryptography) esastır. Hızlı olduğu için veri AES ile şifrelenir, AES'in anahtarını karşıya güvenle yollamak için RSA veya DH kullanılır."
        })
    },
    {
        id: "algo_compare_m1",
        algoId: "algo-compare",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Sezar, Affine ve Vigenère algoritmaları bilgisayar bilimlerinde işlem karmaşıklığı (Big-O) açısından karşılaştırıldığında, metin uzunluğu (n) arttıkça şifreleme süreleri nasıl artar?",
            options: ["Doğrusal (Linear) O(n) oranda artar","Logaritmik O(log n) oranda artar","Karesel (Quadratic) O(n^2) oranda artar","Hiç artmaz O(1) sabit kalır"],
            answer: "Doğrusal (Linear) O(n) oranda artar",
            hint: "Her harf için 1 işlem yapıyorsunuz. 10 harf için 10 işlem, 100 harf için 100 işlem.",
            explanation: "Bu klasik algoritmalar metindeki her harf (veya blok) üzerinden tek tek geçer. Yani harf sayısı n ise, çalışma süresi n ile orantılı olarak (Doğrusal / Linear) artar."
        })
    },
    {
        id: "algo_compare_m2",
        algoId: "algo-compare",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Güvenlik açısından AES'i RSA ile karşılaştırıyorsunuz. Kriptografi uzmanlarına göre AES'in 256-bitlik bir anahtarının sağladığı güvenliğe ulaşmak için, RSA'in anahtar uzunluğu (bit cinsinden) kabaca kaç bin bit'in üzerinde (örneğin 2, 4, 15 gibi büyük bir sayı) olmalıdır? (Yaklaşık bir teknoloji standardı. Sadece rakam)",

            answer: "15360",
            hint: "AES anahtarları kısadır ama kırılamaz. RSA anahtarları kırılamaması için devasa olmalıdır. (15360)",
            explanation: "NIST (ABD Ulusal Standartlar Enstitüsü) standartlarına göre AES-256'nın güvenlik seviyesi (security strength), RSA algoritmasında yaklaşık 15360 bit (15K bit) uzunluğunda anahtarlara eşdeğerdir. Asimetrik algoritmalar matematiksel zafiyetleri kapatmak için devasa anahtarlara ihtiyaç duyar."
        })
    },
    {
        id: "algo_compare_m3",
        algoId: "algo-compare",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Rail Fence algoritması (bir yer değiştirme şifresi), Sezar algoritmasıyla (bir yerine koyma şifresi) peş peşe kullanılırsa, matematiksel olarak yine sadece daha karmaşık TEK BİR yerine koyma (substitution) algoritması elde edilmiş olur.",

            answer: "false",
            hint: "Biri harflerin kendisini değiştiriyor, diğeri sırasını.",
            explanation: "Transposition (Yer Değiştirme - Rail Fence) ve Substitution (Yerine Koyma - Sezar) işlemleri birbirinden tamamen farklı boyuttadır. Birleştirildiklerinde 'Product Cipher' (Çarpım Şifresi - Modern blok şifrelerin (AES, DES) atası) olarak bilinen hem karıştırma hem de yayma (confusion and diffusion) yapan çok daha güçlü bir yapı oluşur."
        })
    },
    {
        id: "algo_compare_m4",
        algoId: "algo-compare",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Bir testte RSA şifrelemesi 1 megabayt veriyi 10 saniyede şifreliyorsa, RSA'dan ortalama 100 kat daha hızlı olan simetrik bir algoritmanın aynı veriyi kaç milisaniyede şifrelemesi (1 saniye = 1000 milisaniye) beklenir?",

            answer: "100",
            hint: "10 saniye = 10.000 ms. 10.000 / 100 = ?",
            explanation: "Eğer 100 kat hızlıysa, süresi 100'e bölünür. 10 saniye / 100 = 0.1 saniye yapar. 0.1 saniye = 100 milisaniye'dir."
        })
    },
    {
        id: "algo_compare_m5",
        algoId: "algo-compare",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Aşağıdaki ikililerden hangisi, modern kriptografideki 'Simetrik' (S) ve 'Asimetrik' (A) algoritmaların en popüler çiftine örnektir?",
            options: ["(S) RSA / (A) Diffie-Hellman","(S) AES / (A) RSA","(S) Vigenere / (A) Sezar","(S) SHA-256 / (A) MD5"],
            answer: "(S) AES / (A) RSA",
            hint: "En meşhur gizli anahtarlı (S) ve en meşhur açık anahtarlı (A) hangisidir?",
            explanation: "AES (Advanced Encryption Standard) günümüzün standart simetrik algoritmasıdır. RSA ise hala internette kimlik doğrulama/anahtar şifrelemede kullanılan standart asimetrik (A) algoritmadır."
        })
    },
    {
        id: "algo_compare_h1",
        algoId: "algo-compare",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Modern Simetrik algoritmaları (örn: AES) Asimetrik algoritmalara (örn: RSA) kıyasla IoT (Nesnelerin İnterneti) cihazlarında ve akıllı sensörlerde çok DAHA TERCİH EDİLEBİLİR kılan en önemli MÜHENDİSLİK (Donanım) faktörü nedir?",
            options: ["Açık anahtar (Public Key) sisteminin internette yayınlanmasının yasak olması","Asimetrik işlemlerin gerektirdiği devasa sayı hesaplamalarının cihazın Pil/Batarya ve CPU'sunu saniyeler içinde tüketmesi","AES algoritmasının lisanssız bedava, RSA'in ise hala ücretli olması","Cihazların yeterince büyük ekranı olmaması"],
            answer: "Asimetrik işlemlerin gerektirdiği devasa sayı hesaplamalarının cihazın Pil/Batarya ve CPU'sunu saniyeler içinde tüketmesi",
            hint: "Akıllı saatler veya pilli küçük devreler neden karmaşık modüler matematik yapamaz?",
            explanation: "Asimetrik kriptografi (büyük asalların modüler üstleri vs.) inanılmaz yüksek CPU gücü ve enerji harcar. Küçük pilli IoT cihazlarında bu işlemler bataryayı hızla bitirir (Power Consumption). Bu yüzden AES gibi donanım (bit kaydırma) seviyesinde çok ucuz ve hızlı çalışan simetrik algoritmalar şarttır."
        })
    },
    {
        id: "algo_compare_h2",
        algoId: "algo-compare",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Kuantum bilgisayarları kullanılabilir (ölçeklenebilir) hale geldiğinde (Shor Algoritması ile), Simetrik Şifreleme algoritmaları (AES), Asimetrik algoritmalara (RSA/DH) kıyasla ÇOK DAHA HIZLI ve kolay KESİNLİKLE KIRILACAKTIR.",

            answer: "false",
            hint: "Asal çarpanlara ayırma mı kolaylaşır yoksa brute force mu?",
            explanation: "Tam tersidir! Kuantum bilgisayarları (Shor algoritması sayesinde) asal çarpanlara ayırma (RSA) ve ayrık logaritma (DH/ECC) problemlerini saniyeler içinde çözerek tüm Asimetrik kriptografiyi yok edecektir. Ancak AES (Simetrik) için sadece Grover algoritması geçerlidir, o da sadece anahtar uzunluğunu (256-bit'i 128-bit'e) yarıya düşürür. AES-256 kuantuma karşı hala güvenli kalacaktır."
        })
    },
    {
        id: "algo_compare_h3",
        algoId: "algo-compare",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "İki kişi arasında güvenli bir bağlantı kurarken: 1) Diffie-Hellman ile ortak bir 256-bit sayı üretilir. 2) Bu sayı kullanılarak veriler aktarılırken X algoritması devreye girer. Bu X algoritması muhtemelen 'AES' midir yoksa 'RSA' mıdır?",

            answer: "AES",
            hint: "256 bitlik ortak gizli bir anahtarımız var.",
            explanation: "DH ile anlaşılan ortak sır, her iki tarafın bildiği 'Simetrik' bir anahtardır. Simetrik veri şifrelemede her zaman AES, ChaCha20 vb. blok/dizi şifreleri kullanılır."
        })
    },
    {
        id: "algo_compare_h4",
        algoId: "algo-compare",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer şifreleyeceğiniz mesaj, sadece tek bir 'Evet' veya 'Hayır' kelimesinden ibaretse, Klasik bir RSA algoritması yerine Klasik bir Vigenère kullanmak, SALT 'Known-Plaintext (Bilinen Düz Metin) Saldırısı' açısından neden şaşırtıcı şekilde DAHA GÜVENLİ olabilir?",
            options: ["RSA deterministik (rastgele olmayan) çalışırsa sözlük saldırısıyla şifreli çıktı tahmin edilebilir","Vigenere matematiksel asallar kullanır","Evet kelimesi RSA'da hataya yol açar","RSA 1 kelimelik şifreleme yapamaz"],
            answer: "RSA deterministik (rastgele olmayan) çalışırsa sözlük saldırısıyla şifreli çıktı tahmin edilebilir",
            hint: "Saldırganın elinde Açık Anahtarınız var. 'Evet' yazıp şifreler, bir de 'Hayır' yazıp şifreler, hangisi eşleşirse...",
            explanation: "Eğer RSA'da (ders kitaplarındaki klasik haliyle - Padding olmadan) şifreleme yaparsanız, aynı mesaj hep aynı şifreli çıktıyı üretir. Saldırgan genel açık anahtarla 'Evet' ve 'Hayır' kelimelerini şifreleyip sizin şifreli mesajınızla karşılaştırabilir. Vigenere'de anahtarı bilmediği için bunu yapamaz. (Elbette modern RSA'da OAEP padding (rastgele dolgu) eklenerek bu sorun aşılır)."
        })
    },
    {
        id: "algo_compare_h5",
        algoId: "algo-compare",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Bir simetrik (Gizli Anahtarlı) şifreleme sisteminde (Örn: AES) N kişilik bir şirkette herkesin birbiriyle BİREBİR gizli iletişim kurabilmesi için toplam kaç farklı eşsiz anahtar dağıtılması gerekir formülü: N*(N-1)/2'dir. Şirkette 10 kişi varsa toplam kaç eşsiz AES anahtarına ihtiyaç vardır?",

            answer: "45",
            hint: "10 * 9 / 2",
            explanation: "10 kişinin her biri diğer 9 kişiyle konuşmak için farklı anahtara ihtiyaç duyar. 10 * 9 = 90. Çift yönlü olduğu için (A'nın B'ye anahtarı B'nin A'ya anahtarı ile aynı) 90/2 = 45. Asimetrik (RSA) kullanılsaydı herkesin sadece kendi (Açık/Gizli) anahtarı, yani toplam 10 çift anahtar yeterli olacaktı. Bu Asimetrik sistemlerin en büyük avantajıdır (Key Distribution Problem)."
        })
    },
    {
        id: "xor_e1",
        algoId: "xor",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "XOR (Dışlayan Veya) mantıksal işlemcisi, bilgisayar biliminde hangi iki sayısal (bit) değer yan yana geldiğinde '1' (Doğru/True) sonucunu üretir?",
            options: ["1 ve 1","0 ve 0","1 ve 0 (Farklı iseler)","Herhangi iki rakam"],
            answer: "1 ve 0 (Farklı iseler)",
            hint: "'Ya bu ya da diğeri, ama ikisi birden değil' anlamına gelir.",
            explanation: "XOR kapısı sadece ve sadece girdiler birbirinden FARKLI ise (Biri 1, diğeri 0 ise) 1 sonucunu verir. 1-1 veya 0-0 durumunda 0 sonucunu verir."
        })
    },
    {
        id: "xor_e2",
        algoId: "xor",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Kriptografik XOR şifrelemesinde (A XOR B = C) işleminden sonra C sonucunu B ile tekrar XOR işlemine sokarsanız, her zaman orijinal A değerini elde edersiniz (C XOR B = A).",

            answer: "true",
            hint: "Bir kapıyı kilitlediğiniz anahtarla tekrar açarsanız orijinal hale döner.",
            explanation: "XOR'un en önemli kriptografik özelliği çift yönlü (tersinir) olmasıdır. Bir veriyi aynı anahtarla iki kez XOR'lamak hiçbir şey yapmamakla aynıdır."
        })
    },
    {
        id: "xor_e3",
        algoId: "xor",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Kriptografik uygulamalarda basit bir XOR şifrelemesi genellikle verinin hangi formatında çalışır?",
            options: ["A-Z Harfleri (Alfabetik)","Sıfırlar ve Birler (İkili / Binary)","Sadece Roma Rakamları","Renk Kodları"],
            answer: "Sıfırlar ve Birler (İkili / Binary)",
            hint: "Bilgisayarın en temel dili nedir?",
            explanation: "XOR, donanım seviyesinde çalışan mantıksal bir bit (0 ve 1) işlemcisidir. Harfler ve metinler önce ASCII veya UTF-8 formatında bitlere çevrilir, sonra anahtarla bit bit XOR'lanır."
        })
    },
    {
        id: "xor_e4",
        algoId: "xor",
        difficulty: "easy",
        type: "numeric",
        generate: () => ({
            question: "A = 0, B = 0. A XOR B işleminin sonucu nedir?",

            answer: "0",
            hint: "Girdiler aynıysa sonuç sıfırdır.",
            explanation: "0 XOR 0 = 0'dır."
        })
    },
    {
        id: "xor_e5",
        algoId: "xor",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Metninizden ÇOK DAHA KISA bir şifreyle (örneğin sadece 'KEY' kelimesiyle) tekrar eden bir XOR şifrelemesi yaparsanız, bu sistem modern ordular için %100 kırılmaz bir sistem (One-Time Pad) olur.",

            answer: "false",
            hint: "Tekrar eden anahtar bir zafiyet yaratır.",
            explanation: "Kısa ve tekrar eden (Repeating-key) bir XOR, aslında bilgisayar seviyesindeki bir Vigenère şifresidir. Kırılması (frekans analizi ve Hamming mesafesi ile) çok kolaydır. %100 güvenli olması için (One-Time Pad), anahtarın MESAJ KADAR UZUN ve RASTGELE olması gerekir."
        })
    },
    {
        id: "xor_m1",
        algoId: "xor",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Elinizde A = 1010 ve B = 1100 bit dizileri var. A XOR B işleminin sonucu (4 haneli bit) nedir?",

            answer: "0110",
            hint: "1-1=0, 0-1=1, 1-0=1, 0-0=0",
            explanation: "İlk bitler: 1 XOR 1 = 0. İkinci: 0 XOR 1 = 1. Üçüncü: 1 XOR 0 = 1. Dördüncü: 0 XOR 0 = 0. Sonuç 0110'dur."
        })
    },
    {
        id: "xor_m2",
        algoId: "xor",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Aşağıdaki durumlardan hangisi XOR şifrelemesinin en BÜYÜK zafiyetidir (eğer kötü kullanılırsa)?",
            options: ["Aynı anahtarın birden fazla mesajı şifrelemek için tekrar tekrar kullanılması (Key Reuse)","İnternet bağlantısının kopması","Sadece İngilizce çalışması","Çok yavaş bir işlem olması"],
            answer: "Aynı anahtarın birden fazla mesajı şifrelemek için tekrar tekrar kullanılması (Key Reuse)",
            hint: "'C1 XOR C2 = M1 XOR M2' formülünü düşünün.",
            explanation: "XOR (ve modern AES-CTR gibi akış şifreleri) için en ölümcül günah 'Aynı Anahtar (Key) ve Nonce' değerini tekrar kullanmaktır (Key/Nonce Reuse). İki şifreli metin birbiriyle XOR'landığında anahtar iptal olur ve geriye sadece iki orijinal metnin birbirine XOR'lanmış hali kalır ki bu da dil analiziyle dakikalar içinde çözülür."
        })
    },
    {
        id: "xor_m3",
        algoId: "xor",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Modern kriptografik şifrelerin çoğunun (AES, ChaCha20 vb.) kalbinde, son adım olarak düz metnin şifreli veriyle karıştırılmasını sağlayan temel işlem XOR işlemidir.",

            answer: "true",
            hint: "Şifreleme kutularının çıktısı metinle nasıl birleşir?",
            explanation: "Evet. Örneğin AES'te round key'ler her turun sonunda veriye (AddRoundKey adımı) XOR ile eklenir. Akış şifrelerinde (Stream Ciphers) ise üretilen rastgele anahtar akışı direkt olarak düz metinle XOR'lanarak şifreli metni oluşturur."
        })
    },
    {
        id: "xor_m4",
        algoId: "xor",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Eğer bir şifreli metni KENDİSİYLE (aynı metin) XOR işlemine sokarsanız (C XOR C), elde edeceğiniz sonuç ne olur? (İkili sistemde tüm bitlerin neye dönüşeceğini rakamla yazın, tek rakam)",

            answer: "0",
            hint: "Aynı iki bit XOR'lanırsa sonuç ne olur?",
            explanation: "Bir şeyi kendisiyle XOR'lamak tüm bitleri (1-1 veya 0-0) aynı hale getireceği için her zaman tamamen SIFIR (0000000...) sonucunu üretir. Bu yüzden x XOR x = 0 kuralı bilgisayar programlamada çok sık kullanılır."
        })
    },
    {
        id: "xor_m5",
        algoId: "xor",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer XOR anahtarı olarak tamamen sıfırlardan oluşan (000000...) bir dizi kullanırsanız, sonuç ne olur?",
            options: ["Metin tamamen sıfırlanıp yok olur (Silinir)","Metin hiçbir değişikliğe uğramaz (Orijinal kalır)","Metin tersine döner (1'ler 0 olur)","Program çöker"],
            answer: "Metin hiçbir değişikliğe uğramaz (Orijinal kalır)",
            hint: "A XOR 0 = ?",
            explanation: "XOR işleminde 0 'etkisiz elemandır'. 1 XOR 0 = 1, 0 XOR 0 = 0. Yani bir bit dizisini 0000 ile XOR'larsanız, girdi dizisi birebir aynı kalır."
        })
    },
    {
        id: "xor_h1",
        algoId: "xor",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Eve (saldırgan), bankaya yolladığınız 'BAKİYE: 1000' mesajının şifreli (XOR) halini yolda yakalıyor. Anahtarı BİLMİYOR. Ancak mesajın içeriğinin 'BAKİYE: 1000' olduğunu tahmin ediyor. Eve, bu şifreli metnin içine kendi müdahalesiyle '1000' kısmını '9999' yapıp bankaya geri yollayabilir mi? (Sistemin başka hiçbir koruması/imzası (MAC) olmadığını varsayarsak)",
            options: ["Evet, çünkü XOR şifrelerinde 'Malleability' (Şekillendirilebilirlik) zafiyeti vardır. Sadece farkı XOR'layarak içeriği değiştirebilir.","Hayır, anahtarı bilmeden mesajın tek bir bitini bile değiştiremez.","Evet ama banka bunu hata koduyla (Error 404) fark eder.","Hayır, XOR bir özetleme algoritması olduğu için geriye döndürülemez."],
            answer: "Evet, çünkü XOR şifrelerinde 'Malleability' (Şekillendirilebilirlik) zafiyeti vardır. Sadece farkı XOR'layarak içeriği değiştirebilir.",
            hint: "C XOR (M_old XOR M_new) = C_new.",
            explanation: "XOR (ve stream cipher'lar) son derece 'malleable'dır (yoğrulabilir, değiştirilebilir). Eğer düz metnin yerini (örneğin 1000 yazan baytları) biliyorsanız, anahtarı bilmeseniz BİLE, o baytları (eski_metin XOR yeni_metin) işlemiyle modifiye edebilirsiniz. Bu yüzden şifreli veriler her zaman MAC (HMAC) veya GCM ile imzalanıp BÜTÜNLÜĞÜ korunmalıdır."
        })
    },
    {
        id: "xor_h2",
        algoId: "xor",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Elinizde ASCII karakterlerinden oluşan bir metin var. Boşluk karakteri (Space) ASCII'de 32'dir (Binary: 00100000). Büyük 'A' harfi ASCII'de 65'tir (Binary: 01000001). Büyük A harfini, Boşluk karakteriyle XOR'larsanız, Binary'de 01100001 elde edersiniz ki bu da 97'dir. 97 Hangi karakterin ASCII kodudur? (Sadece harfi yazın)",

            answer: "a",
            hint: "Küçük a harfi.",
            explanation: "Boşluk (32) ile harfleri XOR'lamak, klasik programlamada Büyük Harf <-> Küçük Harf dönüşümü yapmanın bir kısa yoludur. Büyük A (65) XOR 32 = Küçük a (97). Küçük a (97) XOR 32 = Büyük A (65)."
        })
    },
    {
        id: "xor_h3",
        algoId: "xor",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Mükemmel rastgele, bir daha asla tekrar etmeyen ve mesaj boyutuyla birebir aynı uzunlukta bir anahtarla (One-Time Pad) XOR'lanmış bir mesaj, sonsuz güce sahip teorik bir bilgisayar tarafından kaba kuvvetle (Brute-Force) DENENEREK doğru sonuç (kesinlikle) bulunabilir.",

            answer: "false",
            hint: "Sonsuz güçle bile doğru sonucu bilmek mümkün mü?",
            explanation: "One-Time Pad (OTP) bilgi kuramına (Information Theoretic) göre kırılamazdır (Shannon, 1949). Sonsuz güçlü bir bilgisayar tüm anahtarları denerse, ortaya o dildeki TÜM olası ve anlamlı kelimeleri (BOMBA, ÇİÇEK, SAVAŞ, BARIŞ vb.) çıkarır. Ancak hangisinin GERÇEK mesaj olduğunu belirleyecek hiçbir matematiksel yöntem veya istatistik yoktur. Bu yüzden mükemmel OTP aşılamazdır."
        })
    },
    {
        id: "xor_h4",
        algoId: "xor",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "'Known-Plaintext' (Bilinen Düz Metin) saldırısında, saldırgan hem 'Düz Metni' (M) hem de 'Şifreli Metni' (C) ele geçirmiştir. Eğer bu basit bir tekrar eden XOR (Repeating-key XOR) şifrelemesiyse, saldırgan GİZLİ ANAHTARI (K) nasıl bulur?",
            options: ["K = C XOR M işlemi yaparak anında bulur","Tüm şifreli metinlerin ortalamasını alarak bulur","Frekans analizi kullanarak yavaşça tahmin eder","Bulamaz, XOR geri döndürülemez"],
            answer: "K = C XOR M işlemi yaparak anında bulur",
            hint: "Matematiksel olarak A XOR B = C ise, A = B XOR C'dir.",
            explanation: "XOR matematiğinin güzelliği ve laneti buradadır. C = M XOR K. Denklemde K'yı yalnız bırakmak isterseniz her iki tarafı M ile XOR'larsınız. C XOR M = M XOR M XOR K. (M XOR M = 0). Bu yüzden C XOR M = K çıkar. Gizli anahtar anında kabak gibi açığa çıkar."
        })
    },
    {
        id: "xor_h5",
        algoId: "xor",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Eğer elimizde 3 adet değişken varsa: X = A XOR B, Y = B XOR C, Z = C XOR A. Bu üç değeri birbiriyle XOR'larsak (X XOR Y XOR Z) elde edeceğimiz sonuç ne olur? (Rakam olarak yazın)",

            answer: "0",
            hint: "(A XOR B) XOR (B XOR C) XOR (C XOR A)",
            explanation: "Tüm terimleri açarsak: A XOR B XOR B XOR C XOR C XOR A. B XOR B = 0. C XOR C = 0. A XOR A = 0. Geriye tamamen 0 (sıfır) kalır. XOR'da her eleman çifter çifter (2 defa) bulunuyorsa sonuç daima 0'dır."
        })
    },
    {
        id: "base64_e1",
        algoId: "base64",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Base64 kodlaması (encoding) NEDEN bir 'ŞİFRELEME (Encryption)' algoritması DEĞİLDİR?",
            options: ["Çünkü hiçbir gizli anahtara (Key) ihtiyaç duymaz ve algoritmayı bilen herkes tek tıkla orijinal metne dönebilir","Çünkü sadece çok kısa kelimeleri dönüştürebilir","Çünkü sadece 64 harfli alfabelerde çalışır","Çünkü askeri amaçlarla kullanılması yasaktır"],
            answer: "Çünkü hiçbir gizli anahtara (Key) ihtiyaç duymaz ve algoritmayı bilen herkes tek tıkla orijinal metne dönebilir",
            hint: "Bir şeyin şifreleme olması için, kuralı bilseniz bile yetkisiz (anahtarsız) açamamanız gerekir.",
            explanation: "Base64 bir kriptografik algoritma değildir; bir KODLAMA (veri çevirme) biçimidir. Girdi alan herhangi biri, gizli bir bilgiye ihtiyaç duymadan bunu geri çevirebilir. Sadece veriyi taşımak için kılıf değiştirir, gizlilik SAĞLAMAZ."
        })
    },
    {
        id: "base64_e2",
        algoId: "base64",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Base64 kodlamasının temel amacı; e-posta (SMTP) veya HTML sayfaları gibi sistemlerde, resimler veya dosyalar (Binary veriler) bozulmadan düz metin (harf) formatında aktarılabilmesini sağlamaktır.",

            answer: "true",
            hint: "Metin kutusuna bir .jpg resmi kopyalayıp yapıştırabilir misiniz? Sadece metne dönüşmüşse evet.",
            explanation: "Base64, ikili (binary - sıfırlar ve birler, özel karakterler vs.) veriyi, internet protokollerinin kolayca taşıyabileceği standart ve güvenli ASCII metnine (sadece A-Z, a-z, 0-9, + ve /) dönüştürmek için tasarlanmıştır."
        })
    },
    {
        id: "base64_e3",
        algoId: "base64",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Bir metin veya dosya Base64 ile kodlandığında veri boyutu yaklaşık olarak nasıl değişir?",
            options: ["Boyutu küçülür (Sıkıştırma yapar)","Boyutu birebir aynı kalır","%33 (Üçte bir) oranında büyür","Dosya boyutuna göre rastgele değişir"],
            answer: "%33 (Üçte bir) oranında büyür",
            hint: "3 baytlık gerçek veri, 4 baytlık metne dönüştürülerek yazılır.",
            explanation: "Base64 algoritması her 3 Baytı (24 bit), 4 adet 6 bitlik parçaya böler ve bunları harflerle temsil eder. Bu nedenle (3 -> 4), dosya boyutu her zaman %33 oranında büyür."
        })
    },
    {
        id: "base64_e4",
        algoId: "base64",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Base64 ile kodlanmış bir metnin en sonunda (genellikle dolgu / padding amacıyla) çok sık gördüğümüz meşhur karakter (noktalama işareti) hangisidir?",

            answer: "=",
            hint: "Eşittir işareti.",
            explanation: "Base64 dönüşümünde veri 3 baytlık bloklara tam bölünemediğinde eksik kalan kısımlar eşittir ('=') veya çift eşittir ('==') ile doldurulur. Bir metnin sonunda '==' görürseniz büyük ihtimalle Base64'tür."
        })
    },
    {
        id: "base64_e5",
        algoId: "base64",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Sistemin veritabanında kullanıcıların şifrelerini (password) kaydederken Base64 ile saklamak, modern web standartlarında mükemmel bir güvenlik önlemidir.",

            answer: "false",
            hint: "Base64 bir şifreleme miydi?",
            explanation: "Asla yapılmaması gereken büyük bir güvenlik zafiyetidir. Base64 herkes tarafından (online araçlarla 1 saniyede) geri çevrilebilir (Decode). Şifreler her zaman tek yönlü güvenli Özetleme (Hash + Salt) fonksiyonlarıyla saklanmalıdır."
        })
    },
    {
        id: "base64_m1",
        algoId: "base64",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Base64 tablosu 0'dan başlayıp 63'e kadar giden karakterleri içerir (İsmi buradan gelir). Büyük harfler (A-Z) 26 tane, Küçük harfler (a-z) 26 tane, Rakamlar (0-9) 10 tanedir. Bunları toplarsak 26+26+10 = 62 karakter eder. Geriye kalan (tabloyu 64'e tamamlayan) SON 2 KARAKTER standart Base64'te genellikle '+' (artı) ve '/' (bölü) işaretleridir. Toplam karakter sayısı kaçtır?",

            answer: "64",
            hint: "Adı Base... ?",
            explanation: "Base64 (64 tabanında sayı sistemi), 64 farklı sembolden oluştuğu için bu ismi alır. (26+26+10+2 = 64)."
        })
    },
    {
        id: "base64_m2",
        algoId: "base64",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer kodlayacağınız verinin (düz metin vs.) uzunluğu 3 baytın tam katı ise (Örneğin 12 bayt), ortaya çıkacak Base64 çıktısının sonunda kaç tane '=' (padding) işareti bulunur?",
            options: ["0 (Hiç bulunmaz)","1","2","3"],
            answer: "0 (Hiç bulunmaz)",
            hint: "Dolguya ihtiyaç var mı?",
            explanation: "Padding (dolgu), veri 3 bayta tam tamamlanmadığı durumlarda, Base64 okuyucusunu 'burada veri bitti' diye uyarmak için eklenir. Eğer veri tam bölünüyorsa '=' işareti kullanılmaz."
        })
    },
    {
        id: "base64_m3",
        algoId: "base64",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "İnternette bazen resimleri harici bir dosya yüklemek yerine direkt HTML kodu içine gömmek isteriz. Bu durumda <img src='data:image/png;base64,iVBORw0KG...'> yapısı kullanılır.",

            answer: "true",
            hint: "Data URI şeması olarak bilinir.",
            explanation: "Evet, web tasarımında küçük resimleri veya ikonları dışarıdan HTTP isteği yapmadan doğrudan HTML/CSS koduna gömmek için Base64 kodlaması ('data URI scheme') sıklıkla kullanılır."
        })
    },
    {
        id: "base64_m4",
        algoId: "base64",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Masaüstünüzde 300 Kilobayt (KB) boyutunda şifresiz bir resim dosyası var. Bu resmi (verisini) Base64 formatına çevirdiğinizde dosyanın yeni boyutu TAM OLARAK kaç Kilobayt (KB) olur?",

            answer: "400",
            hint: "%33 büyüyecek. 300'ün üçte biri 100.",
            explanation: "Base64 her zaman boyutu %33 (1/3 oranında) artırır. 300 + (300/3) = 400 KB olacaktır."
        })
    },
    {
        id: "base64_m5",
        algoId: "base64",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "'URL-Safe' (Linklerde Güvenli) Base64 versiyonunda, standart Base64'te yer alan hangi iki karakter, URL'yi (linki) bozmamaları için '-' (tire) ve '_' (alt çizgi) ile değiştirilir?",
            options: ["A ve Z","+ ve /","0 ve 9","= ve ."],
            answer: "+ ve /",
            hint: "Bir web sitesi linkinde (örn: /iletisim) hangi işaretlerin kafası karışabilir?",
            explanation: "Standart Base64'te bulunan '+' (boşluk veya boş veri anlamına gelebilir) ve '/' (klasör yolu anlamına gelir) işaretleri web linklerinde (URL) teknik sorunlara yol açar. Bu yüzden bu iki karakter URL-Safe versiyonunda tire ve alt çizgi ile değiştirilir."
        })
    },
    {
        id: "base64_h1",
        algoId: "base64",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Aşağıdaki ASCII bayt kombinasyonlarından hangisi Base64 kodlama sürecinin İLK MANTIKSAL adımıdır?",
            options: ["3 adet 8-bitlik bayt yan yana getirilerek 24 bitlik bir bütün (buffer) oluşturulur","Harflerin alfabedeki sıraları asal sayılarla toplanır","Her harf rastgele bir sayı ile XOR işlemine sokulur","Veri baştan sona ters çevrilip matrise alınır"],
            answer: "3 adet 8-bitlik bayt yan yana getirilerek 24 bitlik bir bütün (buffer) oluşturulur",
            hint: "Neden 3'lü gruplar?",
            explanation: "Algoritma bilgisayarın standart olan 8-bitlik (1 Bayt) yapısını alır. En küçük Ortak Kat (EKOK) mantığıyla: 3 x 8 = 24 bittir. Bu 24 bitlik bütün (buffer), daha sonra 4 adet 6-bitlik (4 x 6 = 24) parçaya bölünür (Çünkü 2^6 = 64 karakter tablosudur)."
        })
    },
    {
        id: "base64_h2",
        algoId: "base64",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Klasik ASCII'de 'M' harfi sayısal (decimal) olarak 77'dir (Binary: 01001101). Ancak Base64 tablosunda, bir harfin Base64 değeri kendi alfabe sırasına göre 0'dan (A) başlar. Base64 tablosunda BÜYÜK 'A' harfi 0 ise, BÜYÜK 'B' harfi kaçtır?",

            answer: "1",
            hint: "Sıfırdan başlıyor. A=0...",
            explanation: "Base64 tablosu basitçe sıralıdır: A=0, B=1, C=2... Z=25. (Sonra a=26... z=51. 0=52... 9=61. +=62. /=63). Bu yüzden B değeri tam olarak 1'dir."
        })
    },
    {
        id: "base64_h3",
        algoId: "base64",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "Base64 ile kodlanmış bir JWT (JSON Web Token) parçasını ele geçirdiniz (örn. eyJhbG...). Bunu şifre kırma (Brute-force, Frekans analizi vb.) araçlarına sokmak kriptografik açıdan DOĞRU ve MANTIKLI bir hareket midir? (Evet/Hayır)",

            answer: "Hayır",
            hint: "Açıkça okunabilir bir kodlama (encoding) formatıdır, şifre değildir.",
            explanation: "JWT (JSON Web Token) payload'ları sadece Base64Url (kodlama) ile sarılmıştır, şifrelenmemiştir. Sadece bir Base64 Decoder (çözücü) aracına koymanız orijinal JSON metnini (Örn: 'name':'Alice') doğrudan görmeniz için yeterlidir. Kırma (Kriptanaliz) işlemine sokmak anlamsızdır."
        })
    },
    {
        id: "base64_h4",
        algoId: "base64",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Eğer Base64 ile kodlanmış bir metni el ile (manuel) düzenleyip içerisinden '=' (padding) işaretlerini silerseniz, bilgisayardaki Base64 Decode (çözme) fonksiyonları KESİNLİKLE (her halükarda) çöker (crash) ve metni çözemez.",

            answer: "false",
            hint: "Bazı sistemler eksik parçayı kendi tamamlar mı?",
            explanation: "Padding ('=') bilgisayar için verinin sonunu belirten bir kolaylıktır. Modern Base64 decoder kütüphanelerinin birçoğu (örneğin JWT standartları), metnin sonunda '=' olmasa bile kalan karakter sayısına (mod 4) bakarak dolguyu otomatik varsayar ve eksiksiz olarak orijinal metne geri döner (URL-Safe JWT'lerde padding hiç kullanılmaz bile)."
        })
    },
    {
        id: "base64_h5",
        algoId: "base64",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde iki kez (Double) Base64 yapılmış (Önce kodlanmış, çıkan sonuç bir kez daha kodlanmış) bir metin var. Dış görünüşüne (sonuna veya harflere) bakarak bunun iki kez kodlandığını BİR BAKIŞTA kesin olarak anlayabilir misiniz?",
            options: ["Hayır, çünkü her adımda ortaya çıkan metin yine A-Z, 0-9 aralığında rastgele bir metindir, sadece decoder ile deneyince anlaşılır","Evet, sonunda 4 tane ==== vardır","Evet, harfler iki kez büyütülmüştür","Evet, harfler ters dönmüştür"],
            answer: "Hayır, çünkü her adımda ortaya çıkan metin yine A-Z, 0-9 aralığında rastgele bir metindir, sadece decoder ile deneyince anlaşılır",
            hint: "Base64 çıktısı her zaman standart bir metindir.",
            explanation: "Base64'ün çıktısı A-Z, a-z ve rakamlardan oluşur. Bunu tekrar Base64 yaparsanız yine A-Z, a-z ve rakamlardan oluşan (sadece daha uzun) bir çıktı oluşur. Dışarıdan bakıldığında bu metnin 1 kez mi, 2 kez mi kodlandığını (şanslı padding eşleşmeleri hariç) kesin olarak gözle anlamak imkansızdır; ancak decode ettikten sonra içinden anlamlı bir metin yerine tekrar Base64 çıkarsa anlaşılır."
        })
    },
    {
        id: "hash_e1",
        algoId: "hash",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Bir Kriptografik Özetleme (Hash) fonksiyonunun en MÜHİM özelliği nedir?",
            options: ["Şifrelenen verinin her zaman geri (orijinale) çözülebilmesi","Tek yönlü (One-Way) olması, yani özetten orijinal veriye geri dönülememesi","Matematiksel olarak çok hızlı çözülmesi","Sadece resim dosyalarında çalışması"],
            answer: "Tek yönlü (One-Way) olması, yani özetten orijinal veriye geri dönülememesi",
            hint: "Kıymayı makineden geçirip tekrar inek yapabilir misiniz?",
            explanation: "Hash fonksiyonları, veriyi 'paramparça edip karıştıran' bir kıyma makinesi (blender) gibidir. Ortaya çıkan karışımdan (Hash) geriye dönüp orijinal metni elde etmek matematiksel olarak imkansız tasarlanmıştır."
        })
    },
    {
        id: "hash_e2",
        algoId: "hash",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Hash fonksiyonları, veritabanlarında kullanıcıların şifrelerini (password) saklarken güvenliği sağlamak için kullanılan STANDART ve en doğru yöntemdir.",

            answer: "true",
            hint: "Birisi veritabanını çalarsa şifrenizi öğrenemez.",
            explanation: "Kullanıcıların şifreleri (örneğin '123456') direkt olarak veritabanına kaydedilmez. Bunun yerine sistem şifrenin Hash özetini (örn: 8d969e...) kaydeder. Kullanıcı giriş yaptığında yazdığı kelimenin Hash'i alınarak içerideki Hash ile karşılaştırılır (Eşitse doğru şifredir)."
        })
    },
    {
        id: "hash_e3",
        algoId: "hash",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde MD5 veya SHA-256 gibi bir hash fonksiyonu var. 1 sayfalık kısa bir yazının özetini (hash) aldınız, boyutu 256-bit çıktı. 1 Milyar sayfalık koskoca bir kütüphane dosyasının özetini alırsanız, çıkan Hash'in boyutu ne kadar olur?",
            options: ["Çıkan hash dosyası milyonlarca bit uzunluğunda (devasa) olur","Algoritma dosya çok büyük olduğu için çöker","Boyutu her ikisinde de SABİT (256-bit) olarak kalır","Boyutu 0 olur"],
            answer: "Boyutu her ikisinde de SABİT (256-bit) olarak kalır",
            hint: "'Özet' fonksiyonunun amacı budur. Her şeyi sabit bir kalıba sokar.",
            explanation: "Hash fonksiyonlarının en büyük kuralı, girdi (Input) boyutu (1 harf veya 1 Terabayt) ne olursa olsun, çıktı (Output / Digest) boyutunun her zaman belirli bir algoritmaya göre SABİT UZUNLUKTA (örneğin SHA-256 için tam 256-bit) çıkmasıdır."
        })
    },
    {
        id: "hash_e4",
        algoId: "hash",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "'Kriptografi' kelimesinin Hash değerini (özetini) aldınız (örn: abc12...). Aynı kelimenin ('Kriptografi') hash özetini BİR YIL SONRA aynı algoritmayla tekrar alırsanız, çıkan hash değeri ne olur? (Farklı/Aynı)",

            answer: "Aynı",
            hint: "Deterministik çalışma prensibi.",
            explanation: "Kriptografik hash fonksiyonları deterministiktir. Girdi aynı olduğu sürece, ne zaman veya hangi bilgisayarda çalıştırırsanız çalıştırın her zaman %100 aynı (birebir aynı) Hash (özet) çıktısını verir."
        })
    },
    {
        id: "hash_e5",
        algoId: "hash",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "'Kriptografi' kelimesinin baş harfini küçülterek 'kriptografi' (sadece bir harf değişikliği) yazarsanız, SHA-256 algoritmasıyla elde edeceğiniz Hash özeti, bir önceki Hash özetine çok GÜÇLÜ bir şekilde benzer (sadece 1-2 harfi farklı çıkar).",

            answer: "false",
            hint: "Buna Avalanche (Çığ) etkisi denir.",
            explanation: "Hash fonksiyonlarında 'Çığ Etkisi' (Avalanche Effect) vardır. Girdideki tek bir bitlik veya harflik minicik bir değişiklik bile, çıkan Hash (özet) sonucunun tamamen (%50'ye varan oranda) rastgele ve apayrı görünmesine neden olur. Birbirlerine asla benzemezler."
        })
    },
    {
        id: "hash_m1",
        algoId: "hash",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "İki farklı orijinal metnin (Örn: A ve B dosyaları) şans eseri matematiksel olarak tamamen AYNI (birebir) Hash (özet) sonucunu üretmesine kriptografide ne ad verilir?",
            options: ["Hash Collision (Çarpışma)","Hash Deşifresi (Decryption)","Hash Çığ Etkisi (Avalanche)","Brute-Force"],
            answer: "Hash Collision (Çarpışma)",
            hint: "İki arabanın aynı noktada üst üste binmesi gibi.",
            explanation: "Girdi uzayı sonsuz (her boyuttaki veri) iken çıktı uzayı sabit (Örn 256-bit) olduğu için Güvercin Yuvası Prensibine (Pigeonhole) göre matematikte farklı girdilerin aynı sonucu verme ihtimali vardır. Buna Çarpışma (Collision) denir ve iyi bir algoritma bunun bulunmasını imkansız kılmalıdır."
        })
    },
    {
        id: "hash_m2",
        algoId: "hash",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Eski bir algoritma olan MD5 günümüzde neden 'Güvensiz / Kırılmış' (Broken) kabul ediliyor ve parola saklamak için veya dijital imzada önerilmiyor? Sorunun temel adı nedir? (İpucu: Farklı iki dosya ... üretebiliyor)",

            answer: "Çarpışma",
            hint: "(Collision). Saldırganlar aynı özete sahip virüslü bir dosya (sahte sertifika) üretebildiler.",
            explanation: "MD5'in çıktısı çok kısadır (128-bit) ve matematiksel zafiyetleri bulunmuştur. Bilgisayar gücüyle aynı Hash değerini üreten iki farklı dosya (Collision) saniyeler içinde oluşturulabilmektedir. Bu yüzden özetleme güvenliğini yitirmiştir."
        })
    },
    {
        id: "hash_m3",
        algoId: "hash",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Veritabanlarındaki şifre hashlerini (kaba kuvvetle / Rainbow Table) kırmayı zorlaştırmak için her parolanın sonuna veya başına rastgele karakterler ekleyip öyle Hash alma işlemine 'Salting' (Tuzlama) denir.",

            answer: "true",
            hint: "Yemeklere eklendiği gibi şifrelere de eklenir.",
            explanation: "'Tuz' (Salt), aynı parolaya (örn: 123456) sahip kullanıcıların veritabanında aynı Hash ile görünmemesi ve önceden hesaplanmış 'Gökkuşağı Tablolarına' (Rainbow Tables) karşı sistemi koruması için her kullanıcıya özel üretilen rastgele bir metindir."
        })
    },
    {
        id: "hash_m4",
        algoId: "hash",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Dünyanın en çok kullanılan modern güvenli algoritmalarından SHA-256 (Secure Hash Algorithm 256-bit), özet sonucunu (çıktıyı) Hexadecimal (On altılık, 0-9 ve A-F) sisteminde gösterdiğinde ekranda toplam KAÇ TANE karakter (harf/rakam) görürsünüz?",

            answer: "64",
            hint: "Her bir Hexadecimal karakter (0-F) 4 bit yer kaplar. 256 / 4 = ?",
            explanation: "SHA-256 çıktısı tam 256 bittir. Hexadecimal (onaltılık) gösterimde her bir karakter 4 biti (nibble) temsil eder. 256 bit / 4 = 64 karakter (uzunluğunda bir metin dizisi) elde edilir."
        })
    },
    {
        id: "hash_m5",
        algoId: "hash",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "İnternetten indirdiğiniz bir yazılımın (Örn: Kali Linux ISO) orijinal olduğunu ve yolda bir bilgisayar korsanı (hacker) tarafından içine virüs yerleştirilmediğini nasıl kontrol edersiniz?",
            options: ["Dosyayı açıp içindeki tüm kodları elle okuyarak","Vigenere algoritmasıyla dosya şifresini çözerek","Sitede yayınlanan SHA-256 'Hash' (özet) değeri ile indirdiğiniz dosyanın 'Hash' değerini karşılaştırarak","Dosyanın Base64 (Decode) boyutuna bakarak"],
            answer: "Sitede yayınlanan SHA-256 'Hash' (özet) değeri ile indirdiğiniz dosyanın 'Hash' değerini karşılaştırarak",
            hint: "Hash, dosyanın 'parmak izi'dir (Checksum).",
            explanation: "Hash fonksiyonları Veri Bütünlüğü (Data Integrity) sağlamak için 'Sağlam Sağlama' (Checksum) aracı olarak kullanılır. Dosyaya minicik bir virüs bile konsa (Çığ etkisiyle) Hash tamamen değişir. Sitedeki Hash ile kendi bilgisayarınızdaki Hash aynıysa, dosya %100 orijinal ve bozulmamıştır."
        })
    },
    {
        id: "hash_h1",
        algoId: "hash",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer güçlü bir Hash algoritmasını (örn: SHA-256) basitçe parolaları (password) saklamak için kullanırsanız, saldırganların 'Gökkuşağı Tablosu' (Rainbow Table) saldırısına veya hızlı ekran kartlarıyla (GPU) saniyede milyarlarca parola denemesine (Brute-Force) hedef olursunuz. Tuz (Salt) eklemek tek başına yetmez. Kriptograflar bu hız sorununu çözmek için günümüzde HANGİ TÜR özel hash fonksiyonlarını kullanmayı önerir?",
            options: ["Daha hızlı (1 mili-saniyenin altında çalışan) algoritmalar (Örn: SHA-1)","Yavaşlatılmış, Key-Derivation (Anahtar Üretim) / 'İş Yükü' barındıran algoritmalar (Örn: Argon2, bcrypt, PBKDF2)","Parolaları asimetrik (RSA) ile şifrelemek","Parolaları AES ile sıkıştırmak"],
            answer: "Yavaşlatılmış, Key-Derivation (Anahtar Üretim) / 'İş Yükü' barındıran algoritmalar (Örn: Argon2, bcrypt, PBKDF2)",
            hint: "Eğer kırmak çok hızlıysa, kırmayı kasten yavaşlat. (Key Stretching)",
            explanation: "Modern sistemlerde parolalar düz SHA-256 ile (çok hızlı olduğu için saldırgan saniyede milyar deneme yapar) saklanmaz. Kasten 'yavaşlatılmış' veya bellek tüketen (memory-hard) Bcrypt, Argon2 veya PBKDF2 gibi algoritmalar kullanılır. Böylece 1 parolanın kontrolü bile saniyenin onda biri kadar sürer, kaba kuvvet yılları alır."
        })
    },
    {
        id: "hash_h2",
        algoId: "hash",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "'Gökkuşağı Tabloları' (Rainbow Tables), içerisinde internetteki tüm kullanıcıların gerçek parolalarını ve e-posta adreslerini (hacklenmiş dataları) düz metin halinde barındıran, 3-4 gigabaytlık klasik bir çalıntı veri tabanı dosyasıdır.",

            answer: "false",
            hint: "Gökkuşağı tabloları kelimeleri değil, matematiksel bir optimizasyon haritasını tutar (Time-Memory Tradeoff).",
            explanation: "Rainbow Tabloları (Çalıntı şifre listeleri DEĞİLDİR). Hash kırma işlemi için önceden hesaplanmış devasa (Time-Memory Tradeoff) özet (hash) zincirleridir. Bir Hash'i çok hızlı kırmak için hafıza-zaman takası sağlayan özel matematiksel algoritma haritalarıdır."
        })
    },
    {
        id: "hash_h3",
        algoId: "hash",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "İnsanlık tarihindeki en ilkel hash/özetleme (data integrity - hata kontrolü) mekanizmalarından biri, Kredi Kartı numaralarında veya TC Kimlik numaralarının en sonunda bulunan, sayıların formülle toplanıp modunun alınmasıyla (Luhn algoritması gibi) oluşturulan tek bir rakamdır. Bu tür basit doğrulama rakamlarına veya bitlerine ne ad verilir? (Örn: Parity ... , ... Sum) İkinci kelimesini (İngilizce 'Sum') kullanarak yazın: C.......sum",

            answer: "Checksum",
            hint: "Check ve Sum (Sağlama Toplamı) kelimelerinin birleşimi.",
            explanation: "Check-Sum (Sağlama Toplamı). Veri bozulmalarını veya basit (kazara) yazım hatalarını yakalamak için geliştirilmiş, Kriptografik (güvenli) OLMAYAN en temel ilkel hash (özet) mantığıdır."
        })
    },
    {
        id: "hash_h4",
        algoId: "hash",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde MD5 algoritması için bir 'Çarpışma' (Collision) örneği var. Yani 'A' belgesi ile 'B' belgesinin Hash sonucu tamamen aynı çıkıyor. Bir saldırgan olarak, bankaya yollanan bir talimattaki 'Kime: Cüzdan X, Miktar: 5' belgesini (M), elinizdeki M belgesiyle aynı hash'i veren AMA içeriği 'Kime: Cüzdan Eve (Saldırgan), Miktar: 1 Milyon' olan YENİ bir (M') belgesi oluşturarak değiştirmek istiyorsunuz. Bu belirli (hedefli) belgeye yönelik çarpışma bulma eylemine kriptografide özel olarak hangi atak adı verilir?",
            options: ["Pre-image (Ters Görüntü / Hedefli) Attack","Birthday (Doğum Günü) Attack","Side-Channel (Yan Kanal) Attack","Replay (Tekrar Oynatma) Attack"],
            answer: "Pre-image (Ters Görüntü / Hedefli) Attack",
            hint: "Sadece 'rastgele iki belge' aynı çıksın değil, 'Benim seçtiğim şu belirli belgenin' aynısı çıksın!",
            explanation: "Sadece herhangi iki rastgele girdinin (A ve B) aynı Hash'i vermesini bulmak (Collision - Birthday Attack) MD5'te çok kolaydır. Ancak, size HEDEF olarak verilen BİLMİNEN (veya var olan) bir Hash değerine (veya belgeye) uygun GİRDİYİ (M') bulmak işlemine İkinci Ters Görüntü (Second Pre-image Attack) denir ve matematiksel olarak ilkine göre trilyonlarca kez daha ZORDUR."
        })
    },
    {
        id: "hash_h5",
        algoId: "hash",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Meşhur 'Doğum Günü Paradoksu' (Birthday Paradox) istatistiğine göre, 365 günlük bir yılda, bir odada sadece kaç kişi bulunursa, o odadaki herhangi 'iki kişinin' aynı gün (aynı ay ve gün) doğmuş olma olasılığı %50'yi aşar? (Bu paradoks, Hash algoritmalarında 'Çarpışma - Collision' bulmanın beklenenden çok daha kolay (hızlı) olduğunu kanıtlar.)",

            answer: "23",
            hint: "100 değil, 50 bile değil. Çok daha küçük.",
            explanation: "Sadece 23 kişi bulunduğunda aralarından herhangi iki kişinin aynı doğum gününe sahip olma ihtimali %50'yi bulur (Eşleşme kombinasyonları (23*22/2 = 253 çift) arttığı için). Hash çarpışma saldırıları da aynı matematiği (Birthday Attack) kullanarak, evrendeki tüm ihtimalleri (2^256) değil, sadece o sayının KAREKÖKÜ (2^128) kadar denemeyle (kombinasyon çiftleri yığını) çarpışma (Collision) bulur."
        })
    },
    {
        id: "playfair_e1",
        algoId: "playfair",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Playfair şifresinin kriptografi tarihindeki EN ÖNEMLİ yeniliği (özelliği) nedir?",
            options: ["Harfleri tek tek (monoalfabetik) değil, İKİŞERLİ gruplar halinde (Digraph) şifrelemesi","İlk bilgisayar destekli şifreleme olması","Matematiksel asal sayılar kullanması","Hiçbir şekilde kırılamaması"],
            answer: "Harfleri tek tek (monoalfabetik) değil, İKİŞERLİ gruplar halinde (Digraph) şifrelemesi",
            hint: "İkili (çift) harfler.",
            explanation: "Playfair algoritması, bilinen ilk pratik 'Digraph Substitution' (İkili Yerine Koyma) şifresidir. Harfleri teker teker değil, ikili çiftler halinde şifreler."
        })
    },
    {
        id: "playfair_e2",
        algoId: "playfair",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Playfair algoritması standart olarak 5x5 boyutlarında, yani toplam 25 harf alan bir tablo (matris) kullanır.",

            answer: "true",
            hint: "İngilizce alfabe 26 harftir. 5x5 tablo 25 kutudur.",
            explanation: "Geleneksel Playfair İngilizce için 5x5'lik (25 kutu) bir matris kullanır. Alfabedeki 26 harften 2 tanesi (Genellikle I ve J harfleri) aynı kutuya koyularak sığdırılır."
        })
    },
    {
        id: "playfair_e3",
        algoId: "playfair",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Playfair 5x5 tablosuna alfabenin 26 harfi sığmayacağı için, kriptografide standart olarak hangi İKİ HARF genellikle BİRLEŞTİRİLİR (aynı kutuya yazılır)?",
            options: ["A ve E","X ve Z","I ve J","O ve Q"],
            answer: "I ve J",
            hint: "İngilizcede görsel ve sessel olarak birbirine benzeyen iki harf.",
            explanation: "'I' ve 'J' harfleri görsel ve anlamsal olarak dilde rahatça ayırt edilebildiği için Playfair tablolarında çoğunlukla aynı kareye (I/J) yerleştirilir ve tek bir harfmiş gibi davranılır."
        })
    },
    {
        id: "playfair_e4",
        algoId: "playfair",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "Şifrelenecek metni ikili çiftlere ayırıyorsunuz. Metin: 'HELLO'. İkililer: HE - LL - O. Ancak Playfair kurallarına göre bir çiftte 'AYNI HARF' yan yana bulunamaz (LL). Bu durumda aralarına genellikle hangi dolgu harfi (padding) sokulur? (Tek harf)",

            answer: "X",
            hint: "Nadir kullanılan bir harf (X, Q, Z gibi, standart X'tir).",
            explanation: "Playfair çiftleri aynı harften (örn: LL, EE) oluşamaz. Çakışmayı önlemek için aralarına genellikle 'X' harfi eklenerek kaydırılır (HE - LX - LO)."
        })
    },
    {
        id: "playfair_e5",
        algoId: "playfair",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Playfair algoritması, I. Dünya Savaşı ve II. Dünya Savaşı sırasında özellikle Avustralyalılar, Yeni Zelandalılar (ANZAC) ve İngiliz ordusu tarafından çok pratik olduğu için siperlerde (savaş alanında) bolca kullanılmıştır.",

            answer: "true",
            hint: "Kalem, kağıt ve 25 kare yeterliydi.",
            explanation: "Playfair alet, makine veya matematik (çarpma vs.) gerektirmediğinden savaş alanında (Taktiksel Kriptografi) saniyeler içinde kağıt üzerinde şifreleme yapmak için mükemmel bir yöntemdi ve çok yaygın kullanıldı."
        })
    },
    {
        id: "playfair_m1",
        algoId: "playfair",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Playfair kurallarına göre; ikili harf çifti (Örn: A ve B) 5x5 tabloda AYNI SATIRDA yer alıyorsa, şifreleme yaparken kural nedir?",
            options: ["Her harfin sağındaki (hemen yanındaki) harf alınır","Her harfin altındaki harf alınır","Harfler yer değiştirmez (aynı kalır)","Harfler tablodan silinir"],
            answer: "Her harfin sağındaki (hemen yanındaki) harf alınır",
            hint: "Satırda hareket nasıldır?",
            explanation: "Playfair Kuralları: \n1) Aynı satırdaysalar: SAĞDAKİ harfleri al (Sonda ise başa dön). \n2) Aynı sütundaysalar: ALTTAKİ harfleri al. \n3) Kesişim (Dikdörtgen) oluşturuyorsa: KARŞI KÖŞELERİ al."
        })
    },
    {
        id: "playfair_m2",
        algoId: "playfair",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "5x5 tabloda 'T' ve 'O' harfleri AYNI SÜTUNDA alt alta duruyor (T üstte, O altta). Playfair kuralına göre 'TO' çifti nasıl şifrelenir? (T'nin altında O, O'nun altında ise P var). Sonuç nedir?",

            answer: "OP",
            hint: "Aynı sütundalar. T'nin ALTI nedir? O. O'nun ALTI nedir? P.",
            explanation: "Kural 2: Eğer aynı sütundaysalar (dikeylerse), her harfin BİR ALTINDAKİ harf şifreli karşılığıdır. T -> O, O -> P. Çift (OP) olur."
        })
    },
    {
        id: "playfair_m3",
        algoId: "playfair",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Playfair şifresinde 'AB' harf çiftinin şifrelenmiş hali 'CD' ise, tablodaki dikdörtgen (kesişim) kuralı gereği 'BA' harf çiftinin şifrelenmiş hali her zaman KESİNLİKLE 'DC' olmak ZORUNDADIR.",

            answer: "true",
            hint: "Tersine (çapraz) hareket kuralı nasıldı?",
            explanation: "Eğer harfler aynı satırda veya sütunda DEĞİLSE dikdörtgen oluştururlar. A'dan B'ye gidildiğinde çıkan köşe (C ve D) ise, B'den A'ya gidildiğinde tam tersi köşe (D ve C) olur. Playfair'in en büyük istatistiksel zafiyetlerinden biri bu simetridir."
        })
    },
    {
        id: "playfair_m4",
        algoId: "playfair",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Klasik monoalfabetik (Sezar gibi tekli) bir şifrede harflerin frekans tablosu yapılırken grafikte 26 tane (A'dan Z'ye) sütun çıkar. Playfair'in ürettiği (AA, AB, AC... ZZ) çift harflerin 'Bigram (Digraph)' frekans analizini yapmak için analiz edilecek grafik kaç sütundan (kaç olasılıktan) oluşur? (25 harfli Playfair alfabesi ve AA gibi aynı harflerin olamayacağı kuralını düşünerek: 25 * 24 = ?)",

            answer: "600",
            hint: "25 harften ilk harf için 25 seçenek, ikinci harf için kendisi hariç 24 seçenek.",
            explanation: "Normal İngilizcede (ve kriptoda) digraph frekansı 26x26=676'dır. Ancak Playfair 25 harf (I/J birleşik) kullanır ve çiftlerde aynı harf olamaz (örn XX). Bu yüzden 25 * 24 = 600 farklı kombinasyon (grafik sütunu) üretir. Bu da frekans grafiğini (26'dan 600'e çıkararak) tamamen yayar ve düzleştirir."
        })
    },
    {
        id: "playfair_m5",
        algoId: "playfair",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde Türkçe alfabe (29 harf) ile uyarlanmış bir Playfair kullanmak istiyorsunuz. Tam ve kusursuz bir dikdörtgen matris (tablo) oluşturmak için kriptografik olarak tablonuzun boyutları KAÇA KAÇ olmalıdır? (Her harf kendi kutusunda, hiçbir harf birleştirilmeden veya atılmadan ve tablo tam dolacak şekilde +1 noktalama işareti vs. ekleyerek)",
            options: ["5x5 (25 kutu)","6x5 (30 kutu, 1 dolgu ile)","7x7 (49 kutu)","8x8 (64 kutu)"],
            answer: "6x5 (30 kutu, 1 dolgu ile)",
            hint: "29 harfe en yakın düzgün kare/dikdörtgen matris hangisidir?",
            explanation: "Türkçe 29 harftir. 5x5 yetmez (4 harf dışarıda kalır, çok kayıp olur). 6x6 büyüktür. En mantıklısı 30 kutuluk (6x5 veya 5x6) bir tablo yapıp, son 30. kutuya bir nokta (.) veya boşluk karakteri (dolgu) ekleyerek mükemmel Playfair yapmak modern bir uyarlamadır."
        })
    },
    {
        id: "playfair_h1",
        algoId: "playfair",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Kriptografik analiz açısından, Playfair şifresinin KESİN olarak (brute-force bile yapılmadan) BİR PLAYFAIR ŞİFRESİ olduğunu kanıtlayan, şifreli metne sadece gözle bakarak (veya basit sayarak) bulunabilecek EN BÜYÜK özelliği nedir?",
            options: ["Şifreli metin içerisinde hiç J harfi bulunmaması ve kelimenin/metnin çift sayıda (tam ikiye bölünebilir) harflerden oluşması","Şifreli metinde hep 'A' harflerinin çift gelmesi","Sadece rakamlardan oluşması","Hiç sessiz harf içermemesi"],
            answer: "Şifreli metin içerisinde hiç J harfi bulunmaması ve kelimenin/metnin çift sayıda (tam ikiye bölünebilir) harflerden oluşması",
            hint: "Metin nasıl şifreleniyordu? (İkili gruplar halinde). J harfine ne oluyordu?",
            explanation: "Playfair (İngilizce standart) mesajı İKİLİ bloklar halinde üretir. Bu nedenle şifreli metin DAİMA ÇİFT sayıda (örneğin 14, 58 harf) karaktere sahip olmak ZORUNDADIR. Ayrıca alfabeden bir harf atıldığı (genelde J) için şifreli metinde ASLA J harfi bulunmaz. Bu iki iz, algoritmaya anında kimlik kazandırır."
        })
    },
    {
        id: "playfair_h2",
        algoId: "playfair",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Lord Peter Wimsey'in meşhur polisiye romanı 'Have His Carcase' (1932) olay örgüsünü bir Playfair şifresini kırmak üzerine kurar. Kırıcı kişi (Analist), ilk olarak Düz Metindeki 'TH', 'HE', 'ER', 'RE' gibi dilde EN SIK TEKRAR EDEN HANGİ sayıdaki HARF GRUBUNUN (Bigram) şifreli halini arar? (Rakam yazın)",

            answer: "2",
            hint: "Playfair kaçlı şifreliyor?",
            explanation: "Playfair tekli (1) harf değil, ikili (2 - digraph/bigram) harf grupları halinde şifreleme yaptığı için frekans analizi tek harflere (E'ye) değil, dildeki yaygın ikili harf öbeklerine (TH, ER, IN vb.) yapılır."
        })
    },
    {
        id: "playfair_h3",
        algoId: "playfair",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "'ZAAX' şifreli metnini (2 adet çift: ZA ve AX) Playfair ile DEŞİFRE edeceksiniz. 'ZA' çifti 5x5 tabloda AYNI SATIRDA yer alıyor (Sırasıyla Z, A, B...). Şifrelerken sağa gidiliyordu. Çözerken (Deşifre) kural nedir? Hangi yöne (Sağ/Sol/Aşağı/Yukarı) gidilir?",

            answer: "Sol",
            hint: "Tersi işlem.",
            explanation: "Playfair'de deşifre kuralları şifreleme kurallarının TAM TERSİDİR. Şifrelerken (Aynı satır) SAĞA kayılır. Deşifre ederken SOLA kayılır. (Aynı sütunsa YUKARI çıkılır. Dikdörtgen kuralı ise aynıdır)."
        })
    },
    {
        id: "playfair_h4",
        algoId: "playfair",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Elinizde çok uzun bir şifreli metin var. Eğer metin boyunca hiçbir yerde kendi kendini tekrar eden çift harfli bir blok (Örneğin 'AA', 'ZZ', 'MM' vb. bir hece) YOKSA, bu metin Vigenère değil KESİNLİKLE bir Playfair şifresidir diyebiliriz.",

            answer: "true",
            hint: "Playfair tablosunda 'AA' üretilebilir mi?",
            explanation: "Playfair kurallarına göre aynı harfler hiçbir şekilde tablo içerisinde şifrelenemez (Araya X konur veya atlanır). Kesişimden veya aynı satırdan ASLA 'QQ' veya 'ZZ' gibi yan yana 2 aynı harf çıkamaz. Bir metinde 10.000 harf varsa ve HİÇ çift (aynı) harf yoksa bu %99.9 Playfair'dir. Vigenere'de ise bu kolayca oluşabilir."
        })
    },
    {
        id: "playfair_h5",
        algoId: "playfair",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Eğer bir Playfair anahtar kelimesi olarak 26 harfin (J hariç) tamamını rastgele sırayla (yani mükemmel karıştırılmış, kelime kullanılmayan bir tablo) seçerseniz ve tabloyu oluşturursanız, bu Playfair'in olası anahtar uzayı (Key Space) (yani tablonun farklı permütasyon sayısı) maksimum ne kadar olur?",
            options: ["Yaklaşık 25! (Faktöriyel) kadar (1.5 x 10^25)","26 x 26 kadar (676)","5 x 5 (25) kadar","25^2 (625) kadar"],
            answer: "Yaklaşık 25! (Faktöriyel) kadar (1.5 x 10^25)",
            hint: "25 kutuya 25 farklı harf kaç değişik şekilde dizilebilir?",
            explanation: "Playfair'in gerçek gücü buradadır. Eğer sadece bir kelime (Örn: KEY) ile tabloyu doldurup kalanını alfabetik A-B-C diye dizerseniz zayıftır. Ama TÜM tabloyu rastgele 25 harfle dizerseniz (Modern Random Key), 25 faktöriyel (yaklaşık 1.55 x 10^25) farklı ihtimal (anahtar) oluşur, bu da Kaba Kuvveti (Brute-Force) klasik bilgisayarlar için imkansız kılar. Kırmak için Simulated Annealing (Tavlama Benzetimi) gibi yapay zeka yaklaşımları gerekir."
        })
    },
    {
        id: "hill_e1",
        algoId: "hill",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Hill Şifresi (Hill Cipher) kriptografide hangi dalın, yani matematiğin hangi alanının kurallarıyla çalışır?",
            options: ["Olasılık ve İstatistik","Trigonometri","Lineer Cebir (Matrisler ve Vektör Çarpımları)","Türev ve İntegral"],
            answer: "Lineer Cebir (Matrisler ve Vektör Çarpımları)",
            hint: "Sayı blokları ve çok boyutlu çarpımlar (Matrix).",
            explanation: "Lester S. Hill tarafından 1929'da bulunan Hill Şifresi, Kriptografide Lineer Cebir (Matris çarpımları) kullanılan İLK tamamen pratik ve poligrafik (çoklu harf) şifreleme algoritmasıdır."
        })
    },
    {
        id: "hill_e2",
        algoId: "hill",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Hill şifresinde (Örn: 2x2 anahtar matrisi kullanıldığında), Düz Metin içindeki iki harf (Örn: 'A' ve 'B') aynı anda formüle sokularak (vektör yapılarak) İKİ Şifreli Harfe (Örn: 'X' ve 'Y') dönüştürülür. Harfler tek tek işlenmez.",

            answer: "true",
            hint: "Playfair gibi, ama matematikle.",
            explanation: "Hill şifresi bir 'Blok Şifre'dir (Polygraphic substitution). Anahtar matrisi 2x2 ise metin 2'şer harflik bloklar halinde (vektör olarak), 3x3 ise 3'er harflik bloklar halinde matrisle çarpılarak şifrelenir."
        })
    },
    {
        id: "hill_e3",
        algoId: "hill",
        difficulty: "easy",
        type: "multiple-choice",
        generate: () => ({
            question: "Hill Şifresinin anahtarı nedir?",
            options: ["A'dan Z'ye uzun bir cümle","2x2, 3x3 vb. boyutlarında sayılardan (0-25) oluşan kare bir Matris (Matrix)","Sadece tek bir sayı (örn: 5)","Bir adet asal sayı"],
            answer: "2x2, 3x3 vb. boyutlarında sayılardan (0-25) oluşan kare bir Matris (Matrix)",
            hint: "Lineer cebir işlemleri için gereken sayı tablosu.",
            explanation: "Hill şifresinin anahtarı her zaman Kare (Square) bir matristir. Mesaj bu matris ile (vektör çarpımı yapılarak) modüler 26 sisteminde şifrelenir."
        })
    },
    {
        id: "hill_e4",
        algoId: "hill",
        difficulty: "easy",
        type: "text",
        generate: () => ({
            question: "İngilizce (26 harf) tabanlı bir Hill şifrelemesi kullanıyorsanız, matris çarpımlarının sonucunda ortaya çıkan devasa (yüzlerce olan) sayıları tekrar 0-25 arası harflere dönüştürmek için kullandığınız Kalanlı Bölme (Modulo) sayınız kaçtır? (Sayı)",

            answer: "26",
            hint: "İngilizcedeki harf sayısı kadardır.",
            explanation: "Tüm Lineer Cebir işlemleri mod 26 aritmetiği (0'dan 25'e kadar) üzerinde yapılır, bu sayede çıkan her sayı A-Z arasındaki bir harfe eşleşir."
        })
    },
    {
        id: "hill_e5",
        algoId: "hill",
        difficulty: "easy",
        type: "true-false",
        generate: () => ({
            question: "Hill şifresinde anahtar olarak RASTGELE herhangi bir sayı matrisi seçebiliriz, tüm matrisler başarıyla şifreleme ve şifre çözme işlemi yapar.",

            answer: "false",
            hint: "Afin şifredeki kuralı (Tersinin alınabilmesi) hatırlayın.",
            explanation: "Bir matrisin anahtar olarak kullanılabilmesi (Yani şifrenin ÇÖZÜLEBİLMESİ) için, o matrisin 'Tersinin Alınabilir' (Invertible / Non-singular) olması ŞARTTIR. Determinantı 0 olan veya 26 ile aralarında asal olmayan matrisler kullanılamaz."
        })
    },
    {
        id: "hill_m1",
        algoId: "hill",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Hill Şifresini kırmak için şifre çözücünün (Decryption) yapması gereken matematiksel İLK KURAL nedir?",
            options: ["Anahtar matrisinin (Key Matrix) Modüler Tersini (Inverse Matrix mod 26) hesaplamak","Anahtar matrisinin karesini (K^2) almak","Anahtar matrisindeki sayıları sadece eksiye (negatif) çevirmek","Anahtar matrisini metinle toplamak"],
            answer: "Anahtar matrisinin (Key Matrix) Modüler Tersini (Inverse Matrix mod 26) hesaplamak",
            hint: "Şifreleme (C = P * K) ise Çözme (P = C * K^-1) işlemidir.",
            explanation: "Hill'de şifre çözmek, C (Şifreli Metin Vektörü) ile K^-1 (Anahtar Matrisinin Modüler Tersi) çarpılarak (mod 26) P (Düz Metin) elde edilmesidir. Ters matrisi hesaplamak sistemin temelidir."
        })
    },
    {
        id: "hill_m2",
        algoId: "hill",
        difficulty: "medium",
        type: "text",
        generate: () => ({
            question: "Hill Şifresinin, aynı metni tek tek harf olarak şifreleyen Affine ve Sezar'a göre en BÜYÜK (ve en tehlikeli) Kriptografik AVANTAJI nedir? (Frekans analizi ile mi, yoksa hızı ile mi ilgilidir? Cevap: ...... analizi işe yaramaz) (İki kelime yazın)",

            answer: "Frekans Analizi",
            hint: "Aynı harf her zaman aynı harfe mi dönüşür? Hayır.",
            explanation: "Hill şifresi Polygraphic'tir. Yani 'E' harfi, yanındaki harfe (blok arkadaşına) bağlı olarak bazen 'X'e, bazen 'B'ye dönüşür. Harflerin yayılımı (Diffusion) muazzamdır. Tekil harf 'Frekans Analizi' Hill şifresinde tamamen etkisizdir."
        })
    },
    {
        id: "hill_m3",
        algoId: "hill",
        difficulty: "medium",
        type: "true-false",
        generate: () => ({
            question: "Bir anahtar matrisinin tersinin olup olmadığını (Invertible) anlamak için Determinant (det K) hesaplanır. Hill şifresinde (mod 26 için), Determinant değerinin 2 veya 13'ün katı OLMAMASI (aralarında asal olması) ZORUNLUDUR.",

            answer: "true",
            hint: "26 sayısının asal çarpanları nelerdir? 2 ve 13.",
            explanation: "Matrisin modüler (mod 26) tersi olabilmesi için Determinant(K) ile Modülün (26) 'Aralarında Asal' (Coprime) olması gerekir. 26'nın asal çarpanları 2 ve 13 olduğu için, Determinant 2'ye (çift) veya 13'e bölünememelidir."
        })
    },
    {
        id: "hill_m4",
        algoId: "hill",
        difficulty: "medium",
        type: "numeric",
        generate: () => ({
            question: "Matematikte 2x2'lik bir matrisin determinantı (ad - bc) formülüyle bulunur. K Matrisi şu olsun: [Sol Üst: 5, Sağ Üst: 17] ve [Sol Alt: 8, Sağ Alt: 3]. (a=5, b=17, c=8, d=3). Bu matrisin standart Determinantı kaçtır? (Mod almadan önce)",

            answer: "-121",
            hint: "(5 * 3) - (17 * 8) = 15 - 136",
            explanation: "a*d - b*c formülü kullanılır. (5 * 3) - (17 * 8) = 15 - 136 = -121. (Daha sonra -121 mod 26'da 9'a çevrilerek işlemlere devam edilir)."
        })
    },
    {
        id: "hill_m5",
        algoId: "hill",
        difficulty: "medium",
        type: "multiple-choice",
        generate: () => ({
            question: "Elinizde 7 harflik (Örn: 'GİZLİCE') bir metin var. Ancak Hill şifresi için 2x2 (2 bloklu) veya 3x3 (3 bloklu) matrisler kullanmanız gerekiyor. İkisi de 7 sayısına (metnin uzunluğuna) tam bölünmüyor (7, 2'ye veya 3'e bölünmez). Bu durumda uygulamanın ZORUNLU OLARAK ne yapması gerekir?",
            options: ["Metnin sonundaki fazla harfleri silmek","Şifreleme yapmayı reddedip hata vermek","Metnin sonuna, metin blok boyutunun (2 veya 3) tam katı olana kadar dolgu (Padding, Örn: 'X') eklemek","Matrisin boyutunu 7x7 olarak otomatik küçültmek/büyütmek"],
            answer: "Metnin sonuna, metin blok boyutunun (2 veya 3) tam katı olana kadar dolgu (Padding, Örn: 'X') eklemek",
            hint: "AES gibi blok şifrelerde metin eksik kalırsa ne yapılırdı?",
            explanation: "Hill bir 'Blok' şifredir. Blok boyutunu (matris boyutu) tam doldurmayan her veri mutlaka 'X' vb. dolgu (padding) karakteri ile tamamlanmalıdır. Örneğin 7 harf, 2x2 (2 harf bloklu) matris için 8 harf ('GİZLİCEX') yapılarak (4 adet ikili vektör) işlenir."
        })
    },
    {
        id: "hill_h1",
        algoId: "hill",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Saldırgan Eve, 'Known-Plaintext Attack' (Bilinen Açık Metin) yöntemiyle Hill Şifresini kırmak istiyor. Eğer kullanılan anahtar matrisi n x n boyutundaysa, Eve'in kırma (Denklem çözme) işlemini başlatabilmesi için en az kaç tane (harf) Düz-Şifreli (Plain-Cipher) eşleşmesine ihtiyacı vardır?",
            options: ["n kare (n^2) adet harf eşleşmesi (n boyutunda n adet farklı denklem)","Sadece 1 adet harf","Trilyonlarca harf","Tüm harflerin frekans tablosu"],
            answer: "n kare (n^2) adet harf eşleşmesi (n boyutunda n adet farklı denklem)",
            hint: "2x2 matriste 4 bilinmeyen vardır. Kaç denklem gerekir?",
            explanation: "Hill şifresi tamamen Lineer Denklemler sistemidir (Örn Y = X*K). K'yı bulmak için n^2 adet bilinmeyeni olan bir denklem (matris) çözülmelidir. Bu yüzden en az n uzunluğunda n adet blok eşleşmesine (toplam n^2 harf) ihtiyaç vardır. Lineer (doğrusal) olduğu için 'Known Plaintext' ile anında çöker."
        })
    },
    {
        id: "hill_h2",
        algoId: "hill",
        difficulty: "hard",
        type: "text",
        generate: () => ({
            question: "AES ve DES dahil olmak üzere modern tüm simetrik kriptografi algoritmalarında, veri parçalarının (bitlerin/harflerin) birbirine karışmasını ve tek bir harf değişikliğinin tüm şifreli metni devasa ölçüde değiştirmesini (Çığ Etkisi) sağlayan Claude Shannon'a ait kavramın adı nedir? (İngilizce 'D' harfiyle başlar, 'Yayılma' anlamındadır)",

            answer: "Diffusion",
            hint: "Confusion (Karışıklık) ve D... (Yayılma).",
            explanation: "'Diffusion' (Yayılma). Hill Şifresi (Matris çarpımı), dildeki bir harfin etkisini diğer harflerin (bloktaki tüm harflerin) içine yedirdiği (dağıttığı) için 'Diffusion' kavramının tarihteki İLK gerçek uygulamasıdır."
        })
    },
    {
        id: "hill_h3",
        algoId: "hill",
        difficulty: "hard",
        type: "true-false",
        generate: () => ({
            question: "Hill algoritmasını daha güvenli (Kırılamaz) hale getirmek için matrisin boyutunu 2x2'den 100x100 gibi çok büyük bir boyuta çıkarmak, 'Known-Plaintext' (Bilinen Düz Metin) saldırısına karşı KESİN koruma sağlar, çünkü matematiksel olarak denklem sistemleri artık çözülemez hale gelir.",

            answer: "false",
            hint: "Bilgisayarlar 100x100 matris tersini ne kadar sürede alır?",
            explanation: "Lineer Cebir denklemleri (Gauss-Jordan Eliminasyon vb. yöntemlerle) bilgisayarlar için çok basit, O(N^3) zamanda, deterministik (kaba kuvvet olmadan) direkt formülle çözülen işlemlerdir. Matrisi ne kadar büyütürseniz büyütün (Eğer lineer kalırsa), Known-Plaintext ile bilgisayar onu yine saniyeler içinde kırar."
        })
    },
    {
        id: "hill_h4",
        algoId: "hill",
        difficulty: "hard",
        type: "multiple-choice",
        generate: () => ({
            question: "Matematiksel Determinantı Mod 26'da tam '0' çıkan bir 2x2 matrisle Hill şifrelemesi (ŞİFRELEME) YAPABİLİR MİSİNİZ? (Yani C = P*K işleminin bir matematiksel çıktısı olur mu?)",
            options: ["Evet yapılabilir. Ancak şifre DEŞİFRE (decode) edilemez (Bilgi kaybolur)","Hayır. Şifreleme adımında matematik hata verir (Error)","Evet. Hem şifrelenir hem de başka bir matrisle çözülür","Hayır. Çünkü 0 ile çarpım her zaman 0 çıkar"],
            answer: "Evet yapılabilir. Ancak şifre DEŞİFRE (decode) edilemez (Bilgi kaybolur)",
            hint: "Şifreleme sadece çarpma işlemidir (Kısıtlama yoktur). Ancak çözme için TERSİNİ bulmanız (bölme yapmanız) gerekir. 0'a bölme...",
            explanation: "Herhangi bir (Hatta 0000) matrisle 'Şifreleme (Encryption)' (İleri Yön - Çarpma) matematiksel olarak yapılır (Örn: Hepsi A harfi çıkar). Ancak determinant 0 ise matrisin tersi YOKTUR (Non-invertible). Yani şifreyi geri çözmek (Decryption) matematiksel olarak İMKANSIZDIR (Sistem Singular olur ve veri yok olur)."
        })
    },
    {
        id: "hill_h5",
        algoId: "hill",
        difficulty: "hard",
        type: "numeric",
        generate: () => ({
            question: "Düz metnimiz 'AB' (Vektör: [0, 1]). Anahtar Matrisimiz (2x2): İlk Satır [2, 3], İkinci Satır [1, 5]. Hill şifresi ile şifrelediğimizde (C = P * K) ortaya çıkacak Şifreli (Cipher) vektörünün 2. harfi sayısal (0-25) olarak kaçtır? (İşlem: Vektör [0, 1] ile Matris çarpımı: (0*3) + (1*5) )",

            answer: "5",
            hint: "Vektör matris çarpımı = Satır ile Sütunların noktasal çarpımıdır. İlk harf: (0*2)+(1*1)=1. İkinci harf: (0*3)+(1*5)=?",
            explanation: "Matris Vektör çarpımı kuralı: 1. Harf = (0 * 2) + (1 * 1) = 1 (Yani 'B' harfi). 2. Harf = (0 * 3) + (1 * 5) = 5 (Yani 'F' harfi). İkinci harf sorulduğu için cevap 5'tir."
        })
    },
];



let lastQuestionId = null;

/**
 * Filtrelenmiş rastgele bir soru seçer. Deterministik testler için randomFn dışarıdan verilebilir.
 */
export function getRandomExercise(categoryFilter = 'all', difficultyFilter = 'all', randomFn = Math.random) {
    let pool = EXERCISE_TEMPLATES;

    if (difficultyFilter !== 'all') {
        pool = pool.filter(q => q.difficulty === difficultyFilter);
    }

    if (categoryFilter !== 'all') {
        pool = pool.filter(q => q.algoId === categoryFilter || (categoryFilter === 'analysis' && (q.algoId === 'freq-analysis' || q.algoId === 'caesar-breaker' || q.algoId === 'algo-compare')));
    }

    if (pool.length === 0) return null;
    if (pool.length === 1) return { ...pool[0], ...pool[0].generate() };

    // Avoid returning the same question twice in a row if possible
    let available = pool.filter(q => q.id !== lastQuestionId);
    if (available.length === 0) available = pool;

    const randomIndex = Math.floor(randomFn() * available.length);
    const selected = available[randomIndex];

    lastQuestionId = selected.id;

    // generate() çağrılırken yeni hesaplamalar yapılır (dinamik sorular için)
    return {
        ...selected,
        ...selected.generate()
    };
}

/**
 * Kullanıcı cevabını doğrular.
 */
export function checkAnswer(exercise, userAnswer) {
    if (!userAnswer || userAnswer.toString().trim() === '') {
        throw new Error("Lütfen bir cevap giriniz.");
    }

    const correctAnswer = exercise.answer.toString().trim();
    const userStr = userAnswer.toString().trim();

    // Büyük/Küçük harf bağımsız karşılaştırma, Türkçe dahil
    return userStr.toLocaleLowerCase('tr-TR') === correctAnswer.toLocaleLowerCase('tr-TR');
}
