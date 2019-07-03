
let users = new Map();
module.exports = socket => { 
	var receive = {
		signIn(data) {
			data.user.key = socket.key;  
			users.set(data.user.username,Object.assign({},data.user,{socket}))
			console.log(users);
			send('init', data);
		}
	}
	function send(type, data) {
		var pack = {
			type: type,
			data
		}
		pack = JSON.stringify(pack);
		socket.send(pack); 
	}
 
	socket.receive = receive;
}