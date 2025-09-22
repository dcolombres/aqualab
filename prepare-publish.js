const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publishDir = path.join(__dirname, 'publish');
const sourceDir = __dirname;

console.log('Preparing publish directory...');

// 1. Remove existing publish directory
if (fs.existsSync(publishDir)) {
    console.log('Removing existing publish directory...');
    fs.rmSync(publishDir, { recursive: true, force: true });
}

// 2. Create empty publish directory
console.log('Creating publish directory...');
fs.mkdirSync(publishDir);

// 3. Copy files
const filesToCopy = [
    'index.html',
    'muestra.html',
    'style.css',
    'images.json',
    'iconos-aqualab.pdf',
    'imgtool.html'
];

console.log('Copying files...');
filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(publishDir, file);
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`  - Copied ${file}`);
    } else {
        console.warn(`  - Warning: File not found and not copied: ${file}`);
    }
});

// 4. Copy img directory
const imgDir = path.join(sourceDir, 'img');
const publishImgDir = path.join(publishDir, 'img');
if (fs.existsSync(imgDir)) {
    console.log('Copying img directory...');
    execSync(`xcopy "${imgDir}" "${publishImgDir}" /E /I /Y /Q`);
    console.log('  - Copied img directory.');
} else {
    console.warn('  - Warning: img directory not found.');
}

console.log('Publish directory prepared successfully.');
