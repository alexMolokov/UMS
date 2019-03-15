'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();


gulp.task("serve", function(){
    browserSync.init({
        proxy: {
            target: "http://ums",
            ws: true
        }
    })

    browserSync.watch("public/*.js").on("change", browserSync.reload);
})

gulp.task("server", function(){
    var files = [
        'public/**/*.html',
        'public/css/**/*.css',
        'app/img/**/*.*',
        'public/**/*.js',
        'public/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './public'
        }
    });


})


gulp.task("dev",gulp.parallel("serve"));







