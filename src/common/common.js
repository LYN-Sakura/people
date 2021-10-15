import Vue from "vue";
// 失败提示
Vue.prototype.$errorConfirm = (result, title) => {
    Vue.prototype
        .$confirm(result || title + " 请联系信息开发部", "提示", {
            confirmButtonText: "确定",
            type: "warning",
            showCancelButton: false,
            customClass: "errorMsg",
        })
        .catch((error) => console.log(error));
};
// 加载页面
Vue.prototype.$allLoading = (title) =>
    Vue.prototype.$loading({
        lock: true,
        text: title || "执行操作中...",
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(233, 236, 239, 0.7)", //遮罩层颜色
    });

// 格式化 数字
Vue.prototype.$gsNum = (data, num = 4) => {
    if (data == "Infinity") {
        data = "";
    }
    return data ? parseFloat((+data).toFixed(num)) : num === 0 ? 0 : "";
};
// 清除换行符
Vue.prototype.$clearHh = (key) => {
    key = key.replace(/<\/?.+?>/g, "");
    key = key.replace(/[\r\n]/g, "");
    return key;
};
Vue.prototype.$sendMsg = async ({ rid, type, step, user_id }) => {
    const body = {
        rid,
        type,
        step,
        user_id,
    };
    const loading = Vue.prototype.$allLoading();
    const result = await Vue.prototype.$http.post(`common/common/Urge`, body);
    if (result && result.status === 1) {
        Vue.prototype.$message.success(result.msg || "发送成功");
    } else {
        Vue.prototype.$errorConfirm(result ? result.msg : "发送失败");
    }
    loading.close();
};
// 深克隆
Vue.prototype.$deepClone = (data) => JSON.parse(JSON.stringify(data));
Vue.prototype.$typeOf = (data) => Object.prototype.toString.call(data);
