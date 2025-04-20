/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
import axios from "axios";
import type { AxiosInstance,InternalAxiosRequestConfig,AxiosResponse,AxiosError,AxiosRequestConfig} from "axios";

interface ResponseData<T> {
  code:number
  data:T
  msg:string
}

class Request {
  interface:AxiosInstance
  constructor(){
    this.interface = axios.create({
      baseURL:import.meta.env.VITE_APP_API_BASEURL,
      timeout:60000
    })

    this.interface.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
      config.headers['Authorization']='Bearer '+localStorage.getItem('coderStationToken')
      return config
    },(error:AxiosError)=>{
      return Promise.reject(error)
    })

    this.interface.interceptors.response.use(
      (response:AxiosResponse<ResponseData<any>>)=>{
        if(response.data.data|| response.data){
          return response;
        }
       return Promise.reject(new Error('错误'));
    },(error)=>{ 
      return Promise.reject(error)
    })
  }

  request<T>(config:AxiosRequestConfig):Promise<T>{
    return new Promise(async (resolve,reject)=>{
      try{
        const res:AxiosResponse<ResponseData<T>>=await this.interface.request(config)
        resolve(res.data as T)
      }catch(err){
        reject(err)
      } 
    })
  }
}


export default new Request();