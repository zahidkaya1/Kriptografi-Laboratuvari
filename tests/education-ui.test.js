import test from 'node:test';
import assert from 'node:assert/strict';
import { getAlgoName } from '../js/utils/algorithm-catalog.js';

test('UI ve Navigasyon Testleri', async (t) => {
    await t.test('getAlgoName (Display Name Resolver) Testleri', () => {
        assert.strictEqual(getAlgoName('dh'), 'Diffie-Hellman', 'dh ham ID kalmamalı, Diffie-Hellman olmalı');
        assert.strictEqual(getAlgoName('freq-analysis'), 'Frekans Analizi', 'freq-analysis ham ID kalmamalı');
        assert.strictEqual(getAlgoName('caesar-breaker'), 'Sezar Şifresi Kırma', 'caesar-breaker ham ID kalmamalı');
        assert.strictEqual(getAlgoName('algo-compare'), 'Algoritma Karşılaştırma', 'algo-compare ham ID kalmamalı');
        assert.strictEqual(getAlgoName('columnar-transposition'), 'Sütunlu Transpozisyon', 'columnar-transposition ham ID kalmamalı');
        assert.strictEqual(getAlgoName('mixed'), 'Tümü (Karışık)', 'mixed düzgün çevrilmeli');
        // Bilinmeyen bir legacy ID
        assert.strictEqual(getAlgoName('legacy-id'), 'Legacy-id', 'Bilinmeyen ID capitalize edilmeli');
    });

    await t.test('Quiz Konu Filtresi Yalnızca Geçerli Soruları İçermeli', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const quizUiPath = path.join(process.cwd(), 'js', 'education', 'quiz-ui.js');
        const quizUiContent = fs.readFileSync(quizUiPath, 'utf8');

        // quiz-ui.js içinde EXERCISE_TEMPLATES kullanılarak set oluşturulmalı
        assert.ok(quizUiContent.includes('const algoSet = new Set(EXERCISE_TEMPLATES.map(t => t.algoId))'), 'Dropdown yalnızca soru bankasındaki unique konulardan oluşturulmalı');
        assert.ok(quizUiContent.includes('getAlgoName(id)'), 'formatAlgoName yerine getAlgoName kullanılmalı');
        assert.ok(!quizUiContent.includes('formatAlgoName(id)'), 'Eski formatAlgoName metodu tamamen silinmiş olmalı');
    });

    await t.test('Geliştirilebilecek Konu Hesaplaması Ham ID Döndürmemeli', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const eduUiPath = path.join(process.cwd(), 'js', 'education', 'education-ui.js');
        const eduUiContent = fs.readFileSync(eduUiPath, 'utf8');

        // education-ui.js içinde EXERCISE_TEMPLATES import edilip, filter uygulanmalı
        assert.ok(eduUiContent.includes('import { EXERCISE_TEMPLATES }'), 'Soru bankası import edilmeli');
        assert.ok(eduUiContent.includes('const validTopics = new Set(EXERCISE_TEMPLATES.map(t => t.algoId))'), 'Geçerli başlıklar filtrelenmeli');
        assert.ok(eduUiContent.includes('!validTopics.has(algoId)'), 'Soru bankasında olmayan konu filtrelenmeli');
        assert.ok(eduUiContent.includes('getAlgoName(weakest)'), 'Ham ID döndürmeyip, getAlgoName kullanmalı');
    });

    await t.test('Navigasyon Callback (SPA Navigation) Enjeksiyonu', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const appPath = path.join(process.cwd(), 'js', 'app.js');
        const appContent = fs.readFileSync(appPath, 'utf8');

        assert.ok(appContent.includes('function navigateTo(targetId)'), 'app.js içinde merkezi navigateTo helper bulunmalı');
        assert.ok(appContent.includes("renderEducationProgress('education-progress-content', { navigateTo })"), 'education UI callback enjekte almalı');
        assert.ok(appContent.includes("renderLearningUI({ navigateTo })"), 'learning UI callback enjekte almalı');
    });

    await t.test('Eğitim UI Butonları Doğru Hedefleri Kullanıyor mu', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const eduUiPath = path.join(process.cwd(), 'js', 'education', 'education-ui.js');
        const eduUiContent = fs.readFileSync(eduUiPath, 'utf8');

        // data-target kontrolleri
        assert.ok(eduUiContent.includes('data-target="guided-learning"'), 'Rehberli Öğrenmeye Git butonu guided-learning hedefini göstermeli');
        assert.ok(eduUiContent.includes('data-target="exercises"'), 'Alıştırmalara Git butonu exercises hedefini göstermeli (mini-exercises olmamalı)');
        assert.ok(!eduUiContent.includes('data-target="mini-exercises"'), 'Hatalı mini-exercises hedefi bulunmamalı');
        assert.ok(eduUiContent.includes('data-target="mixed-quiz"'), 'Quiz Başlat butonu mixed-quiz hedefini göstermeli');
        assert.ok(eduUiContent.includes('navigateTo(targetId)'), 'Buton click olaylarında navigateTo callback çağrılmalı');
    });
});
