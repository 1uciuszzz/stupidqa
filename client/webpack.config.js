import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(path.dirname("./webpack.config.js"), "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(
        path.dirname("./webpack.config.js"),
        "public",
        "index.html"
      ),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(path.dirname("./webpack.config.js"), "build"),
    },
    port: 80,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
};
