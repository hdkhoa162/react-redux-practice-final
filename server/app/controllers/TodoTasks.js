/***
 * Copyright 2018 @Practice
 * Author: Khoa Huynh
 * Date: 08/03/2018
 * File: controllers/TodoTasks.js
 * Description: Provides the base question actions used to handle questions.

 ***/
import models from '../models/mongodb/index';
import _ from 'lodash';

const TodoTasksModel = models.TodoTasks();

const TodoTasksController = {

  index: (request, response, next) => {		// eslint-disable-line no-unused-vars
    // TODO: Need to implement to handle the index route
  },

  loadTasksByDate: async (request, response, next) => {
    const result = {};
    try {
      const taskDate = request.param('taskDate');
      const todoTasksByDate = await TodoTasksModel.loadTasksByDate(taskDate);

      if (todoTasksByDate.length > 0 && todoTasksByDate !== false ) {        
        result.data = todoTasksByDate;
        result.message = 'data_loaded';
        result._rs = 200;
        return response.status(200).json(result);
      } else {        
        result.data = [];
        result.message = 'no_data';
        result._rs = 200;
        return response.status(200).json(result);
      }
    } catch (error) {
      result.data = [];
      result.message = 'error';
      result._rs = 500;
      return response.status(500).json(result);
    }
  },

  addTodoTasks: async (request, response, next) => {
    const result = {};

    try {
      const todoTasks = await TodoTasksModel.addTodoTasks(request.body.tasks);
      
      if (!_.isEmpty(todoTasks) && todoTasks !== false) {
        result.data = todoTasks;
        result.message = 'data_loaded';
        result._rs = 200;
        return response.status(200).json(result);
      } else {
        result.data = [];
        result.message = 'no_data';
        result._rs = 200;
        return response.status(200).json(result);
      }
    } catch (error) {
      result.message = 'error';
      result._rs = 500;
      return response.status(500).json(result);
    }
  },

  updateTodoTasks: async (request, response, next) => {
    const itemList = JSON.parse(request.param('items'));
    let returnedResult = '';
    let finalResult = {};

    finalResult.statusComplete = '';
    finalResult.statusIncomplete = '';
    finalResult.removed = '';

    try {
      if (!_.isEmpty(itemList)) {
        if (itemList.statusComplete.length > 0) {
          returnedResult = await TodoTasksModel.updateTasks(itemList.statusComplete, 'complete', true);
          if (returnedResult.nModified > 0) {
            finalResult.statusComplete = true;
          } else {
            finalResult.statusComplete = false;
          }
        }
        if (itemList.statusIncomplete.length > 0) {
          returnedResult = await TodoTasksModel.updateTasks(itemList.statusIncomplete, 'incomplete', true);
          if (returnedResult.nModified > 0) {
            finalResult.statusIncomplete = true;
          } else {
            finalResult.statusIncomplete = false;
          }
        }
        if (itemList.removed.length > 0) {
          returnedResult = await TodoTasksModel.updateTasks(itemList.removed, 'removed', false);
          if (returnedResult.nModified > 0) {
            finalResult.removed = true;
          } else {
            finalResult.removed = false;
          }
        }
      }

      if (finalResult.removed === false || finalResult.removed === false || finalResult.removed === false) {
        return response.status(200).json({ message: 'no_data', _rs: 200 });
      } else {
        return response.status(200).json({ message: 'success', _rs: 200 });
      }      
    } catch (error) {
      finalResult.message = 'error';
      finalResult._rs = 500;
      return response.status(500).json(finalResult);
    }   
  }

};

export default TodoTasksController;
