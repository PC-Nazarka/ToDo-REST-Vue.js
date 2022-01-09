<template>
  <div class="container w-50 py-5">
    <h1>Вход</h1>
    <form>
      <div class="mb-3">
        <label for="exampleInputUsername" class="form-label">Никнейм</label>
        <input type="name" class="form-control" v-model="username" id="exampleInputUsername"
               aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Пароль</label>
        <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
      </div>
      <button @click="this.fetchTokens" type="submit" class="btn btn-primary me-3">Войти</button>
      <button @click="$router.push({name: 'ResetPasswordEmail'})" class="btn btn-primary">Забыли пароль?</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async fetchTokens(event) {
      event.preventDefault();
      try {
        const response = await axios.post(this.$store.state.url + "auth/jwt/create/",
            {
              username: this.username,
              password: this.password
            }
        )
        this.$store.commit('setAccess', response.data.access)
        this.$store.commit('setRefresh', response.data.refresh)
        await this.$store.dispatch('setUser')
        await router.push('/')
      } catch (e) {
        alert('Ошибка логина')
      }
    }
  }
}
</script>
