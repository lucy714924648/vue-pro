<template>
  <div class="details">
    <h1>Details Page</h1>
    <div v-if="jsonData">
      <pre>{{ jsonData }}</pre>
    </div>
  </div>
</template>

<script>
// 方式1：直接导入
import jsonData from "./data.json";

// 方式2：使用 require
// const jsonData = require('./data.json')

export default {
  name: "Details",
  data() {
    return {
      jsonData,
    };
  },
};
</script>
