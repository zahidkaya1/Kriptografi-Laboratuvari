/**
 * UI (KullanÄ±cÄ± ArayÃ¼zÃ¼) yardÄ±mcÄ± fonksiyonlarÄ±
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
    resultOutput.textContent = "Hesaplama sonucu burada gÃ¶rÃ¼necek...";
}

export function renderSteps(steps) {
    stepsOutput.innerHTML = '';
    
    if (!steps || steps.length === 0) {
        stepsOutput.innerHTML = '<p class="text-muted">AdÄ±m bulunamadÄ±.</p>';
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
        stepsOutput.innerHTML = '<p class="text-muted">Ä°ÅŸlem tablosu boÅŸ.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Metin Harfi</th>
            <th>Anahtar Harfi</th>
            <th>Metin Ä°ndeksi</th>
            <th>Anahtar Ä°ndeksi</th>
            <th>Ä°ÅŸlem (mod ${alphaLen})</th>
            <th>SonuÃ§ Harfi</th>
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
        stepsOutput.innerHTML = '<p class="text-muted">Ä°ÅŸlem tablosu boÅŸ.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>GiriÅŸ Karakteri</th>
            <th>Karakter Ä°ndeksi</th>
            <th>KaydÄ±rma MiktarÄ±</th>
            <th>Ä°ÅŸlem</th>
            <th>SonuÃ§ Ä°ndeksi</th>
            <th>SonuÃ§ Karakteri</th>
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
        stepsOutput.innerHTML = '<p class="text-muted">Ä°ÅŸlem tablosu boÅŸ.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>GiriÅŸ Karakteri</th>
            <th>Karakter Ä°ndeksi</th>
            <th>Sabit KaydÄ±rma</th>
            <th>SonuÃ§ Ä°ndeksi</th>
            <th>SonuÃ§ Karakteri</th>
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
        p.textContent = 'Ä°ÅŸlem tablosu boÅŸ.';
        stepsOutput.appendChild(p);
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>GiriÅŸ Karakteri</th>
            <th>SonuÃ§ Karakteri</th>
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
        <strong>Alfabe UzunluÄŸu (m):</strong> ${m}<br>
        <strong>EBOB(a, m):</strong> ${gcdVal}<br>
        <strong>ModÃ¼ler Ters (aâ»Â¹):</strong> ${aInv}
    `;
    stepsOutput.appendChild(headerDiv);

    if (!steps || steps.length === 0) {
        const p = document.createElement('p');
        p.className = 'text-muted';
        p.textContent = 'Ä°ÅŸlem tablosu boÅŸ.';
        stepsOutput.appendChild(p);
        return;
    }

    const table = document.createElement('table');
    table.className = 'step-table';
    
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>GiriÅŸ Karakteri</th>
            <th>GiriÅŸ Ä°ndeksi</th>
            <th>KullanÄ±lan FormÃ¼l</th>
            <th>SonuÃ§ Ä°ndeksi</th>
            <th>SonuÃ§ Karakteri</th>
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
    info.textContent = 'Zikzak ÅemasÄ± (Â· iÅŸareti boÅŸluÄŸu temsil eder):';
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
                td.textContent = 'Â·';
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
    info.textContent = 'SÃ¼tun SÄ±ralamasÄ± (Anahtar harflerine gÃ¶re alfabetik sÄ±ra):';
    stepsOutput.appendChild(info);

    if (!matrix || matrix.length === 0) return;

    const table = document.createElement('table');
    table.className = 'step-table';
    table.style.fontFamily = "monospace";
    table.style.fontSize = "1rem";
    
    const thead = document.createElement('thead');
    
    // SatÄ±r 1: Anahtar harfleri
    const trKey = document.createElement('tr');
    // SatÄ±r 2: Okuma sÄ±rasÄ±
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
    stepsOutput.innerHTML = '<p class="text-muted">AlgoritmanÄ±n matematiksel adÄ±mlarÄ± hesaplama sonrasÄ±nda burada listelenir.</p>';
}

export function copyToClipboard(text) {
    if (!text || text.includes("Hesaplama sonucu")) {
        showMessage("Kopyalanacak sonuÃ§ bulunamadÄ±.", "error");
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy');
        btn.textContent = "âœ…";
        setTimeout(() => btn.textContent = "ğŸ“‹", 2000);
    }).catch(err => {
        showMessage("Panoya kopyalama baÅŸarÄ±sÄ±z oldu. LÃ¼tfen manuel kopyalayÄ±nÄ±z.", "error");
        console.error("Clipboard API Error:", err);
    });
}

export function renderFrequencyAnalysis(result, sortBy) {
    const { totalCharacters, totalLetters, distinctLetters, mostFrequent, leastFrequent, frequencyOrder, alphabetOrder } = result;

    resultOutput.innerHTML = '';
    
    // Summary Info
    const summaryDiv = document.createElement('div');
    summaryDiv.style.marginBottom = '1rem';
    summaryDiv.innerHTML = `
        <p><strong>Toplam Karakter:</strong> ${totalCharacters} | <strong>Toplam Harf:</strong> ${totalLetters} | <strong>FarklÄ± Harf:</strong> ${distinctLetters}</p>
        <p><strong>En SÄ±k:</strong> ${mostFrequent ? `${mostFrequent.char} (${mostFrequent.count} / %${mostFrequent.percent.toFixed(1)})` : '-'}</p>
        <p><strong>En Seyrek:</strong> ${leastFrequent ? `${leastFrequent.char} (${leastFrequent.count} / %${leastFrequent.percent.toFixed(1)})` : '-'}</p>
    `;
    resultOutput.appendChild(summaryDiv);

    // Bar Chart
    const chartDiv = document.createElement('div');
    chartDiv.className = 'bar-chart';

    const listToRender = sortBy === 'frequency' ? frequencyOrder : alphabetOrder;
    const maxCount = frequencyOrder[0] ? frequencyOrder[0].count : 1;

    listToRender.forEach(item => {
        const row = document.createElement('div');
        row.className = 'bar-row';
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = item.char;

        const container = document.createElement('div');
        container.className = 'bar-container';

        const fill = document.createElement('div');
        fill.className = 'bar-fill';
        const widthPercent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
        fill.style.width = `${widthPercent}%`;

        container.appendChild(fill);

        const val = document.createElement('div');
        val.className = 'bar-value';
        val.textContent = `${item.count} (%${item.percent.toFixed(1)})`;

        row.appendChild(label);
        row.appendChild(container);
        row.appendChild(val);

        chartDiv.appendChild(row);
    });

    resultOutput.appendChild(chartDiv);
}

export function renderCaesarCandidates(result, sortBy, openCaesarCallback) {
    resultOutput.innerHTML = '';

    if (result.letterCount < 20) {
        const warn = document.createElement('div');
        warn.className = 'text-muted';
        warn.style.marginBottom = '1rem';
        warn.style.color = '#f39c12';
        warn.textContent = "UyarÄ±: Metin kÄ±sa olduÄŸu iÃ§in olasÄ±lÄ±k sÄ±ralamasÄ± gÃ¼venilir olmayabilir.";
        resultOutput.appendChild(warn);
    }

    let listToRender = [...result.candidates];
    
    if (sortBy === 'score') {
        listToRender.sort((a, b) => {
            if (isNaN(a.score) && isNaN(b.score)) return a.shift - b.shift;
            if (isNaN(a.score)) return 1;
            if (isNaN(b.score)) return -1;
            if (a.score === b.score) return a.shift - b.shift;
            return a.score - b.score;
        });
    } else {
        listToRender.sort((a, b) => a.shift - b.shift);
    }

    listToRender.forEach((cand, index) => {
        const card = document.createElement('div');
        card.className = 'candidate-card';

        const header = document.createElement('div');
        header.className = 'candidate-header';
        
        const titleInfo = document.createElement('strong');
        titleInfo.textContent = `KaydÄ±rma: ${cand.shift}` + (sortBy === 'score' && index === 0 && !isNaN(cand.score) ? ' (En OlasÄ±)' : '');
        
        const scoreInfo = document.createElement('span');
        scoreInfo.className = 'candidate-score';
        scoreInfo.textContent = `Puan: ${isNaN(cand.score) ? 'HesaplanamadÄ±' : cand.score.toFixed(2)}`;

        header.appendChild(titleInfo);
        header.appendChild(scoreInfo);

        const textDiv = document.createElement('div');
        textDiv.className = 'candidate-text';
        textDiv.textContent = cand.text;

        const actions = document.createElement('div');
        actions.className = 'candidate-actions';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-secondary btn-sm';
        copyBtn.textContent = 'Kopyala';
        copyBtn.style.padding = '0.25rem 0.5rem';
        copyBtn.style.fontSize = '0.85rem';
        copyBtn.addEventListener('click', () => {
            copyToClipboard(cand.text);
            copyBtn.textContent = 'KopyalandÄ±!';
            setTimeout(() => copyBtn.textContent = 'Kopyala', 2000);
        });

        const openBtn = document.createElement('button');
        openBtn.className = 'btn-primary btn-sm';
        openBtn.textContent = 'Sezar AracÄ±nda AÃ§';
        openBtn.style.padding = '0.25rem 0.5rem';
        openBtn.style.fontSize = '0.85rem';
        openBtn.addEventListener('click', () => {
            if(openCaesarCallback) openCaesarCallback(cand.shift, cand.text);
        });

        actions.appendChild(copyBtn);
        actions.appendChild(openBtn);
        card.appendChild(header);
        card.appendChild(textDiv);
        card.appendChild(actions);

        resultOutput.appendChild(card);
    });
}

export function renderComparisonTable(headers, rows, openToolCallback) {
    resultOutput.innerHTML = '';
    
    if (!headers || headers.length < 2) {
        resultOutput.innerHTML = '<p class="text-muted">KarÅŸÄ±laÅŸtÄ±rma yapmak iÃ§in yeterli algoritma seÃ§ilmedi.</p>';
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'comparison-table-wrapper';
    
    const table = document.createElement('table');
    table.className = 'comparison-table';
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const thEmpty = document.createElement('th');
    thEmpty.textContent = 'Ã–zellik \\ Algoritma';
    headerRow.appendChild(thEmpty);
    
    headers.forEach(h => {
        const th = document.createElement('th');
        th.style.textAlign = 'center';
        
        const nameDiv = document.createElement('div');
        nameDiv.textContent = h;
        nameDiv.style.marginBottom = '0.5rem';
        th.appendChild(nameDiv);

        if (openToolCallback) {
            const btn = document.createElement('button');
            btn.className = 'btn-secondary btn-sm';
            btn.textContent = 'AracÄ± AÃ§';
            btn.style.padding = '0.2rem 0.5rem';
            btn.style.fontSize = '0.75rem';
            btn.addEventListener('click', () => openToolCallback(h));
            th.appendChild(btn);
        }
        
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        
        const tdLabel = document.createElement('td');
        tdLabel.className = 'feature-name';
        tdLabel.textContent = row.label;
        tr.appendChild(tdLabel);
        
        row.values.forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    wrapper.appendChild(table);
    resultOutput.appendChild(wrapper);
}

// --- Mini AlÄ±ÅŸtÄ±rmalar UI ---
export function renderExerciseForm(exercise, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !exercise) return;
    
    container.innerHTML = '';
    
    if (exercise.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'ex-answer-input';
        input.placeholder = 'CevabÄ±nÄ±zÄ± buraya yazÄ±n...';
        input.style.width = '100%';
        container.appendChild(input);
    } 
    else if (exercise.type === 'multiple-choice' || exercise.type === 'true-false') {
        const options = exercise.type === 'true-false' ? ['DoÄŸru', 'YanlÄ±ÅŸ'] : exercise.options;
        const vals = exercise.type === 'true-false' ? ['true', 'false'] : exercise.options;
        
        options.forEach((opt, idx) => {
            const label = document.createElement('label');
            label.className = 'exercise-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'ex-answer';
            radio.value = vals[idx];
            
            const text = document.createElement('span');
            text.textContent = opt;
            
            label.appendChild(radio);
            label.appendChild(text);
            container.appendChild(label);
        });
    }
}
