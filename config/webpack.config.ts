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
    new HtmlWebpackPlugin({
      meta: {
        "google-site-verification": "7I157oqzlVrwKudmMfgeY6HEiVNj40BH0GbrM3LS7Ys",
        "yandex-verification": "365ae7796c8ff6cc",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      favicon: "public/favicon.png",
      title: "Studio Context Диана Вишнёва"
    })
  ],
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx"
    ]
  },
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
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              [
                "@babel/plugin-proposal-decorators",
                { legacy: true }
              ],
              [
                "@babel/plugin-proposal-class-properties",
                { loose: true }
              ],
              "@babel/plugin-transform-runtime",
              [
                "@babel/plugin-transform-typescript",
                { allowNamespaces: true }
              ]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff2|woff|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public/web'),
    publicPath: '/web/'
  },
  optimization: {
    splitChunks: {
      chunks: "all",
	    maxInitialRequests: 20,
      maxAsyncRequests: 20,
    }
  }
};