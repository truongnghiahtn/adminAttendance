import api from "services/api";

const endPointAuth = "/Users/authenticate";
const endPoint ="/Users"

export const loginUser = (params: any) => {
  return api.post(`${endPointAuth}`, params);
};

export const getUser =(params:any)=>{
  return api.get(`${endPoint}/${params}`);
}

