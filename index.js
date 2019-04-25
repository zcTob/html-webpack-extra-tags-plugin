const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

class MyPlugin {
    constructor(options) {
        const userOptions = options || {};
        const defaultOptions = {
            outputPath: "./"
        };

        this.options = Object.assign(defaultOptions, userOptions);
    }
    apply(compiler) {
        const outputPath = this.options.outputPath;
        if (path.resolve(outputPath) === path.normalize(outputPath)) {
            this.options.outputPath = path.relative(
                compiler.options.output.path,
                outputPath
            );
        }
        const assets = { js: [], css: [] };

        compiler.hooks.compilation.tap("MyPlugin", compilation => {
            HtmlWebpackPlugin.getHooks(
                compilation
            ).alterAssetTagGroups.tapAsync(
                "MyPlugin", // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    data.bodyTags.forEach(v => {
                        assets.js.push(
                            `<script src='${v.attributes.src}'></script>`
                        );
                    });
                    data.headTags.forEach(v => {
                        assets.css.push(
                            `<link src='${v.attributes.href}' rel="stylesheet">`
                        );
                    });
                    // Tell webpack to move on
                    cb(null, data);
                }
            );
        });
        compiler.hooks.emit.tap("MyPlugin", compilation => {
            const css = assets.css.join("");
            const js = assets.js.join("");
            compilation.assets[this.getOutputName("webpack-css.html")] = {
                source: function () {
                    return css;
                },
                size: function () {
                    return css.length;
                }
            };

            compilation.assets[this.getOutputName("webpack-js.html")] = {
                source: function () {
                    return js;
                },
                size: function () {
                    return js.length;
                }
            };
        });
    }

    getOutputName(filename) {
        return this.options.outputPath + "/" + filename;
    }
}

module.exports = MyPlugin;
