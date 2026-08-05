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


export function renderAffineSteps(steps, m, gcdVal, aInv) {
    stepsOutput.innerHTML = '';
    
    const headerDiv = document.createElement('div');
    headerDiv.style.marginBottom = "1rem";
    headerDiv.style.fontFamily = "monospace";
    headerDiv.style.fontSize = "0.95rem";
    headerDiv.innerHTML = `
        <strong>Alfabe Uzunluğu (m):</strong> ${m}<br>
        <strong>EBOB(a, m):</strong> ${gcdVal}<br>
        <strong>Modüler Ters (a⁻¹):</strong> ${aInv}
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
            <th>Giriş İndeksi</th>
            <th>Kullanılan Formül</th>
            <th>Sonuç İndeksi</th>
            <th>Sonuç Karakteri</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    steps.forEach(s => {
        const tr = document.createElement('tr');
        
        const tdChar = document.createElement('td');
        tdChar.textContent = s.textChar;
        
        const tdIdx = document.createElement('td');
        tdIdx.textContent = s.textIdx !== undefined ? s.textIdx : '-';
        
        const tdOp = document.createElement('td');
        tdOp.textContent = s.operation || '-';
        
        const tdResIdx = document.createElement('td');
        tdResIdx.textContent = s.resultIdx !== undefined ? s.resultIdx : '-';
        
        const tdResChar = document.createElement('td');
        const strong = document.createElement('strong');
        strong.textContent = s.resultChar;
        tdResChar.appendChild(strong);
        
        tr.appendChild(tdChar);
        tr.appendChild(tdIdx);
        tr.appendChild(tdOp);
        tr.appendChild(tdResIdx);
        tr.appendChild(tdResChar);
        
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    stepsOutput.appendChild(table);
}

export function renderRailFenceMatrix(matrix, rails) {
    stepsOutput.innerHTML = '';
    
    const info = document.createElement('p');
    info.className = 'text-muted';
    info.style.marginBottom = "1rem";
    info.textContent = 'Zikzak Şeması (· işareti boşluğu temsil eder):';
    stepsOutput.appendChild(info);

    const table = document.createElement('table');
    table.className = 'step-table';
    table.style.fontFamily = "monospace";
    table.style.fontSize = "1.1rem";
    
    const tbody = document.createElement('tbody');
    
    for (let r = 0; r < rails; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < matrix[r].length; c++) {
            const td = document.createElement('td');
            td.style.padding = "0.25rem 0.5rem";
            
            const cellVal = matrix[r][c];
            if (cellVal === null || cellVal === '') {
                td.textContent = '·';
                td.style.color = "var(--text-muted)";
                td.style.opacity = "0.3";
            } else {
                td.textContent = cellVal;
                td.style.fontWeight = "bold";
                td.style.color = "var(--primary-color)";
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
    table.appendChild(tbody);
    stepsOutput.appendChild(table);
}

export function renderColumnarGrid(matrix, keyInfo) {
    stepsOutput.innerHTML = '';
    
    const info = document.createElement('p');
    info.className = 'text-muted';
    info.style.marginBottom = "1rem";
    info.textContent = 'Sütun Sıralaması (Anahtar harflerine göre alfabetik sıra):';
    stepsOutput.appendChild(info);

    if (!matrix || matrix.length === 0) return;

    const table = document.createElement('table');
    table.className = 'step-table';
    table.style.fontFamily = "monospace";
    table.style.fontSize = "1rem";
    
    const thead = document.createElement('thead');
    
    // Satır 1: Anahtar harfleri
    const trKey = document.createElement('tr');
    // Satır 2: Okuma sırası
    const trOrder = document.createElement('tr');
    
    keyInfo.forEach(k => {
        const thKey = document.createElement('th');
        thKey.textContent = k.char;
        trKey.appendChild(thKey);
        
        const thOrder = document.createElement('th');
        thOrder.textContent = k.order + ".";
        thOrder.style.backgroundColor = "var(--bg-color)";
        thOrder.style.color = "var(--primary-color)";
        trOrder.appendChild(thOrder);
    });
    
    thead.appendChild(trKey);
    thead.appendChild(trOrder);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    
    for (let r = 0; r < matrix.length; r++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < matrix[r].length; c++) {
            const td = document.createElement('td');
            const cellVal = matrix[r][c];
            if (cellVal === null || cellVal === '') {
                td.textContent = '';
                td.style.backgroundColor = "var(--border-color)";
                td.style.opacity = "0.5";
            } else {
                td.textContent = cellVal;
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    
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
