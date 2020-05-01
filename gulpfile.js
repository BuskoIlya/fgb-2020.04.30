const gulp = require('gulp');
const less = require('gulp-less');
const mincss = require('gulp-clean-css');
const rename = require('gulp-rename');
const minjs = require('gulp-minify');

gulp.task('min-css', async function(done) {
  gulp.src('app/css/**/*.less')
  .pipe(less())
  .pipe(mincss())
  .pipe(rename({
    suffix: '_min'
  }))
  .pipe(gulp.dest('public/css'));
});

gulp.task('min-js', async function(done) {
  gulp.src('app/js/**/*.js')
  .pipe(minjs())
  .pipe(gulp.dest('public/js'));
});

gulp.task('default', gulp.series('min-css', 'min-js'));
