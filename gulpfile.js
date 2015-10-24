var gulp = require('gulp');
var inject = require('gulp-inject');
var babel = require('gulp-babel');
var del = require('del');

gulp.task('clean', function(cb) {
  return del(['web/*'], cb);
});

gulp.task('copy', ['clean'], function () {
  gulp.src('src/comp/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./web/comp'));
  return gulp.src([
    './node_modules/*/dist/**/*', './bower_components/*/dist/**/*', '!./**/*.min.*', '!./**/npm.*'])
    .pipe(gulp.dest('./web/lib'));
});

gulp.task('index', ['copy'], function () {
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src([
      './web/lib/react/dist/react.js',
      './web/lib/react-dom/dist/react-dom.js'
    ], {read: false}), {name: 'lib'}))
    .pipe(inject(gulp.src(['./web/lib/**/*']), {name: 'lib'}))
    .pipe(inject(gulp.src(['./web/comp/**/*']), {name: 'app'}))
    .pipe(gulp.dest('./web'));
});

gulp.task('default', ['index']);