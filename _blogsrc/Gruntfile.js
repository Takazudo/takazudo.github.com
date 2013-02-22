/**
 * grunt
 * https://github.com/cowboy/grunt
 */
module.exports = function(grunt){

  var utils = require('./gruntcomponents/misc/commonutils')(grunt);
  grunt.task.loadTasks('gruntcomponents/tasks');
  grunt.task.loadNpmTasks('grunt-contrib-watch');
  grunt.task.loadNpmTasks('grunt-contrib-concat');
  grunt.task.loadNpmTasks('grunt-contrib-cssmin');
  grunt.task.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    growl: {
      ok: {
        title: 'COMPLETE!!',
        msg: '＼(^o^)／'
      }
    },
    watch: {
      coffee: {
        files: [
          'coffee/*.coffee'
        ],
        tasks: ['coffee','uglify','concat:js','growl:ok']
      },
      sass: {
        files: [
          'scss/*.scss'
        ],
        tasks: ['sass','cssmin','concat:copy_css','concat:copy_cssmin','growl:ok']
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
      },
      copy_css: {
        src: ['css/style.css'],
        dest: 'jekyll/css/style.css'
      },
      copy_cssmin: {
        src: ['css/style.min.css'],
        dest: 'jekyll/css/style.min.css'
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

  grunt.event.on('sass.error', function (msg) {
    utils.growl('ERROR!!', msg);
  });
  grunt.event.on('coffee.error', function (msg) {
    utils.growl('ERROR!!', msg);
  });

  grunt.registerTask('default', ['coffee','uglify','concat:js','sass','cssmin','concat:copy_css','concat:copy_cssmin','growl:ok']);

};
