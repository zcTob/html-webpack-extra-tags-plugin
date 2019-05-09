const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackExtraTagsPlugin = require('../index.js');
const path = require('path')
const fs = require('fs')

const OUTPUT_DIR = path.resolve(__dirname, '../dist/test');

function testHtmlPlugin(webpackConfig, expectedResults, done) {
    outputCssFile = 'webpack-css.html';
    outputJsFile = 'webpack-js.html';
    webpack(webpackConfig, async(err, stats) => {
        expect(err).toBeFalsy();

        const outputCssFileExists = fs.existsSync(path.join(OUTPUT_DIR, outputCssFile));
        const outputJsFileExists = fs.existsSync(path.join(OUTPUT_DIR, outputJsFile));
        expect(outputCssFileExists).toBe(true);
        expect(outputJsFileExists).toBe(true);

        if (!outputCssFileExists || !outputJsFileExists) {
            return done();
        }
        const htmlCssContent = fs.readFileSync(path.join(OUTPUT_DIR, outputCssFile), 'utf8');
        const htmlJsContent = fs.readFileSync(path.join(OUTPUT_DIR, outputJsFile), 'utf8');
        expect(htmlCssContent).toMatch(expectedResults.css);
        expect(htmlJsContent).toMatch(expectedResults.js);
        done();
    });
}


describe('HtmlWebpackExtraTagsPlugin', () => {

    it('generates a webpack-css.html file and a webpack-js.html for a single entry point', done => {
        testHtmlPlugin(
            {
                mode: 'production',
                entry: path.join(__dirname, 'src/index.js'),
                output: {
                    path: OUTPUT_DIR,
                    filename: 'index_bundle.js'
                },
                module: {
                    rules: [
                        {
                            test: /\.css$/,
                            use: [
                                {
                                    loader: MiniCssExtractPlugin.loader
                                },
                                {
                                    loader: 'css-loader'
                                }
                            ]
                        }
                    ]
                },
                plugins: [
                    new CleanWebpackPlugin(),
                    new HtmlWebpackPlugin(),
                    new HtmlWebpackExtraTagsPlugin(),
                    new MiniCssExtractPlugin({
                        filename: "index.css"
                    })
                ]
            },
            {
                js: "<script src='index_bundle.js'></script>",
                css: "<link herf='index.css' rel='stylesheet'>"
            },
            done
        );
    });
})
