/**
 * Created by eldiablo on 01/12/14.
 */

// var gulp = require('gulp');
// var ts = require('gulp-typescript');

// gulp.task('dist', ['dist-compile', 'dist-files'], function() {
//     var fs = require('fs');
//     var pkg = require('./package');
//     delete pkg.devDependencies;
//     delete pkg.scripts;

//     require('mkdirp')('./build/release/');

//     fs.writeFileSync('./build/release/package.json', JSON.stringify(pkg, null, 2));
// });

// gulp.task('dist-files', function() {
//   gulp.src('src/services/*.yaml').pipe(gulp.dest('build/release/services'));
// });

// gulp.task('prepare-debug', function() {
//   var fs = require('fs');
//   gulp.src('src/services/*').pipe(gulp.dest('build/debug/services'));
//   gulp.src('test/support/*').pipe(gulp.dest('build/debug/support'));
// });

const { src, dest, series } = require('gulp');

async function clean() {
  const del = require('del');
  await del(['build/release']);
  require('mkdirp')('./build/release/');
}

async function compile() {
  const ts = require('gulp-typescript');
  var tsProject = ts.createProject('./tsconfig.json');

  await src(['src/**/*.ts']).pipe(tsProject().js.pipe(dest('build/release')));
}

async function package() {
  var fs = require('fs');
  var pkg = require('./package');
  delete pkg.devDependencies;
  delete pkg.scripts;

  fs.writeFileSync(
    './build/release/package.json',
    JSON.stringify(pkg, null, 2)
  );
}

async function services() {
  await src(['src/services/*']).pipe(dest('build/release'));
}

exports.clean = clean;
exports.compile = compile;
exports.build = series(clean, compile, package, services);
