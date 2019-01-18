/***
 * Copyright 2018 @Practice
 * Author: Khoa Huynh
 * Date: 
 * File: controllers/index.js
 * Description:
 ***/

import fs from 'fs';

const controllers = {};

fs.readdirSync(__dirname).forEach(function(fileName) {
	if (fileName !== 'index.js') {
    const requireName = `${__dirname}/${fileName}`;    
		controllers[fileName.replace('.js','')] = require(requireName).default;
	}
});

export default controllers;