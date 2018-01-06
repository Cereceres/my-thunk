
const slice = Array.prototype.slice;

module.exports = function(thunkable) {
    const ctx = this;
    const arg = slice.call(arguments, 1);
    return function(cb) {
        const isFunc = typeof cb === 'function';
        if(isFunc) {
            arg.push(function() {
                const _arg = slice.call(arguments, 0);
                cb.call(ctx, ..._arg);
            });
            return thunkable.call(ctx, ...arg);
        }

        return new Promise((resolve, reject) => {
            arg.push(function(err) {
                if (err) return reject(err);
                const _arg = slice.call(arguments, 1);
                if (_arg.length === 1) return resolve(_arg[0]);
                resolve(_arg);
            });
            thunkable.call(ctx, ...arg);
        });
    };
};
