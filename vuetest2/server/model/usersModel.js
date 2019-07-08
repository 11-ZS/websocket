const modelFormat = require('./modelFormat')
module.exports =users=>{
	
	let newUsers =[]
	for(let key of users.keys()){
		newUsers.push(modelFormat({
			 user:users.get(key)
		}).user)
	}
	console.log(newUsers);
	return newUsers
}