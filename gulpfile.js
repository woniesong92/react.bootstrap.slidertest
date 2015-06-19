var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var vendors = [
  "bootstrap", "bootstrap-slider","jquery", "react"
];

var PATH = {
   "src": "./src",
   "srcjs": "./src/js",
   "distsrc": "./dist/src",
   "distsrcjs": "./dist/src/js",
};


// gulp.task('vendor', function() {
//    // A dummy entry point for browserify
//    var stream = gulp.src('./gulp/noop.js', {
//          read: false
//       })
//       .pipe(browserify({
//          debug: false, // Don't provide source maps for vendor libs
//       }))
//       .on('prebundle', function(bundle) {
//          // Require vendor libraries and make them available outside the bundle.
//          libs.forEach(function(lib) {
//             bundle.require(lib);
//          });
//       });

//    // Give the destination file a name, adding '.min' if this is production
//    stream.pipe(rename('vendor' + (production ? '.min' : '') + '.js'))

//    // Save to the build directory
//    .pipe(gulp.dest('build/'));

//    return stream;

// });

gulp.task('build', function() {
   browserify({
         entries: PATH.srcjs + '/index.jsx',
         extensions: ['.jsx'],
         debug: true
      })
      .transform(babelify)
      .pipe(source())
      .pipe(gulp.dest(distsrc));
});

gulp.task('buildprod', function() {
   browserify({
         entries: PATH.srcjs + '/index.jsx',
         extensions: ['.jsx'],
         debug: true
      })
      .transform(babelify)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'));
});



// vendors and app tasks from http://www.kellyjandrews.com/2015/04/01/modular-react-components-with-browserify.html
gulp.task('vendors', function () {
    var stream = browserify({
            debug: false,
            require: vendors
        });

    stream.bundle()
          .pipe(source('vendors.js'))
          .pipe(gulp.dest(PATH.distsrcjs));
    return stream;
});


gulp.task('app', function () {
    var stream = browserify({
            entries: [PATH.srcjs + "/app.jsx"],
            transform: [babelify],
            debug: false,
            extensions: ['.jsx'],
            fullPaths: false
        });

    vendors.forEach(function(vendor) {
        stream.external(vendor);
    });

    return stream.bundle()
                 .pipe(source('index.js'))
                 .pipe(gulp.dest(PATH.distsrcjs));
});



gulp.task('default', ['build']);
