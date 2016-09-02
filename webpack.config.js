var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './public/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
   
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.DefinePlugin({
        __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ],
  eslint: {
    configFile: '.eslintrc'
  },
  
  /**
   * If need eslint, add it in loaders.
   * {test: /\.js$/,loader: "eslint-loader",exclude: /node_modules/,}
   */
  module: {
        loaders: [{ 
    test: /\.jsx?$/,         // Match both .js and .jsx files
    exclude: /node_modules/, 
    loader: "babel", 
    query:
      {
        presets:['react']
      }
}]

}
};










/*

var webpack = require('webpack');
var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {

    devtool: 'eval-source-map',

    entry: {
       
        formComponents: ['./public/assets/js/formComponents.js']
    },
    output: {
        path: '/public/javascripts',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{ 
    test: /\.jsx?$/,         // Match both .js and .jsx files
    exclude: /node_modules/, 
    loader: "babel", 
    query:
      {
        presets:['react']
      }
}]

},

plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
    
};

module.exports = devConfig;

*/



