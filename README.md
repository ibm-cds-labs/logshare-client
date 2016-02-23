# logshare-client

Simple log-sharing utility built with Node.js and Cloudant.

## Installation

    npm install -g logshare
  
## Running

    >tail -f /var/log/system.log | logshare
    Share URL: https://logshare.mybluemix.net/share/kkdgapgdx

Put the URL in your browser and share it with the people you want to share your data with.

![Demo](https://github.com/glynnbird/logshare/raw/master/public/img/demo.gif)

Alternatively, they can run logshare too like this:

    > logshare https://logshare.mybluemix.net/share/kkdgapgdx

or

    > logshare kkdgapgdx

to consume the stream of logs at their terminal.

## Stopping
  
    Ctrl-C

When `logshare` is killed, it deletes the data you streamed to it.

## Options

When sharing a stream, you can also direct the stream to your terminal by adding the `-f` command-line switch e.g.

    >tail -f /var/log/system.log | logshare -f
    Share URL: https://logshare.mybluemix.net/share/kkdgapgdx
    2016-01-01 Log Messages appear here
    2016-01-01 and here

## Live Demo

Visit [https://logshare.mybluemix.net](https://logshare.mybluemix.net) for a live demo.

## What is this code?

This is the command-line client code for `logshare`. The server-side code lives in a [separate repository](https://github.com/glynnbird/logshare-server). 