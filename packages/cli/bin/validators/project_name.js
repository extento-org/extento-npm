const is_valid_variable_name = require('../utils/is_valid_variable_name');

module.exports = (name) => {
    // throw when the user does not provide a name
    if (typeof name === 'undefined') {
        return new Error('must include a the name');
    }

    // check that project name starts with a letter
    const regex_valid_project_name = /^[a-zA-Z].*/;
    if (!regex_valid_project_name.test(name)) {
        return new Error(`project name must satisfy regex: ${regex_valid_project_name}`);
    }

    // check that workspace name can be a valid variable name
    if (!is_valid_variable_name(name)) {
        return new Error(`project name must be a valid variable name`);
    }
};