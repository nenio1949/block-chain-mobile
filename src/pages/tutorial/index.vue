<template>
  <img :src="imgSrc" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const imgSrc = ref("");
const img = router.currentRoute.value.query?.img?.toString();
if (img) {
  imgSrc.value = new URL(img, import.meta.url).href;
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
