<template>
  <div>
    <h1 class="py-4">Посты</h1>
    <div v-if="this.listPosts.length">
      <post-item v-for="post in this.listPosts" :post="post" :key="post.id"></post-item>
    </div>
    <div v-else>
      <p>Постов нет</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostItem from "./PostItem";

export default {
  name: "PostUser",
  components: {
    PostItem
  },
  props: {
    update: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listPosts: [],
    }
  },
  methods: {
    async getPosts() {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.get(this.$store.state.url + `${this.$route.params.userId}/posts/`,
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        this.listPosts = response.data
      } catch (e) {
        for (let str in e.response.data) {
          alert(e.response.data[str])
        }
        alert('Ошибка')
      }
    }
  },
  created() {
    this.getPosts()
  },
  updated() {
    if (this.update) {
      this.getPosts()
      this.$emit('update:update', false)
    }
  }
}
</script>

<style scoped>
h1.py-4 {
  padding: 0 !important;
}
</style>