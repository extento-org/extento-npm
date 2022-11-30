module.exports = (obj, to_remove) => {
    const remove_key = (val) => {
        if (Array.isArray(val)) {
            return val.filter(v => v !== to_remove);
        }
        if (val && typeof val === 'object') {
            val[to_remove] = undefined;
            return val;
        }
        return val;
    };

    return Object.entries(obj)
        .map(([key, val]) => [key, remove_key(val)])
        .reduce((accum, [key, val]) => {
            accum[key] = val;
            return accum;
        }, {});
};