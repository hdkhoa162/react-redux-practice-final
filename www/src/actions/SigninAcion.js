import axios from 'axios';
import _ from 'lodash';
import { SIGN_IN } from '../consts/TodoListTypes';

export const signIn = (credentials) => {
  
  const request = axios({
    method: 'post',
    url: '//localhost:3000/signin',
    data: credentials,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return request.then((response) => {
    return {
      type: SIGN_IN,      
      payload: response.data
    }
  })

};
