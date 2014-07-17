var seneca = require('seneca')()

if (process.env.test) {
	process.send({type: 'ready'});
} 

seneca.add({cmd: 'test', role: 'foo', id: 'A'}, function (err, done) {
  done(null, {})
});

seneca.listen();