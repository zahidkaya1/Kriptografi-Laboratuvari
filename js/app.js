import { runRSA } from './algorithms/rsa.js';
import { runDiffieHellman } from './algorithms/diffie-hellman.js';
import { runVigenere } from './algorithms/vigenere.js';
import * as UI from './utils/ui.js';

let currentAlgorithm = 'rsa';

// Tab Değiştirme
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Tab aktifliği
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
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
    
    // İnputları sıfırlamıyoruz (kullanıcı kolaylığı), ama isterseniz value'ları silebilirsiniz.
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
