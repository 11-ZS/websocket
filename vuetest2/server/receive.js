
const users = new Map(); 
const ModelFormat = require('./model/modelFormat')

module.exports = socket => { 
	var receive = {
		signIn(data) {
			socket.username = data.user.usrename;
			console.log(socket.username);
			data.user.key = socket.key;  
			data.user.avatar = './image/avatar.jpg'
			data.user.socket = socket 
			users.set(data.user.username, data.user )
			// console.log(users);
			send('init', ModelFormat(data));

			//{type:'users',data:{users:[{username,avatar,}]}}
			let u = ModelFormat({
				users
			});
 
			sendAll('getUsers',u)
		},
		quit(){
			console.log(socket.username)
			console.log(users.delete(socket.username))
		}
	}
	function send(type, data,) {
		var pack = {
			type: type,
			data
		}
		pack = JSON.stringify(pack);
		socket.send(pack); 
	}
	function sendAll(type,data){
		var pack = {
			type: type,
			data
		}
		pack = JSON.stringify(pack);
		for(let value of users.values()){
				value.socket.send(pack);
		}
	}
 
 
	socket.receive = receive;
}