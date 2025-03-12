const path = require("path");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index",
  // entry: {
  //   app: {
  //     import: './src/index',
  //   },
  // },
  cache: false,
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:3001/",
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          // loader: 'babel-loader',
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-transform-runtime",
              ["import", { libraryName: "antd", style: true }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new ModuleFederationPlugin({
      name: "basket",
      filename: "remote.js",
      remoteType: 'var',
      library: { type: "var", name: "basket" },
      remotes: {
        host: "host",
      },
      exposes: {
        "./BasketList": "./src/components/BasketList.tsx",
      },
      shared: {
        react: { singleton: true, version: "0", requiredVersion: false },
        "react-dom": { singleton: true, version: "0", requiredVersion: false },
        antd: { singleton: true, version: "0", requiredVersion: false },
      },
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
      React: "react",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  // optimization: {
  //   minimize: true,
  //   usedExports: true,
};
