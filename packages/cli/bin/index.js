#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');

const script_create = require('./create');
const script_workspace = require('./workspace');
const package_json = require('../package.json');

const COMMAND_CREATE = 'create';
const ARG_CREATE = 'project_name';
const COMMAND_WORKSPACE = 'workspace';
const ARG_WORKSPACE = 'workspace_name';

const unparsed = yargs(hideBin(process.argv))
    .version(package_json.version)
    .scriptName(package_json.name)
    .command(`${COMMAND_CREATE} [${ARG_CREATE}]`, 'create extento project in working dir')
    .command(`${COMMAND_WORKSPACE} [${ARG_WORKSPACE}]`, 'create new workspace in your extento project');

const parsed = unparsed.parse();
const command = parsed._[0];

const main = async () => {
    switch(command) {
        case COMMAND_CREATE:
            if (typeof parsed[ARG_CREATE] !== 'undefined') {
                await script_create(parsed[ARG_CREATE]);
            } else {
                unparsed.showHelp();
            }
            break;
        case COMMAND_WORKSPACE:
            if (typeof parsed[ARG_WORKSPACE] !== 'undefined') {
                await script_workspace(parsed[ARG_WORKSPACE]);
            } else {
                unparsed.showHelp();
            }
            break;
        default: 
            unparsed.showHelp();
            break;
    };
};

main();
