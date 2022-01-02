<template>
  <div class="container w-50 py-5">
    <h1>Регистрация</h1>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
        <input v-model="this.email" type="email" class="form-control" id="exampleInputEmail1"
               aria-describedby="emailHelp">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Никнейм</label>
        <input v-model="this.username" type="name" class="form-control" id="exampleInputUsername">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Имя</label>
        <input v-model="this.first_name" type="name" class="form-control" id="exampleInputFirstName">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Фамилия</label>
        <input v-model="this.last_name" type="name" class="form-control" id="exampleInputLastName">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Пароль</label>
        <input v-model="this.password" type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Повтор пароля</label>
        <input v-model="this.re_password" type="password" class="form-control" id="exampleInputPassword2">
      </div>
      <br>
      <button type="submit" @click="this.signIn" class="btn btn-primary">Регистрация</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      re_password: ''
    }
  },
  methods: {
    async signIn(event) {
      event.preventDefault();
      try {
        const response = await axios.post(this.$store.state.url + "auth/users/",
            {
              "username": this.username,
              "password": this.password,
              "re_password": this.re_password,
              "first_name": this.first_name,
              "last_name": this.last_name,
              "email": this.email
            }
        )
        alert("Регистрация прошла успешно. Проверьте почту и активируйте ваш аккаунт")
        await router.push('/')
      } catch (e) {
        alert("Регистрация провалилась")
      }
    }
  }
}
</script>

<style scoped>

</style>
