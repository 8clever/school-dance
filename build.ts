import s from 'shelljs';
import webpack from "webpack";
import { config } from "./config/webpack.config";

const tsconfig = require('./tsconfig.json');
const outDir = tsconfig.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.mkdir('-p', `${outDir}/common/swagger`);
s.cp('server/common/api.yml', `${outDir}/common/api.yml`);

webpack(config, (err, stats) => {
  if (err) throw err;

  console.log("compilation done!")
  process.exit();  
});
