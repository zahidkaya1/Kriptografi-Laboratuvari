const STORAGE_KEY = 'kriptografi-laboratuvari-quiz-progress-v1';

export function getQuizProgress() {
    const defaultData = {
        completedQuizzes: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        bestPercentage: 0,
        lastPercentage: 0,
        byAlgorithm: {},
        byDifficulty: {},
        recordedSessions: []
    };

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);

            // Validate and sanitize parsed data
            const sanitized = {
                completedQuizzes: Math.max(0, parseInt(parsed.completedQuizzes) || 0),
                totalQuestions: Math.max(0, parseInt(parsed.totalQuestions) || 0),
                totalCorrect: Math.max(0, parseInt(parsed.totalCorrect) || 0),
                totalIncorrect: Math.max(0, parseInt(parsed.totalIncorrect) || 0),
                bestPercentage: Math.max(0, Math.min(100, parseInt(parsed.bestPercentage) || 0)),
                lastPercentage: Math.max(0, Math.min(100, parseInt(parsed.lastPercentage) || 0)),
                byAlgorithm: typeof parsed.byAlgorithm === 'object' && parsed.byAlgorithm !== null ? parsed.byAlgorithm : {},
                byDifficulty: typeof parsed.byDifficulty === 'object' && parsed.byDifficulty !== null ? parsed.byDifficulty : {},
                recordedSessions: Array.isArray(parsed.recordedSessions) ? parsed.recordedSessions : []
            };
            return sanitized;
        }
    } catch (e) {
        console.warn("Quiz progress okunurken hata oluştu, varsayılan değerlere dönülüyor.", e);
    }

    return defaultData;
}

export function saveQuizProgress(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn("Quiz progress kaydedilirken hata oluştu.", e);
    }
}

export function recordQuizSession(total, correct, difficulty, algorithmFilter, sessionId) {
    if (total <= 0) return;

    const data = getQuizProgress();

    if (sessionId) {
        if (data.recordedSessions.includes(sessionId)) {
            return; // Duplicate submission prevented
        }
        data.recordedSessions.push(sessionId);
        if (data.recordedSessions.length > 50) {
            data.recordedSessions.shift(); // keep last 50 to prevent infinite growth
        }
    }

    const incorrect = total - correct;
    const percentage = Math.round((correct / total) * 100);

    data.completedQuizzes += 1;
    data.totalQuestions += total;
    data.totalCorrect += correct;
    data.totalIncorrect += incorrect;
    data.lastPercentage = percentage;
    data.bestPercentage = Math.max(data.bestPercentage, percentage);

    // Update difficulty stats
    if (difficulty) {
        if (!data.byDifficulty[difficulty]) {
            data.byDifficulty[difficulty] = { quizzes: 0, correct: 0, total: 0 };
        }
        data.byDifficulty[difficulty].quizzes += 1;
        data.byDifficulty[difficulty].correct += correct;
        data.byDifficulty[difficulty].total += total;
    }

    // Update algorithm stats
    const filterKey = algorithmFilter || 'all';
    if (!data.byAlgorithm[filterKey]) {
        data.byAlgorithm[filterKey] = { quizzes: 0, correct: 0, total: 0 };
    }
    data.byAlgorithm[filterKey].quizzes += 1;
    data.byAlgorithm[filterKey].correct += correct;
    data.byAlgorithm[filterKey].total += total;

    saveQuizProgress(data);
}
