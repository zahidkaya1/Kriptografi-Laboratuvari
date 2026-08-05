import test from 'node:test';
import assert from 'node:assert/strict';
import { 
    getProgress, 
    saveProgress, 
    resetProgress, 
    recordAnswer 
} from '../js/education/exercise-progress.js';

// Mock localStorage
const mockStorage = {};
global.localStorage = {
    getItem: (key) => mockStorage[key] || null,
    setItem: (key, value) => { mockStorage[key] = value; },
    removeItem: (key) => { delete mockStorage[key]; },
    clear: () => { 
        for(let k in mockStorage) delete mockStorage[k]; 
    }
};

test('Alıştırma İlerleme Testleri', async (t) => {

    t.beforeEach(() => {
        global.localStorage.clear();
    });

    await t.test('Boş storage ile varsayılan ilerleme', () => {
        const prog = getProgress();
        assert.strictEqual(prog.totalAnswered, 0);
        assert.strictEqual(prog.totalCorrect, 0);
        assert.strictEqual(prog.highestStreak, 0);
    });

    await t.test('İlerleme kaydetme ve yükleme', () => {
        const prog = getProgress();
        prog.totalCorrect = 5;
        saveProgress(prog);
        const loaded = getProgress();
        assert.strictEqual(loaded.totalCorrect, 5);
    });

    await t.test('Doğru cevap istatistiği ve Seri (Streak) artışı', () => {
        recordAnswer(true, 'rsa');
        let prog = recordAnswer(true, 'caesar');
        assert.strictEqual(prog.totalAnswered, 2);
        assert.strictEqual(prog.totalCorrect, 2);
        assert.strictEqual(prog.currentStreak, 2);
        assert.strictEqual(prog.highestStreak, 2);
        assert.strictEqual(prog.algoStats['rsa'].correct, 1);
        assert.strictEqual(prog.algoStats['caesar'].correct, 1);
    });

    await t.test('Yanlış cevapta serinin sıfırlanması ve en yüksek serinin korunması', () => {
        recordAnswer(true, 'rsa');
        recordAnswer(true, 'rsa'); // streak = 2
        let prog = recordAnswer(false, 'caesar'); // streak = 0, highest = 2
        assert.strictEqual(prog.currentStreak, 0);
        assert.strictEqual(prog.highestStreak, 2);
        assert.strictEqual(prog.totalWrong, 1);
    });

    await t.test('Bozuk JSON ve Negatif değerlerin temizlenmesi', () => {
        global.localStorage.setItem('kriptografi-laboratuvari-exercise-progress-v1', '{ "totalAnswered": -5, "totalCorrect": "text" }');
        const prog = getProgress();
        assert.strictEqual(prog.totalAnswered, 0);
        assert.strictEqual(prog.totalCorrect, 0);
        
        global.localStorage.setItem('kriptografi-laboratuvari-exercise-progress-v1', 'not json');
        const prog2 = getProgress();
        assert.strictEqual(prog2.totalAnswered, 0);
    });

    await t.test('Sıfırlama işlemi (Yalnızca ilerlemeyi sıfırlama)', () => {
        recordAnswer(true, 'rsa');
        resetProgress();
        const prog = getProgress();
        assert.strictEqual(prog.totalAnswered, 0);
        assert.strictEqual(prog.algoStats['rsa'], undefined);
    });

    await t.test('Storage yazma hatasında uygulamanın çökmemesi', () => {
        global.localStorage.setItem = () => { throw new Error("Storage Full"); };
        // Shouldn't crash
        const prog = recordAnswer(true, 'rsa');
        assert.strictEqual(prog.totalCorrect, 1);
        // Reset mock
        global.localStorage.setItem = (key, value) => { mockStorage[key] = value; };
    });
});
