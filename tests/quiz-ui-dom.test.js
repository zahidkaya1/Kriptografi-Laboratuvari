import test from 'node:test';
import assert from 'node:assert/strict';

test('Quiz Ayar Ekranı DOM Sırası Testi', async () => {
    let htmlContent = '';
    
    // Mock the DOM
    const mockElements = {};
    
    global.document = {
        getElementById: (id) => {
            if (!mockElements[id]) {
                mockElements[id] = {
                    addEventListener: () => {},
                    appendChild: () => {},
                    value: 'all',
                    innerHTML: '',
                    style: {}
                };
            }
            return mockElements[id];
        },
        createElement: (tag) => ({
            appendChild: () => {},
            value: '',
            textContent: ''
        })
    };

    const container = {
        set innerHTML(val) {
            htmlContent = val;
        },
        get innerHTML() {
            return htmlContent;
        }
    };
    
    mockElements['quiz-container'] = container;
    
    const { renderQuizUI } = await import('../js/education/quiz-ui.js');
    
    // Yalnızca render etmesi yeterli, error fırlatmasın.
    renderQuizUI('quiz-container');
    
    // DOM string'in sırasını doğrula:
    // 1. quiz-algo (topic)
    // 2. quiz-difficulty
    // 3. quiz-count
    // 4. quiz-available-info
    // 5. btn-start-quiz
    
    const idxAlgo = htmlContent.indexOf('id="quiz-algo"');
    const idxDiff = htmlContent.indexOf('id="quiz-difficulty"');
    const idxCount = htmlContent.indexOf('id="quiz-count"');
    const idxInfo = htmlContent.indexOf('id="quiz-available-info"');
    const idxBtn = htmlContent.indexOf('id="btn-start-quiz"');
    
    assert.ok(idxAlgo > -1, 'quiz-algo bulunamadı');
    assert.ok(idxDiff > -1, 'quiz-difficulty bulunamadı');
    assert.ok(idxCount > -1, 'quiz-count bulunamadı');
    assert.ok(idxInfo > -1, 'quiz-available-info bulunamadı');
    assert.ok(idxBtn > -1, 'btn-start-quiz bulunamadı');
    
    assert.ok(idxAlgo < idxDiff, 'Konu, Zorluktan önce gelmeli');
    assert.ok(idxDiff < idxCount, 'Zorluk, Soru Sayısından önce gelmeli');
    assert.ok(idxCount < idxInfo, "Soru Sayısı, Availability Info'dan önce gelmeli");
    assert.ok(idxInfo < idxBtn, "Availability Info, Başla Butonundan önce gelmeli");
});
