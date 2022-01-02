<template>
  <div class="container-fluid bg-dark">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container d-flex justify-content-around">
        <div>
          <button @click="$router.push('/')" class="btn navbar-brand">TODO LIST</button>
        </div>
        <div class="collapse d-flex justify-content-around navbar-collapse search-line" id="navbarSupportedContent">
          <form class="d-flex search-row">
            <input class="form-control me-2 search" type="search" placeholder="Поиск..." aria-label="Search"
                   :readonly="this.$store.state.access === ''">
            <button @click="$router.push({name: 'SearchList'})" class="btn btn-outline-success"
                    :disabled="this.$store.state.access === ''" type="submit">Поиск
            </button>
          </form>
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
          this.$store.commit('setUser', Object)
          await router.push('/')
        }
      } catch (e) {
        alert('Ошибка входа. Повторите попытку')
      }
    }
  },
  watch: {
  }
}
</script>

<style scoped>
input.search {
  min-width: 500px;
}

.button {
  margin-right: 10px;
}

.search-row {
  padding: 10px 0px;
}
</style>