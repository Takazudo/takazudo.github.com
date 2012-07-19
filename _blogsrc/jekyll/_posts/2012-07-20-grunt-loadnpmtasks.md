---
layout: post
title: grunt loadNpmTasks
categories: [JavaScript, CoffeeScript, grunt, build]
---

Basically, with grunt, you need to code your own tasks.  
But you can also use tasks on npm. Here's howto.

<!--more-->

## growl

Easy growling using [grunt-growl](https://github.com/alextucker/grunt-growl).

{% highlight javascript %}
module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-growl');

  grunt.initConfig({
    growl: {
      test1: {
        message: 'OMG!!!',
        title: 'WOOOOT!!'
      }
    }
  });

  grunt.registerTask('default', 'growl');

};
{% endhighlight %}

## CoffeeScript

Easy CoffeeScript compiling using [grunt-coffee](https://github.com/avalade/grunt-coffee).  
I want to be notified by growl, too.

{% highlight javascript %}
module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-coffee');

  grunt.initConfig({
    growl: {
      done: {
        title: 'grunt',
        message: 'SUCCESSED!!'
      }
    },
    coffee: {
      app: {
        src: [
          'coffee/1.coffee',
          'coffee/2.coffee'
        ],
        dest: 'js'
      }
    },
    watch: {
      app: {
        files: '<config:coffee.app.src>',
        tasks: 'coffee:app growl'
      }
    }
  });

  grunt.registerTask('default', 'coffee growl');

};
{% endhighlight %}

## Sass

Sass compiling using [grunt-sass](https://github.com/sindresorhus/grunt-sass)

{% highlight javascript %}
module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    growl: {
      done: {
        title: 'grunt',
        message: 'SUCCESSED!!'
      }
    },
    sass: {
      app: {
        src: 'scss/style.scss',
        dest: 'css/style.css'
      }
    },
    watch: {
      app: {
        files: 'scss/*',
        tasks: 'sass:app growl:done'
      }
    }
  });

  grunt.registerTask('default', 'sass growl:done');

};
{% endhighlight %}

## Compass

Compiling compass scss files using [grunt-compass](https://github.com/kahlil/grunt-compass).

{% highlight javascript %}
module.exports = function(grunt){
  
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-compass');

  grunt.initConfig({
    growl: {
      done: {
        title: 'grunt',
        message: 'SUCCESSED!!'
      }
    },
    compass: {
      app: {
        src: 'scss/',
        dest: 'css/'
      }
    },
    watch: {
      app: {
        files: 'scss/*',
        tasks: 'compass:app growl:done'
      }
    }
  });

  grunt.registerTask('default', 'compass growl:done');

};
{% endhighlight %}

## Notice

Before using there npm tasks, you need to do `npm install grunt-coffee` in the directory which `grunt.js` exists.

Npm tasks are mostly well coded. But you need to know that they are not always perfect. Report bugs or send pull request to authors if they didn't work. Or you need to code tasks by yourself.

You can check my grunt examples on [Takazudo/gruntExamples](https://github.com/Takazudo/gruntExamples). All examples here are in this repository too.
