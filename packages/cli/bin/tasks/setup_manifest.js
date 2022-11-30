const fs = require('fs');
const path = require('path');
const logger =  require('../utils/logger');
const constants = require('../../config/constants');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

module.exports = async (name, project_path) => {
    const app_path = path.resolve(project_path, ...constants.APP_PATH);
    
    log.info(`setting up manifest`);
    const project_manifest_path = path.resolve(
        app_path,
        constants.PROJECT_MANIFEST
    );
    fs.writeFileSync(
        project_manifest_path, 
        fs.readFileSync(project_manifest_path, 'utf-8').replaceAll(constants.NAME, name)
    );
};