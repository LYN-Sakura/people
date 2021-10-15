import Vue from "vue";
// 失败提示
Vue.prototype.$errorConfirm = (result, title) => {
    Vue.prototype.$message({
        message: result || title + " 请联系信息开发部",
        type: "warning",
    });
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
// 深克隆
Vue.prototype.$deepClone = (data) => JSON.parse(JSON.stringify(data));
Vue.prototype.$typeOf = (data) => Object.prototype.toString.call(data);
