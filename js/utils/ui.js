/**
 * UI (Kullanıcı Arayüzü) yardımcı fonksiyonları
 */

const messageArea = document.getElementById('message-area');
const resultOutput = document.getElementById('result-output');
const stepsOutput = document.getElementById('steps-output');

export function showMessage(msg, type = "error") {
    messageArea.textContent = msg;
    messageArea.className = `message-area ${type}`;
}

export function hideMessage() {
    messageArea.style.display = 'none';
    messageArea.className = 'message-area';
}

export function showResult(result) {
    resultOutput.textContent = result;
}

export function clearResult() {
    resultOutput.textContent = "Hesaplama sonucu burada görünecek...";
}

export function renderSteps(steps) {
    stepsOutput.innerHTML = '';
    
    if (!steps || steps.length === 0) {
        stepsOutput.innerHTML = '<p class="text-muted">Adım bulunamadı.</p>';
        return;
    }

    steps.forEach(step => {
        const div = document.createElement('div');
        div.className = 'step-item';
        div.textContent = step;
        stepsOutput.appendChild(div);
    });
}

export function renderVigenereSteps(steps, alphaLen) {
    stepsOutput.innerHTML = '';
    if (!steps || steps.length === 0) {
        stepsOutput.innerHTML = '<p class="text-muted">İşlem tablosu boş.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'vigenere-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Metin Harfi</th>
            <th>Anahtar Harfi</th>
            <th>Metin İndeksi</th>
            <th>Anahtar İndeksi</th>
            <th>İşlem (mod ${alphaLen})</th>
            <th>Sonuç Harfi</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    steps.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.textChar}</td>
            <td>${s.keyChar}</td>
            <td>${s.textIdx}</td>
            <td>${s.keyIdx}</td>
            <td>${s.operation}</td>
            <td><strong>${s.resultChar}</strong></td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    stepsOutput.appendChild(table);
}

export function clearSteps() {
    stepsOutput.innerHTML = '<p class="text-muted">Algoritmanın matematiksel adımları hesaplama sonrasında burada listelenir.</p>';
}

export function copyToClipboard(text) {
    if (!text || text.includes("Hesaplama sonucu")) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy');
        btn.textContent = "✅";
        setTimeout(() => btn.textContent = "📋", 2000);
    });
}
