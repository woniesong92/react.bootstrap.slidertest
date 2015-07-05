module.exports = {
   entry: './src/js/app.jsx',
   output: {
      filename: './dist/src/js/indexwp.js'
   },
   module: {
      loaders: [{
            test: /\.jsx/,
            loader: 'jsx-loader?harmony'
         } // loaders can take parameters as a querystring

      ]
   }
};
