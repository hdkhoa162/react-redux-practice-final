import { SIGN_IN } from '../consts/TodoListTypes';
const INIT_STATE = {
  user: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:      
      return state = Object.assign({}, state, {
        user: action.payload
      });
    default:
      return state;
  }
};
