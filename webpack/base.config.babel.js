import path from "path";
import webpack from "webpack";
import config from "common-config";
import VirtualModulePlugin from "virtual-module-webpack-plugin";
import filepaths from "../filepaths";

const baseConfig = {
  entry: {
    main: [ filepaths.src.index_js ],
  },
  output: {
    path: filepaths.dest + "/assets/",
    publicPath: "assets/",
    chunkFilename: "[id].chunk.js",
    filename: "[name].js"
  },
  module: {
    rules: [
      // Typescript
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['ts-loader']
      },
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, ".."),
      path.resolve(__dirname, "../src"),
      path.resolve(__dirname, "../node_modules"),
      // path.resolve(__dirname, "../darch/node_modules"),
    ],
    extensions: [ ".ts", ".tsx", ".png", ".jpg" ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
        "NODE_ENV"
    ]),
    new VirtualModulePlugin({
      moduleName: "config.js",
      contents: `module.exports = ${JSON.stringify(config)}`
    }),
  ]
};

export default baseConfig;