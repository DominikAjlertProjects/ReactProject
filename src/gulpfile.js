const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/utils/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/utils/css"));
});
