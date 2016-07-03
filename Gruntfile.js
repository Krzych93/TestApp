module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      jshint: {
        files: ['<%= jshint.all %>'],
        taska: ["jshint:all"]
      }
    },
    jshint:{
      options: {
        globals: {
          jQuery: true
        }
      },
      all: ["build/js/**/*.js",
            "Gruntfile.js"]
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);
};