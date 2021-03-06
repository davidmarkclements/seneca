/* Copyright (c) 2014 Richard Rodger, MIT License */
"use strict"


var events = require('events')

var assert = require('chai').assert

var seneca = require('../..')



describe('plugin.options', function() {

  it('happy', function() {
    var si = seneca({test:{silent:true}})

    si.use('options',{a:1})
    assert.equal(1,si.export('options').a)

    si.use('options',require('./options.file.js'))
    assert.equal(2,si.export('options').b)
  })
})
