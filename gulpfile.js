var gulp=require("gulp");
var $=require("gulp-load-plugins")();
var open=require("open");

var app={
	srcPath:"src/",
	devPath:"build/",
	prdPath:"dist/"
};

gulp.task("lib",function(){
	gulp.src("bower_components/**/*.js")
	.pipe(gulp.dest(app.devPath+"vendor"))
	.pipe(gulp.dest(app.prdPath+"vendor"))
	.pipe($.connect.reload()); /*notify the brower to refresh the page*/
});

gulp.task("html",function(){
	gulp.src(app.srcPath + "**/*.html")
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload()); /*notify the brower to refresh the page*/
});
gulp.task("json",function(){
	gulp.src(app.srcPath+"/data/**/*.json")
	.pipe(gulp.dest(app.devPath+"data"))
	.pipe(gulp.dest(app.prdPath+"data"))
	.pipe($.connect.reload()); /*notify the brower to refresh the page*/
});

gulp.task("less",function(){
	gulp.src(app.srcPath+"/style/index.less")
	.pipe($.less())
	.pipe(gulp.dest(app.devPath+"css"))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath+"css"))
	.pipe($.connect.reload()); /*notify the brower to refresh the page*/
});


gulp.task("less2",function(){
	gulp.src(app.srcPath+"/style/**/*.less")
	//.pipe($.less())
	/*.pipe(gulp.dest(app.devPath+"css"))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath+"css"))*/
	.pipe($.connect.reload()); /*notify the brower to refresh the page*/
});

gulp.task("js",function(){
	gulp.src(app.srcPath+"script/**/*.js")
	.pipe($.concat("index.js"))
	.pipe(gulp.dest(app.devPath+"js"))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath+"js"))
	.pipe($.connect.reload()); /*notify the brower to refresh the page*/
});

gulp.task("image",function(){
	gulp.src(app.srcPath+"/image/**/*")
	.pipe(gulp.dest(app.devPath+"image"))
	/*.pipe($.imagemin())*/
	.pipe(gulp.dest(app.prdPath+"image"))
	.pipe($.connect.reload()); /*notify the brower to refresh the page*/
	
});

gulp.task("build",["lib","html","json","less","js","image"]);

gulp.task("clean",function(){
	gulp.src([app.prdPath,app.devPath])
	.pipe($.clean())
})

gulp.task("server",["build"],function(){
	$.connect.server({
		root:[app.devPath],
		livereload:true,
		port:3000
	});
	open("http://localhost:3000")
	gulp.watch("bower_components/**/*",["lib"]);
	gulp.watch(app.srcPath + "**/*.html",["html"]);
	gulp.watch(app.srcPath+"/data/**/*.json",["json"]);
	gulp.watch(app.srcPath+"/style/**/*.less",["less"]);
	gulp.watch(app.srcPath+"script/**/*.js",["js"]);
	gulp.watch(app.srcPath+"/image/**/*",["image"]);

})

gulp.task("default",["server"]);