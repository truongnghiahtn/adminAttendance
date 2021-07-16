import api from "../services/api";

const endPoint = "/Student"


export const getStudentList = (params: any) => {
  const { Keyword } = params;
  const { PageIndex } = params;
  const { PageSize } = params;
  return api.get(`${endPoint}/AllPaging?Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
};

export const getStudentCourceList = (params: any) => {
  const { Keyword } = params;
  const { PageIndex } = params;
  const { PageSize } = params;
  const {idCource} =params
  return api.get(`${endPoint}/PagingbyCourse?Id_Course=${idCource}&Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
};

export const getStudentScheduleList = (params: any) => {
  const {id} =params
  return api.get(`${endPoint}/PagingBySchedule?id_Schedule=${id}`);
};


export const getStudentById = (params: any) => {
  return api.get(`${endPoint}/${params}`);
};

export const postStudent = (params: any) => {
  return api.post(`${endPoint}/Register/Account`, params);
};

export const putStudent = (params: any) => {
  return api.put(`${endPoint}/Update`, params);
};

export const deleteStudent = (params: any) => {
  const url = [endPoint, params].join("/");
  return api.delete(url);
};
