export enum UsersActionsTypes {
  FETCH_USERS = 'FETCH_USERS',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'
}

export interface IUserState {
  loading: boolean,
  error: null | string,
  users: Array<any>
}

export interface IFetchUserAction {
  type: UsersActionsTypes.FETCH_USERS
}

export interface IFetchUserSuccessAction {
  type: UsersActionsTypes.FETCH_USERS_SUCCESS,
  payload: any[]
}

export interface IFetchUserErrorAction {
  type: UsersActionsTypes.FETCH_USERS_ERROR,
  payload: string
}

export type TUserAction = IFetchUserAction | IFetchUserSuccessAction | IFetchUserErrorAction
