<template>
  <div>
    <slot name="loading" v-if="isLoading">默认加载中...</slot>
    <!-- 具名/默认/作用域插槽 -->
    <!-- v-bind="{ error }"子组件传参给父组件 -->
    <!-- 作用域插槽传参 -->
    <slot name="error" v-else-if="error" v-bind="{ error }">{{ error }}</slot>
    <slot name="content" v-else v-bind="{ content }">{{ content }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    contentPromise: Promise,
  },
  data() {
    return {
      isLoading: true,
      content: null,
      error: false,
    };
  },
  async created() {
    try {
      this.content = await this.contentPromise;
      this.error = null;
    } catch (error) {
      this.content = null;
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  },
};
</script>