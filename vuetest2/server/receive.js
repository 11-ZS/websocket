
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
			// users.set(data.user.username, data.user )
			// console.log(users);

			var user = ModelFormat(data)

			users.set(socket, user.user);

			send('init', user);

			//{type:'users',data:{users:[{username,avatar,}]}}
			let u = ModelFormat({
				users
			});

			sendToUsers('getUsers', u)
		},
		speak(data) {
			var user = data.user;
			console.log('targetttt',quser.target);
			if(!user.target){

				sendToUsers('speak',{
					user:data.user,
					content:data.content
				})
			}else{
				for( let key of users.keys()){
					if(key.key===user.target.key){
						send('speak',{
							user,
							content:data.content
						},key)
					}
				}
				send('speak',{
					user,
					content:data.content 
				})
			}
			 
		},
		updateState(data){
			var user = data.user;
			users.set(socket,user);
		},
		quit() {
			console.log(users.get(socket).username + 'is exit')
			users.delete(socket)
			let u = ModelFormat({
				users
			});

			sendToUsers('getUsers', u)
		},

	 
	}
	function send(type, data,target) {
		var pack = {
			type: type,
			data
		}
		pack = JSON.stringify(pack);
		if(!target){

			socket.send(pack);
		}else{
			target.send(pack);
		}
	}
	function sendToUsers(type, data) {
		var pack = {
			type: type,
			data
		}
		pack = JSON.stringify(pack);
		for (let key of users.keys()) {
			key.send(pack);
		}
	}


	socket.receive = receive;
}