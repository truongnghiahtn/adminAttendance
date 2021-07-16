import { IAction } from "interfaces";
import { IAuthState } from "redux/store/types";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_PROFILE_USER,
  GET_PROFILE_USER_SUCCESS,
  GET_PROFILE_USER_ERROR,
} from "constant";
import _ from "lodash";

const initialState: IAuthState = {
  isLoading: false,
  loginSuccess: false,
  id: "",
  Type: "",
  User: {}
}

const User = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOGIN_USER:
      return _.assign({}, state, { isLoading: true });
    case LOGIN_USER_SUCCESS:
      return _.assign({}, state, { isLoading: false, loginSuccess: true, ...action.payload });
    case LOGIN_USER_ERROR:
      return _.assign({}, state, { isLoading: false, loginSuccess: false });
    case GET_PROFILE_USER:
      return _.assign({}, state, { isLoading: true });
    case GET_PROFILE_USER_SUCCESS:
      return _.assign({}, state, { isLoading: false,  User:action.payload});
    case GET_PROFILE_USER_ERROR:
      return _.assign({}, state, { isLoading: false });
    default:
      return state;
  }
}

export default User