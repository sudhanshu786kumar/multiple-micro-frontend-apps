const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    static: path.join(__dirname, 'public'),
    hot: true,
  },
  output: {
    publicPath: 'auto',
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
      name: 'container',
      remotes: {
        microfrontend1: 'microfrontend1@http://localhost:3001/remoteEntry.js',
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
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};