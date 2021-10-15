const Koa = require("koa");
const router = require("koa-router")(); //注意：引入的方式
const cors = require("koa2-cors");
const app = new Koa();
app.use(cors());
// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener("data", (data) => {
                postdata += data;
            });
            ctx.req.addListener("end", function() {
                let parseData = JSON.parse(postdata);
                resolve(parseData);
            });
        } catch (err) {
            reject(err);
        }
    });
}

const userArr = {
    user1: {
        id: 1,
        name: "张三",
    },
    user2: {
        id: 2,
        name: "李四",
    },
    user3: {
        id: 3,
        name: "王五",
    },
    user4: {
        id: 4,
        name: "李六",
    },
};
router.post("/getUser", async (ctx, next) => {
    let body = {};
    let user = await parsePostData(ctx);
    // 返回用户信息
    let userInfo = userArr[user.user_name] || "";
    if (userInfo) {
        body = {
            data: { userInfo, userArr },
            msg: "登录成功",
            status: 1,
        };
    } else {
        body = {
            data: {},
            msg: "暂无用户信息",
            status: 0,
        };
    }
    ctx.body = body;
});
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods());

// 监听端口 3333
app.listen(3333, () => {
    console.log("http://192.168.80.136:3333/getUser");
});
