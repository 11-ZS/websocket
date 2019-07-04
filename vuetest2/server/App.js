const ws = require('nodejs-websocket');

var server = ws.createServer(function (socket) {
	require('./receive')(socket);

	socket.on('text', function (pack) {
		console.log(pack)
		pack = JSON.parse(pack); 
		socket.receive[pack.type](pack.data); 
	})
	socket.on('error', function (error) {
		console.log('error');
	})
	socket.on('close', function () {
		console.log('close')
		socket.receive.quit();
		
	})
}).listen(3555, '', function () {
	console.log('server start')
});

 