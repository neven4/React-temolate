const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new HardSourceWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(jpe?g|png|gif|ico|svg)$/i,
				use: [
				  {
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]'
						}
				  }
				]
			},
			{
				test: /(\.css|\.scss|\.sass)$/,
				use: [
					'style-loader',
					"css-loader",
 					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
							require('autoprefixer')
							]
						}
					}, {
						loader: 'sass-loader',
							options: {
								includePaths: [path.resolve(__dirname, 'src', 'scss')]
							}
					}
				]
			}
			
		]
		
	}
}