import Request from './index'
export default function getRestoringState<T>(){
    return Request.request<T>({
      url:'/api/admin/whoami',
       method: 'GET',
     })
}