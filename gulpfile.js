const gulp = require('gulp')
const autoPrefixer = require('gulp-autoprefixer')
const minCss = require('gulp-clean-css')
const minImage = require('gulp-imagemin')

gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(autoPrefixer())
    .pipe(minCss())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('image', () => {
  return gulp.src('./src/images/**/*')
    .pipe(minImage())
    .pipe(gulp.dest('./dist/images/'))
})

gulp.task('default', ['css', 'image'], () => {
  gulp.watch('./src/css/**/*.css', ['css'])
})
