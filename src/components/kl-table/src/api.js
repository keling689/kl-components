import axios from 'axios'
import { Notification } from 'element-ui';

const METHOD = {
  GET:'get',
  POST:'post'
};

axios.interceptors.request.use(
  config => {
    // console.log(config);
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    // console.log(response);
    return response;
  },
  error => {
    if (error.response) {

    }
    return Promise.reject(error.response.data)
  });

export default {
  fetch:function(myConfig){
    let defaultConfig = {
      apiUrl:'',
      method:METHOD.GET,
      params:null,
      isJson:true,
      needErrorCallback:false,
    };
    myConfig = Object.assign({}, defaultConfig, myConfig);
    // process.env.baseUrl
    let RequestObj = {
      url:myConfig.apiUrl,
      method:myConfig.method,
      timeout: 60000,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    };
    // 数据格式处理
    if (myConfig.method === METHOD.GET) {
      RequestObj.params = myConfig.params;
    } else if (myConfig.method === METHOD.POST) {
      if (myConfig.isJson) {
        // json格式
        RequestObj.headers['Content-Type'] = 'application/json;charset=UTF-8';
        
        RequestObj.data = myConfig.params;
      } else {
        // 默认表单格式
        RequestObj.params = myConfig.params;
      }
    }
    return new Promise((resolve ,reject)=>{
//  	console.log(RequestObj);
      axios(RequestObj).then(res=>{
      	if(res.data.code === 0){
      		resolve(res.data)
      	} else if(res.data.code===10000){
      		this.$router.push('/')
      	} else {
      		Notification({
						title: '警告',
						message: res.data.description,
						type: 'warning'
					})
          resolve(res.data)
      	}
      },err=>{
        if(myConfig.needErrorCallback){
          reject(err)
        }
      }).catch(error=>{
        if (myConfig.needErrorCallback) {
          reject(error)
        }
      });
    });


  }
}
