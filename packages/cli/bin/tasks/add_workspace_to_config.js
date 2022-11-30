const fs = require('fs');
const path = require('path');
const logger =  require('../utils/logger');
const constants = require('../../config/constants');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

// TODO: we need to start abstracting certain pieces (like config validation) into this package and share across project
//       so that we have single sources of truth when manipulating source code or config files
module.exports = async (name, project_path) => {
    const workspace_path = path.resolve(project_path, ...constants.WORKSPACES_PATH, name);
    if (!fs.existsSync(workspace_path)) {
        log.error(`the workspace ${name} doesn't exist for some reason`);
        return;
    }
    
    log.info('adding default workspace order to config');
    log.warn('TODO: need shared code between package and project');
    const config_path = path.resolve(project_path, ...constants.APP_PATH, constants.PROJECT_CONFIG);
    const config = require(config_path);
    config.order[name] = 10000000;
    fs.writeFileSync(config_path, JSON.stringify(config, null, 2));
};