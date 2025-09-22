const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'img');
const outputFilePath = path.join(__dirname, 'images.json');

fs.readdir(imgDir, (err, files) => {
    if (err) {
        console.error('Error reading image directory:', err);
        process.exit(1);
    }

    const jpgFiles = files.filter(file => file.toLowerCase().endsWith('.jpg'));
    fs.writeFile(outputFilePath, JSON.stringify(jpgFiles, null, 2), (err) => {
        if (err) {
            console.error('Error writing images.json:', err);
            process.exit(1);
        }
        console.log('Successfully generated images.json');
    });
});
