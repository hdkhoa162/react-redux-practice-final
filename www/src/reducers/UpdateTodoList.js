import { UPDATE_TODO_LIST } from '../consts/TodoListTypes';
import { fromJS } from 'immutable';

const INIT_STATE = fromJS({
    updatedTasks: ''
});

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPDATE_TODO_LIST:
            const updatedTasks = Object.assign({}, state, action.payload);
            return state.set('updatedTasks', updatedTasks);
        default:
            return state;
    }
};