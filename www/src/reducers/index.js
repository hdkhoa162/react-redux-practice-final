import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import todoListReducer from './TodoList';
import addTodoListReducer from './AddTodoList';
import signInReducer from './Signin';
import updateTodoListReducer from './UpdateTodoList';

const rootReducer = combineReducers({
  form,
  addTodoList: addTodoListReducer,
  todoList: todoListReducer,
  updateTodoList: updateTodoListReducer,
  userSignIn: signInReducer
});

export default rootReducer;
