import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { determineNextStep } from '../js/education/education-ui.js';

describe('Education Progress Helper', () => {

    it('hiç veri yok state', () => {
        const learningStats = { percentage: 0 };
        const exerciseStats = { totalAnswered: 0 };
        const quizStats = { completedQuizzes: 0 };

        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats, []);

        assert.strictEqual(nextStep.target, 'guided-learning');
        assert.strictEqual(nextStep.buttonText, 'Derse Git');
        assert.ok(nextStep.description.includes('Rehberli öğrenmede sıradaki dersi tamamla'));
    });

    it('learning path tamamlanmamışsa sıradaki dersi önermeli', () => {
        const learningStats = { percentage: 50 };
        const nextStep = determineNextStep(learningStats, {}, {}, ['lesson-caesar']); // Assuming first is complete

        assert.strictEqual(nextStep.target, 'guided-learning');
        assert.strictEqual(nextStep.buttonText, 'Derse Git');
    });

    it('learning path tamamsa ve egzersiz azsa alıştırma önermeli', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = { totalAnswered: 10 };
        const quizStats = {};

        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats, ['all']);

        assert.strictEqual(nextStep.target, 'exercises');
        assert.strictEqual(nextStep.buttonText, 'Alıştırma Çöz');
    });

    it('egzersiz yeterli ama quiz azsa quiz önermeli', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = { totalAnswered: 25 };
        const quizStats = { completedQuizzes: 1 };

        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats, ['all']);

        assert.strictEqual(nextStep.target, 'mixed-quiz');
        assert.strictEqual(nextStep.buttonText, 'Quiz Başlat');
    });

    it('hepsi yeterliyse en zayıf konuyu önermeli', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = {
            totalAnswered: 30,
            algoStats: {
                'caesar': { total: 5, correct: 5 }, // 100%
                'vigenere': { total: 4, correct: 1 } // 25% -> weakest
            }
        };
        const quizStats = { completedQuizzes: 5 };

        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats, ['all']);

        assert.strictEqual(nextStep.target, 'vigenere');
        assert.strictEqual(nextStep.buttonText, 'Konuya Çalış');
    });

    it('hepsi yeterli ama özel algo adı yoksa default mini-exercises dönmeli (sıfıra bölme güvenliği)', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = {
            totalAnswered: 30,
            algoStats: {
                'caesar': { total: 0, correct: 0 } // Rate 0/1 (fallback)
            }
        };
        const quizStats = { completedQuizzes: 5 };

        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats, ['all']);

        // As caesar is the only one, it will be the weakest.
        assert.strictEqual(nextStep.target, 'caesar');
    });

    it('zayıf konu bilinmiyorsa güvenli dönüş', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = {
            totalAnswered: 30,
            algoStats: {}
        };
        const quizStats = { completedQuizzes: 5 };

        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats, ['all']);

        assert.strictEqual(nextStep.target, 'exercises');
        assert.strictEqual(nextStep.buttonText, 'Konuya Çalış');
    });

    it('deterministik sonuç - aynı veri her zaman aynı öneriyi yapmalı', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = {
            totalAnswered: 50,
            algoStats: {
                'rot13': { total: 10, correct: 4 }, // 40%
                'atbash': { total: 10, correct: 5 } // 50%
            }
        };
        const quizStats = { completedQuizzes: 10 };

        const firstCall = determineNextStep(learningStats, exerciseStats, quizStats, ['all']);
        const secondCall = determineNextStep(learningStats, exerciseStats, quizStats, ['all']);

        assert.deepEqual(firstCall, secondCall);
        assert.strictEqual(firstCall.target, 'rot13');
    });
});
