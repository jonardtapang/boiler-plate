module.exports = function(grunt) {

	/**
	 * Dynamically load npm tasks
	 * instead of loading each task one by one
	 */
	require('load-grunt-tasks')(grunt);


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		fileDir:{
			src:{
				path: "src/",
				sassPath: "src/scss/",
				jsPath: "src/js/",
				jsPathPlugins: "src/js/plugins/",
				jsPathVendor: "src/js/vendor/",
				imagePath: "src/images/",
				fontsPath: "src/fonts/"
			},
			dist:{
				path: "build/",
				cssPath: "build/css/",
				jsPath: "build/js/",
				jsPathPlugins: "build/js/plugins/",
				jsPathVendor: "build/js/vendor/",
				imagePath: "build/images/",
				fontsPath: "build/fonts/"
			}
		},

		concat: {
			dist:{
				files : {
					'<%=fileDir.dist.jsPathPlugins%>plugins.js' : ["<%=fileDir.src.jsPathPlugins%>*.js"],
					'<%=fileDir.dist.jsPathVendor%>vendor.js' : ["<%=fileDir.src.jsPathVendor%>*.js"],
					'<%=fileDir.dist.jsPath%>application.js' : ["<%=fileDir.src.jsPath%>*.js"]
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! Author : <%= pkg.author %> , modified date : <%= grunt.template.today("mm-dd-yyyy") %> */\n'
			},
			dist:{
				files: {
					'<%=fileDir.dist.jsPathPlugins%>plugins.min.js' : ['<%=fileDir.dist.jsPathPlugins%>*.js'],
					'<%=fileDir.dist.jsPathVendor%>vendor.min.js' : ['<%=fileDir.dist.jsPathVendor%>*.js'],
					'<%=fileDir.dist.jsPath%>application.min.js' : ['<%=fileDir.dist.jsPath%>*.js'],
				}
			}
		},

		sass: {
			dist: {
				files : [{
					expand : true,
					cwd : "<%= fileDir.src.sassPath %>",
					src : "*.scss",
					dest : "<%= fileDir.dist.cssPath%>",
					ext : ".css"
				}]
			}
		}

	}); //End of init config

	grunt.registerTask('default', ['sass', 'concat', 'uglify']);
};