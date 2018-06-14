/**
 * Build configuration
 */

"use strict";

const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PACKAGE = require("./package.json");

const srcPath = path.join(__dirname, "src");

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", path.join(srcPath, "index.tsx")],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: ``,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss"],
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env", "react"],
              plugins: ["transform-object-rest-spread", "syntax-dynamic-import"],
            }
          },
          "ts-loader",
        ]
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          "file-loader",
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract("css-loader!sass-loader"),
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new ExtractTextPlugin("[name].css"),
  ],
};
