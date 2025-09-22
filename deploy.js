const { execSync } = require('child_process');
const ghpages = require('gh-pages');

console.log('Starting deployment...');

try {
    // 1. Generate image list
    console.log('\nStep 1: Generating image list...');
    execSync('node generate-image-list.js', { stdio: 'inherit' });

    // 2. Prepare publish directory
    console.log('\nStep 2: Preparing publish directory...');
    execSync('node prepare-publish.js', { stdio: 'inherit' });

    // 3. Publish to GitHub Pages
    console.log('\nStep 3: Publishing to GitHub Pages...');
    ghpages.publish('publish', {
        message: 'Deploy to gh-pages'
    }, (err) => {
        if (err) {
            console.error('ERROR: Failed to publish to GitHub Pages.', err);
            process.exit(1);
        } else {
            console.log('\nSUCCESS: Published to GitHub Pages!');
        }
    });

} catch (error) {
    console.error('\nERROR: Deployment script failed.', error);
    process.exit(1);
}