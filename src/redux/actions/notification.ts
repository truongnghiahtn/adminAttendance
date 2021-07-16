import { Dispatch } from "redux";
import * as apiNotification from "api/notification";
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR, 
  EDIT_NOTIFICATION,
  DELETE_NOTIFICATION,
  EDIT_NOTIFICATION_SUCCESS,
  EDIT_NOTIFICATION_ERROR,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_ERROR,
} from "constant";
import { notification } from "antd";
const openNotification = (type: string, message: string) => {
  notification[type]({
    message,
  });
};
const refreshState = (dispatch, payload: any) => {
    apiNotification
    .getNotificationList(payload)
    .then((res: any) => {
      const notifiList = res.data.data.items.map((item: any, index: number) => {
        return {
          index: index + 1,
          key: item.id,
          nameUser: item.nameUser,
          nameEquipment: item.nameEquipment,
          reason: item.reason,
        };
      });
      const pagination = {
        current: res.data.data.pageIndex,
        pageSize: res.data.data.pageSize,
        total: res.data.data.totalRecords,
        pageCount:res.data.data.pageCount
      };
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: { notifiList, pagination },
      });
    })
    .catch((err: any) => {
      dispatch({ type: GET_NOTIFICATIONS_ERROR, payload: err });
    });
};

const createActionGetNotifi = (type: string) => {
  return (payload?: any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiNotification
      .getNotificationList(payload)
      .then((res: any) => {
        const notifiList = res.data.data.items.map((item: any, index: number) => {
          return {
            index: index + 1,
            key: item.id,
            nameUser: item.nameUser,
            nameEquipment: item.nameEquipment,
            reason: item.reason,
          };
        });
        const pagination = {
          current: res.data.data.pageIndex,
          pageSize: res.data.data.pageSize,
          total: res.data.data.totalRecords,
          pageCount:res.data.data.pageCount
        };
        dispatch({
          type: GET_NOTIFICATIONS_SUCCESS,
          payload: { notifiList, pagination },
        });
      })
      .catch((err: any) => {
        dispatch({ type: GET_NOTIFICATIONS_ERROR, payload: err });
      });
  };
};


const createActionEditNotifi = (type: string) => {
  return (payload?: any,param?:any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiNotification
      .editNotification(payload)
      .then((res: any) => {
        dispatch({ type: EDIT_NOTIFICATION_SUCCESS, payload: res.data });
        openNotification("success", "Xử lý thành công!");
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: EDIT_NOTIFICATION_ERROR, payload: err });
        openNotification("error", "Cập nhật thất bại!");
      });
  };
};

const CreateActionDeleteNotifi = (type: string) => {
  return (payload?: any,param?:any) => (dispatch: Dispatch) => {
    dispatch({ type });
    apiNotification
      .deleteNotification(payload)
      .then((res: any) => {
        dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: res.data });
        openNotification("success", "Xóa thành công!")
        refreshState(dispatch, param);
      })
      .catch((err: any) => {
        dispatch({ type: DELETE_NOTIFICATION_ERROR, payload: err })
        openNotification("error", "Xóa thất bại!");
      })
  }
};


export const getNotifications= createActionGetNotifi(GET_NOTIFICATIONS);
export const editNotification = createActionEditNotifi(EDIT_NOTIFICATION);
export const deleteNotification = CreateActionDeleteNotifi(DELETE_NOTIFICATION);