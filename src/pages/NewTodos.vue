<template>
  <div v-if="this.$store.state.access === ''">
    <div class="container">
      <h1 class="py-4">Вы не авторизированы</h1>
      <p>Прежде чем пользоваться сервисом - войдите</p>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <ul class="list-group">
        <div v-if="this.listPosts.length">
          <post-item v-for="post in this.listPosts" :post="post" :key="post.id"></post-item>
        </div>
        <div v-else>
          <p>Постов нет</p>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue"
import axios from "axios";
import router from "../router";

export default {
  components: {
    PostItem
  },
  data() {
    return {
      listPosts: []
    }
  },
  methods: {
    async fetchPosts() {
      try {
        await this.$store.dispatch('setAccess')
        await this.$store.dispatch('setUser')
        const response = await axios.get(this.$store.state.url + `wall/`,
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        this.listPosts = response.data
      } catch (e) {
        alert('Ошибка загрузки новых постов')
      }
    }
  },
  mounted() {
    if (this.$store.state.access !== '' && this.$store.state.user !== Object()) {
      this.fetchPosts()
    }
  },
  created() {
    if (this.$store.state.access === '') {
      router.push('/')
    }
  }
}
</script>

<style scoped>
hr {
  margin: 10px 0;
}
</style>
