import { test, describe } from 'node:test';
import * as strict from 'node:assert/strict';
import { EXERCISE_TEMPLATES } from '../js/education/exercises.js';
import { getAlgoName } from '../js/utils/algorithm-catalog.js';

describe('Quiz Soru Havuzu Kapsam ve Kalite Testleri', () => {
    
    test('Herhangi bir konu/zorluk kombinasyonunun en az 5 sorusu olmalı', () => {
        // Find all unique valid topics
        const topics = [...new Set(EXERCISE_TEMPLATES.map(e => e.algoId))];
        const difficulties = ['easy', 'medium', 'hard'];
        
        for (const topic of topics) {
            for (const diff of difficulties) {
                const count = EXERCISE_TEMPLATES.filter(e => e.algoId === topic && e.difficulty === diff).length;
                strict.ok(count >= 5, `${topic} konusunun ${diff} seviyesinde en az 5 sorusu olmalı. Mevcut: ${count}`);
            }
        }
    });

    test('Tüm question ID\'leri unique (benzersiz) olmalı', () => {
        const ids = EXERCISE_TEMPLATES.map(e => e.id);
        const uniqueIds = new Set(ids);
        strict.equal(ids.length, uniqueIds.size, 'Bazı soru ID leri tekrarlanıyor!');
    });

    test('Her sorunun geçerli bir konusu (algoId) olmalı', () => {
        EXERCISE_TEMPLATES.forEach(q => {
            strict.ok(q.algoId && q.algoId.trim() !== '', `Soru ${q.id} geçerli bir algoId'ye sahip değil.`);
        });
    });

    test('Her sorunun geçerli bir zorluğu (difficulty) olmalı', () => {
        const validDiffs = ['easy', 'medium', 'hard'];
        EXERCISE_TEMPLATES.forEach(q => {
            strict.ok(validDiffs.includes(q.difficulty), `Soru ${q.id} geçerli bir zorluğa sahip değil.`);
        });
    });

    test('Her sorunun geçerli bir türü (type) olmalı', () => {
        const validTypes = ['multiple_choice', 'true_false', 'text', 'numeric', 'multiple-choice', 'true-false'];
        EXERCISE_TEMPLATES.forEach(q => {
            strict.ok(validTypes.includes(q.type), `Soru ${q.id} geçerli bir soru türüne sahip değil.`);
        });
    });

    test('Doğru cevap alanı boş bırakılmamalı', () => {
        EXERCISE_TEMPLATES.forEach(q => {
            const data = q.generate ? q.generate() : q;
            strict.ok(data.answer !== undefined && data.answer !== null && data.answer.toString().trim() !== '', `Soru ${q.id} boş bir cevaba sahip.`);
        });
    });

    test('Çoktan seçmeli sorularda doğru cevap seçenekler (options) arasında yer almalı', () => {
        EXERCISE_TEMPLATES.forEach(q => {
            const data = q.generate ? q.generate() : q;
            if (q.type === 'multiple_choice' || q.type === 'multiple-choice') {
                strict.ok(Array.isArray(data.options) && data.options.length > 1, `Soru ${q.id} seçeneklere sahip değil.`);
                // Toleranslı karşılaştırma (büyük küçük harf)
                const answerExists = data.options.some(opt => opt.toString().toLocaleLowerCase('tr-TR') === data.answer.toString().toLocaleLowerCase('tr-TR'));
                strict.ok(answerExists, `Soru ${q.id} doğru cevabı seçenekler arasında barındırmıyor.`);
            }
        });
    });

    test('Aynı soru metninin birebir kopyası (duplicate) olmamalı', () => {
        const texts = EXERCISE_TEMPLATES.map(e => (e.generate ? e.generate() : e).question.trim().toLowerCase());
        const uniqueTexts = new Set(texts);
        strict.equal(texts.length, uniqueTexts.size, 'Bazı soru metinleri birebir aynı yazılmış!');
    });

    test('Tüm topic display nameleri kullanıcı dostu olmalı (ID gösterilmemeli)', () => {
        const topics = [...new Set(EXERCISE_TEMPLATES.map(e => e.algoId))];
        topics.forEach(topic => {
            const displayName = getAlgoName(topic);
            // İsim hiçbir zaman raw id ile aynı veya boş dönmemelidir (Eğer raw id 'rsa' gibi çok kısa değilse)
            // Özel kontrol: dh -> Diffie-Hellman, columnar -> Sütunlu Transpozisyon olmalı
            if (topic === 'dh') strict.equal(displayName, 'Diffie-Hellman');
            if (topic === 'freq-analysis') strict.equal(displayName, 'Frekans Analizi');
            if (topic === 'caesar-breaker') strict.equal(displayName, 'Sezar Şifresi Kırma');
            if (topic === 'algo-compare') strict.equal(displayName, 'Algoritma Karşılaştırma');
            if (topic === 'columnar') strict.equal(displayName, 'Sütunlu Transpozisyon');
        });
    });
    
    test('5 soru + her topic + her difficulty kombinasyonu session oluşturabiliyor mu (Kısa simülasyon)', () => {
        const topics = [...new Set(EXERCISE_TEMPLATES.map(e => e.algoId))];
        const difficulties = ['easy', 'medium', 'hard'];
        
        let allValid = true;
        for (const topic of topics) {
            for (const diff of difficulties) {
                const pool = EXERCISE_TEMPLATES.filter(e => e.algoId === topic && e.difficulty === diff);
                if (pool.length < 5) allValid = false;
            }
        }
        strict.ok(allValid, "Hiçbir kombinasyon 0 veya 5'ten az soru üretmemelidir.");
    });
});
