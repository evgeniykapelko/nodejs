const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');




gulp.task('sass', () => {
     gulp.src('dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(
        autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })
    )
    .pipe(gulp.dest('./dist/css'));
});
gulp.task("sass:watch", () => {
    gulp.watch([
      "dev/scss/**/*.scss"
    ], ["sass"]);
  });

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('default', gulp.series('browser-sync', 'sass'), () => {
    gulp.watch('dev/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('dist/*.html').on('change', () => {
        browserSync.reload();
        done();
    });
});