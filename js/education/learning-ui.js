import { LEARNING_PATH, LEVELS } from './learning-path.js';
import { markCompleted, markUncompleted, isCompleted, calculateProgressStats } from './learning-progress.js';

let currentFilter = 'all';

export function renderLearningUI() {
    const container = document.getElementById('guided-learning-content');
    if (!container) return; // Will be rendered inside guided-learning-form

    const stats = calculateProgressStats();

    // Build the UI
    container.innerHTML = `
        <div class="learning-header">
            <div class="progress-section">
                <h3>Genel İlerleme</h3>
                <div class="progress-bar-bg" role="progressbar" aria-valuenow="${stats.percentage}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar-fill" style="width: ${stats.percentage}%;"></div>
                </div>
                <div class="progress-text">
                    ${stats.completed} / ${stats.total} ders tamamlandı (%${stats.percentage})
                </div>
                
                <div class="level-stats">
                    ${LEVELS.map(level => `
                        <div class="level-stat-item">
                            <span class="level-label">${level.title}</span>
                            <span class="level-count">${stats.levelStats[level.id].completed} / ${stats.levelStats[level.id].total}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="next-lesson-section">
                ${stats.isAllCompleted ? 
                    `<div class="all-completed-msg">Tüm öğrenme yolu tamamlandı! 🎉</div>` : 
                    `<div class="next-lesson-card">
                        <h4>Önerilen Sonraki Ders</h4>
                        <div class="next-title">${stats.nextLesson.title}</div>
                        <button class="btn-primary open-lab-btn" data-target="${stats.nextLesson.targetAlgoId}">Laboratuvarı Aç</button>
                    </div>`
                }
            </div>
        </div>

        <div class="learning-filters">
            <button class="filter-btn active" data-filter="all">Tümü</button>
            <button class="filter-btn" data-filter="beginner">Başlangıç</button>
            <button class="filter-btn" data-filter="intermediate">Orta</button>
            <button class="filter-btn" data-filter="advanced">İleri</button>
            <button class="filter-btn" data-filter="completed">Tamamlananlar</button>
            <button class="filter-btn" data-filter="uncompleted">Tamamlanmayanlar</button>
        </div>

        <div class="learning-cards-grid" id="learning-cards-container">
            <!-- Cards will be injected here -->
        </div>
    `;

    renderCards(currentFilter);

    // Attach Event Listeners
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            renderCards(currentFilter);
        });
    });

    container.querySelectorAll('.open-lab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetBtn = document.querySelector(`.algo-card-btn[data-target="${targetId}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        });
    });
}

function renderCards(filter) {
    const container = document.getElementById('learning-cards-container');
    if (!container) return;
    
    let filteredPath = LEARNING_PATH;
    if (filter === 'beginner' || filter === 'intermediate' || filter === 'advanced') {
        filteredPath = LEARNING_PATH.filter(l => l.level === filter);
    } else if (filter === 'completed') {
        filteredPath = LEARNING_PATH.filter(l => isCompleted(l.id));
    } else if (filter === 'uncompleted') {
        filteredPath = LEARNING_PATH.filter(l => !isCompleted(l.id));
    }

    container.innerHTML = filteredPath.map(lesson => {
        const completed = isCompleted(lesson.id);
        const hasExercises = ['caesar', 'rot13', 'atbash', 'vigenere', 'affine', 'playfair', 'railfence', 'columnar', 'rsa', 'dh'].includes(lesson.targetAlgoId);

        return `
            <div class="lesson-card ${completed ? 'completed' : ''}">
                <div class="lesson-card-header">
                    <span class="lesson-category">${LEVELS.find(l => l.id === lesson.level).title}</span>
                    <span class="lesson-time">⏱ ${lesson.estimatedTime}</span>
                </div>
                <h4 class="lesson-title">${lesson.title}</h4>
                
                <div class="lesson-objectives">
                    <strong>Bu derste ne öğreneceksin?</strong>
                    <ul>
                        ${lesson.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>

                <div class="lesson-content-mini">
                    ${lesson.content.map(c => `
                        <div class="mini-section">
                            <strong>${c.title}</strong>
                            <p>${c.text}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="lesson-actions">
                    <button class="btn-primary lesson-action-btn" data-action="open-lab" data-target="${lesson.targetAlgoId}">Laboratuvarı Aç</button>
                    ${hasExercises ? `<button class="btn-secondary lesson-action-btn" data-action="open-exercises" data-target="${lesson.targetAlgoId}">Alıştırma Çöz</button>` : ''}
                    <button class="lesson-complete-toggle ${completed ? 'is-completed' : ''}" data-lesson-id="${lesson.id}">
                        ${completed ? '✓ Tamamlandı' : 'Tamamla'}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Attach actions
    container.querySelectorAll('.lesson-action-btn[data-action="open-lab"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetBtn = document.querySelector(`.algo-card-btn[data-target="${targetId}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        });
    });

    container.querySelectorAll('.lesson-action-btn[data-action="open-exercises"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const targetBtn = document.querySelector(`.algo-card-btn[data-target="exercises"]`);
            if (targetBtn) {
                targetBtn.click();
                // Set the category filter if it exists
                const catFilter = document.getElementById('exercise-category');
                if (catFilter) {
                    let catVal = targetId;
                    if (['freq-analysis', 'caesar-breaker'].includes(targetId)) catVal = 'analysis';
                    
                    if (Array.from(catFilter.options).some(opt => opt.value === catVal)) {
                        catFilter.value = catVal;
                        catFilter.dispatchEvent(new Event('change'));
                    }
                }
            }
        });
    });

    container.querySelectorAll('.lesson-complete-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lessonId = e.target.getAttribute('data-lesson-id');
            if (isCompleted(lessonId)) {
                markUncompleted(lessonId);
            } else {
                markCompleted(lessonId);
            }
            // Re-render UI to update stats and buttons
            renderLearningUI(); 
            // Note: Since renderLearningUI re-renders everything, it will reset the filter to 'all' if we don't save state. 
            // But we have `currentFilter` scoped to `renderLearningUI` which is not global. 
            // We should ideally keep the filter state, let's fix it by pulling filter logic out or just clicking the active filter again.
            // A simple fix is to just let it re-render, but wait, let's use a global or module-scoped state for filter if needed.
        });
    });
    
    // Quick fix: restore filter state
    const filterBtn = document.querySelector(`.learning-filters .filter-btn[data-filter="${currentFilter}"]`);
    if (filterBtn) {
        document.querySelectorAll('.learning-filters .filter-btn').forEach(b => b.classList.remove('active'));
        filterBtn.classList.add('active');
    }
}
