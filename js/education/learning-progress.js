import { LEARNING_PATH, getNextLesson } from './learning-path.js';

const STORAGE_KEY = 'kriptografi-laboratuvari-learning-progress-v1';

// Format: { completedIds: ['lesson-caesar', ...] }

export function getProgressData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            if (data && Array.isArray(data.completedIds)) {
                return data;
            }
        }
    } catch (e) {
        console.warn("localStorage okuma hatası:", e);
    }
    return { completedIds: [] };
}

export function saveProgressData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn("localStorage yazma hatası:", e);
    }
}

export function markCompleted(lessonId) {
    const data = getProgressData();
    if (!data.completedIds.includes(lessonId)) {
        data.completedIds.push(lessonId);
        saveProgressData(data);
    }
}

export function markUncompleted(lessonId) {
    const data = getProgressData();
    const index = data.completedIds.indexOf(lessonId);
    if (index !== -1) {
        data.completedIds.splice(index, 1);
        saveProgressData(data);
    }
}

export function isCompleted(lessonId) {
    const data = getProgressData();
    return data.completedIds.includes(lessonId);
}

export function calculateProgressStats() {
    const data = getProgressData();
    const completedIds = data.completedIds;
    
    const total = LEARNING_PATH.length;
    const completed = completedIds.length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    const levelStats = {
        beginner: { total: 0, completed: 0 },
        intermediate: { total: 0, completed: 0 },
        advanced: { total: 0, completed: 0 }
    };

    LEARNING_PATH.forEach(lesson => {
        if (levelStats[lesson.level]) {
            levelStats[lesson.level].total++;
            if (completedIds.includes(lesson.id)) {
                levelStats[lesson.level].completed++;
            }
        }
    });

    const isAllCompleted = completed === total && total > 0;
    const nextLesson = isAllCompleted ? null : getNextLesson(completedIds);

    return {
        total,
        completed,
        percentage,
        levelStats,
        isAllCompleted,
        nextLesson
    };
}
