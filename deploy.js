const ghpages = require('gh-pages');

ghpages.publish('publish', function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Published successfully!');
    }
});