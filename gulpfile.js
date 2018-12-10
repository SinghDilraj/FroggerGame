const gulp = require('gulp')
const autoPrefixer = require('gulp-autoprefixer')
const minCss = require('gulp-clean-css')
const minImage = require('gulp-imagemin')
const babel = require('gulp-babel')

gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(autoPrefixer())
    .pipe(minCss())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('image', () => {
  return gulp.src('./src/images/**/*')
    .pipe(minImage())
    .pipe(gulp.dest('./dist/images/'))
})

gulp.task('default', ['css', 'js', 'image'], () => {
  gulp.watch('./src/css/**/*.css', ['css'])
  gulp.watch('./src/js/**/*.js', ['js'])
})
