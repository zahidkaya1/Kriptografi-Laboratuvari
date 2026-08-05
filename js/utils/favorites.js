const STORAGE_KEY = 'kriptografi-laboratuvari-favorites-v1';

export function getFavorites(storage = window.localStorage) {
    try {
        const data = storage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        }
    } catch (e) {
        // Ignore parse errors or access denied
    }
    return [];
}

export function saveFavorites(favorites, storage = window.localStorage) {
    try {
        storage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
        // Ignore quota exceeded or access denied
    }
}

export function addFavorite(id, storage = window.localStorage) {
    const favs = getFavorites(storage);
    if (!favs.includes(id)) {
        favs.push(id);
        saveFavorites(favs, storage);
    }
}

export function removeFavorite(id, storage = window.localStorage) {
    const favs = getFavorites(storage);
    const newFavs = favs.filter(f => f !== id);
    if (favs.length !== newFavs.length) {
        saveFavorites(newFavs, storage);
    }
}

export function isFavorite(id, storage = window.localStorage) {
    const favs = getFavorites(storage);
    return favs.includes(id);
}

export function toggleFavorite(id, storage = window.localStorage) {
    if (isFavorite(id, storage)) {
        removeFavorite(id, storage);
        return false;
    } else {
        addFavorite(id, storage);
        return true;
    }
}
