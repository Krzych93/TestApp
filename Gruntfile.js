module.exports = function(grunt) {
  require('time-grunt')(grunt);


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
      all: ["src/js/**/*.js",
            "Gruntfile.js"]
    },
    jade: {
      default: {
        options: {
          debug: false
        },
        files: [{
          cwd: "src/templates/",
          src: ["**/*.jade"],
          dest: "build/public/templates",
          expand: true,
          ext: ".html"
        }]
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'build/style/style.css': 'src/css/style.css'
        }
      }
    },
    complexity: {
      generic: {
        src: ['grunt.js','tasks/autoprefixer.js','tasks/grunt-complexity.js'],
        options: {
          breakOnErrors: true,
          jsLintXML: 'docs/reports/report.XML',
          checkstyleXML: 'docs/reports/checkstyle.xml', // create checkstyle report
          pmdXML: 'docs/reports/pmd.xml',               // create pmd report
          errorsOnly: false,               // show only maintainability errors
          cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
          halstead: [8, 13, 20],           // or optionally a single value, like 8
          maintainability: 100,
          hideComplexFunctions: false,     // only display maintainability
          broadcast: false 
        }
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        title: "Project Name", // defaults to the name in package.json, or will use project directory's name
        success: false, // whether successful grunt executions should be notified automatically
        duration: 3 // the duration of notification in seconds, for `notify-send only
      }
    },
    notify: {
      server_before:{
        options:{
          title: "Server",
          message: "Server preparing..."
        }
      },
      server_after:{
        options: {
          title: "Server",
          message: "Server is ready!"
        }
      }
    },
    open: {
      google:{
        path: "http://google.com",
        app: 'Google Chrome'
      }
    },
    less: {
      development: {
        options: {
          paths: ['src/css/less']
        },
        files: {
          'build/style/css/compiled_less.css': 'src/css/**/*.less'
        }
      }
    }
/*    postcss: {
      options: {
        processors: [
        //  require('pixrem')(),
          require('autoprefixer')({browsers: 'last 2 versions'})
        //  require('cssnano')()
        ]
      },
      dist: {
        //src: 'src/css/*.css'
      }
    }*/
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);

  grunt.registerTask('built', ['notify:server_before',
                               'jade:default',
                               'autoprefixer',
                               'complexity',
                               'open:google',
                               'notify:server_after'
                               ]);
  grunt.registerTask('report', 'complexity');
  grunt.registerTask('test_less',['less:development']);
};