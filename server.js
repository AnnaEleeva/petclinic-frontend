process.env.NODE_ENV = 'development';

const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const config = require('./webpack.config');

const port = process.env.PORT || 3000;
let compiler;

function setupCompiler(port, protocol) {
  compiler = webpack(config);

  compiler.plugin('invalid', function() {
    console.log('Compiling...');
  });

  compiler.plugin('done', function(stats) {
    console.log(chalk.green('Compiled successfully!'));
  });
}

function runDevServer(port, protocol) {
  const devServer = new WebpackDevServer(compiler, {
    contentBase: [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'public/dist')
    ], // Serve files from public and public/dist
    hot: true,
    historyApiFallback: true, // This ensures that index.html is served for all routes
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    https: protocol === 'https'
  });

  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log(chalk.cyan('Starting the development server...'));
    console.log();
  });
}

function run(port) {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  setupCompiler(port, protocol);
  runDevServer(port, protocol);
}

run(port);
