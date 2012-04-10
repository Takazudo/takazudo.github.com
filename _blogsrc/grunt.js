/**
 * grunt
 * https://github.com/cowboy/grunt
 */
module.exports = function(grunt){

  grunt.initConfig({
    watch: {
      coffee: {
        files: [
          'coffee/*.coffee'
        ],
        tasks: 'coffee uglify concat notifyOK'
      },
      sass: {
        files: [
          'scss/*.scss'
        ],
        tasks: 'sass cssmin concat notifyOK'
      }
    },
    concat: {
      'jekyll/js/all.js': [
        'js/jquery.tinyscroller.min.js',
        'js/davis.min.js',
        'js/jquery.lazyjaxdavis.min.js',
        'js/setup.js',
        'js/setup_coffeecompiled.min.js'
      ],
      'jekyll/css/style.css': [ 'css/style.css' ],
      'jekyll/css/style.min.css': [ 'css/style.min.css' ]
    },
    uglify: {
      'js/setup_coffeecompiled.min.js': 'js/setup_coffeecompiled.js'
    },
    coffee: {
      'js/setup_coffeecompiled.js': [ 'coffee/setup.coffee' ]
    },
    sass: {
      'css/style.css': 'scss/style.scss'
    },
    cssmin: {
      'css/style.min.css': 'css/style.css'
    }
  });

  grunt.loadTasks('gruntTasks');
  grunt.registerTask('default', 'coffee uglify concat sass cssmin notifyOK');

};
