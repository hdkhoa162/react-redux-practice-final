/***
 * Copyright 2017 @Practice
 * Author: Khoa Huynh
 * Date: 10/20/2018
 * File: ./app.js
 * Description: App setup file.
 ***/

/* Load dependent plugins */
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import logger from './app/helpers/logger';

/* Database Connection*/
import datastore from './config/datastore';

/* Routes */
import routers from './routes';

/* Create App */
const App = express();
global.App = App;

App.use(cors());

/* Database */
datastore.mongodb(mongoose);


App.use(express.static(path.join(__dirname, 'public')));

/* View engine setup */
App.set('views', path.join(__dirname, 'views'));
App.set('view engine', 'ejs');

App.use(cookieParser());
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));

logger.info('====== API BACKEND STARTED =======');

/* Mount router to path */
const router = routers();
App.use('/', router);

export default App;
