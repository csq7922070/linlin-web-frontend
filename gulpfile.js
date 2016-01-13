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

///////////
// Build //
///////////

gulp.task('minifycss', function(){
  return gulp.src('css/*.css')      //压缩的文件
        .pipe(rename({suffix: '.min'}))   //输出文件夹
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));   //执行压缩
});

gulp.task('concat:controllers', function () {
  return gulp.src('js/controllers/*.js')
        .pipe(concat('controller.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('concat:directives', function () {
  return gulp.src('js/directives/*.js')
        .pipe(concat('directive.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('concat:services', function () {
  return gulp.src('js/services/*.js')
        .pipe(concat('service.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('concat:filters', function () {
  return gulp.src('js/filters/*.js')
        .pipe(concat('filter.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('minifyjs', function(){
  return gulp.src('js/*.js')      //压缩的文件
        .pipe(rename({suffix: '.min'}))   //输出文件夹
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));   //执行压缩
});

gulp.task('build', [], function () {
  runSequence(['concat:controllers','concat:directives','concat:services','concat:filters','minifycss']);
});

gulp.task('default', ['build']);
