const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isDevMode = argv.mode === "development";

  return {
    entry: [
      path.resolve(__dirname, "src", "scripts/app.js"),
      path.resolve(__dirname, "src", "styles/app.scss"),
    ],
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "scripts/app.[contenthash].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
        },
        {
          test: /\.scss$/,
          use: [
            // fallback to style-loader in development
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    devtool: isDevMode ? "inline-source-map" : false,
    devServer: {
      contentBase: "./public",
      open: true,
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles/app.[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/pages/index.html",
      }),
      new HtmlWebpackPlugin({
        filename: "cart/index.html",
        template: "src/pages/cart/index.html",
      }),
      new CopyPlugin({
        patterns: [{ from: "src/static", to: "static" }],
      }),
    ],
  };
};
