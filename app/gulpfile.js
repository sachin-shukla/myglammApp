
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


// task for css files
gulp.task('styles', function(){
  return  gulp.src('./css/*.css')
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
    	port: 8089,
        server: {
            baseDir: "./"
        }
    });
});



// watch task
gulp.task('watch', function(){
	gulp.watch('./js/*.js', ['scripts']);
	gulp.watch('./css/*.css', ['styles']);
  	gulp.watch('./bookings/*.html', ['html']);
});


gulp.task('default', ['scripts', 'html', 'browser-sync', 'watch']);
// default task 

