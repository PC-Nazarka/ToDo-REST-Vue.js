<template>
  <div class="container py-5">
    <div class="mb-3">
      <label class="form-label">Никнейм</label>
      <input v-model="this.username" type="text" class="form-control">
    </div>
    <div class="mb-3">
      <label class="form-label">Пароль</label>
      <input v-model="this.password" type="password" class="form-control">
    </div>
    <button @click="this.deleteAccount" class="btn btn-danger me-3">Удалить аккаунт</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "DeleteAccount",
  data() {
    return {
      password: '',
      username: ''
    }
  },
  methods: {
    async deleteAccount(event) {
      event.preventDefault();
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.delete(this.$store.state.url + `auth/users/me/`,
            {
              data: {
                username: this.username,
                password: this.password
              },
              headers: {
                "Authorization": 'JWT ' + this.$store.state.access
              }
            })
        this.$store.commit('setAccess', '')
        this.$store.commit('setRefresh', '')
        this.$store.commit('setUser', Object())
        await router.push('/')
      } catch (e) {
        alert('Ошибка удаление аккаунта')
      }
    },
  },
  created() {
    if (this.$store.state.access === '') {
      router.push('/')
    }
  }
}
</script>

<style scoped>

</style>