const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: ["./src/index.js","./src/styleOverhaul.css"],
  devtool: 'eval-source-map',
  output : {
    path: path.join(__dirname, "/dist"),
    filename : "bundle.js",
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  },

  module : {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        type: "asset/resource"        
      },
      {
        test: [/\.(woff|eot|mp4|wav)$/, /favicon-16x16\.png$/],
        type: 'asset/resource',
        generator: {
            filename: '[name][ext]'
        }
      }
    ]
  }
}