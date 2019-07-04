const modelFormat = require('./modelFormat')
module.exports =users=>{
	
	let newUsers =[]
	for(let value of users.values()){
		newUsers.push(modelFormat({
			user:value
		}).user)
	}
	console.log(newUsers);
	return newUsers
}