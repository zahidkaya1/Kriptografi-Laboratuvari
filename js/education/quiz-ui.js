import { createQuizSession, getEligibleQuestionsCount, getQuestionCountOptions } from './quiz-engine.js';
import { recordQuizSession } from './quiz-progress.js';
import { EXERCISE_TEMPLATES } from './exercises.js';
import { getAlgoName } from '../utils/algorithm-catalog.js';

let currentSession = null;

export function renderQuizUI(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Initial render is the settings screen
    renderSettingsScreen(container);
}

function renderSettingsScreen(container) {
    // Extract available algorithms from templates for the filter
    const algoSet = new Set(EXERCISE_TEMPLATES.map(t => t.algoId));
    const algoOptions = Array.from(algoSet).map(id => `<option value="${id}">${getAlgoName(id)}</option>`).join('');

    container.innerHTML = `
        <div class="quiz-settings">
            <h3>Karışık Quiz Ayarları</h3>
            <p>Kendinizi farklı algoritmalarda test edin.</p>

            <div class="setting-group">
                <label for="quiz-algo">Konu (İsteğe Bağlı):</label>
                <select id="quiz-algo">
                    <option value="all" selected>Tümü (Karışık)</option>
                    ${algoOptions}
                </select>
            </div>

            <div class="setting-group">
                <label for="quiz-difficulty">Zorluk:</label>
                <select id="quiz-difficulty">
                    <option value="mixed" selected>Karışık</option>
                    <option value="easy">Kolay</option>
                    <option value="medium">Orta</option>
                    <option value="hard">Zor</option>
                </select>
            </div>

            <div class="setting-group">
                <label for="quiz-count">Soru Sayısı:</label>
                <select id="quiz-count">
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                </select>
            </div>

            <div id="quiz-available-info" style="font-size: 0.9em; color: #666; margin-bottom: 1rem;">
                <!-- Dynamically populated -->
            </div>

            <button id="btn-start-quiz" class="btn-primary">Quiz'e Başla</button>
            <div id="quiz-settings-error" class="error-text" style="display:none;"></div>
        </div>
    `;

    function updateQuestionCountOptions() {
        const algo = document.getElementById('quiz-algo').value;
        const diff = document.getElementById('quiz-difficulty').value;
        const countSelect = document.getElementById('quiz-count');
        const infoEl = document.getElementById('quiz-available-info');

        const available = getEligibleQuestionsCount(algo, diff);
        const currentSelected = parseInt(countSelect.value);

        const result = getQuestionCountOptions(available, currentSelected);

        countSelect.innerHTML = '';
        result.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            countSelect.appendChild(option);
        });

        countSelect.value = result.selected;
        infoEl.textContent = `Bu filtrelerde ${available} soru mevcut.`;
    }

    document.getElementById('quiz-algo').addEventListener('change', updateQuestionCountOptions);
    document.getElementById('quiz-difficulty').addEventListener('change', updateQuestionCountOptions);

    // Initial calculation
    updateQuestionCountOptions();

    document.getElementById('btn-start-quiz').addEventListener('click', () => {
        const count = parseInt(document.getElementById('quiz-count').value);
        const difficulty = document.getElementById('quiz-difficulty').value;
        const algorithm = document.getElementById('quiz-algo').value;

        const options = { count, difficulty, algorithm };

        // Dry-run to see how many questions we can get
        const tempSession = createQuizSession(options);

        if (tempSession.totalQuestions === 0) {
            const err = document.getElementById('quiz-settings-error');
            err.textContent = "Bu filtreler için uygun soru bulunamadı. Lütfen filtreleri değiştirin.";
            err.style.display = 'block';
            return;
        }

        if (tempSession.totalQuestions < count) {
            // alert instead: display it in the quiz container or before starting
            // To not interrupt flow aggressively but avoid alert:
            // We can just set a flag to show a warning inside the quiz screen.
            tempSession._warningMessage = `İstenen sayıda soru bulunamadı. Quiz ${tempSession.totalQuestions} soru ile başlatıldı.`;
        }

        currentSession = tempSession;
        currentSession.start();
        renderActiveQuizScreen(container);
    });
}

function renderActiveQuizScreen(container) {
    const q = currentSession.getCurrentQuestion();
    if (!q) {
        renderResultScreen(container);
        return;
    }

    const currentIndex = currentSession.currentIndex;
    const total = currentSession.totalQuestions;

    let inputHtml = '';

    if (q.type === 'true-false') {
        inputHtml = `
            <div class="quiz-options">
                <label><input type="radio" name="quiz-answer" value="true"> Doğru</label>
                <label><input type="radio" name="quiz-answer" value="false"> Yanlış</label>
            </div>
        `;
    } else if (q.type === 'multiple-choice') {
        inputHtml = '<div class="quiz-options">';
        q.options.forEach((opt, idx) => {
            // Using value as the option text to match validation
            inputHtml += `<label><input type="radio" name="quiz-answer" value="${opt}"> ${opt}</label>`;
        });
        inputHtml += '</div>';
    } else {
        inputHtml = `<input type="text" id="quiz-answer-text" placeholder="Cevabınızı girin..." class="quiz-text-input">`;
    }

    container.innerHTML = `
        <div class="quiz-active">
            ${currentSession._warningMessage ? `<div class="message-area error" style="margin-bottom: 1rem;">${currentSession._warningMessage}</div>` : ''}
            <div class="quiz-header">
                <span class="quiz-progress-text">Soru ${currentIndex + 1} / ${total}</span>
                <span class="quiz-score-text">Puan: ${currentSession.score} / ${total}</span>
            </div>

            <div class="quiz-question-card">
                <h4>${q.title}</h4>
                <p class="quiz-question-text">${q.text}</p>

                <div class="quiz-input-area">
                    ${inputHtml}
                </div>

                <div class="quiz-actions">
                    <button id="btn-quiz-check" class="btn-primary">Cevabı Kontrol Et</button>
                    <button id="btn-quiz-next" class="btn-secondary" disabled>Sonraki Soru</button>
                </div>

                <div id="quiz-feedback" class="quiz-feedback" style="display:none;"></div>
                ${q.hint ? `<p class="quiz-hint" style="display:none;" id="quiz-hint-text"><strong>İpucu:</strong> ${q.hint}</p>` : ''}
                <div id="quiz-explanation" class="quiz-explanation" style="display:none;"></div>
            </div>
        </div>
    `;

    const btnCheck = document.getElementById('btn-quiz-check');
    const btnNext = document.getElementById('btn-quiz-next');
    const feedbackEl = document.getElementById('quiz-feedback');
    const expEl = document.getElementById('quiz-explanation');

    // Show hint if user wants (optional feature, we can just show it if they fail or via a button, let's just make it visible if they answer wrong)

    btnCheck.addEventListener('click', () => {
        let answerStr = '';
        const textInput = document.getElementById('quiz-answer-text');
        if (textInput) {
            answerStr = textInput.value;
        } else {
            const checked = document.querySelector('input[name="quiz-answer"]:checked');
            if (checked) {
                answerStr = checked.value;
            }
        }

        if (!answerStr || answerStr.trim() === '') {
            feedbackEl.innerHTML = `<span class="incorrect-text">Lütfen bir cevap girin veya seçin.</span>`;
            feedbackEl.className = 'quiz-feedback error';
            feedbackEl.style.display = 'block';
            return;
        }

        const result = currentSession.submitAnswer(answerStr);
        if (!result) return; // already answered or error

        // Feedback
        feedbackEl.style.display = 'block';
        if (result.isCorrect) {
            feedbackEl.innerHTML = `<span class="correct-text">✅ Doğru!</span>`;
            feedbackEl.className = 'quiz-feedback success';
        } else {
            let expectedDisplay = result.expected;
            if (q.type === 'true-false' || q.type === 'true_false') {
                if (String(expectedDisplay) === 'true') expectedDisplay = 'Doğru';
                if (String(expectedDisplay) === 'false') expectedDisplay = 'Yanlış';
            }
            feedbackEl.innerHTML = `<span class="incorrect-text">❌ Yanlış. Doğru cevap: ${expectedDisplay}</span>`;
            feedbackEl.className = 'quiz-feedback error';
            const hintEl = document.getElementById('quiz-hint-text');
            if (hintEl) hintEl.style.display = 'block';
        }

        if (result.explanation) {
            expEl.innerHTML = `<strong>Açıklama:</strong> ${result.explanation}`;
            expEl.style.display = 'block';
        }

        // Lock inputs
        const inputs = container.querySelectorAll('input');
        inputs.forEach(i => i.disabled = true);

        btnCheck.disabled = true;
        btnNext.disabled = false;

        // Update score display
        container.querySelector('.quiz-score-text').textContent = `Puan: ${currentSession.score} / ${total}`;
    });

    btnNext.addEventListener('click', () => {
        const hasNext = currentSession.nextQuestion();
        if (hasNext) {
            renderActiveQuizScreen(container);
        } else {
            // record results
            const s = currentSession.getSummary();
            recordQuizSession(s.total, s.correct, s.meta.difficulty, s.meta.algorithm);
            renderResultScreen(container);
        }
    });
}

function renderResultScreen(container) {
    const s = currentSession.getSummary();

    let msg = "Tekrar çalışman faydalı olabilir.";
    if (s.percentage >= 90) msg = "Mükemmel!";
    else if (s.percentage >= 70) msg = "İyi!";
    else if (s.percentage >= 50) msg = "Gelişiyor.";

    container.innerHTML = `
        <div class="quiz-results">
            <h3>Quiz Tamamlandı</h3>
            <div class="result-stats">
                <p><strong>Doğru:</strong> ${s.correct} / ${s.total}</p>
                <p><strong>Başarı:</strong> %${s.percentage}</p>
                <p class="result-msg">${msg}</p>
            </div>

            <div class="result-actions">
                <button id="btn-quiz-retry" class="btn-primary">Yeni Quiz</button>
                <!-- SPA navigation handled by external event listeners, just assigning classes/ids for app.js -->
                <button id="btn-quiz-go-exercises" class="btn-secondary" data-target="mini-exercises">Mini Alıştırmalara Git</button>
                <button id="btn-quiz-go-guided" class="btn-secondary" data-target="guided-learning">Rehberli Öğrenmeye Git</button>
            </div>
        </div>
    `;

    document.getElementById('btn-quiz-retry').addEventListener('click', () => {
        currentSession = null;
        renderSettingsScreen(container);
    });

    // We dispatch custom events or rely on app.js listening to data-target clicks
    // Let's attach a global click handler in app.js or dispatch an event
    const goBtns = container.querySelectorAll('button[data-target]');
    goBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            // Mock a click on the sidebar menu to trigger SPA navigation
            const menuLink = document.querySelector(`a[data-algo-id="${targetId}"]`);
            if (menuLink) {
                menuLink.click();
            }
        });
    });
}
