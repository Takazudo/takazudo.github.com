---
layout: post
title: Compiling CoffeeScript with grunt
categories: [JavaScript, CoffeeScript, grunt, build]
---

[CoffeeScript][coffee] is sweat.  
It provides easy watch and has no problem about compiling without any other tools.  But in concrete projects, we sometimes need more complicated compiling strategy. [Grunt][grunt] provides nice APIs for automated builds for sass, less, stylus, CoffeeScript or something like that. In this article, I'll introduce my grunt file for CoffeeScript.

<!--more-->

Note: This article is for grunt version 0.3.8. APIs may be changed in the future.

## Installing grunt

To use grunt, install node and npm. Grunt needs to be installed as global with `-g`.

{% highlight bash %}
$ npm install -g grunt
{% endhighlight %}

I skip grunt's basics here. You can see some examples on [grunt][grunt]'s repository. Or check [my repository](https://github.com/Takazudo/gruntExamples) for grunt examples. Basically, create `grunt.js` to your directory. Then write build codes there. Then you can run the builds with the command like below.

{% highlight bash %}
$ grunt
{% endhighlight %}

{% highlight bash %}
$ grunt watch
{% endhighlight %}

If you have not used grunt yet. Just try to work something with grunt. It has standard features for JavaScript development. ex: jslint, concat, banner.

## How to compile CoffeeScript files on command line

It's listed on [CoffeeScript' website][coffee]. Here's what I want to use.

{% highlight bash %}
$ coffee --compile --output .js/ .coffee/
{% endhighlight %}

With this, coffee compiles all `*.coffee` files in `coffee` directory. The compiled JavaScript files will be put into `js` directory.

{% highlight bash %}
$ coffee --join compiled.js --compile 1.coffee 2.coffee
{% endhighlight %}

With this, coffee concatenate `1.coffee` and `2.coffee` first. Then it compiles concanated sources to `compiled.js`.

CoffeeScript has also --watch option. But it's better to automate these with build utilities. Rake or Make also seems good. But if you are familiar to JavaScript, grunt is better for you, I guess.

## Helper, utility tasks

Grunt doesn't have the feature to compile CoffeeScript as default. So you need to write your own task for coffee compiling. First, let's prepare helper functions / tasks for it. Here's what I wrote.

{% highlight javascript %}
/* grunt common utilities */

module.exports = function(grunt){
  
  var exec = require('child_process').exec;

  // child_process.exec bridge
  grunt.registerHelper('exec', function(opts, done) {
    var command = opts.cmd + ' ' + opts.args.join(' ');
    exec(command, opts.opts, function(code, stdout, stderr) {
      if(!done){
        return;
      }
      if(code === 0) {
        done(null, stdout, code);
      } else {
        done(code, stderr, code);
      }
    });
  });

  // growl: Ex. grunt.helper('growl', 'foo', 'bar');
  // http://growl.info/extras.php#growlnotify
  grunt.registerHelper('growl', function(title, msg) {
    grunt.helper('exec', {
      cmd: 'growlnotify',
      args: [
        '-t', "'" + title + "'",
        '-m', "'" + msg + "'"
      ]
    });
  });

  // ok: use this for notify everything are allright.
  grunt.registerTask('ok', 'done!', function(){
    grunt.helper('growl', 'grunt.js', '＼(^o^)／');
  });

};
{% endhighlight %}

In the code above, first, I created `child_process.exec` wrapper. With this helper, you can pass the commands to `child_process.exec` easily. I'll call this "exec" helper.

Next, I created "growl" helper. [Growl](http://growl.info/extras.php#growlnotify) is a great application for Mac (though if you use Mac, you may already know. And sorry for non-Mac users.). This notifies you something. I'll use this to notify whether CoffeeScript's compiling was successed or not. Install growlnotify extension if you've not installed it yet. You can see how I used "exec" helper here.

The last part of the code above is "ok" task. I'll call this task when everythings was done without error. You can see how I used "growl" helper here.

"Helper" is like a function shared in "grunt" namespace. I'll use "exec" helper more next.

## CoffeeScript compiling tasks

So let's compile CoffeeScripts with this.

{% highlight javascript %}
/**
 * coffee compiling tasks
 * CoffeeScript: http://coffeescript.org/
 */
module.exports = function(grunt){
  
  var log = grunt.log;

  function handleResult(from, dest, err, stdout, code, done) {
    if(err){
      grunt.helper('growl', 'COFFEE COMPILING GOT ERROR', stdout);
      log.writeln(from + ': failed to compile to ' + dest + '.');
      log.writeln(stdout);
      done(false);
    }else{
      log.writeln(from + ': compiled to ' + dest + '.');
      done(true);
    }
  }

  grunt.registerHelper('coffee_dir_to_dir', function(fromdir, dest, done) {
    var args = {
      cmd: 'coffee',
      args: [ '--compile', '--output', dest, fromdir ]
    };
    grunt.helper('exec', args, function(err, stdout, code){
      handleResult(fromdir, dest, err, stdout, code, done);
    });
  });

  grunt.registerHelper('coffee_multi_to_one', function(srcs, dest, done) {
    srcs = srcs.join(' ');
    var args = {
      cmd: 'coffee',
      args: [ '--join', dest, '--compile', srcs ]
    };
    grunt.helper('exec', args, function(err, stdout, code){
      handleResult(srcs, dest, err, stdout, code, done);
    });
  });

  grunt.registerMultiTask('coffee', 'compile CoffeeScripts', function() {

    var done = this.async();
    var files = this.data.files;
    var dir = this.data.dir;
    var dest = this.data.dest;

    // ex: ./coffee -> ./js
    if(dir) {
      
      // if destination was not defined, compile to same dir
      if(!dest) {
        dest = dir;
      }

      grunt.helper('coffee_dir_to_dir', dir, dest, done);
      return;
    }

    // ex: [ '1.coffee', '2.coffee' ] -> foo.js
    if(files) {
      grunt.helper('coffee_multi_to_one', files, dest, done);
      return;
    }

  });

};
{% endhighlight %}

First, I created two helpers - `coffee_dir_to_dir` and `coffee_multi_to_one`. These are helpers which invoke coffee commands I wrote above. "Directory to directory" or "multiple files to one". You can see how I used "exec" helper here ,too. The comiled results will be passed to `handleResult`. In `handleResult`, it shows growl if compiling got error. If not, it logs that compiling was done.

The last part of the code above defines `coffee` multiTask. In this task, grunt calls the helpers what I craeted from config values. Overall, this multiTasks is the surface of this task file. Let's see how this works with concrete `grunt.js` file.

## Grunt file

Here's how to use the tasks above.

{% highlight javascript %}
/**
 * grunt
 * CoffeeScript example
 *
 * grunt: https://github.com/cowboy/grunt
 * CoffeeScript: http://coffeescript.org/
 */
module.exports = function(grunt){

  grunt.initConfig({
    coffee: {
      // Example1: compile multiple coffees to one js with "--join".
      dist1: {
        files: [ 'coffee/1.coffee', 'coffee/2.coffee' ],
        dest: 'js/12.js'
      },
      // Example2: compile one coffee to one js.
      dist2: {
        files: [ 'coffee/3.coffee' ],
        dest: 'js/3.js'
      },
      // Example3: compiled files are put in another dir.
      dist3: {
        dir: 'coffee/45/',
        dest: 'js/'
      },
      // Example4: compiled files are put in the same dir.
      dist4: {
        dir: 'insamedir/'
      }
    },
    watch: {
      dist1: {
        files: '<config:coffee.dist1.files>',
        tasks: 'coffee:dist1 ok'
      },
      dist2: {
        files: '<config:coffee.dist2.files>',
        tasks: 'coffee:dist2 ok'
      },
      dist3: {
        files: 'coffee/45/*.coffee',
        tasks: 'coffee:dist3 ok'
      },
      dist4: {
        files: 'insamedir/*.coffee',
        tasks: 'coffee:dist4 ok'
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'coffee ok');

};
{% endhighlight %}

If files were passed, grunt handles those with `coffee --join`. Else if directory was passed, grunt handles those as "directory to directory" compiling. With these task files, you can handle complicated compilings easily.

These are also useful for other pre processors like [sass][sass], [less][less] or [stylus][stylus]. I put the code I explained here on GitHub. Use these if it's useful for you.

* [Takazudo/gruntExamples](https://github.com/Takazudo/gruntExamples)
* [Takazudo/gruntExamples - Coffee all in one](https://github.com/Takazudo/gruntExamples/tree/master/coffee-all-in-one)



[coffee]: http://coffeescript.org/
[grunt]: https://github.com/cowboy/grunt
[sass]: http://sass-lang.com/
[less]: http://lesscss.org/
[stylus]: http://learnboost.github.com/stylus/

