'use strict';

const path = require('path');

const config = {
    target: 'TO_SET',
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
        'venflon': ['./main.ts']
    },
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : undefined,
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
    },
    resolve: {
        extensions: [ '.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            }
        ],
    }
};

module.exports = [
    Object.assign({}, config, {
        target: 'node',
        output: Object.assign({}, config.output, {
            filename: '[name].node.js'
        })
    }),
    Object.assign({}, config, {
        target: 'web',
        output: Object.assign({}, config.output, {
            filename: '[name].web.js'
        })
    })
];
