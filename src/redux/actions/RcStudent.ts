import { Dispatch } from "redux";
import * as apiRCStudent from "api/rcStudent";
import {
    GET_RCSTUDENT_SUCCESS,
    GET_RCSTUDENT_ERROR,
    GET_RCSTUDENT,
    GET_COURCEBYKEY_SUCCESS,
    GET_COURCEBYKEY_ERROR,
    GET_COURCEBYKEY,
    GET_STUDENTBYKEY_SUCCESS,
    GET_STUDENTBYKEY_ERROR,
    GET_STUDENTBYKEY,
    ADD_RCSTUDENT,
    ADD_RCSTUDENT_SUCCESS,
    ADD_RCSTUDENT_ERROR,
    CONFIRM_RCSTUDENT,
    CONFIRM_RCSTUDENT_SUCCESS,
    CONFIRM_RCSTUDENT_ERROR
} from "constant";
import { notification } from "antd";

const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};

const refreshState = (dispatch, payload: any) => {
  apiRCStudent
  .getStudentCourseList(payload)
  .then((res: any) => {
    const RcStudentList = res.data.data.items.map((item: any, index: number) => {
      return {
        index: index + 1,
        key: item.id,
        id_Cource: item.id_Cource,
        nameUser: item.nameUser,
        nameCourse: item.nameCourse,
        status: item.status,
        dateBegin: item.dateBegin,
        dateUpdate: item.dateBegin,

      };
    });
    const pagination = {
      current: res.data.data.pageIndex,
      pageSize: res.data.data.pageSize,
      total: res.data.data.totalRecords,
      pageCount: res.data.data.pageCount
    };
    dispatch({
      type: GET_RCSTUDENT_SUCCESS,
      payload: { RcStudentList, pagination },
    });
  })
  .catch((err: any) => {
    dispatch({ type: GET_RCSTUDENT_ERROR, payload: err });
  });
};


const createActionGetRcStudent = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiRCStudent
      .getStudentCourseList(payload)
      .then((res: any) => {
        const RcStudentList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id,
            id_Cource: item.id_Cource,
            nameUser: item.nameUser,
            nameCourse: item.nameCourse,
            status: item.status,
            dateBegin: item.dateBegin,
            dateUpdate: item.dateBegin,

          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount: res.data.data.pageCount
        };
        dispatch({
          type: GET_RCSTUDENT_SUCCESS,
          payload: { RcStudentList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_RCSTUDENT_ERROR, payload: err });
      });
  };
};

const createActionGetCoursesByKey = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiRCStudent
      .getCourseByKey(payload)
      .then((res: any) => {
        const courseList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Course,
            name: item.name,
            nameTeacher: item.nameTeacher,
            nameSubject: item.nameSubject,
            schoolYear: item.schoolYear,
            semester: item.semester,
            dateBegin: item.dateBegin,
            dateEnd: item.dateEnd
          };
        });

        dispatch({
          type: GET_COURCEBYKEY_SUCCESS,
          payload: { courseList },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_COURCEBYKEY_ERROR, payload: err });
      });
  };
};


const createActionGetStudentByKey = (type: string) => {
    return (payload?: any) => (dispatch: Dispatch) => {
      dispatch({ type });
      apiRCStudent
        .getStudentByKey(payload)
        .then((res: any) => {
          const studentList = res.data.data.items.map((item: any, index: number) => {
            return {
              index: index + 1,
              key: item.id,
              name: item.fullName,
              email: item.email,
            };
          });
   
          dispatch({
            type: GET_STUDENTBYKEY_SUCCESS,
            payload: { studentList },
          });
        })
        .catch((err: any) => {
          dispatch({ type: GET_STUDENTBYKEY_ERROR, payload: err });
        });
    };
  };

const createActionAddRcStudent = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiRCStudent
      .postRCStudent(payload)
      .then((res: any) => {
        dispatch({ type: ADD_RCSTUDENT_SUCCESS, payload: res.data });
        openNotification("success", "Thêm thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_RCSTUDENT_ERROR, payload: err });
        openNotification("error", "Thêm thất bại!");
      });
  };
};

const createActionConfirmRcStudent = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiRCStudent
      .editConfirmRc(payload)
      .then((res: any) => {
        dispatch({ type: CONFIRM_RCSTUDENT_SUCCESS, payload: res.data });
        openNotification("success", "Cập nhật thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: CONFIRM_RCSTUDENT_ERROR, payload: err });
        openNotification("error", "Cập nhật thất bại!");
      });
  };
};


export const getRcStudent = createActionGetRcStudent(GET_RCSTUDENT);
export const getCoursesByKey = createActionGetCoursesByKey(GET_COURCEBYKEY);
export const getStudentByKey = createActionGetStudentByKey(GET_STUDENTBYKEY);
export const addRcStudent = createActionAddRcStudent(ADD_RCSTUDENT);
export const confirmCourse = createActionConfirmRcStudent(CONFIRM_RCSTUDENT);
