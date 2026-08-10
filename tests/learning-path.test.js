import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LEARNING_PATH, LEVELS, getPathByLevel, getLessonById, getNextLesson } from '../js/education/learning-path.js';
import { ALGORITHM_CATALOG } from '../js/utils/algorithm-catalog.js';

describe('Learning Path', () => {
    
    it('tüm lesson ID leri benzersiz olmalı', () => {
        const ids = LEARNING_PATH.map(l => l.id);
        const uniqueIds = new Set(ids);
        assert.strictEqual(ids.length, uniqueIds.size);
    });
    
    it('geçerli level değerlerine sahip olmalı', () => {
        const validLevels = LEVELS.map(l => l.id);
        LEARNING_PATH.forEach(lesson => {
            assert.ok(validLevels.includes(lesson.level));
        });
    });
    
    it('tüm target algorithm ID leri katalogda bulunmalı', () => {
        const catalogIds = ALGORITHM_CATALOG.map(a => a.id);
        LEARNING_PATH.forEach(lesson => {
            assert.ok(catalogIds.includes(lesson.targetAlgoId));
        });
    });
    
    it('başlangıç, orta ve ileri seviyeler boş olmamalı', () => {
        assert.ok(getPathByLevel('beginner').length > 0);
        assert.ok(getPathByLevel('intermediate').length > 0);
        assert.ok(getPathByLevel('advanced').length > 0);
    });
    
    it('Base64 dersinde şifreleme olmadığı açıkça belirtilmeli', () => {
        const base64 = getLessonById('lesson-base64');
        assert.ok(base64);
        const hasWarning = base64.content.some(c => 
            c.text.toLocaleLowerCase('tr-TR').includes('şifreleme değildir') || 
            c.text.toLocaleLowerCase('tr-TR').includes('şifreleme')
        );
        assert.strictEqual(hasWarning, true);
    });
    
    it('Hash dersinde tek yönlü olduğu veya şifreleme olmadığı belirtilmeli', () => {
        const hash = getLessonById('lesson-hash');
        assert.ok(hash);
        const hasWarning = hash.content.some(c => 
            c.text.toLocaleLowerCase('tr-TR').includes('şifreleme değildir') || 
            c.text.toLocaleLowerCase('tr-TR').includes('tek yönlü')
        );
        assert.strictEqual(hasWarning, true);
    });
    
    it('getNextLesson deterministik çalışmalı', () => {
        const completed = ['lesson-caesar'];
        const next = getNextLesson(completed);
        assert.strictEqual(next.id, 'lesson-rot13');
        
        const next2 = getNextLesson(completed);
        assert.strictEqual(next2.id, 'lesson-rot13');
    });

    it('tüm dersler bittiğinde next lesson null dönmeli', () => {
        const allIds = LEARNING_PATH.map(l => l.id);
        const next = getNextLesson(allIds);
        assert.strictEqual(next, null);
    });
});
