import { runRSA } from './algorithms/rsa.js';
import { runDiffieHellman } from './algorithms/diffie-hellman.js';
import { runVigenere } from './algorithms/vigenere.js';
import { runCaesar } from './algorithms/caesar.js';
import { runROT13 } from './algorithms/rot13.js';
import { runAtbash } from './algorithms/atbash.js';
import { runAffine } from './algorithms/affine.js';
import { runRailFence } from './algorithms/rail-fence.js';
import { runColumnarTransposition } from './algorithms/columnar-transposition.js';
import * as UI from './utils/ui.js';
import { searchAlgorithms } from './utils/search.js';
import { getFavorites, toggleFavorite, isFavorite } from './utils/favorites.js';
import { ALGORITHM_CATALOG } from './utils/algorithm-catalog.js';

let currentAlgorithm = 'rsa';

// Tab Değiştirme
function handleTabClick(e) {
    if (!e.target.classList.contains('algo-card-btn')) return;
    
    // Tab aktifliği
    document.querySelectorAll('.algo-card-btn').forEach(b => b.classList.remove('active'));
    
    const targetId = e.target.getAttribute('data-target');
    
    // Aynı hedefi (favorilerde veya normalde) gösteren tüm butonları aktif et
    document.querySelectorAll(`.algo-card-btn[data-target="${targetId}"]`).forEach(b => b.classList.add('active'));

    // Form görünürlüğü
    currentAlgorithm = targetId;
    document.querySelectorAll('.algo-form').forEach(f => f.classList.remove('active'));
    const form = document.getElementById(`${currentAlgorithm}-form`);
    if (form) form.classList.add('active');

    // Temizle
    clearAll();
}

document.querySelectorAll('.algo-card-btn').forEach(btn => {
    btn.addEventListener('click', handleTabClick);
});

// Temizleme Butonu
document.getElementById('btn-clear').addEventListener('click', clearAll);

function clearAll() {
    UI.hideMessage();
    UI.clearResult();
    UI.clearSteps();
}

// Hesapla Butonu
document.getElementById('btn-calculate').addEventListener('click', () => {
    UI.hideMessage();
    
    try {
        if (currentAlgorithm === 'rsa') {
            handleRSA();
        } else if (currentAlgorithm === 'dh') {
            handleDH();
        } else if (currentAlgorithm === 'vigenere') {
            handleVigenere();
        } else if (currentAlgorithm === 'caesar') {
            handleCaesar();
        } else if (currentAlgorithm === 'rot13') {
            handleROT13();
        } else if (currentAlgorithm === 'atbash') {
            handleAtbash();
        } else if (currentAlgorithm === 'affine') {
            handleAffine();
        } else if (currentAlgorithm === 'railfence') {
            handleRailFence();
        } else if (currentAlgorithm === 'columnar') {
            handleColumnar();
        }
    } catch (error) {
        UI.showMessage(error.message, "error");
        UI.clearResult();
        UI.clearSteps();
    }
});

// Kopyalama Butonu
document.getElementById('btn-copy').addEventListener('click', () => {
    const text = document.getElementById('result-output').textContent;
    UI.copyToClipboard(text);
});

// Global Örnek Doldurma Butonu
const btnExample = document.getElementById('btn-example');
if (btnExample) {
    btnExample.addEventListener('click', () => {
        clearAll();
        
        // Varsayılan form değerlerini temizle ve resetle (bazı alanlar kalabilir, biz özel olarak atayacağız)
        if (currentAlgorithm === 'rsa') {
            document.getElementById('rsa-p').value = '61';
            document.getElementById('rsa-q').value = '53';
            document.getElementById('rsa-e').value = '17';
            document.getElementById('rsa-message').value = '65';
            document.getElementById('rsa-mode').value = 'encrypt';
        } else if (currentAlgorithm === 'dh') {
            document.getElementById('dh-p').value = '23';
            document.getElementById('dh-g').value = '5';
            document.getElementById('dh-a').value = '6';
            document.getElementById('dh-b').value = '15';
        } else if (currentAlgorithm === 'vigenere') {
            document.getElementById('vig-alphabet').value = 'EN';
            document.getElementById('vig-mode').value = 'encrypt';
            document.getElementById('vig-key').value = 'LEMON';
            document.getElementById('vig-text').value = 'ATTACKATDAWN';
        } else if (currentAlgorithm === 'caesar') {
            document.getElementById('caesar-alphabet').value = 'EN';
            document.getElementById('caesar-mode').value = 'encrypt';
            document.getElementById('caesar-shift').value = '3';
            document.getElementById('caesar-text').value = 'ABC';
        } else if (currentAlgorithm === 'rot13') {
            document.getElementById('rot13-text').value = 'HELLO';
        } else if (currentAlgorithm === 'atbash') {
            document.getElementById('atbash-alphabet').value = 'EN';
            document.getElementById('atbash-text').value = 'ABCXYZ';
        } else if (currentAlgorithm === 'affine') {
            document.getElementById('affine-alphabet').value = 'EN';
            document.getElementById('affine-mode').value = 'encrypt';
            document.getElementById('affine-a').value = '5';
            document.getElementById('affine-b').value = '8';
            document.getElementById('affine-text').value = 'AFFINECIPHER';
        } else if (currentAlgorithm === 'railfence') {
            document.getElementById('railfence-mode').value = 'encrypt';
            document.getElementById('railfence-rails').value = '3';
            document.getElementById('railfence-text').value = 'WEAREDISCOVEREDFLEEATONCE';
        } else if (currentAlgorithm === 'columnar') {
            document.getElementById('columnar-alphabet').value = 'EN';
            document.getElementById('columnar-mode').value = 'encrypt';
            document.getElementById('columnar-key').value = 'KEY';
            document.getElementById('columnar-text').value = 'HELLOWORLD';
        }
    });
}

// Tema Değiştirme (Açık / Koyu)
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    }
});

// --- Algoritma Çağrıları ---

function handleRSA() {
    const p = parseInt(document.getElementById('rsa-p').value, 10);
    const q = parseInt(document.getElementById('rsa-q').value, 10);
    const e = parseInt(document.getElementById('rsa-e').value, 10);
    const message = document.getElementById('rsa-message').value;
    const mode = document.getElementById('rsa-mode').value;

    if (!p || !q || !e || !message) {
        throw new Error("Lütfen tüm RSA alanlarını doldurunuz.");
    }

    const { result, steps } = runRSA(p, q, e, message, mode);
    
    UI.showResult(result);
    UI.renderSteps(steps);
    UI.showMessage("RSA işlemi başarıyla tamamlandı.", "success");
}

function handleDH() {
    const p = parseInt(document.getElementById('dh-p').value, 10);
    const g = parseInt(document.getElementById('dh-g').value, 10);
    const a = parseInt(document.getElementById('dh-a').value, 10);
    const b = parseInt(document.getElementById('dh-b').value, 10);

    if (!p || !g || !a || !b) {
        throw new Error("Lütfen tüm Diffie-Hellman alanlarını doldurunuz.");
    }

    const { K1, K2, isMatch, steps, info } = runDiffieHellman(p, g, a, b);
    
    if (isMatch) {
        UI.showResult(`Ortak Anahtar: ${K1}\n\n${info}`);
        UI.showMessage("Ortak anahtar başarıyla eşleşti.", "success");
    } else {
        UI.showResult("Anahtarlar eşleşmedi.");
    }
    
    UI.renderSteps(steps);
}

function handleVigenere() {
    const text = document.getElementById('vig-text').value;
    const key = document.getElementById('vig-key').value;
    const mode = document.getElementById('vig-mode').value;
    const alphabet = document.getElementById('vig-alphabet').value;

    const { result, steps, alphabetLength } = runVigenere(text, key, alphabet, mode);
    
    UI.showResult(result);
    UI.renderVigenereSteps(steps, alphabetLength);
    UI.showMessage("Vigenère işlemi başarıyla tamamlandı.", "success");
}

function handleCaesar() {
    const text = document.getElementById('caesar-text').value;
    const shift = document.getElementById('caesar-shift').value;
    const mode = document.getElementById('caesar-mode').value;
    const alphabet = document.getElementById('caesar-alphabet').value;

    const { result, steps } = runCaesar(text, shift, alphabet, mode);
    
    UI.showResult(result);
    UI.renderCaesarSteps(steps);
    UI.showMessage("Sezar işlemi başarıyla tamamlandı.", "success");
}

function handleROT13() {
    const text = document.getElementById('rot13-text').value;

    const { result, steps } = runROT13(text);
    
    UI.showResult(result);
    UI.renderROT13Steps(steps);
    UI.showMessage("ROT13 işlemi başarıyla tamamlandı.", "success");
}

function handleAtbash() {
    const text = document.getElementById('atbash-text').value;
    const alphabet = document.getElementById('atbash-alphabet').value;

    const { result, steps, normalAlphabet, reversedAlphabet } = runAtbash(text, alphabet);
    
    UI.showResult(result);
    UI.renderAtbashSteps(steps, normalAlphabet, reversedAlphabet);
    UI.showMessage("Atbash işlemi başarıyla tamamlandı.", "success");
}

function handleAffine() {
    const text = document.getElementById('affine-text').value;
    const a = document.getElementById('affine-a').value;
    const b = document.getElementById('affine-b').value;
    const mode = document.getElementById('affine-mode').value;
    const alphabet = document.getElementById('affine-alphabet').value;

    const { result, steps, m, gcdVal, aInv } = runAffine(text, a, b, alphabet, mode);
    
    UI.showResult(result);
    UI.renderAffineSteps(steps, m, gcdVal, aInv);
    UI.showMessage("Affine işlemi başarıyla tamamlandı.", "success");
}

function handleRailFence() {
    const text = document.getElementById('railfence-text').value;
    const rails = document.getElementById('railfence-rails').value;
    const mode = document.getElementById('railfence-mode').value;

    const { result, matrix, rails: rCount } = runRailFence(text, rails, mode);
    
    UI.showResult(result);
    UI.renderRailFenceMatrix(matrix, rCount);
    UI.showMessage("Rail Fence işlemi başarıyla tamamlandı.", "success");
}

function handleColumnar() {
    const text = document.getElementById('columnar-text').value;
    const key = document.getElementById('columnar-key').value;
    const mode = document.getElementById('columnar-mode').value;
    const alphabet = document.getElementById('columnar-alphabet').value;

    const { result, matrix, keyInfo } = runColumnarTransposition(text, key, alphabet, mode);
    
    UI.showResult(result);
    UI.renderColumnarGrid(matrix, keyInfo);
    UI.showMessage("Sütunlu Transpozisyon işlemi başarıyla tamamlandı.", "success");
}

// --- Favoriler ve Arama Mantığı ---
const favoritesContainer = document.getElementById('favorites-container');
const categoryFavorites = document.getElementById('category-favorites');

function renderFavorites() {
    const favs = getFavorites();
    favoritesContainer.innerHTML = '';
    
    if (favs.length === 0) {
        categoryFavorites.style.display = 'none';
    } else {
        categoryFavorites.style.display = '';
        // Kapalıysa açsın mı? Plan gereği varsayılan açık gelir.
        
        favs.forEach(favId => {
            const algoInfo = ALGORITHM_CATALOG.find(a => a.id === favId);
            if (!algoInfo) return; // Eski/geçersiz id'ler yoksayılır
            
            const wrapper = document.createElement('div');
            wrapper.className = 'algo-card-wrapper';
            wrapper.setAttribute('data-algo-id', algoInfo.id);
            
            const btn = document.createElement('button');
            btn.className = 'algo-card-btn';
            if (currentAlgorithm === algoInfo.id) btn.classList.add('active');
            btn.setAttribute('data-target', algoInfo.id);
            btn.textContent = algoInfo.name;
            btn.addEventListener('click', handleTabClick);
            
            const favBtn = document.createElement('button');
            favBtn.className = 'fav-btn active';
            favBtn.setAttribute('aria-label', 'Favorilerden Çıkar');
            favBtn.setAttribute('title', 'Favorilerden Çıkar');
            favBtn.textContent = '★';
            
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavState(algoInfo.id);
            });
            
            wrapper.appendChild(btn);
            wrapper.appendChild(favBtn);
            favoritesContainer.appendChild(wrapper);
        });
    }
}

function toggleFavState(algoId) {
    toggleFavorite(algoId);
    updateFavButtonsUI();
    renderFavorites();
}

function updateFavButtonsUI() {
    const allFavBtns = document.querySelectorAll('.category-selection > details:not(#category-favorites) .fav-btn');
    allFavBtns.forEach(btn => {
        const wrapper = btn.closest('.algo-card-wrapper');
        const algoId = wrapper.getAttribute('data-algo-id');
        
        if (isFavorite(algoId)) {
            btn.classList.add('active');
            btn.textContent = '★';
            btn.setAttribute('aria-label', 'Favorilerden Çıkar');
            btn.setAttribute('title', 'Favorilerden Çıkar');
        } else {
            btn.classList.remove('active');
            btn.textContent = '☆';
            btn.setAttribute('aria-label', 'Favoriye Ekle');
            btn.setAttribute('title', 'Favoriye Ekle');
        }
    });
}

// Orijinal kategorilerdeki fav-btn tıklamalarını dinle
document.querySelectorAll('.category-selection > details:not(#category-favorites) .fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Butonun algo seçimini tetiklemesini engelle
        const wrapper = e.currentTarget.closest('.algo-card-wrapper');
        const algoId = wrapper.getAttribute('data-algo-id');
        toggleFavState(algoId);
    });
});

const searchInput = document.getElementById('algo-search-input');
const btnSearchClear = document.getElementById('btn-search-clear');
const searchNoResults = document.getElementById('search-no-results');
const allWrappers = document.querySelectorAll('.category-selection > details:not(#category-favorites) .algo-card-wrapper');
const allCategories = document.querySelectorAll('.category-selection > details:not(#category-favorites)');

function handleSearch(query) {
    if (!query) {
        // Arama temizlendi
        btnSearchClear.style.display = 'none';
        searchNoResults.style.display = 'none';
        allWrappers.forEach(w => w.style.display = '');
        allCategories.forEach(c => c.style.display = '');
        return;
    }
    
    btnSearchClear.style.display = 'inline-block';
    const matchedIds = searchAlgorithms(query);
    
    if (matchedIds.length === 0) {
        allCategories.forEach(c => c.style.display = 'none');
        searchNoResults.style.display = 'block';
    } else {
        searchNoResults.style.display = 'none';
        allCategories.forEach(category => {
            let hasMatch = false;
            const wrappers = category.querySelectorAll('.algo-card-wrapper');
            wrappers.forEach(w => {
                const id = w.getAttribute('data-algo-id');
                if (matchedIds.includes(id)) {
                    w.style.display = '';
                    hasMatch = true;
                } else {
                    w.style.display = 'none';
                }
            });
            category.style.display = hasMatch ? '' : 'none';
            if (matchedIds.length === 1 && hasMatch) {
                category.open = true;
            }
        });
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            handleSearch('');
        }
    });
}

if (btnSearchClear) {
    btnSearchClear.addEventListener('click', () => {
        searchInput.value = '';
        handleSearch('');
        searchInput.focus();
    });
}

// Başlangıçta Favorileri Yükle
renderFavorites();
updateFavButtonsUI();

