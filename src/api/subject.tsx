import api from "../services/api";

const endPoint= "/Subject"


export const getSubjectList = (params: any) => {
    const{Keyword}=params;
    const{PageIndex}=params;
    const {PageSize}=params;
    return api.get(`${endPoint}/AllPaging?Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
  };
  
  export const getSubjectListV1 = (params?: any) => {
    return api.get(`${endPoint}/All`);
  };
  export const getSubjectById = (params: any) => {
    return api.get(`${endPoint}/${params}`);
  };
  
  export const postSubject = (params: any) => {
    return api.post(`${endPoint}/Create`, params);
  };
  
  export const editSubject = (params: any) => {
    return api.put(`${endPoint}/Update`, params);
  };
  
  export const deleteSubject = (params: any) => {
    const url = [endPoint, params].join("/");
    return api.delete(url);
  };
  