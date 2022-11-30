const glob = require('glob');

module.exports = (path_to) => new Promise((resolve, reject) => {
    glob(
        path_to.replace(/\/$/, "") + '/**/*', 
        (err, files) => err ? reject(err) : resolve(files)
    );
});