const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    port: 3001,
    static: path.join(__dirname, 'public'),
    hot: true,
  },
  output: {
    publicPath: process.env.NODE_ENV === 'production' 
      ? 'https://beamish-centaur-0e5486.netlify.app/'
      : 'auto',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microfrontend1',
      filename: 'remoteEntry.js',
      exposes: {
        './HelloWorld': './src/HelloWorld.js',
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '^18.0.0',
          eager: true
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '^18.0.0',
          eager: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: process.env.NODE_ENV === 'production',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};