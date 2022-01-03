<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label class="form-label">Никнейм</label>
        <input v-model="this.username" type="text" class="form-control">
      </div>
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
      <button type="submit" class="btn btn-primary">Изменить</button>
      <button @click="$router.push({name: 'changePassword'})" class="btn btn-success">Сменить пароль</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.user.username,
      first_name: this.$store.state.user.first_name,
      last_name: this.$store.state.user.last_name,
      email: this.$store.state.user.email,
    }
  }
}
</script>
