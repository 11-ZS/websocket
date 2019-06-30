module.exports=conn=>{
	conn.handle=function(message){
		conn[message.behavior](message);
	}
	conn.login=function(message){
		this.user = message.user;
		
	}
	conn.message=function(message){
		conn.server.connections.forEach(conn => {
			console.log(message.content)
			conn.send(message.content); 
		});
	}

	
}