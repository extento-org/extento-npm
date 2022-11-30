#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const fs_extra = require('fs-extra');
const _ = require('lodash');
const uuid = require('uuid');
const superagent = require('superagent');
const adm_zip = require('adm-zip');

const release = require('../../config/release.json');
const constants = require('../../config/constants');
const logger =  require('../utils/logger');

const REPO_HASH = release.REPO_HASH;
const REPO_URL = release.REPO_URL;

const TMP_PATH = path.resolve(constants.TMP_DIR, uuid.v4());

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

const clean_tmp = async () => {
    log.info(`cleaning temp dir`);
    fs.rmSync(constants.TMP_DIR, { recursive: true, force: true });
};

const download_repo_to_zip = (repo_url, commit_hash) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(constants.TMP_DIR)) {
            fs.mkdirSync(constants.TMP_DIR);
        }
        fs.mkdirSync(TMP_PATH);
        const zip_file = `${commit_hash}.zip`;
        const href = `${repo_url}/archive`;
        const source = `${href}/${zip_file}`;
        const output_file = path.resolve(TMP_PATH, zip_file);
        log.info(`downloading repo`);
        superagent
            .get(source)
            .on('error', error => {
                reject(error);
            })
            .pipe(fs.createWriteStream(output_file))
            .on('finish', () => {
                log.info(`saved zip to temp path`);
                resolve(output_file);
            });
    });
};

const extract_project = async (project_path, name, zip_path) => {
    const workspaces_path = path.resolve(project_path, ...constants.WORKSPACES_PATH);
    const new_workspace_path = path.resolve(workspaces_path, name);
    const path_to_expanded_zip = path.resolve(new_workspace_path, constants.REPO_ZIP_EXPANDED_NAME);
    const zip = new adm_zip(zip_path);
    log.info(`extracting zip`)
    zip.extractAllTo(new_workspace_path, 'true');
    
    const template_workspace_path = path.resolve(
        path_to_expanded_zip, 
        ...constants.WORKSPACES_PATH, 
        constants.TEMPLATE
    );
    if (!fs.existsSync(template_workspace_path)) {
        throw new Error(`${template_workspace_path} does not exist`)
    }
    log.info(`copying template workspace`)
    fs_extra.copySync(
        template_workspace_path,
        new_workspace_path, 
        { overwrite: false },
    );
    
    log.info(`cleaning`);
    fs.rmSync(path_to_expanded_zip, { recursive: true, force: true });
};

module.exports = async (name, project_path) => {
    let err;
    try {
        const output_file = await download_repo_to_zip(REPO_URL, REPO_HASH);
        await extract_project(project_path, name, output_file);
    } catch(_err) {
        err = _err;
    }
    finally {
        await clean_tmp();
        if (err) {
            throw new Error(err);
        }
    }
};