const path = require('path');
const release = require('./release.json');

module.exports = {
    TMP_DIR: path.resolve(__dirname, 'temp'),
    TEMPLATE: '__template__',
    NAME: '__name__',
    PROJECT_CONFIG: 'extento.config.json',
    PROJECT_MANIFEST: 'extento.manifest.js',
    PROJECT_ICONS: 'icons',
    CODEGEN_PATH: ['extento', 'codegen', 'src'],
    APP_PATH: ['app'],
    WORKSPACES_PATH: ['app', 'workspaces'],
    REPO_PROJECT_PATH: ['project'],
    REPO_ZIP_EXPANDED_NAME: `${release.REPO_NAME}-${release.REPO_HASH}`
};