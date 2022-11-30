const fs = require('fs');
const path = require('path');

const strip_workspace_from_config = require('../utils/strip_workspace_from_config');
const logger =  require('../utils/logger');
const constants = require('../../config/constants');
const release = require('../../config/release.json');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

const REPO_HASH = release.REPO_HASH;
const REPO_URL = release.REPO_URL;

module.exports = async (name, project_path) => {
    const app_path = path.resolve(project_path, ...constants.APP_PATH);
    const config_path = path.resolve(
        app_path, 
        constants.PROJECT_CONFIG
    );

    log.info('adding repo info and stripping template config');
    const config = require(config_path);
    config.source_repo = REPO_URL;
    config.source_commit_hash = REPO_HASH;
    fs.writeFileSync(
        config_path, 
        JSON.stringify(strip_workspace_from_config(config, constants.TEMPLATE), null, 2)
    );
};