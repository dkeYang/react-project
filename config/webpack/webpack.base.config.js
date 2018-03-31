const json = require("../../package.json");
const newEntry = {
    'index': "./entryBuild/index.js",
    'shop': "./entryBuild/shop.js"
}

newEntry.vendor = Object.keys(json.dependencies);

let config = {
    entry: newEntry,
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".pcss"]
    }
}

module.exports = config;