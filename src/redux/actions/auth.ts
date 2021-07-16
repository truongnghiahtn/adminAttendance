import { Dispatch } from "redux";
import * as apiUser from "api/auth";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  GET_PROFILE_USER_SUCCESS,
  GET_PROFILE_USER_ERROR,
  GET_PROFILE_USER,

} from "constant";
import { save, remove } from "services/localStorage";
import swal from "sweetalert";


const createActionLoginUser = (type: string) => {
  return (payload?: any, history?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .loginUser(payload)
      .then((res: any) => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data.data });
        // save("accessToken", res.data.data.accessToken);
        sessionStorage.setItem('accessToken', res.data.data.accessToken);
        sessionStorage.setItem('id', res.data.data.id);
        history.push("/");
      })
      .catch((err: any) => {
        dispatch({ type: LOGIN_USER_ERROR, payload: err.message });
        swal({
          title: "Login error",
          icon: "error",
          timer: 1500,
        });
      });
  };
};

const createActionGetUser = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiUser
      .getUser(payload)
      .then((res: any) => {
        dispatch({ type: GET_PROFILE_USER_SUCCESS, payload: res.data.data });
      })
      .catch((err: any) => {
        dispatch({ type: GET_PROFILE_USER_ERROR, payload: err.message });
      });
  };
};

const createActionLogoutUser = (type: string) => {
  return () => (dispatch: Dispatch) => {
    // remove("accessToken");
    sessionStorage.removeItem('accessToken')
    sessionStorage.removeItem('id')
    dispatch({ type });
  };
};


export const loginUser = createActionLoginUser(LOGIN_USER)
export const logoutUser= createActionLogoutUser(LOGOUT_USER)
export const getUser=createActionGetUser(GET_PROFILE_USER)