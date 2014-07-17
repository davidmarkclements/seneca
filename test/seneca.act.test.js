var fork = require("child_process").fork;
var assert = require("assert");
var should = require('chai').should();
var path = require('path');
var microservices = ['test', 'fixtures', 'microservices'];

var buildPath = path.join.apply.bind(path.join, path);

var paths = {
  receiver: buildPath(microservices.concat('receiver.js')),
  caller: buildPath(microservices.concat('caller.js')),
  finder: buildPath(microservices.concat('finder.js'))
};

describe('seneca.act', function () {

  it('should call acts added in other processes', function (done) {
    var receiver = fork(paths.receiver, {
      silent: true, 
      env: {test: true}
    });
    var caller;

    receiver.once('message', function (msg) {
      if (msg.type === 'ready') {
        caller = fork(paths.caller, {
          silent: true,
          env: {test: true}
        });

        caller.on('message', function (msg) {
          if (msg.type === 'error') { console.log(msg.details); }
          msg.type.should.equal('success');
          done();
        });

      }
    });

  })

})

describe('seneca.findact', function () {


  it('should find acts added in other processes', function (done) {
    var receiver = fork(paths.receiver, {
      silent: true, 
      env: {test: true}
    });
    var finder;

    receiver.once('message', function (msg) {
      if (msg.type === 'ready') {
        finder = fork(paths.finder, {
          silent: true,
          env: {test: true}
        });

        finder.on('message', function (act) {
          should.exist(act);

          if (act) {
            console.log(act);
            act.plugin_nameref.should.not.equal('-');
          }

          done();
        });

      }
    });

  })

})





