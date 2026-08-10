import { calculateProgressStats, getProgressData } from './learning-progress.js';
import { LEARNING_PATH } from './learning-path.js';
import { getProgress as getExerciseProgress } from './exercise-progress.js';
import { getQuizProgress } from './quiz-progress.js';
import { EXERCISE_TEMPLATES } from './exercises.js';
import { getAlgoName } from '../utils/algorithm-catalog.js';

export function renderEducationProgress(containerId, options = {}) {
    const { navigateTo } = options;
    const container = document.getElementById(containerId);
    if (!container) return;

    const learningStats = calculateProgressStats();
    const learningData = getProgressData();
    const exerciseStats = getExerciseProgress();
    const quizStats = getQuizProgress();

    const nextStep = determineNextStep(learningStats, exerciseStats, quizStats, learningData.completedIds);

    container.innerHTML = `
        <div class="education-progress-dashboard">
            <h2 class="dashboard-title">Eğitim İlerlemeniz</h2>
            
            <div class="next-step-card">
                <h3>Önerilen Sonraki Adım</h3>
                <p class="next-step-desc">${nextStep.description}</p>
                <button class="btn-primary" data-target="${nextStep.target}">${nextStep.buttonText}</button>
            </div>

            <div class="progress-cards-container">
                <!-- Rehberli Öğrenme -->
                <div class="progress-card">
                    <h4>Rehberli Öğrenme</h4>
                    <p class="stat-main">${learningStats.completed} / ${learningStats.total} Ders</p>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${learningStats.percentage}%"></div></div>
                    <p class="stat-percentage">%${learningStats.percentage} Tamamlandı</p>
                    <ul class="stat-details">
                        <li>Başlangıç: ${learningStats.levelStats.beginner.completed}/${learningStats.levelStats.beginner.total}</li>
                        <li>Orta: ${learningStats.levelStats.intermediate.completed}/${learningStats.levelStats.intermediate.total}</li>
                        <li>İleri: ${learningStats.levelStats.advanced.completed}/${learningStats.levelStats.advanced.total}</li>
                    </ul>
                    <button class="btn-secondary" data-target="guided-learning">Rehberli Öğrenmeye Git</button>
                </div>

                <!-- Mini Alıştırmalar -->
                <div class="progress-card">
                    <h4>Mini Alıştırmalar</h4>
                    ${exerciseStats.totalAnswered > 0 ? `
                        <p class="stat-main">${exerciseStats.totalAnswered} Soru Çözüldü</p>
                        <p class="stat-sub">Doğru: ${exerciseStats.totalCorrect} | Yanlış: ${exerciseStats.totalWrong}</p>
                        <p class="stat-sub">Seri: ${exerciseStats.currentStreak} (En Yüksek: ${exerciseStats.highestStreak})</p>
                        <p class="stat-sub">Geliştirilebilecek Konu: ${getWeakestTopic(exerciseStats)}</p>
                    ` : `
                        <p class="stat-main empty-stat">Henüz yeterli veri yok.</p>
                    `}
                    <button class="btn-secondary" data-target="exercises">Alıştırmalara Git</button>
                </div>

                <!-- Karışık Quiz -->
                <div class="progress-card">
                    <h4>Karışık Quiz</h4>
                    ${quizStats.completedQuizzes > 0 ? `
                        <p class="stat-main">${quizStats.completedQuizzes} Quiz Tamamlandı</p>
                        <p class="stat-sub">Toplam Test Sayısı: ${quizStats.completedQuizzes}</p>
                        <p class="stat-sub">Toplam Soru: ${quizStats.totalQuestions}</p>
                        <p class="stat-sub">Doğru: ${quizStats.totalCorrect}</p>
                        <p class="stat-sub">En İyi Başarı: %${quizStats.bestPercentage}</p>
                        <p class="stat-sub">Son Başarı: %${quizStats.lastPercentage}</p>
                    ` : `
                        <p class="stat-main empty-stat">Henüz tamamlanmış quiz yok.</p>
                    `}
                    <button class="btn-secondary" data-target="mixed-quiz">Quiz Başlat</button>
                </div>
            </div>
        </div>
    `;

    // Attach navigation events
    const goBtns = container.querySelectorAll('button[data-target]');
    goBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            if (navigateTo) {
                navigateTo(targetId);
            }
        });
    });
}

export function determineNextStep(learningStats, exerciseStats, quizStats, learningCompletedIds = []) {
    // Rule 1: If learning path is not complete, recommend the next lesson
    if (learningStats.percentage < 100) {
        const next = LEARNING_PATH.find(l => !learningCompletedIds.includes(l.id));
        return {
            description: next ? `Rehberli öğrenmede sıradaki dersi tamamla: <strong>${next.title}</strong>` : "Rehberli öğrenmeye devam et.",
            target: 'guided-learning',
            buttonText: 'Derse Git'
        };
    }

    // Rule 2: If learning path is complete but exercises are low (< 20 answered)
    if (exerciseStats.totalAnswered < 20) {
        return {
            description: "Teorik bilgileri tamamladın. Şimdi pratik yapmak için Mini Alıştırmalara göz at.",
            target: 'exercises',
            buttonText: 'Alıştırma Çöz'
        };
    }

    // Rule 3: If exercises are enough but quiz is low (< 2 quizzes)
    if (quizStats.completedQuizzes < 2) {
        return {
            description: "Alıştırmalarda iyisin! Kendini gerçek bir sınav ortamında denemek için Karışık Quiz çöz.",
            target: 'mixed-quiz',
            buttonText: 'Quiz Başlat'
        };
    }

    // Rule 4: All used enough, recommend weak topic practice
    const weakTopic = getWeakestTopic(exerciseStats, true); // true = raw algo ID
    return {
        description: `Tebrikler! Tüm eğitim aşamalarını aktif kullanıyorsun. Geliştirmek için şu konuya odaklanabilirsin: <strong>${getAlgoName(weakTopic)}</strong>`,
        target: weakTopic && weakTopic !== 'Bilinmiyor' ? weakTopic : 'exercises', // Note: target might be the algo page itself or exercises
        buttonText: 'Konuya Çalış'
    };
}

function getWeakestTopic(exerciseStats, returnRawId = false) {
    if (!exerciseStats.algoStats || Object.keys(exerciseStats.algoStats).length === 0) {
        return returnRawId ? null : "Veri Yok";
    }

    const validTopics = new Set(EXERCISE_TEMPLATES.map(t => t.algoId));
    let weakest = null;
    let minRate = 1.1; // > 1
    
    for (const [algoId, stats] of Object.entries(exerciseStats.algoStats)) {
        if (!validTopics.has(algoId)) continue;
        if (stats.total >= 3) { // Only consider if they answered at least 3
            const rate = stats.correct / stats.total;
            if (rate < minRate) {
                minRate = rate;
                weakest = algoId;
            }
        }
    }

    if (!weakest) {
        // Fallback to lowest absolute correct if none have >= 3
        for (const [algoId, stats] of Object.entries(exerciseStats.algoStats)) {
            if (!validTopics.has(algoId)) continue;
            const rate = stats.correct / (stats.total || 1);
            if (rate < minRate) {
                minRate = rate;
                weakest = algoId;
            }
        }
    }

    if (returnRawId) return weakest;
    if (!weakest) return "Bilinmiyor";
    return getAlgoName(weakest) || "Bilinmiyor";
}
