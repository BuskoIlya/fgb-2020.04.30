const gulp = require('gulp');
const less = require('gulp-less');
const mincss = require('gulp-clean-css');
const rename = require('gulp-rename');
const minjs = require('gulp-minify');
const browsersync = require('browser-sync').create();

gulp.task('min_css', async function(done) {
  gulp.src('app/css/**/*.less')
  .pipe(less())
  .pipe(mincss())
  .pipe(rename({
    suffix: '_min'
  }))
  .pipe(gulp.dest('public/css'))
  .pipe(browsersync.stream());
});

gulp.task('min_js', async function(done) {
  gulp.src('app/js/**/*.js')
  .pipe(minjs())
  .pipe(gulp.dest('public/js'))
  .pipe(browsersync.stream());
});

gulp.task('watch_all', function() {
  gulp.watch("app/css/*.scss", gulp.series('min_css'));
  gulp.watch("app/js/*.js", gulp.series('min_js'));
});

gulp.task('sync', function() {
  browsersync.init({
    server: {
      baseDir: "public/"
    }
  });
  gulp.watch("public/*.html").on('change', browsersync.reload);
});

gulp.task('default', gulp.parallel('sync', 'watch_all'));
