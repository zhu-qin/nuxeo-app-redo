'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var historyApiFallback = require('connect-history-api-fallback');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var APP = 'src/main/app', DIST = 'target/classes/nuxeo.war/sampleUI';

var styleTask = function (stylesPath, srcs) {
  return gulp.src(srcs.map(function(src) {
    return path.join(APP, stylesPath, src);
  }))
    .pipe($.changed(stylesPath, {extension: '.css'}))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/' + stylesPath))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(DIST + '/' + stylesPath))
    .pipe($.size({title: stylesPath}));
};

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  return styleTask('css', ['**/*.css']);
});

// gulp.task('elements', function () {
//   return styleTask('elements', ['**/*.css']);
// });

// Lint JavaScript
// gulp.task('jshint', function () {
//   return gulp.src([
//     APP + '/scripts/app.js',
//     APP + '/elements/**/*.js',
//     APP + '/elements/**/*.html'
//   ])
//     .pipe(reload({stream: true, once: true}))
//     .pipe($.jshint.extract()) // Extract JS from .html files
//     .pipe($.jshint())
//     .pipe($.jshint.reporter('jshint-stylish'))
//     .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
// });

// Optimize Images
gulp.task('images', function () {
  return gulp.src(APP + '/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(DIST + '/images'))
    .pipe($.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  var app = gulp.src([APP + '/*'], {
    dot: true
  }).pipe(gulp.dest(DIST));


  // var bower = gulp.src([
  //   'bower_components/**/*'
  // ]).pipe(gulp.dest(DIST + '/bower_components'));
  //
  // var elements = gulp.src([APP + '/elements/**/*.html'])
  //   .pipe(gulp.dest(DIST + '/elements'));

  //var swBootstrap = gulp.src(['bower_components/platinum-sw/bootstrap/*.js'])
  //  .pipe(gulp.dest('dist/elements/bootstrap'));

  //var swToolbox = gulp.src(['bower_components/sw-toolbox/*.js'])
  //    .pipe(gulp.dest('dist/sw-toolbox'));

//   var vulcanized = gulp.src([APP + '/elements/elements.html'])
//     .pipe($.rename('elements.vulcanized.html'))
//     .pipe(gulp.dest(DIST + '/elements'));
//
//   return merge(app, bower, elements, vulcanized)
//     .pipe($.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src([APP + '/fonts/**'])
    .pipe(gulp.dest(DIST + '/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: ['.tmp', APP, DIST]});

  return gulp.src([APP +'/**/*.html', '!' + APP + '/{elements,test}/**/*.html'])
  // Replace path for vulcanized assets
    .pipe($.if('*.html', $.replace('elements/elements.html', 'elements/elements.vulcanized.html')))
    .pipe(assets)
    // Concatenate And Minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Concatenate And Minify Styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    // Output Files
    .pipe(gulp.dest(DIST))
    .pipe($.size({title: 'html'}));
});

// Vulcanize granular configuration
// gulp.task('vulcanize', function() {
//   var DEST_DIR = DIST + '/elements';
//   return gulp.src(DEST_DIR + '/elements.html')
//     .pipe($.vulcanize({
//       stripComments: true,
//       inlineCss: true,
//       inlineScripts: true
//     }))
//     //.pipe($.minifyInline())
//     .pipe(gulp.dest(DEST_DIR))
//     .pipe($.size({title: 'vulcanize'}));
// });

// Use index.jsp for dist marketplace package
// gulp.task('dist:index', function () {
//   del(DIST + '/index.html');
//   gulp.src(DIST + '/index.jsp')
//     .pipe($.rename('index.html'))
//     .pipe($.minifyHtml({
//       quotes: true,
//       empty: true,
//       spare: true
//     }))
//     .pipe(gulp.dest(DIST));
//   del(DIST + '/index.jsp');
// });

// Delete all unnecessary bower dependencies
// gulp.task('dist:bower', function (cb) {
//   del([
//     DIST + '/bower_components/**/*',
//     '!' + DIST + '/bower_components/jquery',
//     '!' + DIST + '/bower_components/jquery/dist',
//     '!' + DIST + '/bower_components/jquery/dist/jquery.min.js',
//     '!' + DIST + '/bower_components/webcomponentsjs',
//     '!' + DIST + '/bower_components/webcomponentsjs/webcomponents-lite.min.js',
//     '!' + DIST + '/bower_components/moment',
//     '!' + DIST + '/bower_components/moment/min',
//     '!' + DIST + '/bower_components/moment/min/moment.min.js',
//     '!' + DIST + '/bower_components/select2',
//     '!' + DIST + '/bower_components/select2/select2.min.js',
//     '!' + DIST + '/bower_components/nuxeo-ui-elements',
//     '!' + DIST + '/bower_components/nuxeo-ui-elements/viewers',
//     '!' + DIST + '/bower_components/nuxeo-ui-elements/viewers/pdfjs',
//     '!' + DIST + '/bower_components/nuxeo-ui-elements/viewers/pdfjs/**',
//     '!' + DIST + '/bower_components/nuxeo-ui-elements/viewers/pdfjs/**/*',
//   ], cb);
// });

// Generate a list of files that should be precached when serving from 'dist'.
// The list will be consumed by the <platinum-sw-cache> element.
// gulp.task('precache', function (callback) {
//   var dir = DIST;
//
//   glob('{elements,scripts,styles}/**/*.*', {cwd: dir}, function(error, files) {
//     if (error) {
//       callback(error);
//     } else {
//       files.push('index.html', './', 'bower_components/webcomponentsjs/webcomponents-lite.min.js');
//       var filePath = path.join(dir, 'precache.json');
//       fs.writeFile(filePath, JSON.stringify(files), callback);
//     }
//   });
// });

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', DIST]));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles', 'elements', 'images'], function () {
  // setup our local proxy
  //var proxyOptions = require('url').parse('http://10-124-24-169.cic.cvshealth.com:8080/nuxeo');
  var proxyOptions = require('url').parse('http://localhost:8080/nuxeo');
  proxyOptions.route = '/nuxeo';
  browserSync({
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function (snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', APP],
      middleware: [ require('proxy-middleware')(proxyOptions) ],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([APP + '/**/*.html'], reload);
  gulp.watch([APP + '/styles/**/*.css'], ['styles', reload]);
  gulp.watch([APP + '/elements/**/*.css'], ['elements', reload]);
  gulp.watch([APP + '/{scripts,elements}/**/*.js'], ['jshint']);
  gulp.watch([APP + '/images/**/*'], reload);
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['copy', 'styles'],['images', 'html'], cb);
  // Note: add , 'precache' , after 'vulcanize', if your are going to use Service Worker
});

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
