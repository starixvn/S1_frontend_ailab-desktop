const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const cssVersioner = require("gulp-css-url-versioner");

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

gulp.task("minify", gulp.series("clean-folder", "copy-asset", "minify-css"));
gulp.task("compress", gulp.series("copy-asset", "minify-css"));
