var ws = require('nodejs-websocket')
var server = ws.createServer(function (conn) {
	console.log('have a new connection')
	conn.on('text', function (str) {
		broadcast(str);
	})
	conn.on('close',function(){
		console.log('close')
	})
	conn.on('error', function (msg) { console.log(msg) })

}).listen(2333)

function broadcast(msg) {
	server.connections.forEach(function (el) {
		el.send(msg)
	})
}