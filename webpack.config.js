const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require("path");
const webpack = require("webpack");

const isDevelopment = true;

module.exports = {
    mode: isDevelopment ? "development" : "production",
    context: path.join(__dirname, "/src"),
    entry: "./index.jsx",
    output: {
        filename: "bundle.js",
        publicPath: "/src/public/",
        path: path.resolve(__dirname, "src/public"),
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve("babel-loader"),
                        options: {
                            presets: ["@babel/preset-react", "@babel/preset-env"],
                            plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                  }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                  },
                ]
            },
        ],
    },
    plugins: [isDevelopment && new ReactRefreshWebpackPlugin(), new webpack.HotModuleReplacementPlugin()].filter(Boolean),
    devServer: {
        hot: true,
        liveReload: false,
        port: 3000,
        open: true,
        static: {
            directory: path.join(__dirname, "src"),
        },
    },
    devtool: "source-map",
};