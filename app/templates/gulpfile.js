var gulp = require('gulp');
var gutil = require('gulp-util');
var logger = require('tracer').console();
var path = require('path');

var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gulpImports = require('gulp-imports');
var mocha = require('gulp-mocha');

var onError = function (err) {  
    gutil.beep();
    console.log(err);
};

gulp.task('test', function(cb){
    gulp.src( [ 'test/test.js' ] )
    .pipe( mocha( {
        reporter: 'spec'
    }))
    .on('end', cb)
    .on('error', gutil.log)
});

gulp.task('less', function(){
    gulp.src('./config_server/public_src/style/style.less')
    .pipe(plumber(onError))
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./config_server/public/'));    
});

gulp.task('js', function(){
    gulp.src([
        'config_server/public_src/init.js'
    ])
    .pipe(plumber(onError))
    .pipe(gulpImports())
    .pipe(concat('frontend.js'))
    .pipe(gulp.dest('config_server/public/'))
});

gulp.task('watch', function(){

    gulp.watch(['config_server/public_src/**/*.js'], ['js']);
    gulp.watch(['config_server/public_src/**/*.less', 'config_server/public_src/**/*.subless'], ['less']);    

});

gulp.task('nodemon', function () {
    nodemon({ script: 'server.js', watch: [
        'config_server/',
        'node_modules/minodb/',
        '<%=project_name%>.js'
    ], ext: 'js', ignore: ['node_modules/'] })
        .on('restart', function () {
            console.log('restarted!')
        })
})

gulp.task('default', function(){
    gulp.start('nodemon');
})