// Generated on 2016-01-11 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf');
var less = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');

///////////
// Build //
///////////

gulp.task('copy', function() {
  // gulp.src('app/index.html')
  // .pipe(gulp.dest('dist'));
  gulp.src('app/*/**/*.html')
  .pipe(gulp.dest('dist/tpl'));
  gulp.src('app/assets/images/**')
  .pipe(gulp.dest('dist/images'));
  gulp.src('bower_components/**/*min.js')
  .pipe(gulp.dest('dist/bower_components'));
  gulp.src('bower_components/**/*min.css')
  .pipe(gulp.dest('dist/bower_components'));
});

// gulp.task('minifycss', function(){
//   return gulp.src('app/assets/css/*.css')      
//         .pipe(concat('main.css'))//压缩的文件
//         //.pipe(rename({suffix: '.min'}))   //输出文件夹
//         //.pipe(minifycss())
//         .pipe(gulp.dest('.tmp/styles'));   //执行压缩
// });

gulp.task('less', function(){
  return gulp.src(['app/assets/styles/**/*.less', 'app/assets/styles/**/*.css'])
  .pipe(less())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('clean:dist', function () {
  del.sync(['dist/bower_components/*','dist/css/*','dist/images/*','dist/js/*','dist/tpl/*','dist/*.html'], {force: true});
});

gulp.task('build:js', [], function(){
  return gulp.src(['app/app.js', 'app/*/**/*.js', 'app/common/**/*.js'])
        .pipe(concat('main.js'))      //压缩的文件
        //.pipe(rename({suffix: '.min'}))   //输出文件重命名
        //.pipe(uglify()) //执行压缩
        .pipe(gulp.dest('.tmp/scripts'));   
});

gulp.task('build:minifyjs', [], function(){
  return gulp.src(['app/app.js', 'app/*/**/*.js', 'app/common/**/*.js'])
        .pipe(concat('main.js'))      //压缩的文件
        //.pipe(rename({suffix: '.min'}))   //输出文件重命名
        //.pipe(uglify()) //执行压缩
        .pipe(gulp.dest('.tmp/scripts'));   
});

gulp.task('inject', ['build:js', 'less'], function(){
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('app/index.html')
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe($.rev())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe($.rev())
    .pipe(cssFilter.restore())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'));
});

gulp.task('build:test', ['clean:dist'], function () {
  runSequence(['copy', 'inject']);
});

gulp.task('build:dist', ['clean:dist'], function(){
  runSequence(['copy', 'build:minifyjs', 'less']);
});

gulp.task('watch', function(){
  gulp.watch('app/**', ['build:test']);
});

gulp.task('default', ['build:test']);
