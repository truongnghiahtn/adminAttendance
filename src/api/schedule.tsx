import api from "../services/api";

const endPoint = "/Schedule"


export const getScheduleList = (params: any) => {
  const { id } = params;
  return api.get(`${endPoint}/AllPaging?Id_Course=${id}`);
};

export const postSchedule = (params: any) => {
  return api.post(`${endPoint}/Create`, params);
};

export const editSchedule = (params: any) => {
  return api.put(`${endPoint}/Update`, params);
};

export const deleteSchedule = (params: any) => {
  const url = [endPoint, params].join("/");
  return api.delete(url);
};
