const fs = require('fs');
const path = require('path');

const logger =  require('../utils/logger');
const constants = require('../../config/constants');

const log = logger(`${__filename.replace(path.resolve(__dirname, '..'), '')}`);

module.exports = async (name, project_path) => {
    const codegen_path = path.resolve(project_path, ...constants.CODEGEN_PATH);
    const files = fs
        .readdirSync(codegen_path)
        .filter((filename) => 
            fs.lstatSync(path.resolve(codegen_path, filename)).isFile()
        ).map(filename => path.resolve(codegen_path, filename))
    
    
    log.info(`wiping codegen files`);
    files.forEach(file => {
        fs.writeFileSync(file, '');
    });
};