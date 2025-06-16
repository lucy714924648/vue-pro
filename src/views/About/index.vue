
<template>
  <div class="about">
    <button @click="login">登录</button>
    <button @click="refreshTokenlogin">刷新token</button>
    <button @click="getUserHandler">获取用户</button>

    <ChatRoom :users="users" :history="history" :me="me" @chat="handlerChat" />
    <!-- <ChatRoom /> -->
    <!-- <CharRoom /> -->
  </div>
</template>

<script>
import ChatRoom from "../../components/ChatRoom.vue";
import { login, refreshToke, getUser } from "../../http/request";
// import CharRoom from "./components/CharRoom.vue";

// import { io } from "socket.io-client";
export default {
  name: "About",
  components: {
    ChatRoom,
    // CharRoom,
  },
  data() {
    return {
      users: [],
      history: [],
      me: "wo",
      // socket: null,
    };
  },
  methods: {
    async login() {
      let obj = { name: "王小龙" };
      await login(obj);
    },
    async refreshTokenlogin() {
      await refreshToken();
    },
    async getUserHandler() {
      await getUser(1);
    },
    handlerChat(msg) {
      let a = msg;
      this.history.push(a);

      // 自定义发送事件
      // 发送消息$emit
      // this.socket.$emit("$message", msg.content);
    },
  },
  // created() {
  //   // 后端服务器，自己需要手写
  //   this.socket = io("ws://localhost:9528");
  //   // 自定义监听事件,加个$区别下官方的事件;事件名和后端约定的
  //   //当前聊天室的用户，有人进入，有人退出
  //   this.socket.on("$updateUsers", (users) => {
  //     this.users = users;
  //   });
  //   //自己的历史记录
  //   this.socket.on("$history", (history) => {
  //     this.history = history;
  //   });
  //   //自己的用户名
  //   this.socket.on("$name", (name) => {
  //     this.me = name;
  //   });
  //   其他人 发送的消息;
  //   this.socket.on("$message", (msg) => {
  //     this.history.push(msg);
  //   });

  // },
  beforeDestroy() {
    // 手动断开连接
    // this.socket.disconnect();
  },
};
</script>