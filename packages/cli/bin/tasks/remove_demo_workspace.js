const fs = require('fs');
const path = require('path');
const logger =  require('../utils/logger');
const constants = require('../../config/constants');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

module.exports = async (name, project_path) => {
    const app_path = path.resolve(project_path, ...constants.APP_PATH);
    
    log.info(`pruning template workspace`);
    const template_workspace_path = path.resolve(
        app_path, 
        'workspaces', 
        constants.TEMPLATE
    );
    fs.rmSync(template_workspace_path, { recursive: true, force: true });
};