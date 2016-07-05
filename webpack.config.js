module.exports = {
  entry: [ 'whatwg-fetch', './src/scripts/latitude.jsx' ],
  output: {
    path: './dist/scripts/',
    publicPath: 'scripts/',
    filename: 'latitude.js',
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015&presets[]=react',
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
      },
    ],
  },
};
