var MomentLocalesPlugin = require('moment-locales-webpack-plugin')
module.exports = {
  entry: {
    main:"./frontend/index.js",
  },
  output: {
    path: __dirname + "/frontend/dist",
    filename: "[name].js",
  },

  mode: "production", // production or 'development',
  watch: false,
  watchOptions: {
    ignored: ["/node_modules/"],
  },

  devServer: {
    contentBase: __dirname + "/frontend/dist", // index.htmlが置いてあるところ
    publicPath: "/",
    port: 3000,
  },

  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-syntax-jsx"],
          },
        },
      },

      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.(jpg|png)$/,
        use: 'url-loader'
      }

    ],
  },
  plugins: [
    new MomentLocalesPlugin(), // strip all locales except 'en'
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".scss", ".css", ".sass", ".png"],
  }
};
