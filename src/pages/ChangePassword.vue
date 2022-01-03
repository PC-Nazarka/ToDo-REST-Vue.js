<template>
  <div class="container py-5">
    <h1>Вход</h1>
    <form>
      <div class="mb-3">
        <label class="form-label">Старый пароль</label>
        <input v-model="this.old_password" type="password" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Новый пароль</label>
        <input v-model="this.new_password" type="password" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Повтор нового пароля</label>
        <input v-model="this.re_new_password" type="password" class="form-control">
      </div>
      <br>
      <button @click="this.changePassword" class="btn btn-primary me-3">Изменить</button>
      <button @click="$router.push({name: 'EditProfile'})" class="btn btn-success me-3">Редактировать профиль</button>
      <button @click="$router.push({name: 'ChangeUsername'})" class="btn btn-success">Сменить никнейм</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      old_password: '',
      new_password: '',
      re_new_password: ''
    }
  },
  methods: {
    async changePassword(event) {
      event.preventDefault();
      try {
        if (this.new_password === this.re_new_password) {
          await this.$store.dispatch('setAccess')
          const response = await axios.post(this.$store.state.url + 'auth/users/set_password/',
              {
                new_password: this.new_password,
                re_new_password: this.re_new_password,
                current_password: this.old_password,
              },
              {
                headers:
                    {
                      "Authorization": 'JWT ' + this.$store.state.access
                    }
              })
          this.new_password = ''
          this.re_new_password = ''
          this.old_password = ''
          alert('Пароль успешно сменен')
          await this.$store.dispatch('setUser')
          await router.push(`/${this.$store.state.user.id}`)
        } else {
          alert('Пароли не совпадают')
        }
      } catch (e) {
        if (e.response.data.new_password) {
          for (let i = 0; i < e.response.data.new_password.length; i++) {
            alert(e.response.data.new_password[i])
          }
        }
        if (e.response.data.re_new_password) {
          for (let i = 0; i < e.response.data.re_new_password.length; i++) {
            alert(e.response.data.re_new_password[i])
          }
        }
        if (e.response.data.current_password) {
          for (let i = 0; i < e.response.data.current_password.length; i++) {
            alert(e.response.data.current_password[i])
          }
        }
      }
    }
  }
}
</script>
