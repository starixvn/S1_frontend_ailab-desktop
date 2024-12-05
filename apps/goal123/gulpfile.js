const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const cssVersioner = require("gulp-css-url-versioner");
// 新增 sass 相關套件
const sass = require("gulp-sass")(require("sass"));

gulp.task("clean-folder", async () => {
	await del(["static/styles", "public", ".cache"]);
});

gulp.task("copy-asset", async () => {
	await gulp
		.src(["src/styles/**/*", "!src/styles/css/*", "!src/styles/js"])
		.pipe(gulp.dest("./static/styles"));
});

gulp.task("minify-css", async () => {
	await gulp
		.src(["src/styles/css/*.css", "!src/styles/css/*.min.css"])
		.pipe(cssVersioner({ lastcommit: true }))
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("static/styles/css"));
});

// 新增編譯 scss 的任務
gulp.task("compile-scss", async () => {
	await gulp
		.src("src/styles/css/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("static/styles/css"));
});

gulp.task("minify", gulp.series("clean-folder", "copy-asset", "minify-css", "compile-scss"));
gulp.task("compress", gulp.series("copy-asset", "minify-css", "compile-scss"));
