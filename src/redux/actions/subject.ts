import { Dispatch } from "redux";
import * as apiSubject from "api/subject";
import {
  GET_SUBJECTS,
  GET_SUBJECTS_SUCCESS,
  GET_SUBJECTS_ERROR,
  GET_SUBJECTSV1,
  GET_SUBJECTS_SUCCESSV1,
  GET_SUBJECTS_ERRORV1,
  ADD_SUBJECT,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_ERROR,
  EDIT_SUBJECT,
  EDIT_SUBJECT_SUCCESS,
  EDIT_SUBJECT_ERROR,
  DELETE_SUBJECT,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_ERROR,
} from "constant";
import { notification } from "antd";
const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};
const refreshState = (dispatch, payload: any) => {
  apiSubject
    .getSubjectList(payload)
    .then((res: any) => {
      const subjectList = res.data.data.items.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id_Subject,
          name: item.name,
          description: item.description,
          numberOfCredits:item.numberOfCredits,
          lesson:item.lesson
        };
      });
      const pagination = {
        current: res.data.data.pageIndex,
        pageSize: res.data.data.pageSize,
        total: res.data.data.totalRecords,
        pageCount:res.data.data.pageCount
      };
      dispatch({
        type: GET_SUBJECTS_SUCCESS,
        payload: { subjectList, pagination },
      });
    })
    .catch((err: any) => {
      dispatch({ type: GET_SUBJECTS_ERROR, payload: err });
    });
};

const createActionGetSubject = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSubject
      .getSubjectList(payload)
      .then((res: any) => {
        const subjectList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Subject,
            name: item.name,
            description: item.description,
            numberOfCredits:item.numberOfCredits,
            lesson:item.lesson
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount:res.data.data.pageCount
        };
        dispatch({
          type: GET_SUBJECTS_SUCCESS,
          payload: { subjectList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_SUBJECTS_ERROR, payload: err });
      });
  };
};


const createActionGetSubjectV1 = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSubject
      .getSubjectListV1()
      .then((res: any) => {
        const subjectList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Subject,
            name: item.name,
            description: item.description,
            numberOfCredits:item.numberOfCredits,
            lesson:item.lesson
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount:res.data.data.pageCount
        };
        dispatch({
          type: GET_SUBJECTS_SUCCESSV1,
          payload: { subjectList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_SUBJECTS_ERRORV1, payload: err });
      });
  };
};


const createActionAddSubject = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSubject
      .postSubject(payload)
      .then((res: any) => {
        dispatch({ type: ADD_SUBJECT_SUCCESS, payload: res.data });
        openNotification("success", "Thêm thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_SUBJECT_ERROR, payload: err });
        openNotification("error", "Thêm thất bại!");
      });
  };
};

const createActionEditSubject = (type: string) => {
  return (payload?: any,param?:any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSubject
      .editSubject(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_SUBJECT_SUCCESS, payload: res.data });
        openNotification("success", "Cập nhật thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_SUBJECT_ERROR, payload: err });
        openNotification("error", "Cập nhật thất bại!");
      });
  };
};

const CreateActionDeleteSubject = (type: string) => {
  return (payload?: any,param?:any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSubject
      .deleteSubject(payload)
      .then((res: any) => {
        dispatch({ type: DELETE_SUBJECT_SUCCESS, payload: res.data });
        openNotification("success", "Xóa thành công!")
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: DELETE_SUBJECT_ERROR, payload: err })
        openNotification("error", "Xóa thất bại!");
      })
  }
};


export const getSubjects = createActionGetSubject(GET_SUBJECTS);
export const getSubjectsV1 = createActionGetSubjectV1(GET_SUBJECTSV1);

export const addSubject = createActionAddSubject(ADD_SUBJECT);
export const editSubject = createActionEditSubject(EDIT_SUBJECT);
export const deleteSubject = CreateActionDeleteSubject(DELETE_SUBJECT);
