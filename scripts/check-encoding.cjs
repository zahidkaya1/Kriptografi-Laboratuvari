const fs = require('fs');
const path = require('path');

const mojibakeRegex = /[\u00C3\u00C4\u00C5\u00C2\u00E2\u00F0\ufffd]|\u00EF\u00BF\u00BD/;
const allowedExtensions = ['.js', '.html', '.css', '.md', '.json'];
const ignoreDirs = ['node_modules', '.git'];

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    let hasError = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (mojibakeRegex.test(line)) {
            console.error(`Encoding error in ${filePath} at line ${i + 1}:`);
            console.error(`> ${line.trim()}`);
            hasError = true;
        }
    }
    return hasError;
}

function walk(dir) {
    let hasError = false;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (ignoreDirs.includes(file)) continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (walk(fullPath)) hasError = true;
        } else {
            const ext = path.extname(file);
            if (allowedExtensions.includes(ext)) {
                if (checkFile(fullPath)) hasError = true;
            }
        }
    }
    return hasError;
}

if (require.main === module) {
    const failed = walk('.');
    if (failed) {
        console.error('\nEncoding check FAILED. Please fix the mojibake characters.');
        process.exit(1);
    } else {
        console.log('Encoding check PASSED.');
    }
}

module.exports = { checkFile, walk, mojibakeRegex };
