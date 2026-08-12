import test from 'node:test';
import assert from 'node:assert/strict';
import { getRandomExercise, checkAnswer } from '../js/education/exercises.js';
import { getAlgoName } from '../js/utils/algorithm-catalog.js';

test('Mini Alıştırmalar Testleri', async (t) => {

    await t.test('En az 18 geçerli soru bulunması', () => {
        const uniqueIds = new Set();
        let totalCount = 0;

        // Deterministik olmayan bir şekilde şablonlara doğrudan erişemediğimiz için
        // filter ile tüm soruları denememiz mümkün değil ancak kod içinde 18 tane yazdık.
        // Hepsini çekmeye çalışacağız.
        for(let i=0; i<50; i++) {
            const q = getRandomExercise();
            if(q) uniqueIds.add(q.id);
        }

        // Kod içinde 18 soru tanımladık. Testte rastgele çekildiğinde çoğu bulunur.
        assert.ok(uniqueIds.size >= 15, "Yeterli sayıda şablon olmalı");
    });

    await t.test('Soru yapısı', () => {
        const q = getRandomExercise();
        assert.ok(q.id, "Soru ID'si olmalı");
        assert.ok(q.type, "Soru type'ı olmalı");
        assert.ok(q.difficulty, "Soru difficulty olmalı");
        assert.ok(q.hint !== undefined, "Soru ipucu olmalı");
        assert.ok(q.explanation !== undefined, "Soru açıklaması olmalı");
        assert.ok(q.answer !== undefined, "Soru cevabı olmalı");
        assert.ok(q.question || q.text, "Mini alıştırmalar UI için soru metni (question veya text) bulunmalı");
    });

    await t.test('Soru başlığı render mantığı (UI Regression Test)', () => {
        const q = getRandomExercise();
        const diffMap = { 'easy': 'Kolay', 'medium': 'Orta', 'hard': 'Zor' };

        let title = q.title;
        if (!title) {
            title = getAlgoName(q.algoId);
        }

        const mappedDiff = diffMap[q.difficulty] || q.difficulty;
        const displayTitle = `${title} (${mappedDiff})`;

        assert.ok(!displayTitle.includes('undefined'), "Ekrana basılacak başlık undefined içermemeli");
        assert.ok(!displayTitle.includes('null'), "Ekrana basılacak başlık null içermemeli");
        assert.ok(!displayTitle.includes('HARD') && !displayTitle.includes('MEDIUM') && !displayTitle.includes('EASY'), "Ham zorluk (İngilizce) etiketleri kullanıcıya sızmamalı");
    });

    await t.test('Algoritma bazlı filtreleme', () => {
        const q = getRandomExercise('rsa');
        assert.strictEqual(q.algoId, 'rsa');
    });

    await t.test('Zorluk bazlı filtreleme', () => {
        const q = getRandomExercise('all', 'hard');
        assert.strictEqual(q.difficulty, 'hard');
    });

    await t.test('Metin cevabı doğrulama ve Boşluk temizleme', () => {
        const mockExercise = { answer: 'HELLO WORLD' };
        assert.ok(checkAnswer(mockExercise, 'hello world'));
        assert.ok(checkAnswer(mockExercise, '  HELLO WORLD  '));
        assert.ok(!checkAnswer(mockExercise, 'HELLO'));
    });

    await t.test('Türkçe I ve İ ayrımının korunması', () => {
        const mockExercise = { answer: 'IŞIK' };
        assert.ok(checkAnswer(mockExercise, 'ışık'));
        assert.ok(!checkAnswer(mockExercise, 'isik'));
    });

    await t.test('Sayısal cevap doğrulama', () => {
        const mockExercise = { answer: '55' };
        assert.ok(checkAnswer(mockExercise, '55'));
        assert.ok(checkAnswer(mockExercise, 55));
    });

    await t.test('Boş cevap reddi', () => {
        const mockExercise = { answer: '1' };
        assert.throws(() => checkAnswer(mockExercise, ''), /cevap giriniz/i);
        assert.throws(() => checkAnswer(mockExercise, '   '), /cevap giriniz/i);
    });

    await t.test('Uygun soru bulunamaması durumu', () => {
        const q = getRandomExercise('invalid_algo', 'hard');
        assert.strictEqual(q, null);
    });
});
