import { EXERCISE_TEMPLATES, checkAnswer as validateAnswer } from './exercises.js';
import { getAlgoName } from '../utils/algorithm-catalog.js';

export function createQuizSession(options = {}, rng = Math.random) {
    const {
        count = 10,
        difficulty = 'mixed',
        algorithm = 'all'
    } = options;

    let parsedCount = parseInt(count);
    if (isNaN(parsedCount) || parsedCount <= 0) {
        parsedCount = 10;
    }

    // Filter templates based on options
    let pool = EXERCISE_TEMPLATES.filter(template => {
        // Filter by algorithm
        if (algorithm !== 'all' && template.algoId !== algorithm) {
            return false;
        }

        // Filter by difficulty (mixed means all)
        if (difficulty !== 'mixed' && template.difficulty !== difficulty) {
            return false;
        }

        return true;
    });

    // Shuffle the pool using the provided RNG (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Select questions up to parsedCount
    const selectedTemplates = pool.slice(0, parsedCount);

    // Generate instances
    const questions = selectedTemplates.map(template => {
        const instance = template.generate ? template.generate() : {};

        // title üret (örn: "Vigenère Şifresi (Kolay)")
        let title = template.title || instance.title;
        if (!title) {
            let diffText = template.difficulty === 'easy' ? ' (Kolay)' : template.difficulty === 'medium' ? ' (Orta)' : ' (Zor)';
            title = getAlgoName(template.algoId) + diffText;
        }

        return {
            id: template.id,
            algoId: template.algoId,
            difficulty: template.difficulty,
            title: title,
            text: template.text || instance.question || instance.text,
            type: template.type,
            options: template.options || instance.options, // may be undefined for text
            hint: instance.hint,
            explanation: instance.explanation,
            // For internal validation
            _instance: instance
        };
    });

    return new QuizSession(questions, { difficulty, algorithm, requestedCount: count });
}

class QuizSession {
    constructor(questions, meta) {
        this.questions = questions;
        this.meta = meta;
        this.currentIndex = -1;
        this.score = 0;
        this.isCompleted = questions.length === 0;
        this.answers = new Array(questions.length).fill(null);
    }

    get totalQuestions() {
        return this.questions.length;
    }

    get isStarted() {
        return this.currentIndex >= 0;
    }

    start() {
        if (this.questions.length > 0 && !this.isStarted) {
            this.currentIndex = 0;
        }
        return this.getCurrentQuestion();
    }

    getCurrentQuestion() {
        if (this.currentIndex >= 0 && this.currentIndex < this.questions.length) {
            return this.questions[this.currentIndex];
        }
        return null;
    }

    submitAnswer(userAnswer) {
        if (this.isCompleted || this.currentIndex < 0 || this.currentIndex >= this.questions.length) {
            return null;
        }

        // Prevent multiple submits on the same question
        if (this.answers[this.currentIndex] !== null) {
            return this.answers[this.currentIndex]; // already answered
        }

        const question = this.questions[this.currentIndex];

        // Use existing checkAnswer logic which expects the full exercise structure (template + instance)
        // Reconstruct the expected object format for checkAnswer
        const exerciseMock = {
            type: question.type,
            answer: question._instance.answer
        };

        const isCorrect = validateAnswer(exerciseMock, userAnswer);

        if (isCorrect) {
            this.score++;
        }

        const feedback = {
            isCorrect: isCorrect,
            expected: exerciseMock.answer,
            explanation: question.explanation
        };

        this.answers[this.currentIndex] = feedback;

        return feedback;
    }

    nextQuestion() {
        // Can only proceed if the current question has been answered
        if (this.currentIndex >= 0 && this.currentIndex < this.questions.length) {
            if (this.answers[this.currentIndex] === null) {
                return false; // must answer first
            }
        }

        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            return true;
        } else {
            this.isCompleted = true;
            return false;
        }
    }

    getSummary() {
        return {
            total: this.totalQuestions,
            correct: this.score,
            incorrect: this.totalQuestions - this.score,
            percentage: this.totalQuestions > 0 ? Math.round((this.score / this.totalQuestions) * 100) : 0,
            meta: this.meta
        };
    }
}
