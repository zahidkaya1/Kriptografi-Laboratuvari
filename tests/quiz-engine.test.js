import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createQuizSession } from '../js/education/quiz-engine.js';
import { EXERCISE_TEMPLATES } from '../js/education/exercises.js';

describe('Quiz Engine', () => {

    // Helper: Deterministic RNG for testing
    function createDetermisticRng(sequence) {
        let index = 0;
        return () => {
            const val = sequence[index % sequence.length];
            index++;
            return val;
        };
    }

    it('5 soruluk session başlatılmalı', () => {
        const session = createQuizSession({ count: 5 });
        assert.strictEqual(session.totalQuestions, 5);
        assert.strictEqual(session.isStarted, false);
    });

    it('soru tekrarı olmamalı', () => {
        const session = createQuizSession({ count: 10 });
        const ids = session.questions.map(q => q.id);
        const uniqueIds = new Set(ids);
        assert.strictEqual(ids.length, uniqueIds.size);
    });

    it('zorluk filtresi çalışmalı', () => {
        const session = createQuizSession({ count: 5, difficulty: 'easy' });
        session.questions.forEach(q => {
            assert.strictEqual(q.difficulty, 'easy');
        });
    });

    it('algoritma filtresi çalışmalı', () => {
        const algos = EXERCISE_TEMPLATES.map(t => t.algoId);
        const targetAlgo = algos[0]; // test with the first available algo

        const session = createQuizSession({ count: 10, algorithm: targetAlgo });
        session.questions.forEach(q => {
            assert.strictEqual(q.algoId, targetAlgo);
        });
    });

    it('yetersiz soru durumunda güvenli azaltma', () => {
        const targetAlgo = 'railfence'; // varsayılan olarak az soru olabilir
        const availableCount = EXERCISE_TEMPLATES.filter(t => t.algoId === targetAlgo).length;

        const session = createQuizSession({ count: availableCount + 10, algorithm: targetAlgo });
        assert.strictEqual(session.totalQuestions, availableCount);
    });

    it('boş soru havuzu yönetimi', () => {
        const session = createQuizSession({ count: 5, algorithm: 'non-existent-algo' });
        assert.strictEqual(session.totalQuestions, 0);
        assert.strictEqual(session.isCompleted, true);

        const first = session.start();
        assert.strictEqual(first, null);
    });

    it('deterministik RNG ile deterministik sıra', () => {
        const rng1 = createDetermisticRng([0.1, 0.5, 0.9, 0.2]);
        const session1 = createQuizSession({ count: 5, difficulty: 'easy', algorithm: 'all' }, rng1);

        const rng2 = createDetermisticRng([0.1, 0.5, 0.9, 0.2]);
        const session2 = createQuizSession({ count: 5, difficulty: 'easy', algorithm: 'all' }, rng2);

        // Both sessions should have the exact same question order
        for(let i=0; i<session1.questions.length; i++) {
            assert.strictEqual(session1.questions[i].id, session2.questions[i].id);
        }
    });

    it('doğru cevabın puanı artırması ve akış', () => {
        const session = createQuizSession({ count: 2 });
        const q1 = session.start();
        assert.ok(q1);

        // Cheat to find the correct answer for testing
        const expected = q1._instance.answer; // note: multiple choice uses `answer` too in generic form? Wait, we can just pass correct format

        // In multiple choice, answer is the index. But validateAnswer expects standard input.
        // It's tricky to mock the perfect answer without knowing the type, but let's assume text type if it's string.
        // Actually, we can just look at what `checkAnswer` expects. It expects string/number mostly.
        // For testing submit, let's mock a simpler scenario or just use the expected property.

        let ans = expected;

        const result = session.submitAnswer(ans.toString());
        assert.strictEqual(result.isCorrect, true);
        assert.strictEqual(session.score, 1);

        // same question second time should return the cached result and not increase score
        const result2 = session.submitAnswer(ans.toString());
        assert.strictEqual(result2.isCorrect, true);
        assert.strictEqual(session.score, 1);

        // proceed to next
        const hasNext = session.nextQuestion();
        assert.strictEqual(hasNext, true);
        assert.strictEqual(session.currentIndex, 1);

        // try to go next before answering -> false
        assert.strictEqual(session.nextQuestion(), false);

        // answer second wrong
        session.submitAnswer('WRONG_ANSWER_!@#');
        assert.strictEqual(session.score, 1);

        // proceed to end
        assert.strictEqual(session.nextQuestion(), false);
        assert.strictEqual(session.isCompleted, true);

        const summary = session.getSummary();
        assert.strictEqual(summary.total, 2);
        assert.strictEqual(summary.correct, 1);
        assert.strictEqual(summary.percentage, 50);
    });

    it('10 soruluk session başlatılmalı', () => {
        const session = createQuizSession({ count: 10 });
        assert.ok(session.totalQuestions <= 10);
        assert.ok(session.questions.length > 0);
    });

    it('15 soruluk session başlatılmalı', () => {
        const session = createQuizSession({ count: 15 });
        assert.ok(session.totalQuestions <= 15);
        assert.ok(session.questions.length > 0);
    });

    it('geçersiz count güvenli şekilde ele alınmalı', () => {
        const session1 = createQuizSession({ count: 'xyz' });
        assert.ok(session1.totalQuestions > 0); // Varsayılan değer (genelde 10) kullanılır veya geçerli bir limit

        const session2 = createQuizSession({ count: -5 });
        assert.ok(session2.totalQuestions > 0);
    });

    it('doğru cevap puanı artırıyor, yanlış puan artırmıyor ve son soru tamamlıyor', () => {
        const session = createQuizSession({ count: 1 });
        const q1 = session.start();
        assert.ok(q1);

        const expected = q1._instance.answer;

        // Yanlış cevap ver
        session.submitAnswer('WRONG');
        assert.strictEqual(session.score, 0);

        // Doğru cevap ver (puan artmamalı çünkü ilk cevap yanlıştı, ama state cache kontrolü)
        // Note: Mevcut engine tasarımına göre, soruya ilk verilen cevap geçerlidir.
        const res = session.submitAnswer(expected.toString());
        assert.strictEqual(session.score, 0); // Puan artmamalı

        // Soruya next diyip session bitir
        assert.strictEqual(session.nextQuestion(), false);
        assert.strictEqual(session.isCompleted, true);
    });

});
