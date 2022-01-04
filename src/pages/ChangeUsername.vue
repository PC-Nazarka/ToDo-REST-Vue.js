<template>
  <div class="container py-5">
    <div class="mb-3">
      <label class="form-label">Никнейм</label>
      <input v-model="this.new_username" type="text" class="form-control">
    </div>
    <div class="mb-3">
      <label class="form-label">Повтор никнейма</label>
      <input v-model="this.re_new_username" type="text" class="form-control">
    </div>
    <div class="mb-3">
      <label class="form-label">Пароль</label>
      <input v-model="this.password" type="password" class="form-control">
    </div>
    <br>
    <button @click="this.changeUsername" class="btn btn-primary me-3">Изменить</button>
    <button @click="$router.push({name: 'EditProfile'})" class="btn btn-success me-3">Редактировать профиль</button>
    <button @click="$router.push({name: 'ChangePassword'})" class="btn btn-success">Сменить пароль</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "changeUsername",
  data() {
    return {
      new_username: '',
      re_new_username: '',
      password: ''
    }
  },
  methods: {
    async changeUsername(event) {
      event.preventDefault();
      if (this.new_username === this.re_new_username && this.password) {
        try {
          await this.$store.dispatch('setAccess')
          const response = await axios.post(this.$store.state.url + `auth/users/set_username/`,
              {
                new_username: this.new_username,
                re_new_username: this.re_new_username,
                current_password: this.password,
              },
              {
                headers:
                    {
                      "Authorization": 'JWT ' + this.$store.state.access
                    }
              })
          alert('Никнейм успешно сменен')
          await this.$store.dispatch('setUser')
          await router.push(`/${this.$store.state.user.id}`)
        } catch (e) {
          alert('Ошибка смены никнейма')
        }
      }
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

</style>