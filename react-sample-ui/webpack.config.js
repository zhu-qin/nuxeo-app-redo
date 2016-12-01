var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/main/app/entry.jsx",
  output: {
    path: path.join(__dirname, 'src', 'main', 'app'),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
