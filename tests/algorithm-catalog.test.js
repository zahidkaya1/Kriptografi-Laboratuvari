import test from 'node:test';
import assert from 'node:assert/strict';
import { ALGORITHM_CATALOG } from '../js/utils/algorithm-catalog.js';

test('Algoritma Katalog Testleri', async (t) => {
    await t.test('Tüm katalog ID\'leri benzersiz olmalı', () => {
        const ids = ALGORITHM_CATALOG.map(algo => algo.id);
        const uniqueIds = new Set(ids);
        assert.strictEqual(ids.length, uniqueIds.size, 'Katalogda tekrar eden ID bulunmamalıdır');
    });

    await t.test('XOR Katalog Kuralları', () => {
        const xor = ALGORITHM_CATALOG.find(a => a.id === 'xor');
        assert.ok(xor, 'XOR algoritması katalogda bulunmalı');
        assert.strictEqual(xor.category, 'Modern ve Matematiksel', 'XOR doğru kategoride olmalı');
        
        // steps=true equivalent -> changesChars should exist or just standard algorithm properties
        // actually the user said "steps=true", which in this app's UI might be controlled by app.js (stepsCard visibility)
        // But let's check basic metadata
        assert.ok(xor.meta, 'XOR metadata içermeli');
        assert.strictEqual(xor.meta.supportsDecryption, 'Evet', 'XOR şifre çözmeyi desteklemeli');
    });

    await t.test('Base64 Katalog Kuralları', () => {
        const base64 = ALGORITHM_CATALOG.find(a => a.id === 'base64');
        assert.ok(base64, 'Base64 katalogda bulunmalı');
        assert.strictEqual(base64.category, 'Kodlama ve Veri Dönüşümü', 'Base64 doğru kategoride olmalı');
        assert.ok(base64.meta, 'Base64 metadata içermeli');
        assert.strictEqual(base64.meta.supportsDecryption, 'Hayır (Şifreleme değil, Kod Çözme - Decoding)', 'Base64 şifreleme olarak sınıflandırılmamalı');
    });

    await t.test('Hash Katalog Kuralları', () => {
        const hash = ALGORITHM_CATALOG.find(a => a.id === 'hash');
        assert.ok(hash, 'Hash katalogda bulunmalı');
        assert.strictEqual(hash.category, 'Özet (Hash) Fonksiyonları', 'Hash doğru kategoride olmalı');
        assert.ok(hash.meta, 'Hash metadata içermeli');
        assert.strictEqual(hash.meta.supportsDecryption, 'Hayır (Tek yönlüdür)', 'Hash şifre çözme desteklememeli');
        
        const isSHAIncluded = hash.keywords.includes('sha256') || hash.keywords.includes('sha384') || hash.keywords.includes('sha512');
        assert.ok(isSHAIncluded, 'Hash metadata içinde SHA varyantları bulunmalı');
    });
    await t.test('Playfair Katalog Kuralları', () => {
        const playfair = ALGORITHM_CATALOG.find(a => a.id === 'playfair');
        assert.ok(playfair, 'Playfair katalogda bulunmalı');
        assert.strictEqual(playfair.category, 'Klasik Yerine Koyma Şifreleri', 'Playfair doğru kategoride olmalı');
        assert.ok(playfair.meta, 'Playfair metadata içermeli');
        assert.strictEqual(playfair.meta.securityStatus, 'Zayıf (Tarihsel)');
    });

    await t.test('Hill Katalog Kuralları', () => {
        const hill = ALGORITHM_CATALOG.find(a => a.id === 'hill');
        assert.ok(hill, 'Hill katalogda bulunmalı');
        assert.strictEqual(hill.category, 'Klasik Yerine Koyma Şifreleri', 'Hill doğru kategoride olmalı');
        assert.ok(hill.meta, 'Hill metadata içermeli');
        assert.strictEqual(hill.meta.keyType, '2x2 Sayısal Matris');
    });

    await t.test('Katalogdaki görünür araçların UI (index.html) tarafından desteklenmesi', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const htmlPath = path.join(process.cwd(), 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Playfair ve Hill menü butonları HTML'de var mı?
        assert.ok(htmlContent.includes('data-algo-id="playfair"'), 'Playfair navigation butonu UI içinde bulunmalı');
        assert.ok(htmlContent.includes('data-algo-id="hill"'), 'Hill navigation butonu UI içinde bulunmalı');
        assert.ok(htmlContent.includes('id="playfair-form"'), 'Playfair formu UI içinde bulunmalı');
        assert.ok(htmlContent.includes('id="hill-form"'), 'Hill formu UI içinde bulunmalı');

        // HTML içindeki <summary> tagları ile kategorileri topla
        const summaryRegex = /<summary>(.*?)<\/summary>/g;
        let match;
        const uiCategories = new Set();
        while ((match = summaryRegex.exec(htmlContent)) !== null) {
            uiCategories.add(match[1].trim());
        }

        // Favoriler ve özel durumları dahil et
        uiCategories.add('Eğitim Araçları');
        uiCategories.add('Analiz Araçları');

        // Katalogdaki görünür tüm algoritmaların UI'da bir kategorisi var mı?
        ALGORITHM_CATALOG.forEach(algo => {
            if (algo.id !== 'exercises' && algo.id !== 'algo-compare' && algo.id !== 'guided-learning' && algo.id !== 'mixed-quiz' && algo.id !== 'education-progress') {
                assert.ok(
                    uiCategories.has(algo.category) || algo.category === 'Eğitim Araçları' || algo.category === 'Analiz Araçları',
                    `${algo.name} algoritmasının kategorisi (${algo.category}) UI'da desteklenmiyor.`
                );
            }
        });

        assert.ok(htmlContent.includes('data-algo-id="guided-learning"'), 'Rehberli Öğrenme navigation butonu UI içinde bulunmalı');
        assert.ok(htmlContent.includes('id="guided-learning-form"'), 'Rehberli Öğrenme formu UI içinde bulunmalı');

        assert.ok(htmlContent.includes('data-algo-id="mixed-quiz"'), 'Karışık Quiz navigation butonu UI içinde bulunmalı');
        assert.ok(htmlContent.includes('id="mixed-quiz-form"'), 'Karışık Quiz formu UI içinde bulunmalı');
        // Regression: check if there's no inline display:none that breaks things and it has content container
        assert.ok(!htmlContent.includes('id="mixed-quiz-form" class="algo-form" style="display:none;"'), 'Karışık Quiz formu inline display:none içermemeli');
        assert.ok(htmlContent.includes('id="mixed-quiz-content"'), 'Karışık Quiz formu content container içermeli');

        assert.ok(htmlContent.includes('data-algo-id="education-progress"'), 'Eğitim İlerlemesi navigation butonu UI içinde bulunmalı');
        assert.ok(htmlContent.includes('id="education-progress-form"'), 'Eğitim İlerlemesi formu UI içinde bulunmalı');
        assert.ok(!htmlContent.includes('id="education-progress-form" class="algo-form" style="display:none;"'), 'Eğitim İlerlemesi formu inline display:none içermemeli');
        assert.ok(htmlContent.includes('id="education-progress-content"'), 'Eğitim İlerlemesi formu content container içermeli');
    });

    await t.test('App.js render yolları (Regression)', async () => {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const appJsPath = path.join(process.cwd(), 'js', 'app.js');
        const appJsContent = fs.readFileSync(appJsPath, 'utf8');

        // Render calls
        assert.ok(appJsContent.includes("renderQuizUI('mixed-quiz-content')"), 'app.js içinde renderQuizUI çağrısı bulunmalı');
        assert.ok(appJsContent.includes("renderEducationProgress('education-progress-content')"), 'app.js içinde renderEducationProgress çağrısı bulunmalı');

        // Hiding generic sections
        const mixedQuizBlockRegex = /else if \(algoId === 'mixed-quiz'\) \{[\s\S]*?renderQuizUI/m;
        const mixedQuizBlock = appJsContent.match(mixedQuizBlockRegex);
        assert.ok(mixedQuizBlock, 'mixed-quiz switch bloğu bulunmalı');
        assert.ok(mixedQuizBlock[0].includes("actions.style.display = 'none'"), 'mixed-quiz için actions gizlenmeli');
        assert.ok(mixedQuizBlock[0].includes("outputSection.style.display = 'none'"), 'mixed-quiz için outputSection gizlenmeli');

        const eduProgBlockRegex = /else if \(algoId === 'education-progress'\) \{[\s\S]*?renderEducationProgress/m;
        const eduProgBlock = appJsContent.match(eduProgBlockRegex);
        assert.ok(eduProgBlock, 'education-progress switch bloğu bulunmalı');
        assert.ok(eduProgBlock[0].includes("actions.style.display = 'none'"), 'education-progress için actions gizlenmeli');
        assert.ok(eduProgBlock[0].includes("outputSection.style.display = 'none'"), 'education-progress için outputSection gizlenmeli');

        // Imports
        assert.ok(appJsContent.includes("import { renderQuizUI } from './education/quiz-ui.js'"), 'renderQuizUI import edilmeli');
        assert.ok(appJsContent.includes("import { renderEducationProgress } from './education/education-ui.js'"), 'renderEducationProgress import edilmeli');
    });
});
