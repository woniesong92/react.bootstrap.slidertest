module.exports = {
   entry: './src/js/app.jsx',
   output: {
      filename: './dist/src/js/indexwp.js'
   },
   module: {
      loaders: [{
            test: /\.jsx/,
            loader: 'babel-loader'
         } // loaders can take parameters as a querystring

      ]
   }
};
        //    loader: 'jsx-loader?harmony
