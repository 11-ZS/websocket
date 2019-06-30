const ws = require('nodejs-websocket');
var server = ws.createServer(function (conn) {
	console.log(conn);
	require('./handle')(conn);
	
	conn.on('text', function (text) {
		console.log(conn)
		var message = JSON.parse(text)
		conn.handle(message);

	})

	conn.on('error', err => {
		console.log('err')
	})
}).listen(3555);
