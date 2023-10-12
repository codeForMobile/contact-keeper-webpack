const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let mode = "development";
if (process.env.NODE_ENV === "production") {
    mode = "production";
  }
module.exports = {
  mode: mode,
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "build"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    }
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader
          ,"css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
    ]
  },
}
