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

let currentAlgorithm = 'rsa';

// Tab Değiştirme
document.querySelectorAll('.algo-card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Tab aktifliği
        document.querySelectorAll('.algo-card-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Form görünürlüğü
        currentAlgorithm = e.target.getAttribute('data-target');
        document.querySelectorAll('.algo-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${currentAlgorithm}-form`).classList.add('active');

        // Temizle
        clearAll();
    });
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

// Sezar Örneği Butonu
const btnCaesarExample = document.getElementById('btn-caesar-example');
if (btnCaesarExample) {
    btnCaesarExample.addEventListener('click', () => {
        document.getElementById('caesar-alphabet').value = 'EN';
        document.getElementById('caesar-mode').value = 'encrypt';
        document.getElementById('caesar-shift').value = '3';
        document.getElementById('caesar-text').value = 'ABC';
    });
}

// Affine Örneği Butonu
const btnAffineExample = document.getElementById('btn-affine-example');
if (btnAffineExample) {
    btnAffineExample.addEventListener('click', () => {
        document.getElementById('affine-alphabet').value = 'EN';
        document.getElementById('affine-mode').value = 'encrypt';
        document.getElementById('affine-a').value = '5';
        document.getElementById('affine-b').value = '8';
        document.getElementById('affine-text').value = 'AFFINECIPHER';
    });
}

// Rail Fence Örneği Butonu
const btnRailFenceExample = document.getElementById('btn-railfence-example');
if (btnRailFenceExample) {
    btnRailFenceExample.addEventListener('click', () => {
        document.getElementById('railfence-mode').value = 'encrypt';
        document.getElementById('railfence-rails').value = '3';
        document.getElementById('railfence-text').value = 'WEAREDISCOVEREDFLEEATONCE';
    });
}

// Columnar Transposition Örneği Butonu
const btnColumnarExample = document.getElementById('btn-columnar-example');
if (btnColumnarExample) {
    btnColumnarExample.addEventListener('click', () => {
        document.getElementById('columnar-alphabet').value = 'TR';
        document.getElementById('columnar-mode').value = 'encrypt';
        document.getElementById('columnar-key').value = 'GIZLI';
        document.getElementById('columnar-text').value = 'KRIPTOGRAFI LABORATUVARI';
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
