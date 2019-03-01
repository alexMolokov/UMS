'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const del = require('del');
const gulpIf = require('gulp-if');
const path = require('path');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
const rename = require('gulp-rename');

const isDevelopment = false;


var paths = {
    prebuild: { //Тут мы укажем куда складывать готовые после сборки файлы
        root: 'src/prebuild/',
        js: 'prebuild/js/',
        css: 'prebuild/css/',
        img: 'prebuild/img/',
        fonts: 'prebuild/fonts/'
    },
    src: { //Пути откуда брать исходники
        common: 'src/common/**/*.*', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var pathsCybrus = { src: "src/domains/cybrus/**/*.*"}
var pathsVipole = { src: "src/domains/vipole/**/*.*"}

gulp.task("common:prebuild", function()
{
    gulp.src(['src/common/.env'])
        .pipe(gulp.dest(paths.prebuild.root))


    return gulp.src(['src/common/**'])
        .pipe(gulp.dest(paths.prebuild.root))
});

gulp.task("clean", function()
{
    del("public/fonts");
    del("public/images");
    del("public/css");
    del("public/support/documents");
    del("resources/views");

    return del("src/prebuild");

})

gulp.task("copy", function()
{
    return gulp.src(["src/prebuild/{images,fonts}/**/*.*"])
        .pipe(gulp.dest("public"))

})

gulp.task("copy:app", function()
{
    gulp.src(["src/prebuild/.env"])
        .pipe(gulp.dest("."))

    del("resources/support/sources");
    gulp.src(["src/prebuild/support/sources/**"])
        .pipe(gulp.dest("resources/support/sources"))



    gulp.src(["src/prebuild/resources/{views, view}/**/*.*"])
        .pipe(gulp.dest("resources"))


    gulp.src(["src/prebuild/support/{documents, docs}/*.*"])
        .pipe(gulp.dest("public/support"))


    return gulp.src(["src/prebuild/config/*.*"])
        .pipe(gulp.dest("config"))

})


gulp.task("styles", function(){
    return gulp.src(['src/prebuild/less/style.less','src/prebuild/less/include/page-registration.less','src/prebuild/less/include/page-user.less','src/prebuild/less/custom.less' ])
        .pipe(gulpIf(isDevelopment,sourcemaps.init()))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(gulpIf(isDevelopment,sourcemaps.write('.')))
        .pipe(concat("app.css"))
        .pipe(gulp.dest('public/css'))
});

gulp.task("cybrus:prebuild", function()
{
    gulp.src(['src/domains/cybrus/.env'])
        .pipe(gulp.dest(paths.prebuild.root))

    gulp.src(['src/domains/cybrus/{config}/*.*'])
        .pipe(gulp.dest(paths.prebuild.root))


    del("src/prebuild/support/documents");

    return gulp.src([pathsCybrus.src])
        .pipe(gulp.dest(paths.prebuild.root))
});



gulp.task("cybrus:build", gulp.series('clean','common:prebuild', "cybrus:prebuild", "styles", "copy","copy:app"));

gulp.task("vipole:build", gulp.series('clean','common:prebuild', "styles", "copy","copy:app"));


gulp.task("watch:cybrus", function()
{
    gulp.watch('src/domains/cybrus/**/*.*', gulp.series("common:prebuild", "cybrus:prebuild", "styles", "copy","copy:app"))
    gulp.watch('src/common/js/**/*.*', gulp.series("common:prebuild", "cybrus:prebuild", "styles", "copy"));
    gulp.watch(['src/domains/cybrus/{config}/**/*.*', 'src/domains/cybrus/.env'], gulp.series("common:prebuild", "cybrus:prebuild", "copy:app"));
});

gulp.task("watch:vipole", function()
{
    gulp.watch('src/common/js/**/*.*', gulp.series("common:prebuild","styles", "copy", "copy:app"));
});


////////////////////////////////////////////////////////////////////






// set NODE_ENV="production" && gulp <task>








