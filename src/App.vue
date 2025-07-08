<template>
  <div id="app" data-theme="light">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" ></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <h1>按钮别权限控制</h1>
    <button v-permission="'add'">新增</button>
    <button v-permission="'edit'">编辑</button>
    <button v-permission="'view'">查看</button>
    <button v-permission="'dele'">删除</button>
  </div>
</template>

<script>
import permission from './directives/permission';

export default {
  name: "App",
  directives: {
    permission
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  // 取vw和vh最小的值（视口宽高）
  // display: inline-block;
  width: 100vmin;
  height: 100wmin;
}
</style>
