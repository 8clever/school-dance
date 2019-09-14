import webpack from "webpack";
import { config } from "../../config/webpack.config.dev";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";

const compiler = webpack(config);

export const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  writeToDisk: true
});

export const hotMiddleware = webpackHotMiddleware(compiler);