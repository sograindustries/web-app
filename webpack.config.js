// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',

    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/',
    },

    devServer: {
        historyApiFallback: true,
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            //'process.env.GRAPHQL_URL': JSON.stringify('http://localhost:4000/graphql'),
            'process.env.GRAPHQL_URL': JSON.stringify('https://api.argosheart.com/graphql'),
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
