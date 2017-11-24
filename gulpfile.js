var gulp = require('gulp');
var sass = require('gulp-sass');
var autprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync').create();


gulp.task('css', function() {
   return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle : 'compressed'})).on('error', sass.logError)
    .pipe(autprefixer({
       browsers : ['last 2 versions']
   }))
    .pipe(sourcemaps.write('./map'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browsersync.stream())
});

gulp.task('images', function () {
    return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('copyothers', function (){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browsersync.stream())
});

gulp.task('browserSync', function() {
    browsersync.init({
        server : {
            baseDir : 'dist'
        }
    })
});

gulp.task('watchIt', ['browserSync', 'css'], function () {
   gulp.watch('src/sass/**/*.scss', ['css']);
   gulp.watch('src/*.html', ['copyothers']);
    
});