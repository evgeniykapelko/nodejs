/* eslint-disable node/no-unpublished-require */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
/* eslint-enable node/no-unpublished-require */

gulp.task('sass', () => {
     gulp.src('dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
        autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })
    )
    .pipe(cssnano())
    .pipe(gulp.dest('public/stylesheets'));
});
gulp.task("sass:watch", () => {
    gulp.watch([
      "dev/scss/**/*.scss"
    ], ["sass"]);
  });


gulp.task('default', gulp.series('sass'), () => {
    gulp.watch('dev/scss/**/*.scss', gulp.series('sass'));
});