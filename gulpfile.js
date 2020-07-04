/* eslint-disable node/no-unpublished-require */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
/* eslint-enable node/no-unpublished-require */

gulp.task('sass', () => {
    return gulp.src('dev/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
        autoprefixer(['last 15 version', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })
    )
    .pipe(cssnano())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('scripts', () => {
    return gulp.src([
            'dev/js/auth.js'
        ])
        .pipe(concat('scripts.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
}
  
);


gulp.task('default', gulp.series('sass', 'scripts'), () => {
    gulp.watch('dev/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('dev/js/**/*.js', gulp.series('scripts'));
});