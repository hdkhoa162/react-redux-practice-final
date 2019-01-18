import { ADD_TODO_LIST } from '../consts/TodoListTypes';
import { fromJS } from 'immutable';

const INIT_STATE = fromJS({
  addedTasks: ''
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_TODO_LIST:
      const addedTasks = Object.assign({}, state, action.payload);
      return state.set('addedTasks', addedTasks);
    default:
      return state;
  }
};