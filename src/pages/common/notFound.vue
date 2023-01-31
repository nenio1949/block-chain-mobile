<template>
  <div class="notfound-container">
    <Empty :image="notFoundImg" description="页面走丢了~" />
  </div>
</template>
<script setup lang="ts">
  import { Empty } from "vant";
  import notFoundImg from "@/assets/img/404.png";
</script>

<style lang="scss" scoped>
  .notfound-container {
    height: 100%;
  }
</style>
