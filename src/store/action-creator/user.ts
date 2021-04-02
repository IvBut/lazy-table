import {TUserAction, UsersActionsTypes} from "../../types/user";
import {Dispatch} from 'redux';
import axios from "axios";

export  const fetchUsers = () => {
  return async (dispatch: Dispatch<TUserAction>) => {
    try {
      dispatch({type: UsersActionsTypes.FETCH_USERS});
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch({type: UsersActionsTypes.FETCH_USERS_SUCCESS, payload: response.data})
    } catch (e) {
      dispatch({type: UsersActionsTypes.FETCH_USERS_ERROR, payload: e.message})
    }
  }
};
