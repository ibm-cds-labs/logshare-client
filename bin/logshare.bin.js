#!/usr/bin/env node
var logshare = 'https://logshare.mybluemix.net';
var logshare = 'http://localhost:6020';
var stdin = process.stdin;
var URL = require('url');
var request = require('request');


var kill = function(id) {
  var url = logshare + '/stop/' + id;
  request({url: url, method: 'get'}, function(e, r, b) {
    process.exit();
  });
};

var usage = function() {
  console.error("Usage:");
  console.error("    tail -f /var/log/messages | logshare");
  console.error("i.e. you must pipe something into logshare");
  process.exit(1);
};

if (stdin.isTTY) {
  var argv = require('minimist')(process.argv.slice(2));
  if (argv._.length == 0) {
    usage();
  } 
  var param = argv._[0];
  var parsed =  URL.parse(param);
  var queryurl = null;
  if (parsed.protocol && parsed.pathname && parsed.pathname.match(/share\/.+/)) {
    parsed.pathname = parsed.pathname.replace(/\/share\//, '/monitor/');
    queryurl = URL.format(parsed);
  } else {
    queryurl = logshare + '/monitor/' + param;
  }

  request.get(queryurl, function(err, res, body) {
    if (err) {
      console.error("Invalid share url or token");
      usage();
    }
    body = JSON.parse(body);
    if (!body.dbname || !body.dburl) {
      console.error("Invalid share url or token");
      usage();
    }
    var cloudant = require('cloudant')(body.dburl);
    var mydb = cloudant.db.use(body.dbname)
    var feed = mydb.follow({ since: 'now', include_docs:true});
    feed.on('change', function (change) {
      console.log(change.doc.body);
    });
    feed.follow();
  });

} else {
  var liner = require('../lib/liner.js');
  var objectifier = require('../lib/objectifier.js')
  
  // create a new logshare service
  var url = logshare + '/start'
  
  request.get(url, function(err, res, body) {
    if (err) {
      console.error("Could not contact the logshare server");
      process.exit(1);
    }
    body=JSON.parse(body);

    var writer = require('../lib/writer.js')(body.id, logshare);
    stdin.resume();  
    stdin.pipe(liner).pipe(objectifier).pipe(writer);
    console.log("Share URL:", body.shareurl);

    process.on('SIGINT', function() {
      kill(body.id)
    });
  });
}



  
