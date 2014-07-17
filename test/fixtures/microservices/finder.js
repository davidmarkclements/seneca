var seneca = require('seneca')()


setTimeout(function () {


	var act = seneca.findact({cmd: 'test', role: 'testing', id: 'A'})

	if (process.env.test) {
		process.send(act)
		return;
	}

	console.log('Act - ', act)

}, 1000)

seneca.client();