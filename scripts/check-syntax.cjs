const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.js')) {
            results.push(file);
        }
    });
    return results;
}

const dirsToVefiry = ['./js', './tests'];
let failed = false;

dirsToVefiry.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = walk(dir);
    files.forEach(file => {
        try {
            // Check syntax using Node.js internal --check flag
            execSync(`node --check "${file}"`, { stdio: 'ignore' });
        } catch (e) {
            console.error('Syntax error found in:', file);
            // Execute again without ignoring stdio to print the actual error
            try {
                execSync(`node --check "${file}"`, { stdio: 'inherit' });
            } catch (err) { }
            failed = true;
        }
    });
});

if (failed) {
    console.error('\nSyntax check FAILED. Please fix the syntax errors above.');
    process.exit(1);
} else {
    console.log('Syntax check PASSED for all JS files.');
}
