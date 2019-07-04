

module.exports=user=>{
	 
	let schema = ['username','key','avatar']

	let newUser={}
	schema.forEach(property=>{
		newUser[property] =  user[property]
	})
	
	return newUser;
}