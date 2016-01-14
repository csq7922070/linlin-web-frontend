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

///////////
// Build //
///////////

gulp.task('copy', function() {
  gulp.src('app/index.html')
  .pipe(gulp.dest('dist'));
  gulp.src('app/tpl/**')
  .pipe(gulp.dest('dist/tpl'));
  gulp.src('app/images/**')
  .pipe(gulp.dest('dist/images'));
  gulp.src('bower_components/**/*min.js')
  .pipe(gulp.dest('dist/bower_components'));
  gulp.src('bower_components/**/*min.css')
  .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('minifycss', function(){
  return gulp.src('app/css/*.css')      
        .pipe(concat('all.css'))//压缩的文件
        .pipe(rename({suffix: '.min'}))   //输出文件夹
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));   //执行压缩
});

gulp.task('concat:controllers', function () {
  return gulp.src('app/js/controllers/*.js')
        .pipe(concat('controller.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js/temp'));
});

gulp.task('concat:directives', function () {
  return gulp.src('app/js/directives/*.js')
        .pipe(concat('directive.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js/temp'));
});

gulp.task('concat:services', function () {
  return gulp.src('app/js/services/*.js')
        .pipe(concat('service.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js/temp'));
}); 

gulp.task('concat:filters', function () {
  return gulp.src('app/js/filters/*.js')
        .pipe(concat('filter.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js/temp'));
});

//gulp.task('concat:js', ['concat:controllers', 'concat:directives', 'concat:services', 'concat:filters']);

gulp.task('minifyjs', function(){
  return gulp.src(['app/js/app.js','app/js/controllers/*','app/js/directives/*','app/js/services/*','app/js/filters/*'])
        .pipe(concat('all.js'))      //压缩的文件
        .pipe(rename({suffix: '.min'}))   //输出文件重命名
        .pipe(uglify()) //执行压缩
        .pipe(gulp.dest('dist/js'));   
});

gulp.task('clean:dist', function (cb) {
  rimraf('dist', cb);
});

gulp.task('build:js', [], function(){
  runSequence(['minifyjs']);
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['copy', 'build:js', 'minifycss']);
});

gulp.task('default', ['build']);
