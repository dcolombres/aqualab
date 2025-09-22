const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'img');
const outputFilePathRoot = path.join(__dirname, 'images.json');
const outputFilePathPublish = path.join(__dirname, 'publish', 'images.json');
const publishDir = path.join(__dirname, 'publish');

// Ensure publish directory exists
if (!fs.existsSync(publishDir)){
    fs.mkdirSync(publishDir);
}

fs.readdir(imgDir, (err, files) => {
    if (err) {
        console.error('Error reading image directory:', err);
        process.exit(1);
    }

    const jpgFiles = files.filter(file => file.toLowerCase().endsWith('.jpg'));
    const jsonContent = JSON.stringify(jpgFiles, null, 2);

    fs.writeFile(outputFilePathRoot, jsonContent, (err) => {
        if (err) {
            console.error('Error writing images.json to root:', err);
            process.exit(1);
        }
        console.log('Successfully generated images.json in root directory');
    });

    fs.writeFile(outputFilePathPublish, jsonContent, (err) => {
        if (err) {
            console.error('Error writing images.json to publish dir:', err);
            process.exit(1);
        }
        console.log('Successfully generated images.json in publish directory');
    });
});
