<template>
  <div class="container" v-if="this.$store.state.access === ''">
    <h1 class="py-4">Вы не авторизированы</h1>
    <p>Прежде чем пользоваться сервисом - войдите</p>
  </div>
  <div v-else>
    <router-view></router-view>
    <div v-if="this.isAccount" class="container">
      <h1>Информация об аккаунте</h1>
      <div v-if="this.isOwner">
        <div class="py-1">Никнейм: {{ this.$store.state.user.username }}</div>
        <div class="py-1">Имя: {{ this.$store.state.user.first_name }}</div>
        <div class="py-1">Фамилия: {{ this.$store.state.user.last_name }}</div>
        <div class="py-1">Email: {{ this.$store.state.user.email }}</div>
        <div class="py-1">Дата регистрация: {{ this.$store.state.user.date_joined }}</div>
        <div class="py-1">Последний раз онлайн: {{ this.$store.state.user.last_login }}</div>
      </div>
      <div v-else>
        <div class="py-1">Никнейм: {{ this.someUser.username }}</div>
        <div class="py-1">Последний раз онлайн: {{ this.someUser.last_login }}</div>
      </div>
      <div v-if="this.isOwner" class="py-2">
        <button
            @click="$router.push({name: 'EditProfile',
                                  params: {userId: this.$route.params.userId}
                                 }); this.isAccount = false"
            class="btn btn-success me-3">Редактировать профиль
        </button>
        <button
            @click="$router.push({name: 'ChangePassword',
                                  params: {userId: this.$route.params.userId}
                                 }); this.isAccount = false"
            class="btn btn-success me-3">Сменить пароль
        </button>
        <button
            @click="$router.push({name: 'ChangeUsername',
                                  params: {userId: this.$route.params.userId}
                                 }); this.isAccount = false"
            class="btn btn-success me-3">Сменить никнейм
        </button>
        <button
            @click="$router.push({name: 'DeleteAccount',
                                  params: {userId: this.$route.params.userId}
                                 }); this.isAccount = false"
            class="btn btn-danger">Удалить аккаунт
        </button>
      </div>
      <div v-if="this.isOwner">
        <hr>
        <TodoListPage @update="this.updatePosts"></TodoListPage>
      </div>
      <hr>
      <PostUser v-model:update="this.update"></PostUser>
    </div>
  </div>
</template>

<script>
import TodoListPage from "@/components/TodoListPage.vue"
import PostUser from "@/components/PostUser";
import axios from "axios";
import router from "../router";

export default {
  components: {
    TodoListPage,
    PostUser,
  },
  data() {
    return {
      update: false,
      isOwner: false,
      someUser: Object(),
      isAccount: true
    }
  },
  methods: {
    updatePosts(bool) {
      this.update = bool
    },
    checkOwner() {
      this.isOwner = this.$store.state.user.id === parseInt(this.$route.params.userId)
      if (!this.isOwner) {
        this.getInfoOtherUser()
      }
    },
    async getInfoOtherUser() {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.get(this.$store.state.url + `users/${this.$route.params.userId}/`,
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        this.someUser = response.data
      } catch (e) {
        alert('Ошибка получения данных о другом юзере')
      }
    }
  },
  created() {
    if (this.$store.state.access !== '') {
      if (this.$store.state.user.id === undefined) {
        this.$store.dispatch('setUser')
        setTimeout(() => {
          this.checkOwner();
        }, 100);
      } else {
        this.checkOwner();
      }
    } else {
      router.push('/')
    }
  },
  watch: {
    '$route'() {
      if (this.$route.path === `/${this.$store.state.user.id}`) {
        this.isAccount = true
      }
    }
  }
}
</script>
