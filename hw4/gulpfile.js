/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const gulp = require('gulp');
const browserify = require('browserify');
const vinylify = require('factor-vinylify');
const $ = require('gulp-load-plugins')();

// styles dependencies
const nib = require('nib');
const cssimport = require('postcss-import');
const cssnano = require('cssnano');

// config
const config = {
  scripts: {
    srcPath: 'static/src/scripts',
    dest: 'static/dist/scripts',
    entries: [
      'bundle.jsx',
    ],
    outputs: [
      'bundle.js',
    ],
  },
  styles: {
    src: ['static/src/styles/**/*.styl'],
    dest: 'static/dist/styles',
  },
  images: {
    src: ['static/src/images/**/*'],
    dest: 'static/dist/images',
  },
  fonts: {
    src: ['static/src/fonts/**/*'],
    dest: 'static/dist/fonts',
  },
};

config.scripts.src = [path.join(config.scripts.srcPath, '/**/*.js'), path.join(config.scripts.srcPath, '/**/*.jsx')];

// javascript
gulp.task('scripts', () => {
  browserify({
    entries: config.scripts.entries,
    basedir: config.scripts.srcPath,
  }).plugin(vinylify, {
    outputs: config.scripts.outputs,
    common: config.scripts.common,
  })
  .transform('babelify', {
    presets: ['es2015', 'react'],
    plugins: ['transform-object-rest-spread'],
  })
  .bundle()
  .on('error', function (err) {
    $.util.log(err.toString());
    this.emit('end');
  })
  // .pipe(uglify())
  .pipe(gulp.dest(config.scripts.dest));
});

gulp.task('watch-scripts', () => {
  gulp.watch([config.scripts.src], ['scripts']);
});

// fonts
gulp.task('fonts', () => {
  gulp.src(config.fonts.src)
  .pipe($.changed(config.fonts.dest))
  .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('watch-fonts', () => {
  gulp.watch([config.fonts.src], ['fonts']);
});

// styles
gulp.task('styles', () => {
  const processors = [cssimport, cssnano];
  gulp.src(config.styles.src)
  .pipe($.stylus({ use: [nib()] }))
  .on('error', $.util.log)
  .pipe($.postcss(processors))
  .on('error', $.util.log)
  .pipe(gulp.dest(config.styles.dest));
});

gulp.task('watch-styles', () => {
  gulp.watch([config.styles.src], ['styles']);
});

// images
gulp.task('images', () => {
  gulp.src(config.images.src)
  .pipe(gulp.dest(config.images.dest));
});

gulp.task('watch-images', () => {
  gulp.watch([config.images.src], ['images']);
});

// tasks
gulp.task('build', ['fonts', 'styles', 'scripts', 'images']);
gulp.task('watch', ['watch-fonts', 'watch-styles', 'watch-scripts', 'watch-images']);

gulp.task('dev', ['build', 'watch'], () => {
});

gulp.task('default', ['build']);

