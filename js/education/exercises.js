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
    // --- KOLAY (EASY) ---
    {
        id: 'q_rot13_basic',
        algoId: 'rot13',
        difficulty: 'easy',
        title: 'ROT13 Şifreleme',
        text: 'HELLO kelimesini ROT13 ile şifrelerseniz sonuç ne olur?',
        type: 'text',
        generate: () => {
            const res = runROT13('HELLO');
            return {
                answer: res.result,
                hint: 'ROT13 her harfi 13 sıra kaydırır. H harfinden 13 ileri gidin.',
                explanation: `H (7) + 13 = U (20), E (4) + 13 = R (17) -> ${res.result}`
            };
        }
    },
    {
        id: 'q_atbash_basic',
        algoId: 'atbash',
        difficulty: 'easy',
        title: 'Atbash Dönüşümü',
        text: 'Latin alfabesinde A harfinin Atbash karşılığı Z ise, B harfinin karşılığı nedir?',
        type: 'text',
        generate: () => {
            return {
                answer: 'Y',
                hint: 'Atbash alfabeyi tamamen ters çevirir.',
                explanation: 'Baştan ikinci harf (B), sondan ikinci harf olan (Y) ile eşleşir.'
            };
        }
    },
    {
        id: 'q_caesar_shift1',
        algoId: 'caesar',
        difficulty: 'easy',
        title: 'Sezar Basit Kaydırma',
        text: 'İngilizce alfabesinde "ABC" metni 1 birim kaydırılarak şifrelendiğinde ne olur?',
        type: 'text',
        generate: () => {
            const { result } = runCaesar('ABC', 1, 'EN', 'encrypt');
            return {
                answer: result,
                hint: 'Alfabedeki her harfi kendisinden hemen sonraki harf ile değiştirin.',
                explanation: `A -> B, B -> C, C -> D. Sonuç: ${result}`
            };
        }
    },
    {
        id: 'q_algo_type_rsa',
        algoId: 'rsa',
        difficulty: 'easy',
        title: 'Algoritma Sınıflandırması',
        text: 'RSA algoritması hangi tür bir şifrelemedir?',
        type: 'multiple-choice',
        options: ['Simetrik Şifreleme', 'Asimetrik Şifreleme', 'Transpozisyon', 'Yerine Koyma'],
        generate: () => {
            return {
                answer: 'Asimetrik Şifreleme',
                hint: 'Açık (Public) ve Özel (Private) olmak üzere iki farklı anahtar kullanır.',
                explanation: 'RSA, gizli ve açık anahtar ikilisi kullanan asimetrik bir şifreleme yöntemidir.'
            };
        }
    },
    {
        id: 'q_freq_most_tr',
        algoId: 'freq-analysis',
        difficulty: 'easy',
        title: 'Frekans Analizi: En Sık Harf',
        text: 'Tipik bir Türkçe metinde genellikle en sık kullanılan harf hangisidir?',
        type: 'multiple-choice',
        options: ['E', 'A', 'İ', 'K'],
        generate: () => {
            return {
                answer: 'A',
                hint: 'Sesli bir harftir. Alfabenin ilk harfidir.',
                explanation: 'Türkçe metinlerde istatistiksel olarak A harfi en sık (%11.9) kullanılan harftir.'
            };
        }
    },
    {
        id: 'q_railfence_tf',
        algoId: 'railfence',
        difficulty: 'easy',
        title: 'Rail Fence Özelliği',
        text: 'Rail Fence şifrelemesi metindeki harflerin yerine başka harfler koyar.',
        type: 'true-false',
        generate: () => {
            return {
                answer: 'false',
                hint: 'Rail Fence bir "Transpozisyon" şifresidir.',
                explanation: 'Yanlış. Rail Fence harfleri değiştirmez, yalnızca harflerin konumlarını (sırasını) zikzak şeklinde değiştirir.'
            };
        }
    },

    // --- ORTA (MEDIUM) ---
    {
        id: 'q_vig_basic',
        algoId: 'vigenere',
        difficulty: 'medium',
        title: 'Vigenère Kısa Metin',
        text: 'İngilizce alfabesinde "HI" kelimesini "AB" anahtarıyla Vigenère kullanarak şifreleyiniz.',
        type: 'text',
        generate: () => {
            const { result } = runVigenere('HI', 'AB', 'EN', 'encrypt');
            return {
                answer: result,
                hint: 'A anahtarı harfi hiç kaydırmaz (0 birim), B anahtarı ise 1 birim kaydırır.',
                explanation: `H + A(0) = H. I + B(1) = J. Sonuç: ${result}.`
            };
        }
    },
    {
        id: 'q_affine_basic',
        algoId: 'affine',
        difficulty: 'medium',
        title: 'Affine Şifreleme',
        text: 'İngilizce alfabesinde "A" harfini (indeks=0) a=5, b=8 anahtarlarıyla Affine (ax+b) şifrelerseniz sayısal sonucu ne olur?',
        type: 'text',
        generate: () => {
            return {
                answer: '8',
                hint: 'Formül: E(x) = (a * x + b) mod 26. x = 0',
                explanation: 'E(0) = (5 * 0 + 8) mod 26 = 8. Bu yüzden I harfine dönüşür.'
            };
        }
    },
    {
        id: 'q_railfence_res',
        algoId: 'railfence',
        difficulty: 'medium',
        title: 'Rail Fence Sonucu',
        text: '"ABCD" metnini 2 ray kullanarak şifreleyiniz.',
        type: 'text',
        generate: () => {
            const { result } = runRailFence('ABCD', 2, 'encrypt');
            return {
                answer: result,
                hint: '1. satıra A, 2. satıra B, 1. satıra C, 2. satıra D yazın ve satırları birleştirin.',
                explanation: `Satır 1: A C\nSatır 2: B D\nBirleştir: ${result}`
            };
        }
    },
    {
        id: 'q_col_trans_basic',
        algoId: 'columnar',
        difficulty: 'medium',
        title: 'Sütunlu Transpozisyon',
        text: 'İngilizce alfabesinde "CAT" anahtarıyla "HELLO" kelimesi şifrelenecektir. A harfine denk gelen ilk okunacak sütunda hangi harfler bulunur?',
        type: 'text',
        generate: () => {
            // C, A, T -> A (index 0 for reading, which is column 1)
            // H E L
            // L O
            return {
                answer: 'EO',
                hint: 'Anahtar harflerini alfabetik sıralayın: A, C, T. İkinci sütun (E, O) A harfine denk geldiği için ilk okunur.',
                explanation: 'A harfi alfabede en önde olduğu için 2. sütun (A\'nın bulunduğu sütun) ilk okunur. Harfler: E ve O.'
            };
        }
    },
    {
        id: 'q_dh_public',
        algoId: 'dh',
        difficulty: 'medium',
        title: 'Diffie-Hellman Hesabı',
        text: 'Asal p=11, üreteç g=2 ve Alice\'in gizli anahtarı a=3 ise, Alice\'in Bob\'a göndereceği Açık (Public) Anahtar (A) nedir?',
        type: 'text',
        generate: () => {
            return {
                answer: '8',
                hint: 'Formül: A = (g^a) mod p',
                explanation: 'A = (2^3) mod 11 = 8 mod 11 = 8.'
            };
        }
    },
    {
        id: 'q_caesar_tf',
        algoId: 'caesar',
        difficulty: 'medium',
        title: 'Sezar Anahtar Uzayı',
        text: 'İngilizce alfabesinde Sezar şifresi ile şifrelenmiş bir metni Brute Force (kaba kuvvet) ile kırmak için en fazla 26 olasılık denemek gerekir.',
        type: 'true-false',
        generate: () => {
            return {
                answer: 'true',
                hint: 'Sezar şifresinde alfabe uzunluğu kadar farklı kaydırma yapılabilir.',
                explanation: 'Doğru. İngilizce alfabe 26 harften oluştuğu için 26 (veya shift=0 sayılmazsa 25) olasılık vardır.'
            };
        }
    },

    // --- ZOR (HARD) ---
    {
        id: 'q_rsa_math',
        algoId: 'rsa',
        difficulty: 'hard',
        title: 'RSA Matematik',
        text: 'RSA algoritmasında p=5, q=11 seçilmiştir. N modülünün değeri nedir?',
        type: 'text',
        generate: () => {
            return {
                answer: '55',
                hint: 'N değeri, p ve q asallarının çarpımına eşittir.',
                explanation: 'N = p * q = 5 * 11 = 55.'
            };
        }
    },
    {
        id: 'q_caesar_breaker_hard',
        algoId: 'caesar-breaker',
        difficulty: 'hard',
        title: 'Sezar Şifresi Kırma',
        text: 'İngilizce alfabesiyle şifrelenmiş "L ORYH BRX" metninin kırılmış hali (orijinal metin) nedir?',
        type: 'text',
        generate: () => {
            return {
                answer: 'I LOVE YOU',
                hint: 'L harfinin I harfi olabileceğini varsayarak kaydırma miktarını düşünün (3 kaydırma).',
                explanation: 'Her harf 3 geri kaydırılır (Şifreleme sırasında 3 ileri kaydırılmıştır). L(-3)=I, O(-3)=L vs.'
            };
        }
    },
    {
        id: 'q_algo_sec_compare',
        algoId: 'algo-compare',
        difficulty: 'hard',
        title: 'Algoritma Güvenliği Karşılaştırması',
        text: 'Aşağıdaki algoritmalardan hangisi modern bilgisayarlar tarafından kırılamaz derecede güvenli KABUL EDİLİR (Doğru parametreler kullanıldığında)?',
        type: 'multiple-choice',
        options: ['Affine', 'Vigenère', 'RSA', 'Sütunlu Transpozisyon'],
        generate: () => {
            return {
                answer: 'RSA',
                hint: 'Çok büyük asal sayılarla çalıştığı için bilgisayarların çarpanlarına ayırması imkansıza yakındır.',
                explanation: 'Diğer seçenekler klasik/tarihsel şifrelerdir ve bilgisayar gücüyle saniyeler içinde kırılabilirler. RSA ise doğru anahtar uzunluğu (örn 2048-bit) ile güvenlidir.'
            };
        }
    },
    {
        id: 'q_vigenere_tr',
        algoId: 'vigenere',
        difficulty: 'hard',
        title: 'Vigenère Türkçe',
        text: 'Türkçe alfabede "GİZLİ" kelimesini "AB" anahtarıyla Vigenère şifrelerseniz sonuç ne olur?',
        type: 'text',
        generate: () => {
            const { result } = runVigenere('GİZLİ', 'AB', 'TR', 'encrypt');
            return {
                answer: result,
                hint: 'A (0 birim kaydırır), B (1 birim kaydırır). İkinci harf İ + 1 = J.',
                explanation: `G+A=G, İ+B=J, Z+A=Z, L+B=M, İ+A=İ. Sonuç: ${result}`
            };
        }
    },
    {
        id: 'q_affine_math',
        algoId: 'affine',
        difficulty: 'hard',
        title: 'Affine Çözme Mantığı',
        text: 'Affine şifrelemede "a" çarpanının mod (m) değerine göre tersinin (modüler ters) olması zorunludur. İngilizce alfabe (m=26) için hangisi geçerli bir "a" çarpanı OLAMAZ?',
        type: 'multiple-choice',
        options: ['3', '5', '7', '13'],
        generate: () => {
            return {
                answer: '13',
                hint: 'Geçerli bir çarpan olabilmesi için EBOB(a, m) = 1 olmalıdır.',
                explanation: 'EBOB(13, 26) = 13 olduğu için 1 değildir. 13\'ün 26 moduna göre tersi yoktur.'
            };
        }
    },
    {
        id: 'q_dh_mitm',
        algoId: 'dh',
        difficulty: 'hard',
        title: 'Diffie-Hellman Zayıflığı',
        text: 'Temel Diffie-Hellman anahtar değişimi "Ortadaki Adam" (Man-in-the-Middle) saldırısına karşı KORUMALIDIR.',
        type: 'true-false',
        generate: () => {
            return {
                answer: 'false',
                hint: 'DH algoritması karşı tarafın kim olduğunu doğrulayamaz.',
                explanation: 'Yanlış. Temel Diffie-Hellman kimlik doğrulama içermediği için aradaki biri kendi anahtarlarını araya sokarak her iki tarafla ayrı ayrı gizli anahtar oluşturabilir.'
            };
        }
    }
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
