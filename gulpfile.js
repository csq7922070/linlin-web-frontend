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
  gulp.src('app/data/**/*.json')
  .pipe(gulp.dest('dist/data'));
  gulp.src('app/assets/images/**')
  .pipe(gulp.dest('dist/images'));
  //复制开源库
  gulp.src('bower_components/**/*min.js')
  .pipe(gulp.dest('dist/bower_components'));
  gulp.src('bower_components/**/*min.css')
  .pipe(gulp.dest('dist/bower_components'));
  //复制修改后的开源库
  gulp.src('open_sources/**/*min.js')
  .pipe(gulp.dest('dist/open_sources'));
  gulp.src('open_sources/**/*min.css')
  .pipe(gulp.dest('dist/open_sources'));
});


gulp.task('less', function(){
  return gulp.src(['app/assets/styles/**/*.less', 'app/assets/styles/**/*.css'])
  .pipe(less())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('clean:dist', function () {
  del.sync(['dist/bower_components/*','dist/css/*','dist/images/*','dist/js/*','dist/tpl/*','dist/*.html'], {force: true});
});

gulp.task('templates', function(){
  return gulp.src('app/*/**/*.html')
  .pipe(templateCache('templates.js', {
    root: 'tpl/',
    module:'myApp'}))
  .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('concat:js', [], function(){
  return gulp.src(['app/app.js', 'app/*/**/*.js'])
        .pipe(concat('main.js'))      //压缩的文件
        .pipe(gulp.dest('.tmp/scripts'));   
});

gulp.task('inject:dist', ['concat:js', 'templates','less'], function(){
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

gulp.task('inject:dev', ['concat:js', 'templates','less'], function(){
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('app/index.html')
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    //.pipe($.uglify())
    .pipe($.rev())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe($.rev())
    .pipe(cssFilter.restore())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'));
});

gulp.task('build:carousel',function(){
  gulp.src('open_sources/angular-carousel/dist/angular-carousel.js')
  .pipe($.uglify())
  .pipe($.rename("angular-carousel.min.js"))
  .pipe(gulp.dest('open_sources/angular-carousel/dist'));
});

gulp.task('build:dist', ['clean:dist'], function () {
  runSequence(['copy', 'inject:dist']);
});

gulp.task('build:dev', ['clean:dist'], function () {
  runSequence(['copy', 'inject:dev']);
});

gulp.task('watch', function(){
  gulp.watch('app/**', ['build:dev']);
});

gulp.task('default', ['build:dist']);
