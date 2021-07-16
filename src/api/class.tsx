import api from "../services/api";

const endPoint= "/Classes"


export const getClassList = (params: any) => {
    const{Keyword}=params;
    const{PageIndex}=params;
    const {PageSize}=params;
    return api.get(`${endPoint}/AllPaging?Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
  };

  export const getClassListV1 = (params?: any) => {
    return api.get(`${endPoint}/All`);
  };
  
  export const getClassById = (params: any) => {
    return api.get(`${endPoint}/${params}`);
  };
  
  export const postClass = (params: any) => {
    return api.post(`${endPoint}/Create`, params);
  };
  
  export const editClass = (params: any) => {
    return api.put(`${endPoint}/Update`, params);
  };
  
  export const deleteClass = (params: any) => {
    const url = [endPoint, params].join("/");
    return api.delete(url);
  };
  