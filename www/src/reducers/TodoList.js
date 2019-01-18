import { TODO_ITEMS, TODO_LIST_BY_DATE, ADD_TODO_LIST } from '../consts/TodoListTypes';
import { fromJS } from 'immutable';

const INIT_STATE = fromJS({  
  itemsByDate: ''
});

export default (state = INIT_STATE, action) => {
  switch (action.type) {   
    case TODO_LIST_BY_DATE:
      const todoItemsByDate = Object.assign({}, state, action.payload);
      return state.set('itemsByDate', todoItemsByDate);
    default:
      return state;
  }
};
