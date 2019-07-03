class Socket {
	constructor(url,app) {
		this.ws = new WebSocket(url); 
		this.app = app
		this.ws.onopen = () => {
			console.log('websocket start') 
		}
		
		this.ws.onmessage =pack=>{
			console.log(pack.data);
			pack = JSON.parse(pack.data);
			this.receive(pack);
		}

	}
	send(type, data) {
		var pack = {
			type,
			data
		}
		pack = JSON.stringify(pack)
		console.log(pack);
		this.ws.send(pack);

	}
	receive(pack) {
		if(pack.type){ 
			this.app[pack.type](pack.data);
		}
	}  
}	
