const Koa = require("koa");
const router = require("koa-router")(); //注意：引入的方式
const cors = require("koa2-cors");
const ip = require('ip')
// 导入WebSocket模块:
const WebSocket = require('ws');

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
            ctx.req.addListener("end", function () {
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

// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const ws = new WebSocketServer({
    port: 9999
});
// 所有的ws连接
let wsArr = {}
// 成功握手连接时触发
ws.on('connection', api => {
    console.log('连接成功');
    // 接收到服务器消息时触发
    api.on('message', msg => {
        if (msg) {
            msg = JSON.parse(msg.toString('utf8'))
            if (msg.toid) {
                let body = {
                    id:msg.id,
                    time:new Date().getTime(),
                    msg:msg.msg
                }
                ws[msg.toid].send(JSON.stringify(body))
            } else {
                ws[msg.id] = api
            }
        }
        // api.send(msg)
    })
})

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
    // 公司
    // console.log("http://192.168.80.136:3333");
    // 个人 有可能变更
    console.log(`http://${ip.address()}:3333`);
});
