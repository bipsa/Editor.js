module.exports = function(grunt) {

	require('time-grunt')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		dev: "assets",

		prod: "public",

		// Validate JS
		jshint: {
			all: [
				"Gruntfile.js",
				"<%= dev %>/js/**/*.js"
			]
		},


		// Less compiler
		less: {
			css: {
				files: {
					'<%= dev %>/css/<%= pkg.name %>.css': '<%= dev %>/css/less/main.less'
				},
				options: {
					//compress: true,
					//cleancss: true,
					sourceMap: true,
					sourceMapFilename: '<%= dev %>/css/<%= pkg.name %>.css.map',
					sourceMapRootpath: '../../',
					sourceMapURL: '<%= pkg.name %>.css.map'
				},
			}
		},

		// Auto vendor prefixes
		autoprefixer: {
			options: {
				browsers: ['last 4 versions']
			},
			css: {
				files: {
					'<%= dev %>/css/<%= pkg.name %>.css': '<%= dev %>/css/<%= pkg.name %>.css'
				}
			}
		}
	});

	// Load project tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-version');

	// Default task(s).
	grunt.registerTask('default', ['jshint','less','autoprefixer']);
	grunt.registerTask('build', ['jshint','less','autoprefixer']);
	grunt.registerTask('minor', ['build', 'version:minor']);
	grunt.registerTask('major', ['build', 'version:major']);
};