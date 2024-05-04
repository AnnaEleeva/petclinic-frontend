const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3000;



module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: ['./main.tsx'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
    /* redbox-react/README.md */
    // ,devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
  },
        devServer: {
          contentBase: path.join(__dirname, 'public'),
          inline: true,
          compress: true,
          historyApiFallback: true,
          proxy: {
            '/graphql': {
              secure: false,
              target: 'http://gepick.com:4002/graphql',
              changeOrigin: true,
            },
            '/predict': {
              secure: false,
              target: 'http://localhost:5000',
              changeOrigin: true,
            },
          },
        },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
       __API_SERVER_URL__: JSON.stringify('http://localhost:8080')
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint',
        include: path.join(__dirname, 'src')
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: path.join(__dirname, 'src/styles')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      },

      {
        test: /\.tsx?$/,
        loader: 'babel!ts',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};
