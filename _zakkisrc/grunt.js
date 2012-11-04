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
        tasks: 'coffee uglify concat copy ok'
      },
      sass: {
        files: [
          'scss/*.scss'
        ],
        tasks: 'sass cssmin concat copy ok'
      }
    },
    copy: {
      css: {
        from: 'css/style.css',
        to: 'jekyll/css/style.css'
      },
      cssmin: {
        from: 'css/style.min.css',
        to: 'jekyll/css/style.min.css'
      }
    },
    concat: {
      js: {
        src: [
          'js/jquery.tinyscroller.min.js',
          'js/spin.min.js',
          'js/davis.min.js',
          'js/jquery.lazyjaxdavis.min.js',
          'js/setup.js',
          'js/setup_coffeecompiled.min.js'
        ],
        dest: 'jekyll/js/all.js'
      }
    },
    uglify: {
      coffee: {
        src: 'js/setup_coffeecompiled.js',
        dest: 'js/setup_coffeecompiled.min.js'
      }
    },
    coffee: {
      all: {
        files: [ 'coffee/setup.coffee' ],
        dest: 'js/setup_coffeecompiled.js'
      }
    },
    sass: {
      all: {
        src: 'scss/style.scss',
        dest: 'css/style.css'
      }
    },
    cssmin: {
      all: {
        src: 'css/style.css',
        dest: 'css/style.min.css'
      }
    }
  });

  grunt.loadTasks('gruntTasks');
  grunt.registerTask('default', 'coffee uglify concat copy sass cssmin ok');

};
