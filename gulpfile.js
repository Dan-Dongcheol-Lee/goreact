var gulp = require('gulp');
var inject = require('gulp-inject');
var babel = require('gulp-babel');
var mainBowerFiles = require('main-bower-files')
var del = require('del');

gulp.task('clean', function(cb) {
  return del(['web/*'], cb);
});

gulp.task('copy', ['clean'], function () {
  gulp.src('src/comp/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./web/comp'));
  gulp.src(['./src/comp/**/*.css'])
    .pipe(gulp.dest('./web/comp'));
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./web/lib'));
});

gulp.task('index', ['copy'], function () {
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src(['./web/comp/**/*'], {read: false}), {name: 'app'}))
    .pipe(inject(gulp.src(['./web/lib/*.js'], {read: false}), {name: 'lib'}))
    .pipe(gulp.dest('./web'));
});

gulp.task('default', ['index']);