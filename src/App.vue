<template>
  <div>
    <ul v-if="dataStatus()">
      <li v-for="post in apiStore.posts" :key="post.id">
        {{ post.title }}
      </li>
    </ul>
    <p v-else>No Posts To Check</p>
    <div v-if="apiStore.error" class="error-alert">
      {{ apiStore.error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useApi } from "@/store/Api";

const apiStore = useApi();

onMounted(() => {
  apiStore.fetchPosts();
});

function dataStatus() {
  return apiStore.posts && apiStore.posts.length > 0;
}
</script>

<style>
.error-alert {
  color: red;
  font-weight: bold;
}
</style>
