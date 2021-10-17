<template>
  <div class="sendMsg_box">
    <div class="sendMsg">
      <div
        v-for="(val, idx) in msgArr"
        :key="idx"
        :class="{ msgItem: true, msgRight: userInfo.id == val.id }"
      >
        <span> {{ val.msg }}</span>
      </div>
    </div>
    <div class="sendBox">
      <el-input type="textarea" v-model="msg" @keyup.13.native="sendMsg"> </el-input>
      <el-button type="primary" size="mini" @click="sendMsg">发送</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      msg: "",
      ws: "",
      toid: "",
      msgArr: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    sendMsg() {
      if (this.msg) {
        let body = {
          id: this.userInfo.id || "",
          toid: this.toid || "",
          msg: this.msg || "",
        };
        this.msgArr.push(body);
        this.ws.send(JSON.stringify(body));
        this.msg = "";
      }
    },
    //   连接 websocket
    getWs() {
      const wsUrl = "ws://localhost:9999";
      this.ws = new WebSocket(wsUrl);
      // 指定连接成功后的回调函数
      this.ws.onopen = (e) => {
        console.log("连接服务器成功");
        this.ws.send(JSON.stringify({ id: this.userInfo.id }));
      };

      // 指定收到服务器数据后的回调函数
      this.ws.onmessage = (e) => {
        if (e.data) {
          let data = JSON.parse(e.data);
          this.msgArr.push(data);
        }
      };
      this.ws.onclose = function () {
        console.log("检测到ws关闭，正在重连。。。");
      };
      this.ws.onerror = function (err) {
        console.log("检测到ws错误，正在重连。。。");
      };
    },
  },
  created() {
    this.getWs();
    this.toid = this.$route.params.id || "";
  },
  beforeDestroy() {
    this.ws.close();
    this.ws = null;
    console.log("断开连接");
  },
};
</script>

<style lang ='less' scoped >
.sendMsg_box {
  height: 100%;
  .sendMsg {
    height: calc(100% - 150px);
    border-bottom: 1px solid #ccc;
    overflow-y: auto;
    .msgItem {
      margin-bottom: 5px;
      display: flex;
      span {
        background-color: #ccc;
        padding: 3px 8px;
        border: 1px solid rgb(130, 130, 130);
        border-radius: 3px;
      }
    }
    .msgRight {
      justify-content: flex-end;
    }
  }
  .sendBox {
    height: 150px;
    position: relative;
    /deep/.el-textarea__inner {
      height: 150px;
    }
    .el-button {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>