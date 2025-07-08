
<template>
  <div class="home">
    <h1>Home Page</h1>
    <header>
      <p>
        <ul style="border: 1px salmon;">
        <li v-for="item in $store.state.tabs.pageName" :key="item" style="display: inline-block;margin-left: 10px;border:1px solid aqua;padding:4px">
          <router-link :to="{ name: item }">{{ item}}</router-link>
          <el-button type="primary" size="mini" @click="removeAliveHandler(item)">-</el-button>
        </li>
      </ul>
      </p>
    </header>
    <div>
      <ul>
        <li v-for="item in $router.getRoutes()" :key="item.name" style="border: 1px solid;">
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
