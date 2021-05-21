/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import store from '../store/'
import qs from 'qs'
import specialApi from './specialApi.js'
import { message } from 'ant-design-vue'

// import fs from 'fs'
/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  message.error(msg)
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // router.replace({
  //     path: '/login',
  //     query: {
  //         redirect: router.currentRoute.fullPath
  //     }
  // });
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (err) => {
  if (err.config.url === '/connect/token' && err.data && err.data.error_description) {
    tip(err.data.error_description);
  } else {
    tip(`错误码:${err.status}，接口:${err.config.url}，信息:${err.statusText}`);
  }
  // console.log(status)
  // 状态码判断
  // switch (status) {
  //   // 401: 未登录状态，跳转登录页

  //   case 400:
  //     tip(other ? other :'400错误！');
  //     break;
  //   // 401 token过期
  //   case 401:
  //     toLogin();
  //     break;
  //   // 403 token过期
  //   // 清除token并跳转登录页
  //   case 403:
  //     tip('登录过期，请重新登录');
  //     localStorage.removeItem('token');
  //     store.commit('loginSuccess', null);
  //     setTimeout(() => {
  //       toLogin();
  //     }, 1000);
  //     break;
  //   // 404请求不存在
  //   case 404:
  //     tip('请求的资源不存在');
  //     break;
  //   default:
  //     console.log(other)
  // }
}

//刷新token
const refreshToken = (baseURL)=>{
  const formData  = new FormData()
  formData.append('grant_type', 'refresh_token')
  formData.append('client_id', 'client.api.all')
  formData.append('client_secret', 'bqall')
  formData.append('refresh_token', localStorage.getItem('refresh_token'))
  return instance.post(baseURL+'/connect/token',formData)
}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });
// console.log(instance)
//// 设置post请求头
//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    config.timeout = specialApi.longTimeout.includes(config.url) ? 1000 * 100 : 1000 * 12
    if (specialApi.arraybuffer.includes(config.url)) {
      config.responseType = 'arraybuffer'
    }
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。

    // const token = store.state.token;

    // 如果是获取token接口，header不用加token认证
    const url = config.url
    if(url.indexOf('/connect/token') >= 0){
      return config
    }
    // 創建专科急救(临时)
    else if(url.indexOf('API/ThirdPartyApi/UploadMedicalInfo') >= 0){
      config.headers.thirdParty = 'eyJVc2VyTmFtZSI6ImJxanpkanp5IiwiUGFzc3dvcmQiOiJicTAwMDAwMCJ9'
      return config
    }
    else{
      // 从cookie中获取token（待完成：如果过期，需要无感重新请求刷新token）
      const token = localStorage.getItem('token')
      const tokentype = localStorage.getItem('token_type')
      if(token && tokentype){
        config.headers.Authorization = tokentype + ' ' + token
      }

      return config
    }

  },
  error => Promise.error(error)
)

// token刷新标记
let isTokenRefreshing = false
// 待重试的请求队列，每一项是函数形式，到时直接调用即可
let requests = []
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if(res.status === 200 || res.status === 304){
      if(res.data /*&& res.data.errorCode === 0 */){ // post form-data返回的数据里面没有errorCode
        return Promise.resolve({
          data: res.data.data,
          code: res.data.errorCode,
          msg: res.data.errorMsg,
          allInfo: res
        })
      }else{
        tip(res.data.errorMsg)
        return Promise.reject({
          data: res.data.data,
          code: res.data.errorCode,
          msg: res.data.errorMsg,
          allInfo: res
        })
      }
    }
    else{
      return Promise.reject({
        data:res.data,
        msg:res.statusText,
        code:res.status,
        allInfo: res
      })
    }
  },
  // 请求失败
  error => {
    if (store.state.AppConfig.noInternet) return
    const { response } = error
    // 请求已发出，但是不在2xx的范围
    if (response) {
      const config = response.config
      const baseURL = config.baseURL

      // 若token过期，需要重刷token；正在重刷的过程中，后续的请求先放到retryRequest，等重刷返回之后执行
      if(response.status === 401){
        if(!isTokenRefreshing){
          isTokenRefreshing = true
          return refreshToken(baseURL).then(res=>{
            isTokenRefreshing = false
            const token = res.allInfo.data.access_token
            const tokentype = res.allInfo.data.token_type
            const tokenAuth = tokentype + ' ' + token
            localStorage.setItem('token', token)
            localStorage.setItem('token_type', tokentype)
            localStorage.setItem('refresh_token', res.allInfo.data.refresh_token)

            //response.config是当前失败的请求，需要重置请求
            config.headers.Authorization = tokenAuth

            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(tokenAuth))
            requests = []

            return instance(config)
          }).catch(err=>{
            isTokenRefreshing = false
            // 刷新token失败，跳转登录页？是否需要再试多次？

          }).finally(()=>{
            isTokenRefreshing = false
          })
        } else{
          // 正在刷新token，返回一个未执行resolve的promise
          return new Promise((resolve) => {
            // 将resolve放进队列，函数形式来保存，token刷新后直接执行
            requests.push((tokenAuth) => {
              config.headers.Authorization = tokenAuth
              resolve(instance(config))
            })
          })
        }
      } else {
        errorHandle(response);
        return Promise.reject({
          data:response.data,
          msg:response.statusText,
          code:response.status,
          allInfo: response
        })
      }
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        tip(`系统检测网络中断，请检查网络！`);
        return Promise.reject({
          data: '',
          msg: '系统检测网络中断，请检查网络！',
          code: 1000,
          allInfo: error
        })
      } else if(error.code == 'ECONNABORTED') {
        errorHandle({...error, status: 1001, statusText: '请求超时'})
        return Promise.reject({
          data: '',
          msg: '请求超时',
          code: 1001,
          allInfo: error
        })
      } else {
        return Promise.reject(error)
      }
    }
  });
  // 获取生产环境baseUrl
  const getBaseUrl = (baseURL) => {
    let BU = ''
    if(baseURL.split('Retain:')[1]){
      BU = baseURL.split('Retain:')[1]
    }else{
      if(process.env.NODE_ENV === 'development'){
        BU = baseURL
      }else{
        if (process.env.IS_ELECTRON) {
          // let file = process.cwd() + '/config.json'
          // let appConfig = fs.readFileSync(file, 'utf-8')
          BU = baseURL === '/front' ? store.state.AppConfig.Front_URL : store.state.AppConfig.API_URL
        } else {
          BU = baseURL === '/front' ? baseURL.split('/front')[1] : baseURL.split('/developmentApi')[1]
        }
      }
    }
    return BU
  };
  // 创建接口实例
  const createInstance = {
    post: function(basUrl='',url='',params={}){
      let _basUrl = getBaseUrl(basUrl)
      if(localStorage.userInfo){
        params.OperatorID = JSON.parse(localStorage.userInfo)._Operator_ID
        params.OPID = JSON.parse(localStorage.userInfo)._Operator_ID //his对接接口需要
        params.AreaID = JSON.parse(localStorage.userInfo)._Area_ID
        params.UserID = localStorage.userID
        params.UserName = JSON.parse(localStorage.userInfo)._User_Name
        params.TrueName = JSON.parse(localStorage.userInfo)._True_Name
      }
      return instance({
        method: 'post',
        baseURL:_basUrl,
        url: url,
        data: params
      })
    },
    get: function(basUrl='',url='',params={}){
      let _basUrl = getBaseUrl(basUrl)
      return instance({
        method: 'get',
        baseURL:_basUrl,
        url: url,
        data: qs.stringify(params)
      })
    },
    file: function(basUrl='',url='',params={},headers={'Content-Type': 'application/x-www-form-urlencoded'}){
      let _basUrl = getBaseUrl(basUrl)
      params.UserID = 0
      if (localStorage.userInfo) {
        params.OperatorID = JSON.parse(localStorage.userInfo)._Operator_ID
        params.AreaID = JSON.parse(localStorage.userInfo)._Area_ID
        params.UserID = localStorage.userID
      }
      return instance({
        method: 'post',
        baseURL:_basUrl,
        url: url,
        data: params,
        headers: headers
      })
    },
    formData: function(basUrl='',url='',params={},headers={'Content-Type': 'multipart/form-data'}){
      let _basUrl = getBaseUrl(basUrl)
      const formData  = new FormData();
      for(const name in params) {
        formData.append(name, params[name]);
      }
      return instance({
        method: 'post',
        baseURL:_basUrl,
        url: url,
        data: formData,
        headers: headers
      })
    },
  }
export default createInstance