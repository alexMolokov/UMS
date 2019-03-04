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

gulp.task("dev",gulp.parallel("serve"));







