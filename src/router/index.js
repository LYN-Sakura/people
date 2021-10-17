import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../page/login.vue"),
    },
    {
        path: "/userList",
        name: "userList",
        component: () => import(/* webpackChunkName: "userList" */ "../page/userList.vue"),
    },
    {
        path: "/sendMsg/:id",
        name: "sendMsg",
        component: () => import(/* webpackChunkName: "sendMsg" */ "../page/sendMsg.vue"),
        props:true
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
