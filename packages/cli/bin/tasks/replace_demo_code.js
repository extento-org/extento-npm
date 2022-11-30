const fs = require('fs');
const path = require('path');
const get_all_paths = require('../utils/get_all_paths');
const logger =  require('../utils/logger');
const constants = require('../../config/constants');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

module.exports = async (name, project_path) => {
    const workspace_path = path.resolve(project_path, ...constants.WORKSPACES_PATH, name);
    if (!fs.existsSync(workspace_path)) {
        log.error(`the workspace ${name} doesn't exist for some reason`);
        return;
    }

    const paths = await get_all_paths(workspace_path);
    log.info(`converting "${constants.TEMPLATE}" => "${name}"`);
    paths.forEach(_path => {
        if (fs.lstatSync(_path).isFile()) {
            const code_text = fs.readFileSync(_path, 'utf-8');
            fs.writeFileSync(_path, code_text.replaceAll(constants.TEMPLATE, name));
        }
    });
};