<template>
  <div class="container">
    <h1>Введите email, указанный вами при регистрации, для сброса пароля</h1>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Адрес электронной почты</label>
        <input v-model="this.email" type="email" class="form-control" id="exampleInputEmail1"
               aria-describedby="emailHelp">
      </div>
      <button @click="this.resetPassword" class="btn btn-primary">Отправить письмо
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "ResetPasswordEmail",
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async resetPassword(event) {
      event.preventDefault();
      try {
        const response = await axios.post(this.$store.state.url + "auth/users/reset_password/",
            {
              email: this.email
            }
        )
        alert("Для завершения сброса пароля пройдите по ссылке, присланной вам на указанный email")
        await router.push('/')
      } catch (e) {
        alert('Ошибка сброса пароля')
      }
    }
  }
}
</script>