import { Dispatch } from "redux";
import * as apiUser from "api/user";
import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
} from "constant";
import { notification } from "antd";
const openNotification = (type: string, message: string) => {
    notification[type]({
        message,
    });
};
const refreshState = (dispatch, payload: any) => {
    apiUser
        .getUserList(payload)
        .then((res: any) => {
            const userList = res.data.data.items.map((item: any, index: number) => {
                return {
                    index: index + 1,
                    key: item.id,
                    name: item.fullName,
                    email: item.email,
                    type:item.type
                };
            });
            const pagination = {
                current: res.data.data.pageIndex,
                pageSize: res.data.data.pageSize,
                total: res.data.data.totalRecords,
                pageCount: res.data.data.pageCount
            };
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: { userList, pagination },
            });
        })
        .catch((err: any) => {
            dispatch({ type: GET_USERS_ERROR, payload: err });
        });
};

const createActionGetUser = (type: string) => {
    return (payload?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiUser
        .getUserList(payload)
        .then((res: any) => {
            const userList = res.data.data.items.map((item: any, index: number) => {
                return {
                    index: index + 1,
                    key: item.id,
                    name: item.fullName,
                    email: item.email,
                    type:item.type
                };
            });
            const pagination = {
                current: res.data.data.pageIndex,
                pageSize: res.data.data.pageSize,
                total: res.data.data.totalRecords,
                pageCount: res.data.data.pageCount
            };
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: { userList, pagination },
            });
        })
        .catch((err: any) => {
            dispatch({ type: GET_USERS_ERROR, payload: err });
        });
    };
};

const createActionAddUser = (type: string) => {
    return (payload?: any, param?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiUser
            .postUser(payload)
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data });
                openNotification("success", "Thêm thành công!");
                refreshState(dispatch, param);
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_ERROR, payload: err });
                openNotification("error", `${err.response.data.message}!`);
            });
    };
};

const CreateActionDeleteUser = (type: string) => {
    return (payload?: any, param?: any) => (dispatch: Dispatch) => {
        dispatch({ type });
        apiUser
            .deleteUser(payload)
            .then((res: any) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                openNotification("success", "Xóa thành công!")
                refreshState(dispatch, param);
            })
            .catch((err: any) => {
                dispatch({ type: DELETE_USER_ERROR, payload: err })
                openNotification("error", "Xóa thất bại!");
            })
    }
};


export const getUsers = createActionGetUser(GET_USERS);
export const addUser = createActionAddUser(ADD_USER);
export const deleteUser = CreateActionDeleteUser(DELETE_USER);
