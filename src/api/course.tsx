import api from "../services/api";

const endPoint = "/Course"


export const getCourseList = (params: any) => {
  const { Keyword } = params;
  const { PageIndex } = params;
  const { PageSize } = params;
  const {Id}=params
  const{year}=params
  return api.get(`${endPoint}/AllPaging?Id_User=${Id}&Year=${year}&Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
};
export const getCourseListByTeacher = (params: any) => {
  const { Keyword } = params;
  const { PageIndex } = params;
  const { PageSize } = params;
  const { id } = params;
  return api.get(`${endPoint}/PagingByTeacher?Id=${id}&Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
};

export const getCourseListBySemeter = (params: any) => {
  const { Keyword } = params;
  const { SchoolYear } = params;
  const { Semester } = params;
  const { Id } = params;
  return api.get(`${endPoint}/PagingBySemeter?Keyword=${Keyword}&Id_User=${Id}&SchoolYear=${SchoolYear}&Semester=${Semester}`);
};

export const getCourseById = (params: any) => {
  return api.get(`${endPoint}/${params}`);
};

export const postCourse = (params: any) => {
  return api.post(`${endPoint}/Create`, params);
};

export const editCourse = (params: any) => {
  return api.put(`${endPoint}/Update`, params);
};

export const deleteCourse = (params: any) => {
  const url = [endPoint, params].join("/");
  return api.delete(url);
};
