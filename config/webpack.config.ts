import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import { Configuration } from "webpack";

export const config: Configuration = {
  mode: 'production',
  entry: [
    path.join(__dirname, '../src/index.tsx')
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public/web'),
    publicPath: '/web/'
  }
};