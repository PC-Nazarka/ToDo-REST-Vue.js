<template>
  <div class="container-fluid bg-dark">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container d-flex justify-content-space">
        <div>
          <button @click="$router.push('/')" class="btn navbar-brand">TODO LIST</button>
        </div>
        <div v-if="this.$store.state.access === ''">
          <button @click="$router.push({name: 'SignIn'})" class="btn btn-success button">Регистрация</button>
          <button @click="$router.push({name: 'LogIn'})" class="btn btn-success">Вход</button>
        </div>
        <div v-else>
          <button @click="$router.push({name: 'AccountUser', params: {userId: this.$store.state.user.id}})"
                  class="btn btn-success button">
            {{ this.$store.state.user.username }}
          </button>
          <button @click="this.exit" class="btn btn-success button">Выход</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {}
  },
  methods: {
    async exit(event) {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.post(this.$store.state.url + "logout/",
            {
              refresh: this.$store.state.refresh
            },
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        if (response.status === 204) {
          this.$store.commit('setAccess', '')
          this.$store.commit('setRefresh', '')
          this.$store.commit('setUser', Object())
          localStorage.clear()
          await router.push('/')
        }
      } catch (e) {
        alert('Ошибка выхода')
      }
    }
  },
  watch: {
    '$route'() {
      if (this.$store.state.access) {
        this.$store.dispatch('setUser')
      }
    }
  }
}
</script>

<style scoped>
.button {
  margin-right: 10px;
}
</style>