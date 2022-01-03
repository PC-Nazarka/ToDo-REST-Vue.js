<template>
  <div class="container w-50 py-5">
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
      <button type="submit" class="btn btn-primary">Изменить</button>
      <button @click="$router.push({name: 'editProfile'})" class="btn btn-success me-3">Редактировать профиль</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      old_password: '',
      new_password: '',
      re_new_password: ''
    }
  }
}
</script>
