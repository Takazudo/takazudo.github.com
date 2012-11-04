/**
 * jekyll
 * PROBLEM: can't read Ruby stdout from node
 */
module.exports = function(grunt){
  
  var log = grunt.log;

  // Nodejs libs.
  var proc = require('child_process');
  var stdout = process.stdout;

  grunt.registerTask('jekyll', 'done!', function(){
    var done = this.async();
    log.writeln('waiting...');
    var jekyll = proc.spawn('jekyll', ['--auto']);
    jekyll.stdout.on('data', function(data) {
      stdout.write('moge');
      //log.writeln(data);
    });
    jekyll.stderr.on('data', function(data) {
      console.log('foo');
      //log.writeln(data);
    });
    jekyll.on('exit', function(data) {
      log.writeln('got error! code:' + data);
      done();
    });
  });

};
