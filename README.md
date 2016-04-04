# logshare-client

Simple log-sharing utility built with Node.js and Cloudant.

## Installation

    npm install -g logshare
  
## Running

    >tail -f /var/log/system.log | logshare
    Share URL: https://logshare.mybluemix.net/share/kkdgapgdx

Put the URL in your browser and share it with the people you want to share your data with.

![Demo](https://raw.githubusercontent.com/ibm-cds-labs/logshare-server/master/public/img/demo.gif)

Alternatively, they can run logshare too like this:

    > logshare https://logshare.mybluemix.net/share/kkdgapgdx

or

    > logshare kkdgapgdx

to consume the stream of logs at their terminal.

## Stopping
  
    Ctrl-C

When `logshare` is killed not further data can be streamed to that channel.

## Options

When sharing a stream, you can also view the stream on your terminal by adding the `-f` command-line switch e.g.

    >tail -f /var/log/system.log | logshare -f
    Share URL: https://logshare.mybluemix.net/share/kkdgapgdx
    2016-01-01 Log Messages appear here
    2016-01-01 and here

If you wish to use a *logshare* server other than "https://logshare.mybluemix.net", then you can specify it with an environment variable "LOGSHARE":

    export LOGSHARE=http://localhost:6020


## Live Demo

Visit [https://logshare.mybluemix.net](https://logshare.mybluemix.net) for a live demo.

## What is this code?

This is the command-line client code for `logshare`. The server-side code lives in a [separate repository](https://github.com/ibm-cds-labs/logshare-server). 

## Privacy and data retention

This project makes no guarantees as to the privacy of the data that you stream to logshare. If you are using https://logshare.mybluemix.net then the data is encrypted between the producer and server, and between the server and the consumers. There is no authentication mechanism to prevent an unknown third party observing your data stream, if they can guess the nine-digit session token. So don’t consider it safe for confidential data. It is designed to relay streaming data across development teams temporarily, not for anything you wouldn’t want others to see.

This project does not store your data at any time. Log data goes to a Redis pubsub channel and then relays immediately to any connected clients who have subscribed to that session. The data is then discarded, with only meta data about the session (the number of lines of data and the number of bytes of data received) being retained.
