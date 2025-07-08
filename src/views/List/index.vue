
<template>
  <div class="list">
    <h1>List Page</h1>
    <AsyncComponent :contentPromise="fetchContent()">
      <template #loading>加载中</template>
      <template v-slot:content="{ content }">
        <ul>
          <li v-for="item in content" :key="item.id">商品名:{{ item.name }}</li>
        </ul>
      </template>
      <!--  v-slot:error="{ error }" -->
      <!-- 左边是具名插槽名 -->
      <!-- 右边是解构出来子组件传过来的值 -->
      <template v-slot:error="{ error }">
        <p style="color: red">{{ error.message }}</p>
      </template>
    </AsyncComponent>
    <router-link to="/details">details</router-link>
  </div>
</template>

<script>
import AsyncComponent from "../../components/AsyncComponent";
function contentPromise() {
  return new Promise((resole, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resole([
          { id: 1, name: "xiaomi", stock: 50 },
          { id: 2, name: "xiaomi2", stock: 100 },
          { id: 3, name: "xiaomi3", stock: 330 },
        ]);
      } else {
        reject(new Error("not found"));
      }
    }, 1000);
  });
}
export default {
  name: "List",
  components: {
    AsyncComponent,
  },
  watch: {
    $route(to, from) {
      console.log('route changed',from);
      if (from.path==='/details') {
        console.log('后退不刷新');
        return
      } else {
        console.log("前进操作");
        this.refreshData();
      }
    }
  },
  methods: {
    refreshData() {
      // 刷新数据的逻辑
    },
    async fetchContent() {
      return await contentPromise();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
