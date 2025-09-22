const { execSync } = require('child_process');
const path = require('path');

console.log('Starting deployment...');

try {
    // Step 1: Generate image list
    console.log('\nStep 1: Generating image list...');
    execSync('node generate-image-list.js', { stdio: 'inherit' });

    // Step 2: Prepare publish directory
    console.log('\nStep 2: Preparing publish directory...');
    execSync('node prepare-publish.js', { stdio: 'inherit' });

    // Step 3: Deploy to GitHub Pages using manual git commands
    console.log('\nStep 3: Deploying to GitHub Pages...');
    const publishDir = path.join(__dirname, 'publish');
    
    // Use a temporary directory for git operations
    process.chdir(publishDir);

    execSync('git init', { stdio: 'inherit' });
    execSync('git checkout -b main', { stdio: 'inherit' }); // Explicitly create main branch
    execSync('git add .', { stdio: 'inherit' });
    // Use --quiet to avoid error if there are no changes to commit
    execSync('git commit -m "Deploy to gh-pages" --quiet || true', { stdio: 'inherit' });
    console.log('Force-pushing to gh-pages branch...');
    execSync('git push -f https://github.com/dcolombres/aqualab.git main:gh-pages', { stdio: 'inherit' });
    
    console.log('\nSUCCESS: Published to GitHub Pages!');

} catch (error) {
    console.error('\nERROR: Deployment script failed.', error);
    process.exit(1);
}