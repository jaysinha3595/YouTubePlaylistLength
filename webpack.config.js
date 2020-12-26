const path = require('path');

module.exports = {
    mode: "production",
    entry: "./src/js/index.js",
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, 'dst')
    },
}