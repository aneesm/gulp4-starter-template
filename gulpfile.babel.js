'use strict';

const browserSync = require('browser-sync');
const browserify = require('browserify');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const sourcestream = 'vinyl-source-stream';

// sass.compiler = require('node-sass');

// VARIABLES
// ----------
const $ = gulpLoadPlugins();
const sync = browserSync.create();

const dist = 'assets';
const appRoot = '.';
const source = 'src';

// Compile SCSS
// function style() {
//   return gulp.src('./src/scss/**/*.scss')
//   .pipe(sass())
//   .pipe(gulp.dest('./assests/css'))
// }

gulp.task('stylelint', function() {
  return gulp.src([
    `${source}/scss/**/*.s+(a|c)ss`,
    `${source}/scss/**/*.css`,
    `!${source}/scss/vendor/**`,
  ])
    .pipe($.stylelint({
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    }));
});

gulp.task('styles', gulp.series('stylelint', function() {
  return gulp.src([
    `${source}/scss/style.scss`,
  ])
    .pipe($.sourcemaps.init())
    .pipe($.sass({ includePaths: ['node_modules'] }))
    .on('error', $.notify.onError())
    .pipe($.autoprefixer())
    .pipe($.cleanCss())
    .pipe($.sourcemaps.write(`./`))
    .pipe(gulp.dest(`${dist}/css`))
    .pipe(sync.stream({ match: '**/*.css' }));
}));

// Scripts
gulp.task('scripts', gulp.series('browserify', function() {
  return gulp.src([
    `${source}/js/vendor/_*.js`,
    `${dist}/js/bundle.js`,
  ])
    .pipe($.babel({
      presets: ['es2015'],
      compact: true,
    }))
    .pipe($.concat('source.dev.js'))
    .pipe(gulp.dest(`${dist}/js`))
    .pipe($.rename('source.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(`${dist}/js`))
    .pipe(sync.stream({ match: '**/*.js' }));
}));

gulp.task('default', function () {
  browserSync.init({
    proxy: 'http://localhost/',
    port: 3001,
    ghostMode: {
      scroll: true,
    },
    open: false,
  });

  // Watch .scss files
  gulp.watch(`${source}/scss/**/*.scss`, gulp.series(['styles']));

  // Watch .js files
  gulp.watch(`${source}/js/**/*.js`, gulp.series(['scripts']));

  // Watch image files
  // gulp.watch(`${source}/images/**/*`, ['images']);
});

// exports.styles = styles;