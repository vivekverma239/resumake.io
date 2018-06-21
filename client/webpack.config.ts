import HTMLWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.svg$/, loader: 'url-loader' }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    port: 3000,
    overlay: true,
    stats: 'errors-only',
    publicPath: '/',
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      inject: 'body'
    })
  ]
}

export default config
