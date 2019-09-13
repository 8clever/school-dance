import { Request, Response, NextFunction} from "express";
import webpack from "webpack";
import { config } from "../../config/webpack.config";
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from "webpack-hot-middleware";


const compiler = webpack(config);

export const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
});

export const hotMiddleware = webpackHotMiddleware(compiler);