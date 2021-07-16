import api from "../services/api";

const endPoint= "/Notification"

export const getNotificationList = (params: any) => {
    const{Keyword}=params;
    const{Status}=params
    const{PageIndex}=params;
    const {PageSize}=params;
    return api.get(`${endPoint}/AllPaging?Keyword=${Keyword}&Status=${Status}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
  };
  export const editNotification = (params: any) => {
    return api.put(`${endPoint}/Update`, params);
  };
  
  export const deleteNotification = (params: any) => {
    const url = [endPoint, params].join("/");
    return api.delete(url);
  };