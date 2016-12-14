
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename')
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	concat = require('gulp-concat'),
	del = require('del');


// task for scripts 
gulp.task('scripts', function() {
  return gulp.src(['./js/*.js','!./js/*.min.js'])
		.pipe(concat('core.min.js'))
		.pipe(uglify())	
   		.pipe(gulp.dest('./js/'))
	    .pipe(reload({stream:true}));
});


// task for html files
gulp.task('html', function(){
  return  gulp.src('./bookings/*.html')
    .pipe(reload({stream:true}));
});


// task to run build server 
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});



// task to run build server for testing final app
// gulp.task('build:serve', function() {
//     browserSync({
//         server: {
//             baseDir: "./build/"
//         }
//     });
// });


// watch task
gulp.task('watch', function(){
	gulp.watch('./js/*.js', ['scripts']);
  	gulp.watch('./bookings/*.html', ['html']);
});


gulp.task('default', ['scripts', 'html', 'browser-sync', 'watch']);
// default task 

