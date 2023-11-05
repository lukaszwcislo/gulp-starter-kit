const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const cssFiles = [
  'src/scss/style.scss'
];

const jsFiles = [
  'src/js/script.js'
];

function compileSass() {
  return gulp
    .src(cssFiles)
    .pipe(sass({ 
      outputStyle: 'expanded',
      sourceComments: true,
    }).on('error', sass.logError))
    .pipe(concat('style.css'))
    // .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function minifyJS() {
  return gulp
    .src(jsFiles)
    .pipe(concat('main.js'))
    // .pipe(babel({
    //   presets: ['@babel/preset-env']
    // }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch('src/scss/*.scss', compileSass);
  gulp.watch('src/js/*.js', minifyJS);
  gulp.watch('*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch);

exports.default = gulp.series(compileSass, minifyJS, watch);
