var gulp = require('gulp');
var data = require('./src/json/data.json');
var server = require('gulp-webserver');
var sequence = require('gulp-sequence');
var rev = require('gulp-rev');
var revCollector = require("gulp-rev-collector");


gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(rev()) //生成MD5加密的后缀名
        .pipe(gulp.dest("build/css"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/css"))
});
gulp.task('html', function() {
    return gulp.src(["rev/**/*.json", "src/**/*.html"])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('build'))
});
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(rev()) //生成MD5加密的后缀名
        .pipe(gulp.dest("build/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("rev/js"))
});
gulp.task('copyjs', function() {
    return gulp.src('src/js/lib/*.min.js')
        .pipe(gulp.dest('build/js'))
});
gulp.task('server', function() {
    gulp.src('build')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            host: "169.254.114.185",
            middleware: function(req, res, next) {
                if (req.url === "/data") {
                    res.end(JSON.stringify(data))
                }
                next();
            }
        }))
});
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['html'])
    gulp.watch('src/css/*.css', ['css'])
    gulp.watch('src/js/*.js', ['js'])
});
gulp.task('default', function(cb) {
    sequence(['css', 'html', 'js', 'copyjs'], 'watch', 'server', cb);
});