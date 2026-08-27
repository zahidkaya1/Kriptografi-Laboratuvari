import { runRSA } from './algorithms/rsa.js';
import { runDiffieHellman } from './algorithms/diffie-hellman.js';
import { runVigenere } from './algorithms/vigenere.js';
import { runCaesar } from './algorithms/caesar.js';
import { runROT13 } from './algorithms/rot13.js';
import { runAtbash } from './algorithms/atbash.js';
import { runAffine } from './algorithms/affine.js';
import { runRailFence } from './algorithms/rail-fence.js';
import { runColumnarTransposition } from './algorithms/columnar-transposition.js';
import { runXOR } from './algorithms/xor.js';
import { runBase64 } from './encoding/base64.js';
import { runHash, compareHash } from './hashing/hash.js';
import { runPlayfair } from './algorithms/playfair.js';
import { runHill } from './algorithms/hill.js';
import { analyzeFrequency } from './analysis/frequency-analysis.js';
import { breakCaesar } from './analysis/caesar-breaker.js';
import { validateSelection, generateComparisonRows, generateMarkdownOutput, filterByCategory, getComparableAlgorithms } from './education/algorithm-comparison.js';
import { getProgress, resetProgress, recordAnswer } from './education/exercise-progress.js';
import { getRandomExercise, checkAnswer } from './education/exercises.js';
import { renderLearningUI } from './education/learning-ui.js';
import { renderQuizUI } from './education/quiz-ui.js';
import { renderEducationProgress } from './education/education-ui.js';
import * as UI from './utils/ui.js';
import { searchAlgorithms } from './utils/search.js';
import { getFavorites, toggleFavorite, isFavorite } from './utils/favorites.js';
import { ALGORITHM_CATALOG, getAlgoName } from './utils/algorithm-catalog.js';

let currentAlgorithm = 'rsa';

export function navigateTo(targetId) {
    const btn = document.querySelector(`.algo-card-btn[data-target="${targetId}"]`);
    if (btn) {
        btn.click();
    }
}

export function navigateHome() {
    const homeView = document.getElementById('home-view');
    if (homeView) homeView.style.display = 'block';

    const homeIntro = document.getElementById('home-intro');
    if (homeIntro) homeIntro.style.display = 'block';

    const workspaceView = document.getElementById('workspace-view');
    if (workspaceView) workspaceView.style.display = 'none';

    if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (homeIntro) {
        homeIntro.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('.algo-card-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.algo-form').forEach(f => f.classList.remove('active'));
}

export function handleDiscoverTools() {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Tab Değiştirme
function handleTabClick(e) {
    if (!e.target.classList.contains('algo-card-btn')) return;

    // Home View Gizle
    const homeView = document.getElementById('home-view');
    if (homeView) homeView.style.display = 'none';

    // Workspace View Göster
    const workspaceView = document.getElementById('workspace-view');
    if (workspaceView) workspaceView.style.display = 'block';

    // Viewport'u en üste al
    if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

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

    // Panel görünümlerini güncelle
    updatePanelVisibility(targetId);
}

// Geri Dön Butonu Event Listener
const btnBackHome = document.getElementById('btn-back-home');
if (btnBackHome) {
    btnBackHome.addEventListener('click', (e) => {
        e.preventDefault();
        navigateHome();
    });
}

function updatePanelVisibility(algoId) {
    const actions = document.querySelector('.actions');
    const btnExample = document.getElementById('btn-example');
    const btnCalculate = document.getElementById('btn-calculate');
    const btnClear = document.getElementById('btn-clear');
    const outputSection = document.querySelector('.output-section');
    const stepsCard = document.querySelector('.steps-card');
    const btnCopy = document.getElementById('btn-copy');
    const contentWrapper = document.querySelector('.content-wrapper');

    if(actions) actions.style.display = '';
    if(btnExample) {
        btnExample.style.display = '';
        btnExample.textContent = 'Örneği Doldur';
    }
    if(btnCalculate) {
        btnCalculate.style.display = '';
        btnCalculate.textContent = 'Hesapla / İşle';
    }
    if(btnClear) {
        btnClear.style.display = '';
        btnClear.textContent = 'Temizle';
    }
    if(outputSection) outputSection.style.display = '';
    if(stepsCard) stepsCard.style.display = '';
    if(btnCopy) btnCopy.style.display = '';
    if(contentWrapper) contentWrapper.style.gridTemplateColumns = '';

    if (algoId === 'exercises') {
        if(actions) actions.style.display = 'none';
        if(outputSection) outputSection.style.display = 'none';
        if(contentWrapper) contentWrapper.style.gridTemplateColumns = '1fr';
    } else if (algoId === 'guided-learning') {
        if(actions) actions.style.display = 'none';
        if(outputSection) outputSection.style.display = 'none';
        if(contentWrapper) contentWrapper.style.gridTemplateColumns = '1fr';
        renderLearningUI({ navigateTo });
    } else if (algoId === 'mixed-quiz') {
        if(actions) actions.style.display = 'none';
        if(outputSection) outputSection.style.display = 'none';
        if(contentWrapper) contentWrapper.style.gridTemplateColumns = '1fr';
        renderQuizUI('mixed-quiz-content');
    } else if (algoId === 'education-progress') {
        if(actions) actions.style.display = 'none';
        if(outputSection) outputSection.style.display = 'none';
        if(contentWrapper) contentWrapper.style.gridTemplateColumns = '1fr';
        renderEducationProgress('education-progress-content', { navigateTo });
    } else if (algoId === 'algo-compare') {
        if(btnExample) btnExample.textContent = 'Örnek Karşılaştırmayı Doldur';
        if(btnCalculate) btnCalculate.textContent = 'Karşılaştır';
        if(btnClear) btnClear.textContent = 'Seçimi Temizle';
        if(stepsCard) stepsCard.style.display = 'none';
        if(contentWrapper) contentWrapper.style.gridTemplateColumns = '1fr';
    } else if (algoId === 'freq-analysis') {
        if(btnCalculate) btnCalculate.textContent = 'Analiz Et';
        if(stepsCard) stepsCard.style.display = 'none';
    } else if (algoId === 'caesar-breaker') {
        if(btnCalculate) btnCalculate.textContent = 'Tüm Olasılıkları Göster';
        if(btnCopy) btnCopy.style.display = 'none';
        if(stepsCard) stepsCard.style.display = 'none';
    } else if (algoId === 'base64') {
        if(stepsCard) stepsCard.style.display = 'none';
    } else if (algoId === 'hash') {
        if(stepsCard) stepsCard.style.display = 'none';
    }
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
document.getElementById('btn-calculate').addEventListener('click', async () => {
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
        } else if (currentAlgorithm === 'freq-analysis') {
            handleFreqAnalysis();
        } else if (currentAlgorithm === 'caesar-breaker') {
            handleCaesarBreaker();
        } else if (currentAlgorithm === 'algo-compare') {
            handleAlgoCompare();
        } else if (currentAlgorithm === 'xor') {
            handleXOR();
        } else if (currentAlgorithm === 'base64') {
            handleBase64();
        } else if (currentAlgorithm === 'hash') {
            await handleHash();
        } else if (currentAlgorithm === 'playfair') {
            handlePlayfair();
        } else if (currentAlgorithm === 'hill') {
            handleHill();
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
        } else if (currentAlgorithm === 'xor') {
            document.getElementById('xor-mode').value = 'encrypt';
            document.getElementById('xor-key').value = 'ANAHTAR';
            document.getElementById('xor-text').value = 'GIZLIMETIN';
        } else if (currentAlgorithm === 'base64') {
            document.getElementById('base64-mode').value = 'encode';
            document.getElementById('base64-text').value = 'Merhaba Dünya';
        } else if (currentAlgorithm === 'playfair') {
            document.getElementById('playfair-text').value = 'HIDE THE GOLD IN THE TREE STUMP';
            document.getElementById('playfair-key').value = 'PLAYFAIR EXAMPLE';
        } else if (currentAlgorithm === 'hill') {
            document.getElementById('hill-text').value = 'HELP';
            document.getElementById('hill-a').value = '3';
            document.getElementById('hill-b').value = '3';
            document.getElementById('hill-c').value = '2';
            document.getElementById('hill-d').value = '5';
            document.getElementById('hill-alphabet').value = 'EN';
        } else if (currentAlgorithm === 'hash') {
            document.getElementById('hash-algorithm').value = 'SHA-256';
            document.getElementById('hash-text').value = 'Gizli Şifre 123';
            document.getElementById('hash-compare').value = '';
        } else if (currentAlgorithm === 'freq-analysis') {
            document.getElementById('freq-alphabet').value = 'TR';
            document.getElementById('freq-sort').value = 'frequency';
            const el = document.getElementById('freq-text');
            el.value = 'KRİPTOGRAFİ LABORATUVARI';
            updateCounter('freq-text', 'freq-text-counter');
        } else if (currentAlgorithm === 'caesar-breaker') {
            document.getElementById('breaker-alphabet').value = 'EN';
            document.getElementById('breaker-sort').value = 'score';
            const el = document.getElementById('breaker-text');
            el.value = 'KHOOR ZRUOG';
            updateCounter('breaker-text', 'breaker-text-counter');
        } else if (currentAlgorithm === 'algo-compare') {
            // Default selection: RSA, Vigenere, Rail Fence
            document.querySelectorAll('#compare-selection-container input[type="checkbox"]').forEach(cb => {
                if (['rsa', 'vigenere', 'railfence'].includes(cb.value)) {
                    cb.checked = true;
                } else {
                    cb.checked = false;
                }
            });
            document.getElementById('compare-diff-only').checked = false;
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

function handleXOR() {
    const text = document.getElementById('xor-text').value;
    const key = document.getElementById('xor-key').value;
    const mode = document.getElementById('xor-mode').value;

    const { result, steps } = runXOR(text, key, mode);

    UI.showResult(result);
    UI.renderSteps(steps);
    UI.showMessage("XOR işlemi başarıyla tamamlandı.", "success");
}

function handleBase64() {
    const text = document.getElementById('base64-text').value;
    const mode = document.getElementById('base64-mode').value;

    const { result, steps } = runBase64(text, mode);

    UI.showResult(result);
    UI.renderSteps(steps);
    UI.showMessage("Base64 işlemi başarıyla tamamlandı.", "success");
}

async function handleHash() {
    const text = document.getElementById('hash-text').value;
    const algorithm = document.getElementById('hash-algorithm').value;
    const compareHex = document.getElementById('hash-compare').value;

    const { result, steps } = await runHash(text, algorithm);

    let finalResult = result;
    if (compareHex.trim()) {
        if (compareHash(result, compareHex)) {
            finalResult = `${result}\n\n[ EŞLEŞİYOR ] Girilen hash değeri eşleşiyor.`;
            UI.showMessage("Hash değerleri eşleşti.", "success");
        } else {
            finalResult = `${result}\n\n[ EŞLEŞMİYOR ] Girilen hash değeri eşleşmiyor!`;
            UI.showMessage("Hash değerleri eşleşmiyor.", "warning");
        }
    } else {
        UI.showMessage("Hash işlemi başarıyla tamamlandı.", "success");
    }

    UI.showResult(finalResult);
    UI.renderSteps(steps);
}

function handlePlayfair() {
    const text = document.getElementById('playfair-text').value;
    const key = document.getElementById('playfair-key').value;
    const mode = document.getElementById('playfair-mode').value;

    const { result, steps, grid } = runPlayfair(text, key, mode);

    UI.showResult(result);
    UI.renderSteps(steps);
    UI.showMessage("Playfair işlemi başarıyla tamamlandı.", "success");
}

function handleHill() {
    const text = document.getElementById('hill-text').value;
    const a = document.getElementById('hill-a').value;
    const b = document.getElementById('hill-b').value;
    const c = document.getElementById('hill-c').value;
    const d = document.getElementById('hill-d').value;
    const alphabet = document.getElementById('hill-alphabet').value;
    const mode = document.getElementById('hill-mode').value;

    const { result, steps } = runHill(text, a, b, c, d, alphabet, mode);

    UI.showResult(result);
    UI.renderSteps(steps);
    UI.showMessage("Hill işlemi başarıyla tamamlandı.", "success");
}

function handleFreqAnalysis() {
    const text = document.getElementById('freq-text').value;
    const alphabet = document.getElementById('freq-alphabet').value;
    const sort = document.getElementById('freq-sort').value;

    const result = analyzeFrequency(text, alphabet);
    UI.renderFrequencyAnalysis(result, sort);
    UI.showMessage("Frekans analizi başarıyla tamamlandı.", "success");
}

function handleCaesarBreaker() {
    const text = document.getElementById('breaker-text').value;
    const alphabet = document.getElementById('breaker-alphabet').value;
    const sort = document.getElementById('breaker-sort').value;

    const result = breakCaesar(text, alphabet);

    const openCaesarCb = (shiftVal, ciphertext) => {
        // Tab click trigger
        const caesarBtn = document.querySelector('.algo-card-btn[data-target="caesar"]');
        if (caesarBtn) caesarBtn.click();

        // Fill form
        document.getElementById('caesar-alphabet').value = alphabet;
        document.getElementById('caesar-mode').value = 'decrypt';
        document.getElementById('caesar-shift').value = shiftVal;
        document.getElementById('caesar-text').value = text; // Original cipher text

        // Auto calculate
        const calcBtn = document.getElementById('btn-calculate');
        if (calcBtn) calcBtn.click();
    };

    UI.renderCaesarCandidates(result, sort, openCaesarCb);
    UI.showMessage("Sezar şifresi kırma işlemi başarıyla tamamlandı.", "success");
}

function handleAlgoCompare() {
    const checkboxes = document.querySelectorAll('#compare-selection-container input[type="checkbox"]:checked');
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);
    const diffOnly = document.getElementById('compare-diff-only').checked;

    const validIds = validateSelection(selectedIds);
    const { headers, rows } = generateComparisonRows(validIds, diffOnly);

    const openToolCb = (algoName) => {
        const found = ALGORITHM_CATALOG.find(a => a.name === algoName);
        if (found) {
            const btn = document.querySelector(`.algo-card-btn[data-target="${found.id}"]`);
            if (btn) btn.click();
        }
    };

    UI.renderComparisonTable(headers, rows, openToolCb);

    // Override copy button logic specifically for comparison
    const md = generateMarkdownOutput(validIds, diffOnly);
    const copyBtn = document.getElementById('btn-copy');
    // We bind a temporary data attribute so we know it's a markdown copy
    copyBtn.setAttribute('data-md-copy', md);
    UI.showMessage("Karşılaştırma tablosu oluşturuldu.", "success");
}

// Override Copy behavior to support markdown from compare
document.getElementById('btn-copy').addEventListener('click', (e) => {
    // Prevent the default global click which is added somewhere else by replacing its content
    // Actually the previous listener just reads textContent. But if data-md-copy exists, we prefer it.
    const mdText = e.currentTarget.getAttribute('data-md-copy');
    if (mdText && currentAlgorithm === 'algo-compare') {
        UI.copyToClipboard(mdText);
        e.stopImmediatePropagation();
    }
});

// Karakter Sayacı Mantığı
function updateCounter(inputId, counterId) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    if (input && counter) {
        counter.textContent = `${input.value.length} / 10000`;
    }
}

['freq-text', 'breaker-text'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', () => updateCounter(id, `${id}-counter`));
    }
});

// --- Favoriler ve Arama Mantığı ---
const favoritesContainer = document.getElementById('favorites-container');
const categoryFavorites = document.getElementById('category-favorites');

export function renderFavorites() {
    const favs = getFavorites();
    favoritesContainer.innerHTML = '';

    if (favs.length === 0) {
        categoryFavorites.style.display = '';
        favoritesContainer.innerHTML = '<div class="empty-state text-muted" style="padding: 1rem; font-size: 0.95rem; font-style: italic;">Henüz favori aracınız yok. Sık kullandığınız araçları yıldızlayarak (☆) burada hızlıca erişebilirsiniz.</div>';
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
// --- Algoritma Karşılaştırma Başlangıç ---
function renderCompareSelection(filter = 'all') {
    const container = document.getElementById('compare-selection-container');
    if (!container) return;
    container.innerHTML = '';

    const algos = filterByCategory(filter);

    algos.forEach(a => {
        const label = document.createElement('label');
        label.className = 'checkbox-item';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = a.id;

        const text = document.createElement('span');
        text.textContent = a.name;

        label.appendChild(input);
        label.appendChild(text);
        container.appendChild(label);
    });
}

const compareFilterSelect = document.getElementById('compare-filter');
if (compareFilterSelect) {
    compareFilterSelect.addEventListener('change', (e) => {
        const selectedValues = Array.from(document.querySelectorAll('#compare-selection-container input:checked')).map(i => i.value);
        renderCompareSelection(e.target.value);

        // Yeniden render ettikten sonra önceki seçimleri koru
        document.querySelectorAll('#compare-selection-container input').forEach(input => {
            if (selectedValues.includes(input.value)) {
                input.checked = true;
            }
        });
    });
}
renderCompareSelection('all'); // Başlangıç render

// --- Mini Alıştırmalar Başlangıç ---
let currentExercise = null;

function loadExerciseProgress() {
    const p = getProgress();
    const sc = document.getElementById('ex-stat-correct');
    const sw = document.getElementById('ex-stat-wrong');
    const ss = document.getElementById('ex-stat-streak');
    if (sc) sc.textContent = p.totalCorrect;
    if (sw) sw.textContent = p.totalWrong;
    if (ss) ss.textContent = p.currentStreak;
}

function renderNewExercise() {
    const cat = document.getElementById('exercise-category').value;
    const diff = document.getElementById('exercise-difficulty').value;

    currentExercise = getRandomExercise(cat, diff);

    const area = document.getElementById('exercise-question-area');
    const feedback = document.getElementById('ex-feedback');
    const btnSubmit = document.getElementById('btn-ex-submit');
    const btnNext = document.getElementById('btn-ex-next');
    const btnHint = document.getElementById('btn-ex-hint');
    const btnSolve = document.getElementById('btn-ex-solve');

    if (!currentExercise) {
        area.style.display = 'block';
        document.getElementById('ex-title').textContent = "Soru Bulunamadı";
        document.getElementById('ex-text').textContent = "Bu filtreye uygun soru kalmadı veya sistemde yok. Lütfen filtreleri değiştirin.";
        document.getElementById('ex-input-container').innerHTML = '';
        feedback.style.display = 'none';
        btnSubmit.style.display = 'none';
        btnHint.style.display = 'none';
        btnSolve.style.display = 'none';
        btnNext.style.display = 'none';
        return;
    }

    area.style.display = 'block';

    let exTitle = currentExercise.title;
    if (!exTitle) {
        exTitle = getAlgoName(currentExercise.algoId);
    }
    const diffMap = { 'easy': 'Kolay', 'medium': 'Orta', 'hard': 'Zor' };
    const diffText = diffMap[currentExercise.difficulty] || currentExercise.difficulty;

    document.getElementById('ex-title').textContent = `${exTitle} (${diffText})`;
    document.getElementById('ex-text').textContent = currentExercise.question || currentExercise.text || '';

    UI.renderExerciseForm(currentExercise, 'ex-input-container');

    feedback.style.display = 'none';
    feedback.className = '';

    btnSubmit.style.display = 'inline-block';
    btnHint.style.display = 'inline-block';
    btnSolve.style.display = 'inline-block';
    btnNext.style.display = 'none';

    // Temizle sonucu
    UI.clearResult();
    UI.clearSteps();

    loadExerciseProgress();
}

// Global olarak tetiklenmesini engellemek için butonları "click" eventi ile bağlayalım
document.getElementById('btn-ex-submit')?.addEventListener('click', () => {
    if (!currentExercise) return;
    const feedback = document.getElementById('ex-feedback');

    let userAnswer = '';
    if (currentExercise.type === 'text') {
        userAnswer = document.getElementById('ex-answer-input').value;
    } else {
        const checked = document.querySelector('input[name="ex-answer"]:checked');
        if (checked) userAnswer = checked.value;
    }

    try {
        const isCorrect = checkAnswer(currentExercise, userAnswer);
        if (isCorrect) {
            feedback.style.display = 'block';
            feedback.className = 'exercise-correct-highlight';
            feedback.innerHTML = `<strong>Tebrikler, doğru!</strong><br><small>${currentExercise.explanation}</small>`;
            recordAnswer(true, currentExercise.algoId);
            document.getElementById('btn-ex-submit').style.display = 'none';
            document.getElementById('btn-ex-solve').style.display = 'none';
            document.getElementById('btn-ex-hint').style.display = 'none';
            document.getElementById('btn-ex-next').style.display = 'inline-block';

            // Eğer radio ise yeşil yap
            const checkedLabel = document.querySelector('input[name="ex-answer"]:checked')?.parentElement;
            if (checkedLabel) checkedLabel.classList.add('exercise-correct-highlight');
        } else {
            feedback.style.display = 'block';
            feedback.className = 'exercise-wrong-highlight';
            feedback.innerHTML = `<strong>Yanlış cevap.</strong> Tekrar deneyin.`;
            recordAnswer(false, currentExercise.algoId);

            const checkedLabel = document.querySelector('input[name="ex-answer"]:checked')?.parentElement;
            if (checkedLabel) {
                checkedLabel.classList.add('exercise-wrong-highlight');
                setTimeout(() => checkedLabel.classList.remove('exercise-wrong-highlight'), 1000);
            }
        }
        loadExerciseProgress();
    } catch (e) {
        UI.showMessage(e.message, "error");
    }
});

document.getElementById('btn-ex-hint')?.addEventListener('click', () => {
    if (!currentExercise) return;
    const feedback = document.getElementById('ex-feedback');
    feedback.style.display = 'block';
    feedback.className = '';
    feedback.style.backgroundColor = 'var(--secondary-color)';
    feedback.style.border = '1px solid var(--primary-color)';
    feedback.innerHTML = `<strong>İpucu:</strong> ${currentExercise.hint}`;
});

document.getElementById('btn-ex-solve')?.addEventListener('click', () => {
    if (!currentExercise) return;
    const feedback = document.getElementById('ex-feedback');
    feedback.style.display = 'block';
    feedback.className = 'exercise-correct-highlight';
    feedback.innerHTML = `<strong>Çözüm:</strong> ${currentExercise.answer}<br><small>${currentExercise.explanation}</small>`;

    document.getElementById('btn-ex-submit').style.display = 'none';
    document.getElementById('btn-ex-solve').style.display = 'none';
    document.getElementById('btn-ex-hint').style.display = 'none';
    document.getElementById('btn-ex-next').style.display = 'inline-block';
    // Çözümü gösterdikten sonra recordAnswer kullanmıyoruz, istatistik artmıyor.
});

document.getElementById('btn-ex-next')?.addEventListener('click', () => {
    renderNewExercise();
});

document.getElementById('btn-ex-reset-progress')?.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.dataset.confirm === 'true') {
        resetProgress();
        loadExerciseProgress();
        UI.showMessage("İlerlemeniz sıfırlandı.", "success");
        btn.textContent = 'İlerlemeyi Sıfırla';
        btn.dataset.confirm = 'false';
    } else {
        btn.dataset.originalText = btn.textContent;
        btn.textContent = 'Emin misiniz? (Tıklayın)';
        btn.dataset.confirm = 'true';
        setTimeout(() => {
            if (btn.dataset.confirm === 'true') {
                btn.textContent = btn.dataset.originalText || 'İlerlemeyi Sıfırla';
                btn.dataset.confirm = 'false';
            }
        }, 3000);
    }
});

// Select değişiminde soruyu resetlemek veya yüklemek istersen:
document.getElementById('exercise-category')?.addEventListener('change', renderNewExercise);
document.getElementById('exercise-difficulty')?.addEventListener('change', renderNewExercise);

// İlk yükleme
loadExerciseProgress();
renderNewExercise();
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

// Başlangıçta panelleri senkronize et
updatePanelVisibility(currentAlgorithm);

// Ana Sayfa / Logo Tıklama
const logoHome = document.getElementById('logo-home');
if (logoHome) {
    logoHome.addEventListener('click', (e) => {
        e.preventDefault();
        navigateHome();
    });
}

// Hero Butonları
const btnHeroLearn = document.getElementById('btn-hero-learn');
if (btnHeroLearn) {
    btnHeroLearn.addEventListener('click', () => navigateTo('guided-learning'));
}

const btnHeroDiscover = document.getElementById('btn-hero-discover');
if (btnHeroDiscover) {
    btnHeroDiscover.addEventListener('click', handleDiscoverTools);
}

const btnHeroQuiz = document.getElementById('btn-hero-quiz');
if (btnHeroQuiz) {
    btnHeroQuiz.addEventListener('click', () => navigateTo('mixed-quiz'));
}
