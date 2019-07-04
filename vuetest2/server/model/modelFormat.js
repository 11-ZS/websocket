
module.exports = data=>{
	let keys = Object.keys(data)
	keys.forEach(key=>{
		data[key] = require('./'+key+'Model')(data[key]);
	})
	// console.log(data);
	return data;
}