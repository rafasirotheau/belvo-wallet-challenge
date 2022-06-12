// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require("html-webpack-plugin");

const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: `${__dirname}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: "ts-loader",
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
