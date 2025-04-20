import Reuqest from './index'

export function getCaptcha<T>(){
    return Reuqest.request<T>({
      url:'/res/captcha',
      method: 'GET',
    })
}