const gulp = require('gulp')
const autoPrefixer = require('gulp-autoprefixer')
const minCss = require('gulp-clean-css')

gulp.task('css', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(autoPrefixer())
    .pipe(minCss())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('default', ['css'], () => {
  gulp.watch('./src/css/**/*.css', ['css'])
})
