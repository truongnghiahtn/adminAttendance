import { Dispatch } from "redux";
import * as apiClass from "api/class";
import {
  GET_CLASSES,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  GET_CLASSESV1,
  GET_CLASSES_SUCCESSV1,
  GET_CLASSES_ERRORV1,
  ADD_CLASS,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_ERROR,
  EDIT_CLASS,
  DELETE_CLASS,
  EDIT_CLASS_SUCCESS,
  EDIT_CLASS_ERROR,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR,
} from "constant";
import { notification } from "antd";
const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};
const refreshState = (dispatch, payload: any) => {
  apiClass
    .getClassList(payload)
    .then((res: any) => {
      const classList = res.data.data.items.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id_Class,
          name: item.name,
          description: item.description,
        };
      });
      const pagination = {
        current: res.data.data.pageIndex,
        pageSize: res.data.data.pageSize,
        total: res.data.data.totalRecords,
        pageCount:res.data.data.pageCount
      };
      dispatch({
        type: GET_CLASSES_SUCCESS,
        payload: { classList, pagination },
      });
    })
    .catch((err: any) => {
      dispatch({ type: GET_CLASSES_ERROR, payload: err });
    });
};

const createActionGetClass = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiClass
      .getClassList(payload)
      .then((res: any) => {
        const classList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Class,
            name: item.name,
            description: item.description,
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount:res.data.data.pageCount
        };
        dispatch({
          type: GET_CLASSES_SUCCESS,
          payload: { classList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_CLASSES_ERROR, payload: err });
      });
  };
};


const createActionGetClassV1 = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiClass
      .getClassListV1()
      .then((res: any) => {
        const classList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Class,
            name: item.name,
            description: item.description,
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount:res.data.data.pageCount
        };
        dispatch({
          type: GET_CLASSES_SUCCESSV1,
          payload: { classList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_CLASSES_ERRORV1, payload: err });
      });
  };
};

const createActionAddClass = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiClass
      .postClass(payload)
      .then((res: any) => {
        dispatch({ type: ADD_CLASS_SUCCESS, payload: res.data });
        openNotification("success", "Thêm thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_CLASS_ERROR, payload: err });
        openNotification("error", "Thêm thất bại!");
      });
  };
};

const createActionEditClass = (type: string) => {
  return (payload?: any,param?:any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiClass
      .editClass(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_CLASS_SUCCESS, payload: res.data });
        openNotification("success", "Cập nhật thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_CLASS_ERROR, payload: err });
        openNotification("error", "Cập nhật thất bại!");
      });
  };
};

const CreateActionDeleteClass = (type: string) => {
  return (payload?: any,param?:any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiClass
      .deleteClass(payload)
      .then((res: any) => {
        dispatch({ type: DELETE_CLASS_SUCCESS, payload: res.data });
        openNotification("success", "Xóa thành công!")
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: DELETE_CLASS_ERROR, payload: err })
        openNotification("error", "Xóa thất bại!");
      })
  }
};


export const getClasses = createActionGetClass(GET_CLASSES);
export const getClassesV1 = createActionGetClassV1(GET_CLASSESV1);
export const addClass = createActionAddClass(ADD_CLASS);
export const editClass = createActionEditClass(EDIT_CLASS);
export const deleteClass = CreateActionDeleteClass(DELETE_CLASS);
