// Helper: root() is defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  var config = {};

  if (isProd) {
    config.devtool = 'source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }

  config.entry = {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts' // our angular app
  };

  config.output = {
    path: root('dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
  };

  config.resolve = {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
  };

  config.module = {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },

      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?', 'angular2-template-loader', '@angularclass/hmr-loader'],
        exclude: [/node_modules\/(?!(ng2-.+))/]
      },

      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'to-string-loader!style-loader!css-loader', use: ['postcss-loader']})
      },
      {
        test: /\.css$/,
        include: root('src', 'app'),
        loader: ['to-string-loader', 'raw-loader', 'postcss-loader']
      },

      {
        test: /\.styl$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader!css-loader', use: ['postcss-loader', 'raw-loader', 'stylus?resolve-url']})
      },

      {
        test:/\.styl$/,
        use: ['to-string-loader', 'css-loader', 'stylus-loader'],
      },

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader',  exclude: root('src', 'public')}
    ]
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),

    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      jquery: "jquery"
    }),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      root('./src') // location of your src
    ),

    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),

    new CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      chunksSortMode: 'dependency'
    }),

    new ExtractTextPlugin({filename: 'css/[name].[hash].css', disable: !isProd})
  ];

  if (isProd) {
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),
      new CopyWebpackPlugin([{
        from: root('src/public')
      }])
    );
  }

  config.devServer = {
    host: '0.0.0.0',
    port: 8080,
    contentBase: './src/public',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
}();

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
