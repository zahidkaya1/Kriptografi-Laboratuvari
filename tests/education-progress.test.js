import test, { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { determineNextStep } from '../js/education/education-ui.js';

describe('Education Progress Helper', () => {

    it('learning path tamamlanmamışsa sıradaki dersi önermeli', () => {
        // mock dependencies are somewhat implicitly handled if we just pass stats
        // Wait, determineNextStep calls getNextLesson(). We should mock it or just rely on actual path.
        // The actual learning path has 17 lessons.
        const learningStats = { percentage: 50 }; // incomplete
        const nextStep = determineNextStep(learningStats, {}, {});
        
        assert.strictEqual(nextStep.target, 'guided-learning');
        assert.strictEqual(nextStep.buttonText, 'Derse Git');
    });

    it('learning path tamamsa ve egzersiz azsa alıştırma önermeli', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = { totalAnswered: 10 };
        const quizStats = {};
        
        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats);
        
        assert.strictEqual(nextStep.target, 'mini-exercises');
        assert.strictEqual(nextStep.buttonText, 'Alıştırma Çöz');
    });

    it('egzersiz yeterli ama quiz azsa quiz önermeli', () => {
        const learningStats = { percentage: 100 };
        const exerciseStats = { totalAnswered: 25 };
        const quizStats = { completedQuizzes: 1 };
        
        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats);
        
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
        
        const nextStep = determineNextStep(learningStats, exerciseStats, quizStats);
        
        assert.strictEqual(nextStep.target, 'vigenere');
        assert.strictEqual(nextStep.buttonText, 'Konuya Çalış');
    });
});
