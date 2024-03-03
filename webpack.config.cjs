const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: "./src/main.jsx",
    output: {
        path: path.resolve(__dirname, "widget"),
        filename: "ecowiser-verified-bundle.js",
        assetModuleFilename: "[name][ext]",
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'widget'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader", 'postcss-loader'],
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                exclude: /public/,
                options: {
                    limit: 10000,
                    name: "assets/[name].[ext]",
                },
                loader: "file-loader",
            },
            {
                test: /\.(js|mjs|cjs|jsx)$/,
                resolve: {
                    fullySpecified: false,
                },
                exclude: [/node_modules/, "/src/redux/custom_storage.mjs"],
                options: {
                    cacheDirectory: true,
                    presets: [
                        "@babel/preset-env",
                        ["@babel/preset-react", { runtime: "automatic" }],
                    ],
                },
                loader: "babel-loader",
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "styles.css"
        }),
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html"
        }),
    ]
}