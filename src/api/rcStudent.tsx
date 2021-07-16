import api from "../services/api";

const endPoint = "/Student"
const endPointCourse="/Course"


export const getStudentCourseList = (params: any) => {
  const { Keyword } = params;
  const { PageIndex } = params;
  const { PageSize } = params;
  return api.get(`${endPoint}/PagingStudentCourse?Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
};
export const getStudentByKey = (params: any) => {
  return api.get(`${endPoint}/PagingByKeyword?Keyword=${params}`);
};
export const getCourseByKey = (params: any) => {
    return api.get(`${endPointCourse}/AllPagingByKey?Keyword=${params}`);
  };

export const postRCStudent = (params: any) => {
  return api.post(`${endPoint}/Register/Course`, params);
};

export const editConfirmRc= (params: any) => {
  return api.put(`${endPoint}/Update/Confirm`, params);
};


