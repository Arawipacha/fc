const elixir = require('laravel-elixir');


/*
variables agregadas para implementar angular 2

*/
var gulp = require( 'gulp' );
var notify = require( 'gulp-notify' );
var ts = require( 'gulp-typescript' );
var sourcemaps = require( 'gulp-sourcemaps' );

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
       /*.webpack('app.js')*/ ; 
	   var copy = copyFolder( mix );

    copy( 'node_modules/@angular', 'public/libs/@angular' );
    copy( 'node_modules/@angular', 'public/libs/@angular' );
    copy( 'node_modules/core-js', 'public/libs/core-js' );
    copy( 'node_modules/systemjs', 'public/libs/systemjs' );
    copy( 'node_modules/reflect-metadata', 'public/libs/reflect-metadata' );
    copy( 'node_modules/zone.js', 'public/libs/zone.js' );
    copy( 'node_modules/rxjs', 'public/libs/rxjs' );
	 

copy( 'node_modules/angular-in-memory-web-api', 'public/libs/angular-in-memory-web-api' );
	/*polymer*/
	copy( 'node_modules/@vaadin', 'public/libs/@vaadin' );
    /*datatable */
    copy( 'node_modules/angular2-iron-data-table', 'public/libs/angular2-iron-data-table' );
    copy( 'node_modules/ng2-handsontable', 'public/libs/ng2-handsontable' );
    
    
});

function copyFolder( mix ) {
    var fs = require('fs');

    return function( path, target ) {
        try {
            fs.accessSync( target, fs.F_OK );
        } catch (e) {
            mix.copy( path, target );
        }
    }
}

/**
 * Configuracion de la tarea que transpialara el typescript
 */
const tsPath = './resources/assets/**/*.ts';
const htmlPath = './resources/assets/**/*.html';

function showNotify( title, message ) {
    return notify({
        'onLast': true,
        'title': 'Angular2: ' + title,
        'icon': __dirname + '/angular.jpg',
        'subtitle': title,
        'message': message
    });
}

function taskTypescript() {
    return gulp.src( tsPath )
        .pipe( sourcemaps.init() )
        .pipe( ts( require( "./tsconfig.json" ).compilerOptions ) )
        .pipe( sourcemaps.write( '/' ) )
        .pipe( gulp.dest( 'public/' ) )
    .pipe( showNotify( 'TYPESCRIPT', 'Proccessed Angular2 files.' ) );
}

function taskCopyHtmlFiles() {
    return gulp.src( htmlPath )
        .pipe( gulp.dest( 'public/' ) )
    .pipe( showNotify( 'HTML FILES', 'Proccessed HTML files.' ) );
}

gulp.task( 'copy:html', () => { return taskCopyHtmlFiles(); });
gulp.task( 'build:tsc', [ 'copy:html' ], () => { return taskTypescript(); });

gulp.task( 'build:tsc-w', () => {
    gulp.watch( tsPath, [ 'build:tsc' ]);
    gulp.watch( htmlPath, [ 'copy:html' ]);
});
