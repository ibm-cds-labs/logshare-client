var request = require('request');

module.exports = function(id, logshare) {
  var stream = require('stream')
  var writer = new stream.Transform( { objectMode: true } );

  // take an object
  writer._transform = function (obj, encoding, done) {
    // optionally write to the buffer
    this.pause();
    var url = logshare + "/publish/" + id;
    request.post( { url: url, form: obj}, function(e, r, b) {
      done();
    });
  };
  
  return writer;
};