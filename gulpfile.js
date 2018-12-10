const gulp = require('gulp')
const autoPrefixer = require('gulp-autoprefixer')
const minCss = require('gulp-clean-css')
const minImage = require('gulp-imagemin')
const babel = require('gulp-babel')
const concat = require('gulp-concat')

gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(autoPrefixer())
    .pipe(minCss())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('appjs', () => {
  return gulp.src('./src/js/app.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./src/js/babel.js'))
})

gulp.task('js', () => {
  return gulp.src(['./src/js/resources.js', './src/js/babel.js', './src/js/engine.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('image', () => {
  return gulp.src('./src/images/**/*')
    .pipe(minImage())
    .pipe(gulp.dest('./dist/images/'))
})

gulp.task('default', ['css', 'js', 'appjs', 'image'], () => {
  gulp.watch('./src/css/**/*.css', ['css'])
  gulp.watch('./src/js/**/*.js', ['appjs', 'js'])
})
