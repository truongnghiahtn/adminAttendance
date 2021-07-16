import { Dispatch } from "redux";
import * as apiSchedule from "api/schedule";
import {
  GET_SCHEDULE,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_ERROR,
  ADD_SCHEDULE_SUCCESS,
  ADD_SCHEDULE_ERROR,
  EDIT_SCHEDULE_SUCCESS,
  EDIT_SCHEDULE_ERROR,
  DELETE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_ERROR,
  ADD_SCHEDULE,
  EDIT_SCHEDULE,
  DELETE_SCHEDULE,
  SAVE_SCHEDULE,
} from "constant";
import { notification } from "antd";
const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};
const refreshState = (dispatch, payload: any) => {
  apiSchedule
    .getScheduleList(payload)
    .then((res: any) => {
      const scheduleList = res.data.data.items.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id_Schedule,
          name: item.nameCourse,
          nameClass: item.nameClass,
          date: item.date,
          timeBegin: item.timeBegin,
          timeEnd: item.timeEnd
        };
      });
      const pagination = {
        current: res.data.data.pageIndex,
        pageSize: res.data.data.pageSize,
        total: res.data.data.totalRecords,
        pageCount: res.data.data.pageCount
      };
      dispatch({
        type: GET_SCHEDULE_SUCCESS,
        payload: { scheduleList, pagination },
      });
    })
    .catch((err: any) => {
      dispatch({ type: GET_SCHEDULE_ERROR, payload: err });
    });
};

const createActionGetSchedule = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSchedule
      .getScheduleList(payload)
      .then((res: any) => {
        const scheduleList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id_Schedule,
            name: item.nameCourse,
            nameClass: item.nameClass,
            date: item.date,
            timeBegin: item.timeBegin,
            timeEnd: item.timeEnd
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount: res.data.data.pageCount
        };
        dispatch({
          type: GET_SCHEDULE_SUCCESS,
          payload: { scheduleList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_SCHEDULE_ERROR, payload: err });
      });
  };
};

const createActionAddSchedule = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSchedule
      .postSchedule(payload)
      .then((res: any) => {
        dispatch({ type: ADD_SCHEDULE_SUCCESS, payload: res.data });
        openNotification("success", "Thêm thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: ADD_SCHEDULE_ERROR, payload: err });
        openNotification("error", "Thêm thất bại!");
      });
  };
};

const createActionEditSchedule = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSchedule
      .editSchedule(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_SCHEDULE_SUCCESS, payload: res.data });
        openNotification("success", "Cập nhật thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_SCHEDULE_ERROR, payload: err });
        openNotification("error", "Cập nhật thất bại!");
      });
  };
};

const CreateActionDeleteSchedule = (type: string) => {
  return (payload?: any, param?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiSchedule
      .deleteSchedule(payload)
      .then((res: any) => {
        dispatch({ type: DELETE_SCHEDULE_SUCCESS, payload: res.data });
        openNotification("success", "Xóa thành công!")
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: DELETE_SCHEDULE_ERROR, payload: err })
        openNotification("error", "Xóa thất bại!");
      })
  }
};

 const CreateActionSaveSchedule=()=>{
  return (payload?:any)=>(dispatch:Dispatch)=>{
    const {year}=payload;
    const {semeter}=payload;
    const {course}=payload;
    dispatch({
      type: SAVE_SCHEDULE,
      payload: {year,semeter,course}
    });
  }
}




export const getSchedules = createActionGetSchedule(GET_SCHEDULE);
export const addSchedule = createActionAddSchedule(ADD_SCHEDULE);
export const editSchedule = createActionEditSchedule(EDIT_SCHEDULE);
export const deleteSchedule = CreateActionDeleteSchedule(DELETE_SCHEDULE);
export const saveSchedule= CreateActionSaveSchedule();

