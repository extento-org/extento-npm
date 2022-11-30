#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const major_print = require('./utils/major_print');
const validators = require('./validators');
const load_workspace = require('./tasks/load_workspace');
const add_workspace_to_config = require('./tasks/add_workspace_to_config');
const replace_demo_code = require('./tasks/replace_demo_code');
const logger =  require('./utils/logger');
const constants = require('../config/constants');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

module.exports = async (name) => {
    try {
        const validation_error = validators.workspace_name(name);
        if (validation_error) {
            throw validation_error;
        }
        
        const project_path = path.resolve(process.cwd());

        const workspaces_path = path.resolve(project_path, ...constants.WORKSPACES_PATH);
        const new_workspace_path = path.resolve(workspaces_path, name);
        if (fs.existsSync(new_workspace_path)) {
            throw new Error(`workspace "${name}" already exists`);
        }

        await load_workspace(name, project_path);
        await add_workspace_to_config(name, project_path);
        await replace_demo_code(name, project_path);

        major_print(() => {
            log.info('WORKSPACE CREATED:', `restart webpack if it's currently running`);
        });
    } catch(err) {
        major_print(() => {
            if (typeof err.message !== 'undefined') {
                log.error('FAILED WITH MESSAGE:', err.message)
            } else {
                console.log(err);
            }
        });
        process.exit(1);
    }
};