import test from 'node:test';
import assert from 'node:assert/strict';
import { getFavorites, saveFavorites, addFavorite, removeFavorite, isFavorite, toggleFavorite } from '../js/utils/favorites.js';

class MockStorage {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
}

test('Favoriler Yardımcıları Testleri', async (t) => {
    let mockStorage;

    t.beforeEach(() => {
        mockStorage = new MockStorage();
    });

    await t.test('Boş storage durumunda boş liste', () => {
        const favs = getFavorites(mockStorage);
        assert.deepEqual(favs, []);
    });

    await t.test('Favori ekleme', () => {
        addFavorite('rsa', mockStorage);
        assert.deepEqual(getFavorites(mockStorage), ['rsa']);
        assert.ok(isFavorite('rsa', mockStorage));
    });

    await t.test('Tekrarlı favori eklenmemesi', () => {
        addFavorite('rsa', mockStorage);
        addFavorite('rsa', mockStorage);
        assert.deepEqual(getFavorites(mockStorage), ['rsa']);
    });

    await t.test('Favori kaldırma', () => {
        addFavorite('rsa', mockStorage);
        addFavorite('dh', mockStorage);
        removeFavorite('rsa', mockStorage);
        assert.deepEqual(getFavorites(mockStorage), ['dh']);
        assert.strictEqual(isFavorite('rsa', mockStorage), false);
    });

    await t.test('Toggle favori', () => {
        const isAdded = toggleFavorite('rsa', mockStorage);
        assert.strictEqual(isAdded, true);
        assert.deepEqual(getFavorites(mockStorage), ['rsa']);
        
        const isAdded2 = toggleFavorite('rsa', mockStorage);
        assert.strictEqual(isAdded2, false);
        assert.deepEqual(getFavorites(mockStorage), []);
    });

    await t.test('Bozuk JSON durumunda boş liste döner', () => {
        mockStorage.setItem('kriptografi-laboratuvari-favorites-v1', '{bozuk json');
        const favs = getFavorites(mockStorage);
        assert.deepEqual(favs, []);
    });

    await t.test('Storage dizisi olmayan veri dönerse boş liste', () => {
        mockStorage.setItem('kriptografi-laboratuvari-favorites-v1', JSON.stringify({ "id": "rsa" }));
        const favs = getFavorites(mockStorage);
        assert.deepEqual(favs, []);
    });
});
