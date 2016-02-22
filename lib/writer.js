var request = require('request');

module.exports = function(id, logshare) {
  var stream = require('stream')
  var writer = new stream.Transform( { objectMode: true } );

  var socket = require('socket.io-client')(logshare);
  socket.on('baddata', function(message){
    console.error("Invalid token");
    process.exit(1);
  });

  // take an object
  writer._transform = function (obj, encoding, done) {
    this.pause();
    socket.emit('publish', { id: id, body: obj.body});
    done();
  };
  
  return writer;
};