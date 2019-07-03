const ws = require('nodejs-websocket');

var server = ws.createServer(function (socket) {
	require('./receive')(socket);

	socket.on('text', function (pack) {
		pack = JSON.parse(pack);
		console.log(socket.receive[pack.type]);
		socket.receive[pack.type](pack.data);
		// pack = JSON.parse(pack);
		// pack.type="init"
		// console.log(pack);
		// pack.data.user.key = socket.key;
		// socket.send(JSON.stringify(pack));
	})
	socket.on('error', function (error) {
		console.log('error');
	})
	socket.on('close', function () {
		console.log('close')
	})
}).listen(3555, '', function () {
	console.log('server start')
});

 