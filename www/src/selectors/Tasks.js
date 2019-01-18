import { createSelector } from 'reselect';

const getAllTodoItems = (state) => {
  return state.get('todoList')
}

const selectAllTodoItems = () => createSelector(
  getAllTodoItems,
  (state) => state.get('items')
)

const selectAllTodoItemsByDate = () => createSelector(
  getAllTodoItems,
  (state) => state.get('itemsByDate')
)

export {
  selectAllTodoItems,
  selectAllTodoItemsByDate
}


