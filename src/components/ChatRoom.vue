<template>
  <div class="container">
    <!-- 左侧users -->
    <div class="user">
      <div>聊天室成员</div>
      <ul>
        <li v-for="(user, index) in users" :key="index">{{ user }}</li>
      </ul>
    </div>

    <div class="main">
      <!-- 中间聊天历史记录 -->
      <div class="content-area" ref="info">
        <div
          class="item"
          v-for="(h, index) in history"
          :key="index"
          :class="h.name === 'wo' ? 'active-name' : ''"
        >
          <div class="name">{{ h.name }}</div>
          <div class="content">{{ h.content }}</div>
          <div class="date">{{ formatDate(h.date) }}</div>
        </div>
      </div>
      <!-- 下部textarea聊天输入框 -->
      <div class="form">
        <textarea
          v-model="value"
          name=""
          @keydown.enter="handlerEnter"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  props: {
    users: {
      type: Array,
      default: () => ["小孩", "大人", "狗子"],
    },
    history: {
      type: Array,
      default: () => [],
      // default: () => [
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo",
      //     content: "你好------吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      //   {
      //     name: "wo1",
      //     content: "你好吗",
      //     date: Date.now(),
      //   },
      // ],
    },
    me: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    //原因？？？？scrollHeight
    this.$watch(
      "history",
      () => {
        const div = this.$refs.info;
        div.scroll(0, div.scrollHeight);
      },
      {
        immediate: true,
      }
    );
  },
  methods: {
    handlerEnter() {
      //键盘输入
      const v = this.value.trim();
      if (v) {
        this.value = "";
        this.$emit("chat", { name: this.me, content: v, date: Date.now() });
      }
    },
    formatDate(date) {
      // 日期格式化？？？？？
      date = moment(date);
      return date.fromNow().replace(/\s/g, "");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.container {
  display: flex;
  border: 1px solid;
  width: 700px;
  height: 500px;
}
.user {
  width: 200px;
  border: 1px solid gray;
}
li {
  background-color: bisque;
  margin-bottom: 20px;
  border: 1px salmon;
  /* width: 100px; */
}
.main {
  flex: 1;
  position: relative;
  background-color: rgb(251, 251, 241);
}
.content-area {
  height: 80%;
  overflow-y: auto;
}
.item {
  width: 150px;
  margin-bottom: 20px;
}
.active-name.item {
  margin-left: auto;
}
.item .name {
  font-size: 12px;
  text-align: right;
  color: rgb(29, 31, 31);
}
.active-name.item .content {
  background-color: rgb(112, 186, 138);
}
.item .content {
  text-align: right;
  font-size: 16px;
  border-radius: 8px;
  height: 30px;
  line-height: 30px;
  background-color: rgb(206, 225, 213);
}
.item .date {
  font-size: 10px;
  text-align: left;
  color: rgb(182, 173, 173);
}

.form {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
textarea {
  width: 100%;
}
</style>
