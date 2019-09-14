import { config } from "./webpack.config";
import webpack from "webpack";

(config.entry as string[]).unshift(
  "webpack-hot-middleware/client"
)

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
)

config.devtool = 'inline-source-map'
config.mode = "development";

export { config };