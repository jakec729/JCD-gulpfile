var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    libsass = require('gulp-sass'),
    rubySass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    // plumber = require('gulp-plumber'),
    browserSync = require('browser-sync');

var reload = browserSync.reload;

var sass = {
    all: 'sass/**/*.scss',
    manifest: 'sass/style.scss',
    options: {
        outputStyle: 'expanded',
        errLogToConsole: true
    },
    dest: '.'
};

var server = {
    watch_files: "**/*.php",
    proxy: "localhost/jcd_2014_wp"
};

gulp.task('sass', function () {
    return gulp.src( sass.manifest )
        .pipe( sourcemaps.init() )
        .pipe( libsass(sass.options).on('error', libsass.logError) )
        .pipe( sourcemaps.write() )
        .pipe( autoprefixer() )
        .pipe( gulp.dest( sass.dest ) )
        .pipe( reload({ stream:true }) );
});

gulp.task('default', ['sass', 'serve', 'watch']);

gulp.task('serve', function() {
    browserSync({
        proxy: server.proxy
    });
});

gulp.task('watch', function () {
    gulp.watch(server.watch_files).on('change', reload);
    gulp.watch(sass.all, ['sass']);
});
