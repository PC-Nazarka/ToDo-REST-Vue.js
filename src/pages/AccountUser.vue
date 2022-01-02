<template>
  <div class="container" v-if="this.$store.state.access === ''">
    <h1 class="py-4">Вы не авторизированы</h1>
    <p>Прежде чем пользоваться сервисом - войдите</p>
  </div>
  <div v-else>
    <div class="container">
      <h1>Информация об аккаунте</h1>
      <div class="py-1">Имя: {{ this.$store.state.user.first_name }}</div>
      <div class="py-1">Никнейм: {{ this.$store.state.user.username }}</div>
      <div class="py-1">Email: {{ this.$store.state.user.email }}</div>
      <div class="py-1">Дата регистрация: {{ this.$store.state.user.date_joined }}</div>
      <div class="py-1">Последний раз онлайн: {{ this.$store.state.user.last_login }}</div>
      <div class="py-2">
        <button @click="$router.push({name: 'changeEmail'})" class="btn btn-success me-3">Сменить email</button>
        <button @click="$router.push({name: 'editProfile'})" class="btn btn-success me-3">Редактировать профиль</button>
        <button @click="$router.push({name: 'changePassword'})" class="btn btn-success">Сменить пароль</button>
      </div>
      <hr>
      <TodoListPage @update="this.updatePosts"></TodoListPage>
      <hr>
      <PostUser v-model:update="this.update"></PostUser>
    </div>
  </div>
</template>

<script>
import TodoListPage from "@/components/TodoListPage.vue"
import PostUser from "@/components/PostUser";

export default {
  components: {
    TodoListPage,
    PostUser
  },
  data(){
    return {
      update: false
    }
  },
  methods: {
    updatePosts(bool){
      this.update = bool
    }
  },
  created() {
    console.log(this.$route.params)
  }
}
</script>
