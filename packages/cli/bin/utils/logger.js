module.exports = (prefix) => new Proxy(require('npmlog'), {
    get: (obj, level) => (...args) => obj[level](prefix, ...args)
});