const path = require('path');
const HTMLWebpackPLugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    const configObj = {
      splitChunks: {
        chunks: 'all'
      }
    };
  
    if (isProd) {
      configObj.minimizer = [
        new CssMinimizerPlugin(),
        new TerserWebpackPlugin()
      ];
    }
  
    return configObj;
  };

  const plugins =()=> {
      const basePlugins = [
        new HTMLWebpackPLugin ({
            template: path.resolve(__dirname, 'src/main.html'),
            filename: 'main.html',
            minify:{
                collapseWhitespace: isProd
            }
        }),
        new HTMLWebpackPLugin ({
            template: path.resolve(__dirname, 'src/configuration.html'),
            filename: 'configuration.html',
            minify:{
                collapseWhitespace: isProd
            }
        }),
        new HTMLWebpackPLugin ({
            template: path.resolve(__dirname, 'src/final.html'),
            filename: 'final.html',
            minify:{
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }), 
      ];
      if (isProd) {
        basePlugins.push(
          new ImageminPlugin({
            bail: false,
            cache: true,
            imageminOptions: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        removeViewBox: false
                      }
                    ]
                  }
                ]
              ]
            }
          })
        )
      }
    return basePlugins;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry:{
        main: ['./js/main.js', './styles/main.css'],
        configuration: ['./js/configuration.js', './styles/configuration.css'],
        final: ['./js/final.js', './styles/final.css']
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    performance: {
          hints: false
    },
    devServer:{
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        openPage:'main.html',
        compress: true,
        hot: true,
        port: 3000,
    },
    optimization: optimization(),
    plugins: plugins(),
    devtool: isProd ? false : 'source-map',
    module:{
      rules:[
        {
            test: /\.html$/,
            loader: 'html-loader',
        },
        {
        test: /\.css$/i,
        use: [
            {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: (resourcePath, context) => {
                    return path.relative(path.dirname(resourcePath), context) + '/';
                    },
                }
            },
            'css-loader',
          ],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use:['babel-loader'],
        },
        {
            test: /\.(png|jpg|svg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'img/[name][hash][ext]',
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf)$/,
            use: [
                {
                    loader: 'file-loader',
                        options: { 
                        name: 'fonts/[name][ext]', 
                    }
                }
            ],
        }]   
    }
};