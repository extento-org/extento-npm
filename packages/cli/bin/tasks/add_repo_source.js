const fs = require('fs');
const path = require('path');
const get_all_paths = require('../utils/get_all_paths');
const logger =  require('../utils/logger');
const constants = require('../../config/constants');
const release = require('../../config/release.json');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

const REPO_HASH = release.REPO_HASH;
const REPO_URL = release.REPO_URL;

module.exports = async (name, project_path) => {
    const config_path = path.resolve(project_path, ...constants.APP_PATH, constants.PROJECT_CONFIG);
    const config = require(config_path);

    config.source_repo = REPO_URL;
    config.source_commit_hash = REPO_HASH;
    
    log.info('adding repo url and hash to config');
    fs.writeFileSync(config_path, JSON.stringify(config, null, 2));
};