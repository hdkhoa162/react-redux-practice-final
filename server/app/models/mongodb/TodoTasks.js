/***
 * Copyright 2018 @Practice
 * Author: Khoa Huynh
 * Date: 10/21/2018
 * File: model/mongodb/TodoTasks.js
 * Description: This is the base todo tasks
 ***/

import mongoose from 'mongoose';

const TodoTasksModel = function () {

	const schema = mongoose.Schema;

	/* Create a schema */
	const TodoTasksSchema = new schema({
		Description: { type: String, maxLength: 250, required: true },
		StartAt: { type: String, maxLength: 10, required: true },
		Priority: { type: String, maxLength: 100, required: true },
		Status: { type: String, maxLength: 10, default: 'incomplete' },
		IsActive: { type: Boolean, default: true },
		TaskDate: { type: String, maxLength: 20, required: true },
		CreatedAt: { type: Number, default: Date.now },
		UpdatedAt: { type: Number, default: Date.now }
	});	

	/* Load Todo Tasks */
	TodoTasksSchema.methods.addTodoTasks = function (tasks) {

		return new Promise((resolve, reject) => {

			TodoTasksModel.create(tasks).
				then((taskObj) => {
					if (taskObj) {
						return taskObj;
					} else {
						return false;
					}
				}).then((up) => { resolve(up); }).
				catch((error) => {
					reject(error);
				});
		});

	};

	/* Load Todo Tasks By Date*/
	TodoTasksSchema.methods.loadTasksByDate = function (date) {

		return new Promise((resolve, reject) => {

			TodoTasksModel.find({ TaskDate: date, IsActive: true }).
				then((tasks) => {
					if (tasks.length > 0) {
						return tasks;
					} else {
						return false;
					}
				}).then((up) => { resolve(up); }).
				catch((error) => {
					reject(error);
				})

		});

	};

	TodoTasksSchema.methods.updateTasks = function (data, updateStatus, active) {
		let _id = [];
		return new Promise((resolve, reject) => {
			data.map((doc) => {
				_id.push(doc._id);
			})

			TodoTasksModel.updateMany({ _id: { $in: _id } },
				{ $set: { Status: updateStatus, IsActive: active } }).then((tasks) => {
					if (tasks) {
						return tasks;
					} else {
						return false;
					}
				}).then((up) => { resolve(up); }).
				catch((error) => {
					reject(error);
				})
		});

	};

	/* Create a table with the predefined schema */
	return mongoose.model('TodoTasks', TodoTasksSchema);

}();

/* Create a table with the predefined schema */
module.exports = TodoTasksModel;
