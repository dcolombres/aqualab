const ghpages = require('gh-pages');
const { exec } = require('child_process');

console.log('Generating image list...');
exec('node generate-image-list.js', (err, stdout, stderr) => {
    if (err) {
        console.error('Error generating image list:', stderr);
        return;
    }
    console.log(stdout);
    console.log('Publishing to GitHub Pages...');
    ghpages.publish('.', { // Publish from the root directory
        src: [
            'index.html',
            'muestra.html',
            'style.css',
            'img/**/',
            'images.json',
            'iconos-aqualab.pdf',
            'imgtool.html'
        ]
    }, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Published successfully!');
        }
    });
});