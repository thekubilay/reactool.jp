import axios from "axios";
import {API_HANDLER} from "@/config";

export default {     
  LOAD_TOKEN(payload){
    return axios.post(API_HANDLER.database_api+"rest-auth/login/", payload)
  },
  LOG_OUT(){
    return axios.post(API_HANDLER.database_api+"rest-auth/logout/")
  },
  LOAD_USERS_API(){
    return axios.get(API_HANDLER.database_api+"profiles/")
  },
  LOAD_USER_API(payload){
    axios.defaults.headers.common['Authorization'] = "Token "+localStorage.getItem("token");
    if (payload===null) {
      return axios.get(API_HANDLER.database_api+"profiles/"+localStorage.getItem("userId")+"/")      
    } else {
      return axios.put(API_HANDLER.database_api+"profiles/"+localStorage.getItem("userId")+"/", payload)
    }
  },
  CREATE_NEW_USER_API(payload){
    return axios.post(API_HANDLER.database_api+"rest-auth/registration/",payload)
  },
}