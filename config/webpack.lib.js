'use strict';

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
        var dts = require('dts-bundle');

        dts.bundle({
            name: 'venflon',
            main: __dirname + '/../dist/src/main.d.ts',
            out: __dirname + '/../index.d.ts',
            removeSource: true,
            outputAsModuleFolder: true
        });
    });
};

const config = {
    target: 'node',
    context: __dirname + '/../src',
    entry: {
        'venflon': ['./main.ts']
    },
    output: {
        path: __dirname + '/../dist',
        filename: '[name].js',
        library: 'venflon',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: [ '.js', '.ts'],
        modules: [
            __dirname+'/../src',
            __dirname+'/../node_modules'
        ]
    },
    externals: [nodeExternals()],
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    "presets": [
                        ["es2015", {"modules": false}]
                    ],
                    "plugins": ["transform-es2015-modules-commonjs"]
                }
            },
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'babel-loader',
                        query: {
                            "presets": [
                                ["es2015", {"modules": false}]
                            ],
                            "plugins": ["transform-es2015-modules-commonjs"]
                        }
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new DtsBundlePlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false
    },
    node: {
        // global: 'window',
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false,
        __dirname: false,
        __filename: false,
    }
};

module.exports = config;
