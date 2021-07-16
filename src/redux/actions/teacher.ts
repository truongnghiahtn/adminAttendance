import { Dispatch } from "redux";
import * as apiTeacher from "api/teacher";
import {
  GET_TEACHERS,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_ERROR,
  GET_TEACHERSV1,
  GET_TEACHERS_SUCCESSV1,
  GET_TEACHERS_ERRORV1,
} from "constant";
import { notification } from "antd";
const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};
const refreshState = (dispatch, payload: any) => {
  apiTeacher
    .getTeacherList(payload)
    .then((res: any) => {
      const teacherList = res.data.data.items.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id,
          name: item.fullName,
          email: item.email,
          teacherCourses:item.teacherCourses,
        };
      });
      const pagination = {
        current: res.data.data.pageIndex,
        pageSize: res.data.data.pageSize,
        total: res.data.data.totalRecords,
        pageCount:res.data.data.pageCount
      };
      dispatch({
        type: GET_TEACHERS_SUCCESS,
        payload: { teacherList, pagination },
      });
    })
    .catch((err: any) => {
      dispatch({ type: GET_TEACHERS_ERROR, payload: err });
    });
};

const createActionGetTeachers = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiTeacher
      .getTeacherList(payload)
      .then((res: any) => {
        const teacherList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id,
            name: item.fullName,
            email: item.email,
            teacherCourses:item.teacherCourses,
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount:res.data.data.pageCount
        };
        dispatch({
          type: GET_TEACHERS_SUCCESS,
          payload: { teacherList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_TEACHERS_ERROR, payload: err });
      });
  };
};


const createActionGetTeachersV1 = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiTeacher
      .getTeacherListV1()
      .then((res: any) => {
        const teacherList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id,
            name: item.fullName,
            email: item.email,
            teacherCourses:item.teacherCourses,
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount:res.data.data.pageCount
        };
        dispatch({
          type: GET_TEACHERS_SUCCESSV1,
          payload: { teacherList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_TEACHERS_ERRORV1, payload: err });
      });
  };
};





export const getTeachers = createActionGetTeachers(GET_TEACHERS);
export const getTeachersV1 = createActionGetTeachersV1(GET_TEACHERSV1);

