/***
 * Copyright 2018 @Practice
 * Author: Khoa Huynh
 * Date: 
 * File: models/mongodb/index.js
 * Description: mongodb models loader.
 ***/

import fs from 'fs';

const exports = {};

fs.readdirSync(__dirname).forEach(function(fileName){
	if (fileName !== 'index.js') {
		const requireName = `${__dirname}/${fileName}`;
		exports[fileName.replace('.js','')] = require(requireName);
	}
});

export default exports;
