const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve('src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
          plugins: [
            ['@babel/plugin-transform-object-assign'],
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
