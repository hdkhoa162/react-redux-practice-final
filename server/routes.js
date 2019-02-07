
/***
 * Copyright 2018 @Practice
 * Author: Khoa Huynh
 * Date: 
 * File: routes/index.js
 * Description: Route: index. Routes declaration is setup in here.
 ***/

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import controllers from './app/controllers';

const routers = (() => {
	
	const ExpressRouter = express.Router();
	const credentials = { username: 'admin', password: '123123123' };

	const isAuthenticated = (request, response, next) => {		
		return jwt.verify(
			request.param('jwt'),
			'secret',
			{ algorithms: ['HS256'] },
			(error, decoded) => {
				if (!_.isEmpty(decoded)) {
					return next();
				} else {
					return response.json({_rs: 500, message: 'TOKEN_EXPIRED', data: [], token: 'undefined'});
				}
			}
		)
	}

	ExpressRouter.get('/', function(request, response, next) {		// eslint-disable-line no-unused-vars return response.send('It works!!!YEAH!!!');
	});	

	ExpressRouter.get('/loadtaskbydate', cors(), isAuthenticated, controllers.TodoTasks.loadTasksByDate);

	ExpressRouter.get('/updatetask', cors(), isAuthenticated, controllers.TodoTasks.updateTodoTasks);

	ExpressRouter.post('/addtasks', cors(), isAuthenticated, controllers.TodoTasks.addTodoTasks);

	ExpressRouter.post('/signin', (request, response, next) => {
		const { username, password } = request.body;
		let token = '';
		let message = '';
		let result = 200;
	
		if (username === credentials.username && password === credentials.password) {			
			token = jwt.sign({
				credentials: { username, password },
				exp: Math.floor(Date.now() / 1000) + (60 * 180)
			}, 'secret')
			message = 'success';
		} else {
			token = 'Wrong username or password';
			message = 'failed';
			result = 500;
		}
		
		return response.json({'_rs': result, message: message, token: token});
	
	})

	return ExpressRouter;
});

export default routers;
