<template>
  <div class="container">
    <h1>Введите новый пароль</h1>
    <form>
      <div class="mb-3">
        <label for="exampleInputPassword" class="form-label">Новый пароль</label>
        <input v-model="this.password" type="password" class="form-control" id="exampleInputPassword">
      </div>
      <div class="mb-3">
        <label for="exampleInputRePassword" class="form-label">Повтор нового пароля</label>
        <input v-model="this.re_password" type="password" class="form-control" id="exampleInputRePassword">
      </div>
      <button @click="this.resetPassword" class="btn btn-primary">Сбросить пароль
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: '',
      re_password: ''
    }
  },
  methods: {
    async resetPassword(event) {
      event.preventDefault();
      try {
        const response = await axios.post(this.$store.state.url + "auth/users/reset_password_confirm/",
            {
              uid: this.$route.params.uid,
              token: this.$route.params.token,
              new_password: this.password,
              re_new_password: this.re_password,
            }
        )
        alert('Пароль успешно сброшен')
        await router.push('/')
      } catch (e) {
        alert('Ошибка сброса пароля')
      }
    }
  }
}
</script>

<style scoped>

</style>