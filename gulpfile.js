// Generated on 2016-01-11 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var concat = require('gulp-concat');

///////////
// Build //
///////////

gulp.task('concat:controllers', function () {
  gulp.src('js/controllers/*.js')
        .pipe(concat('controller.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('concat:directives', function () {
  gulp.src('js/directives/*.js')
        .pipe(concat('directive.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('concat:services', function () {
  gulp.src('js/services/*.js')
        .pipe(concat('service.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('concat:filters', function () {
  gulp.src('js/filters/*.js')
        .pipe(concat('filter.js'))//合并后的文件名
        .pipe(gulp.dest('js/'));
});

gulp.task('build', [], function () {
  runSequence(['concat:controllers','concat:directives','concat:services','concat:filters']);
});

gulp.task('default', ['build']);
