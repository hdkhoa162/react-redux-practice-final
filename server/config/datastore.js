/***
 * Copyright 2017 @Practice
 * Author: Khoa Huynh
 * Date: 10/20/2018
 * File: config/datastore.js
 * Description: Datastore configurations.
 ***/

const mongodb = (mongoose) => {

	const options = {		
		useNewUrlParser: true
	};

	return mongoose.connect(
		'mongodb://khoahuynh:whatismongodb123@ds137763.mlab.com:37763/todo', 
		options, 
		(error) => {			
			if (error) throw error;
		}
	);

};

export default {
	mongodb	
};
