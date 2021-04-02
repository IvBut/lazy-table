import { IUserState, TUserAction, UsersActionsTypes } from '../../types/user';

const initialState: IUserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = (state: IUserState = initialState, action: TUserAction): IUserState => {
  switch (action.type) {
    case UsersActionsTypes.FETCH_USERS:
      return {
        users: [],
        loading: true,
        error: null
      };
    case UsersActionsTypes.FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
        loading: false,
        error: null
      };
    case UsersActionsTypes.FETCH_USERS_ERROR:
      return {
        users: [],
        loading: false,
        error: action.payload
      };
    default: return state
  }
};
