var stream = require('stream');
var objectifier = new stream.Transform( { objectMode: true } );
 
objectifier._transform = function (data, encoding, done) {
  var obj = {body:data};
  this.push(obj);
  done();
}
 
module.exports = objectifier