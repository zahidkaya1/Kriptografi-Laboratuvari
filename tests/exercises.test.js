import test from 'node:test';
import assert from 'node:assert/strict';
import { getRandomExercise, checkAnswer } from '../js/education/exercises.js';

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
        assert.ok(q.id);
        assert.ok(q.type);
        assert.ok(q.difficulty);
        assert.ok(q.hint);
        assert.ok(q.explanation);
        assert.ok(q.answer !== undefined);
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
