const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    
    return {
        entry: {
            main:  path.resolve(__dirname, 'src/index.ts'),
            style:  path.resolve(__dirname, 'src/assets/css/index.css')
        },
        output: {
            clean: isProduction,
            filename: isProduction ? '[name].[hash].js' : '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css'],
        },
        module: {
            rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    isProduction?MiniCssExtractPlugin.loader:'style-loader',
                    'css-loader'
                ],
            }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/', 'index.html'),
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? 'style.[hash].css' : 'style.css',
            })
        ],
        devServer: {
            static: path.join(__dirname, "src"),
            compress: true,
            port: 4000,
        },
    };
};