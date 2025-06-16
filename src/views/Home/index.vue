
<template>
  <div class="home">
    <h1>Home Page</h1>
    <header>
      <p>
        <ul>
        <li v-for="item in $store.state.tabs.pageName" :key="item">
          {{ item }}
          <router-link :to="{ name: item }">{{ item}}</router-link>
          <button @click="removeAliveHandler(item)">-</button>
        </li>
      </ul>
      </p>
    </header>
    <div>
      <ul>
        <li v-for="item in $router.options.routes[0].children" :key="item.name">
          {{ item.name }}
          <router-link :to="{ name: item.name }">{{ item.name }}</router-link>
          <button @click="addAliveHandler(item.name)">+</button>
        </li>
      </ul>
    </div>
    <keep-alive :include="$store.state.tabs.pageName">
    
    <router-view></router-view>
    </keep-alive>
    <router-link to="/list">去list</router-link>
  </div>
</template>
 
<script>
export default {
  name: "Home",
  // 在组件created钩子中监听
  created() {
    // console.log(this.$router.options.routes[0].children);
    console.log(this.$store);
    window.addEventListener("popstate", this.handlePopState);
  },

  destroyed() {
    window.removeEventListener("popstate", this.handlePopState);
  },

  methods: {
    addAliveHandler(pageName) {
      this.$store.commit("tabs/addPage", pageName);
    },
    removeAliveHandler(pageName) {
      this.$store.commit("tabs/removePage", pageName);
    },
    handlePopState(event) {
      if (event.state) {
        // 后退操作
        console.log("后退");
      } else {
        // 前进操作
        console.log("前进");
      }
    },
  },
};
</script>
