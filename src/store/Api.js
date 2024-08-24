// store/Api.js
import { defineStore } from "pinia";
import axios from "axios";

export const useApi = defineStore("Api", {
  state: () => ({
    posts: [],
    error: null,
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.posts = response.data;
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        this.error = err.message || "An error occurred";
      }
    },
  },
});
