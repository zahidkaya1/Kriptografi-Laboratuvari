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
    table.className = 'step-table';
    
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

export function renderCaesarSteps(steps) {
    stepsOutput.innerHTML = '';
    if (!steps || steps.length === 0) {
        stepsOutput.innerHTML = '<p class="text-muted">İşlem tablosu boş.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Giriş Karakteri</th>
            <th>Karakter İndeksi</th>
            <th>Kaydırma Miktarı</th>
            <th>İşlem</th>
            <th>Sonuç İndeksi</th>
            <th>Sonuç Karakteri</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    steps.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.textChar}</td>
            <td>${s.textIdx !== undefined ? s.textIdx : '-'}</td>
            <td>${s.shift !== undefined ? s.shift : '-'}</td>
            <td>${s.operation || '-'}</td>
            <td>${s.resultIdx !== undefined ? s.resultIdx : '-'}</td>
            <td><strong>${s.resultChar}</strong></td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    stepsOutput.appendChild(table);
}

export function renderROT13Steps(steps) {
    stepsOutput.innerHTML = '';
    if (!steps || steps.length === 0) {
        stepsOutput.innerHTML = '<p class="text-muted">İşlem tablosu boş.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Giriş Karakteri</th>
            <th>Karakter İndeksi</th>
            <th>Sabit Kaydırma</th>
            <th>Sonuç İndeksi</th>
            <th>Sonuç Karakteri</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    steps.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.textChar}</td>
            <td>${s.textIdx !== undefined ? s.textIdx : '-'}</td>
            <td>13</td>
            <td>${s.resultIdx !== undefined ? s.resultIdx : '-'}</td>
            <td><strong>${s.resultChar}</strong></td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    stepsOutput.appendChild(table);
}

export function renderAtbashSteps(steps, normalAlphabet, reversedAlphabet) {
    stepsOutput.innerHTML = '';
    
    const headerDiv = document.createElement('div');
    headerDiv.style.marginBottom = "1rem";
    headerDiv.style.fontFamily = "monospace";
    headerDiv.style.fontSize = "0.95rem";
    headerDiv.innerHTML = `
        <strong>Normal Alfabe:</strong> <span style="letter-spacing: 2px;">${normalAlphabet}</span><br>
        <strong>Ters Alfabe: &nbsp;</strong> <span style="letter-spacing: 2px;">${reversedAlphabet}</span>
    `;
    stepsOutput.appendChild(headerDiv);

    if (!steps || steps.length === 0) {
        const p = document.createElement('p');
        p.className = 'text-muted';
        p.textContent = 'İşlem tablosu boş.';
        stepsOutput.appendChild(p);
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Giriş Karakteri</th>
            <th>Sonuç Karakteri</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    steps.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${s.textChar}</td>
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
