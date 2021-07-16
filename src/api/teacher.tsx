import api from "../services/api";

const endPoint= "/Teacher"


export const getTeacherList = (params: any) => {
    const{Keyword}=params;
    const{PageIndex}=params;
    const {PageSize}=params;
    return api.get(`${endPoint}/AllPaging?Keyword=${Keyword}&PageIndex=${PageIndex}&PageSize=${PageSize}`);
  };

  export const getTeacherListV1 = (params?: any) => {
    return api.get(`${endPoint}/All`);
  };
  