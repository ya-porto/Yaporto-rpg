const path = require('path');
const postcssNested = require('postcss-nested');
const postcssCustomMedia = require('postcss-custom-media');
const postcssImport = require('postcss-import');
const postcssImportAliasResolver = require('postcss-import-alias-resolver');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');

const { IS_DEV } = require('../env');

const resolverOptions = {
    alias: { styles: path.resolve('src/styles') },
    mergeExtensions: 'extend',
};

export default {
    client: {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    modules: false
                }
            },
            'postcss-loader'
        ],
    },
    server: {
        test: /\.css$/,
        loader: 'null-loader',
    },
};
