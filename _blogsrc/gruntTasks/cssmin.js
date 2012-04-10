/**
 * cssmin
 */
module.exports = function(grunt){
  
  var log = grunt.log;

  // Nodejs libs.
  var proc = require('child_process');

  grunt.registerMultiTask('cssmin', 'minify css', function() {
    var done = this.async();
    var src = this.file.src;
    var dest = this.file.dest;
    var command = 'sqwish ' + src + ' -o ' + dest;
    var out = proc.exec(command, function(err, sout, serr){
        log.writeln('File ' + dest + ' created.');
        done(true);
    });
  });

};
