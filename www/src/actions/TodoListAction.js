import { ADD_TODO_LIST, TODO_LIST_BY_DATE, UPDATE_TODO_LIST } from '../consts/TodoListTypes';
import axios from 'axios';
import _ from 'lodash';

export const addTodoList = (tasks, token) => {

  const request = axios({
    method: 'post',
    url: '//localhost:3000/addtasks',
    data: {tasks, jwt: token}
    // data: tasks
  });

  return request.then((response) => {
    return {
      type: ADD_TODO_LIST,
      payload: response.data
    }
  })

};

export const loadTasksByDate = (taskDate, token) => {

  const request = axios({
    method: 'get',    
    url: '//localhost:3000/loadtaskbydate',
    params: {
      taskDate: taskDate,
      jwt: token
    }
  });

  return request.then((response) => {
    return {
      type: TODO_LIST_BY_DATE,
      payload: response.data
    }
  })

};

export const updateTodoList = (todoItems, token) => {
  const request = axios({
    method: 'get',
    url: '//localhost:3000/updatetask',
    params: {
      items: JSON.stringify(todoItems),
      jwt: token
    }
  });

  return request.then((response) => {
    return {
      type: UPDATE_TODO_LIST,
      payload: response.data
    }
  })

};

