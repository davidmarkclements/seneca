var seneca = require('seneca')()




if (process.env.test) {
	seneca._events.error = function () {
		process.send({type: 'error', details: arguments});
		process.exit(1);
	}	
}


seneca.act({cmd: 'test', role: 'testing', id: 'A'}, function (err) {
	if (!process.env.test) {return;}
	if (err) { 
		process.send({type: 'error', details: arguments}); 
		process.exit(1);
	}
	process.send({type: 'success'});
	process.exit(0);
});



seneca.client();