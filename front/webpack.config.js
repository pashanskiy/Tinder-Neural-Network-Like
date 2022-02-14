/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    compress: true,
    host: '192.168.88.254',
    port: 8090,
    hot: true
  },
  entry: { main: ['./src/index.tsx']},
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json', '.css']
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'babel-loader', options: { cacheDirectory: true } },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }]
      }
    ]
  },

  plugins: [
    new HtmlwebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ]
};
