var gulp = require('gulp');
var inject = require('gulp-inject');
var babel = require('gulp-babel');
var del = require('del');
var glob = require('glob');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');

gulp.task('clean', function(cb) {
  return del(['./web/*'], cb);
});

gulp.task('build', function () {
  var testFiles = glob.sync('./web/comp/**/*.js');
  return browserify({
    entries: testFiles,
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(plumber())
  .pipe(gulp.dest('./web'));
});

gulp.task('copy', ['clean'], function () {
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./web'));
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
    .pipe(inject(gulp.src(['./web/comp/**/*', './web/app.js']), {name: 'app'}))
    .pipe(gulp.dest('./web'));
});

gulp.task('default', ['index']);