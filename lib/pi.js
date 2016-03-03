try {
    module.exports = require('bindings')('addon');
} catch (e) {
    console.error("Unable to load native pi addon, falling back to javascript implementation:", e.message);
    module.exports = {
        calculate: function (digits, callback) {
            setTimeout(() => callback(Math.PI + ""), digits / 10)
        }
    }
}
