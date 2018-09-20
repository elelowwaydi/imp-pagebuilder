var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var srcmaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var livereload = require("gulp-livereload");
var connect = require("gulp-connect");

var libFiles = [
  './vendor/jquery/dist/jquery.min.js',
  './vendor/bootstrap/js/bootstrap.min.js',
];

var pluginFiles = [
  './vendor/jquery-validate/dist/jquery.validate.min.js',
  './vendor/slick/slick.js',
  './vendor/jquery-matchHeight/jquery.matchHeight.min.js',
  './vendor/object-fit/ofi.min.js',
  './vendor/unveil2-js/jquery.unveil2.min.js'
];


gulp.task("compile:scss", function() {
    return gulp.src("./scss/*.scss")
        .pipe(srcmaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(srcmaps.write("."))
        .pipe(gulp.dest("./css"))
        .pipe(livereload());
});

gulp.task("minify:css", function() {
    gulp.src("./scss/*.scss")
        .pipe(srcmaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(srcmaps.write("."))
        .pipe(gulp.dest("./css"));
});

gulp.task("build:vendorLibs", function() {
  return gulp.src(libFiles)
    .pipe(srcmaps.init())
    .pipe(concat('vendor-libs.min.js'))
    .pipe(uglify())
    .pipe(srcmaps.write("."))
    .pipe(gulp.dest('./js/'));
});

gulp.task("build:vendorPlugins", function() {
  return gulp.src(pluginFiles)
    .pipe(srcmaps.init())
    .pipe(concat('vendor-plugins.min.js'))
    .pipe(uglify())
    .pipe(srcmaps.write("."))
    .pipe(gulp.dest('./js/'));
});

gulp.task("build:appVendors", ["build:vendorLibs", "build:vendorPlugins"]);

gulp.task("build:js", function() {
    gulp.src("./js/app.js")
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest("./js"));
    console.log("changes made on js");
});

gulp.task("connect", function() {
    connect.server({
        port: 4200,
    });
})

gulp.task("watch", function() {
    livereload.listen();
    gulp.watch("./scss/**/*.scss", ["compile:scss", "minify:css"]);
    gulp.watch("./js/app.js", ["build:js"]);
});

gulp.task("default", ["connect","watch"]);
