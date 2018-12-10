const gulp = require('gulp')
const autoPrefixer = require('gulp-autoprefixer')

gulp.task('autoPrefixer', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(autoPrefixer())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('default', ['autoPrefixer'], () => {
  gulp.watch('./src/css/**/*.css', ['autoPrefixer'])
})
