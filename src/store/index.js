import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userArr: [],
        userInfo: {},
    },
    mutations: {
        // 获取 用户数据
        setUserArr(state, data) {
            state.userArr = data || [];
        },
        // 获取 用户信息
        setUserInfo(state, data) {
            state.userInfo = data || {};
        },
        getUser(state) {
            let user = localStorage.getItem("user");
            if (user) {
                let data = JSON.parse(user);
                state.userArr = data.userArr || [];
                state.userInfo = data.userInfo || {};
            }
        },
    },
    actions: {},
    modules: {},
});
