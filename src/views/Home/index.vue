
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
        <li v-for="item in $router.getRoutes()" :key="item.name">
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
    console.log(this.$router.getRoutes());
    // console.log(this.$store.state.tabs.pageNames);
    // $store.state.tabs.pageName
  },


  methods: {
    addAliveHandler(pageName) {
      console.log('pageName',pageName);
      
      this.$store.commit("tabs/addPage", pageName);
    },
    removeAliveHandler(pageName) {
      this.$store.commit("tabs/removePage", pageName);
    },
  },
};
</script>
