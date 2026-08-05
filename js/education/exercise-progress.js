const STORAGE_KEY = 'kriptografi-laboratuvari-exercise-progress-v1';

export function getProgress() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return sanitizeProgress(parsed);
        }
    } catch (e) {
        console.error("İlerleme okunamadı:", e);
    }
    return getEmptyProgress();
}

function getEmptyProgress() {
    return {
        totalAnswered: 0,
        totalCorrect: 0,
        totalWrong: 0,
        highestStreak: 0,
        currentStreak: 0,
        algoStats: {}
    };
}

function sanitizeProgress(data) {
    if (!data || typeof data !== 'object') return getEmptyProgress();
    
    const clean = getEmptyProgress();
    
    clean.totalAnswered = Math.max(0, parseInt(data.totalAnswered) || 0);
    clean.totalCorrect = Math.max(0, parseInt(data.totalCorrect) || 0);
    clean.totalWrong = Math.max(0, parseInt(data.totalWrong) || 0);
    clean.highestStreak = Math.max(0, parseInt(data.highestStreak) || 0);
    clean.currentStreak = Math.max(0, parseInt(data.currentStreak) || 0);
    
    if (data.algoStats && typeof data.algoStats === 'object') {
        for (const [algo, stats] of Object.entries(data.algoStats)) {
            clean.algoStats[algo] = {
                answered: Math.max(0, parseInt(stats.answered) || 0),
                correct: Math.max(0, parseInt(stats.correct) || 0)
            };
        }
    }
    
    return clean;
}

export function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
        console.error("İlerleme kaydedilemedi:", e);
    }
}

export function resetProgress() {
    saveProgress(getEmptyProgress());
}

export function recordAnswer(isCorrect, algoId) {
    const progress = getProgress();
    
    progress.totalAnswered++;
    
    if (!progress.algoStats[algoId]) {
        progress.algoStats[algoId] = { answered: 0, correct: 0 };
    }
    progress.algoStats[algoId].answered++;
    
    if (isCorrect) {
        progress.totalCorrect++;
        progress.currentStreak++;
        if (progress.currentStreak > progress.highestStreak) {
            progress.highestStreak = progress.currentStreak;
        }
        progress.algoStats[algoId].correct++;
    } else {
        progress.totalWrong++;
        progress.currentStreak = 0;
    }
    
    saveProgress(progress);
    return progress;
}
