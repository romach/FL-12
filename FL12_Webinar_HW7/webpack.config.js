const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const imageminMozjpeg = require("imagemin-mozjpeg");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const createJSLoaders = () => {
    const loaders = [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ];
    if (!isProd) {
      loaders.push("eslint-loader");
    }
    return loaders;
  };
  return {
    context: path.resolve(__dirname, "src"),
    mode: "production",
    entry: "./js/index.js",
    output: {
      filename: "js/app.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/"
    },
    devServer: {
      contentBase: path.join(__dirname, "dist")
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "index.html",
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/styles.css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: createJSLoaders()
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "img/[name].[ext]"
              }
            },
            {
              loader: "img-loader",
              options: {
                plugins: [
                  imageminGifsicle({
                    interlaced: false
                  }),
                  imageminMozjpeg({
                    progressive: true,
                    arithmetic: false
                  }),
                  imageminPngquant({
                    floyd: 0.5,
                    speed: 2
                  }),
                  imageminSvgo({
                    plugins: [{ removeTitle: true }, { convertPathData: false }]
                  })
                ]
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    }
  };
};
