import test, { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { 
    getProgressData, 
    saveProgressData, 
    markCompleted, 
    markUncompleted, 
    isCompleted, 
    calculateProgressStats 
} from '../js/education/learning-progress.js';
import { LEARNING_PATH } from '../js/education/learning-path.js';

describe('Learning Progress', () => {
    
    beforeEach(() => {
        // Mock localStorage
        let store = {};
        const mockStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => store[key] = value.toString(),
            removeItem: (key) => delete store[key],
            clear: () => store = {}
        };
        Object.defineProperty(globalThis, 'window', {
            value: { localStorage: mockStorage },
            writable: true
        });
        Object.defineProperty(globalThis, 'localStorage', {
            value: mockStorage,
            writable: true
        });
        localStorage.clear();
    });

    it('boş storage başlangıcı', () => {
        const data = getProgressData();
        assert.deepEqual(data.completedIds, []);
    });

    it('ders tamamlama', () => {
        markCompleted('lesson-caesar');
        const data = getProgressData();
        assert.ok(data.completedIds.includes('lesson-caesar'));
        assert.strictEqual(isCompleted('lesson-caesar'), true);
    });

    it('tamamlanmış dersi geri alma', () => {
        markCompleted('lesson-rot13');
        markUncompleted('lesson-rot13');
        const data = getProgressData();
        assert.ok(!data.completedIds.includes('lesson-rot13'));
        assert.strictEqual(isCompleted('lesson-rot13'), false);
    });

    it('duplicate tamamlamanın sorun oluşturmaması', () => {
        markCompleted('lesson-atbash');
        markCompleted('lesson-atbash');
        const data = getProgressData();
        assert.strictEqual(data.completedIds.filter(id => id === 'lesson-atbash').length, 1);
    });

    it('progress yüzdesi ve seviye bazlı ilerleme', () => {
        markCompleted('lesson-caesar'); // beginner
        markCompleted('lesson-rot13'); // beginner
        markCompleted('lesson-vigenere'); // intermediate
        
        const stats = calculateProgressStats();
        
        assert.strictEqual(stats.completed, 3);
        const expectedPerc = Math.round((3 / LEARNING_PATH.length) * 100);
        assert.strictEqual(stats.percentage, expectedPerc);
        
        assert.strictEqual(stats.levelStats.beginner.completed, 2);
        assert.strictEqual(stats.levelStats.intermediate.completed, 1);
        assert.strictEqual(stats.levelStats.advanced.completed, 0);
    });

    it('tüm dersler tamamlandığında complete state', () => {
        LEARNING_PATH.forEach(l => markCompleted(l.id));
        const stats = calculateProgressStats();
        assert.strictEqual(stats.isAllCompleted, true);
        assert.strictEqual(stats.nextLesson, null);
        assert.strictEqual(stats.percentage, 100);
    });

    it('bozuk localStorage JSON veya write error uygulamasını çökertmemeli', () => {
        localStorage.setItem('kriptografi-laboratuvari-learning-progress-v1', '{ invalid json ');
        
        const data = getProgressData();
        assert.deepEqual(data.completedIds, []);
        
        const faultyStorage = {
            getItem: () => { throw new Error('mock read error'); },
            setItem: () => { throw new Error('mock write error'); }
        };
        Object.defineProperty(globalThis, 'localStorage', { value: faultyStorage, writable: true });
        
        const safeData = getProgressData();
        assert.deepEqual(safeData.completedIds, []);
        
        assert.doesNotThrow(() => { markCompleted('lesson-caesar'); });
    });
});
