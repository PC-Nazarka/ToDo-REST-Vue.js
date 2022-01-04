<template>
  <div class="container py-5">
    <form>

      <div class="mb-3">
        <label class="form-label">Имя</label>
        <input v-model="this.first_name" type="text" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Фамилия</label>
        <input v-model="this.last_name" type="text" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="this.email" type="email" class="form-control">
      </div>
      <br>
      <button @click="this.editProfile" class="btn btn-primary me-3">Изменить</button>
      <button @click="$router.push({name: 'changePassword'})" class="btn btn-success me-3">Сменить пароль</button>
      <button @click="$router.push({name: 'changeUsername'})" class="btn btn-success">Сменить никнейм</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      first_name: this.$store.state.user.first_name,
      last_name: this.$store.state.user.last_name,
      email: this.$store.state.user.email,
    }
  },
  methods: {
    async editProfile(event) {
      event.preventDefault();
      if (this.first_name && this.last_name && this.email) {
        try {
          await this.$store.dispatch('setAccess')
          const response = await axios.patch(this.$store.state.url + 'auth/users/me/',
              {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
              },
              {
                headers:
                    {
                      "Authorization": 'JWT ' + this.$store.state.access
                    }
              })
          alert('Данные успешно сменены')
          await this.$store.dispatch('setUser')
          await router.push(`/${this.$store.state.user.id}`)
        } catch (e) {
          alert('Ошибка смены данных')
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
