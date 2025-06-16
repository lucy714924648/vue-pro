<template>
  <div id="app" data-theme="light">
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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
