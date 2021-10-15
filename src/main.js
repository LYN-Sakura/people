import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from "element-ui";
import "./common/common.js";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 代理 本地
Vue.prototype.$URL = "";
const http = axios.create({
    baseURL: "http://192.168.80.136:3333",
    // 设置请求超时时间
    timeout: 100 * 1000,
});

// 请求拦截器 加载进度条
http.interceptors.request.use((config) => {
    config.headers.token = window.localStorage.getItem("token");
    return config;
});
// 添加响应拦截器
http.interceptors.response.use(
    function(response) {
        if (response.data && response.data.status !== 1) {
            Vue.prototype.$errorConfirm(response.data.msg);
            if (response.data.status === 10) {
                window.localStorage.clear();
                router.push("/supplierlogin");
            }
        }
        // console.log('response:',response)
        return response ? response.data : {};
    },
    function(error) {
        // console.log('error',error)
        if (error.response) {
            Vue.prototype.$errorConfirm("", error.response.data.message);
        } else {
            Vue.prototype.$errorConfirm("", error);
        }
    }
);
// 全局挂载异步请求axios;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
