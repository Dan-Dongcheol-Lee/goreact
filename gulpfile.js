var gulp = require('gulp');
var inject = require('gulp-inject');
var babel = require('gulp-babel');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');

gulp.task('clean', function(cb) {
  return del(['./web/*'], cb);
});

gulp.task('build', function (cb) {

  var b = watchify(browserify({
    entries: ['./src/app.js'],
    cache: {},
    packageCache: {},
    fullPaths: true}));

  b.on('update', function() {
    console.log('updating bundle.js');
    bundleShare(b);
  });

  return bundleShare(b);
});

function bundleShare(b) {
  return b.transform(babelify)
   .bundle()
   .pipe(source('bundle.js'))
   .pipe(plumber())
   .pipe(gulp.dest('./web'));
}

gulp.task('copy', ['clean'], function () {
  return gulp.src([
    './node_modules/*/dist/**/*', './bower_components/*/dist/**/*', '!./**/*.min.*', '!./**/npm.*'])
    .pipe(gulp.dest('./web/lib'));
});

gulp.task('index', ['copy', 'build'], function () {
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src([
      './web/lib/react/dist/react.js',
      './web/lib/react-dom/dist/react-dom.js'
    ], {read: false}), {name: 'lib'}))
    .pipe(inject(gulp.src(['./web/lib/**/*']), {name: 'lib'}))
    .pipe(inject(gulp.src('./web/bundle.js'), {name: 'app'}))
    .pipe(gulp.dest('./web'));
});

gulp.task('default', ['index']);