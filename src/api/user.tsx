import api from "../services/api";

const endPoint= "/Users"


export const getUserList = (params: any) => {
    const{Keyword}=params;
    const{PageIndex}=params;
    const {PageSize}=params;
    return api.get(`${endPoint}/AllPaging?Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
  };

  
  export const getUserById = (params: any) => {
    return api.get(`${endPoint}/${params}`);
  };
  
  export const postUser = (params: any) => {
    return api.post(`${endPoint}/Register/Account`, params);
  };
  export const deleteUser = (params: any) => {
    const url = [endPoint, params].join("/");
    return api.delete(url);
  };
  