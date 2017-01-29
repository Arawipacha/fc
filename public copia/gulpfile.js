var gulp = require('gulp'),
uglify=require('gulp-uglify'),
concat=require('gulp-concat'),
sass = require('gulp-sass');


gulp.task('default', function() {
  console.log('Holamundo');
});

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('materialize.js'))
    .pipe(gulp.dest('./js/bin/'));
});



gulp.task('sass', function () {
    gulp.src('./sass/materialize.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});


gulp.task('sassgrid', function () {
    gulp.src('./sass/components/_grid.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});


gulp.task('default', ['scripts', 'sass']);
