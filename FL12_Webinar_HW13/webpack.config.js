const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "./src/index.html" }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          "eslint-loader"
        ]
      }
    ]
  }
};
