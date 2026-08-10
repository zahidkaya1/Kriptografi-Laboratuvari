import test, { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { getQuizProgress, saveQuizProgress, recordQuizSession } from '../js/education/quiz-progress.js';

describe('Quiz Progress', () => {
    
    beforeEach(() => {
        let store = {};
        const mockStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => store[key] = value.toString(),
            removeItem: (key) => delete store[key],
            clear: () => store = {}
        };
        Object.defineProperty(globalThis, 'window', {
            value: { localStorage: mockStorage },
            writable: true
        });
        Object.defineProperty(globalThis, 'localStorage', {
            value: mockStorage,
            writable: true
        });
        localStorage.clear();
    });

    it('boş storage başlangıcı doğru verilmeli', () => {
        const data = getQuizProgress();
        assert.strictEqual(data.completedQuizzes, 0);
        assert.strictEqual(data.totalQuestions, 0);
        assert.strictEqual(data.bestPercentage, 0);
    });

    it('ilk quiz kaydı başarılı olmalı', () => {
        recordQuizSession(10, 8, 'mixed', 'all');
        const data = getQuizProgress();
        assert.strictEqual(data.completedQuizzes, 1);
        assert.strictEqual(data.totalQuestions, 10);
        assert.strictEqual(data.totalCorrect, 8);
        assert.strictEqual(data.totalIncorrect, 2);
        assert.strictEqual(data.bestPercentage, 80);
        assert.strictEqual(data.lastPercentage, 80);
        
        assert.strictEqual(data.byDifficulty['mixed'].quizzes, 1);
        assert.strictEqual(data.byAlgorithm['all'].quizzes, 1);
    });

    it('ikinci quiz istatistik toplamı doğru olmalı', () => {
        recordQuizSession(10, 5, 'mixed', 'all');
        recordQuizSession(10, 10, 'hard', 'caesar');
        const data = getQuizProgress();
        assert.strictEqual(data.completedQuizzes, 2);
        assert.strictEqual(data.totalQuestions, 20);
        assert.strictEqual(data.totalCorrect, 15);
        assert.strictEqual(data.bestPercentage, 100);
        assert.strictEqual(data.lastPercentage, 100);
        
        assert.strictEqual(data.byDifficulty['hard'].correct, 10);
        assert.strictEqual(data.byAlgorithm['caesar'].total, 10);
    });

    it('bozuk JSON hataya yol açmamalı', () => {
        localStorage.setItem('kriptografi-laboratuvari-quiz-progress-v1', '{ invalid');
        const data = getQuizProgress();
        assert.strictEqual(data.completedQuizzes, 0);
        assert.doesNotThrow(() => recordQuizSession(5, 5, 'easy', 'all'));
    });

    it('negatif değerler sterilize edilmeli', () => {
        localStorage.setItem('kriptografi-laboratuvari-quiz-progress-v1', JSON.stringify({
            completedQuizzes: -5,
            totalQuestions: -10,
            bestPercentage: 150,
            lastPercentage: -50
        }));
        const data = getQuizProgress();
        assert.strictEqual(data.completedQuizzes, 0);
        assert.strictEqual(data.totalQuestions, 0);
        assert.strictEqual(data.bestPercentage, 100); // capped at 100
        assert.strictEqual(data.lastPercentage, 0); // capped at 0
    });

    it('storage read error uygulamayı çökertmemeli', () => {
        const faultyStorage = {
            getItem: () => { throw new Error('mock read error'); },
            setItem: () => { throw new Error('mock write error'); }
        };
        Object.defineProperty(globalThis, 'localStorage', { value: faultyStorage, writable: true });
        
        assert.doesNotThrow(() => {
            const data = getQuizProgress();
            assert.strictEqual(data.completedQuizzes, 0);
            recordQuizSession(10, 8);
        });
    });
});
