#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const major_print = require('./utils/major_print');
const validators = require('./validators');
const load_project = require('./tasks/load_project');
const clear_codegen = require('./tasks/clear_codegen');
const remove_demo_workspace = require('./tasks/remove_demo_workspace');
const setup_config = require('./tasks/setup_config');
const setup_manifest = require('./tasks/setup_manifest');
const logger =  require('./utils/logger');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

module.exports = async (name) => {
    try {
        const validation_error = validators.project_name(name);
        if (validation_error) {
            throw validation_error;
        }

        const project_path = path.resolve(process.cwd(), name);

        if (fs.existsSync(project_path)) {
            throw new Error(`dir "${project_path}" already exists`);
        }

        await load_project(name, project_path);
        await remove_demo_workspace(name, project_path);
        await setup_config(name, project_path);
        await setup_manifest(name, project_path);
        await clear_codegen(name, project_path);

        major_print(() => {
            log.info('GET STARTED:', `cd ${name} && npm install`);
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