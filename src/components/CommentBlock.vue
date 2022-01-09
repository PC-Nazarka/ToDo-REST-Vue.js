<template>
  <div class="container">
    <p class="first">
      <button @click="this.hideComments" class="btn btn-white">
        {{ this.showComment ? "Скрыть комментарии" : "Показать комментарии" }}
      </button>
    </p>
    <div v-if="this.showComment">
      <comment-item v-for="comment in this.listComment" :comment="comment" :key="comment.id"></comment-item>
    </div>
    <form class="row">
      <div class="input-group mb-3">
        <textarea v-model="this.commentText" class="form-control" placeholder="Введите текст"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"></textarea>
        <button @click="this.sendComment" class="btn btn-outline-secondary" type="button" id="button-addon2">Отправить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import axios from "axios";

export default {
  name: "CommentBlock",
  components: {
    CommentItem
  },
  props: {
    id: Number
  },
  data() {
    return {
      showComment: false,
      listComment: [],
      commentText: ''
    }
  },
  methods: {
    async sendComment() {
      if (this.commentText.length > 0) {
        try {
          await this.$store.dispatch('setAccess')
          const response = await axios.post(this.$store.state.url + `wall/${this.id}/comment/`,
              {
                text: this.commentText
              },
              {
                headers:
                    {
                      "Authorization": 'JWT ' + this.$store.state.access
                    }
              })
          await this.getComments()
          this.commentText = ''
        } catch (e) {
          for (let str in e.response.data) {
            alert(e.response.data[str])
          }
          alert('Ошибка создания комментария')
        }
      }
    },
    hideComments() {
      if (this.showComment === false) {
        this.getComments()
        this.showComment = !this.showComment
      } else {
        this.showComment = !this.showComment
      }
    },
    async getComments() {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.get(this.$store.state.url + `wall/${this.id}/comments/`,
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        this.listComment = response.data
      } catch (e) {
        for (let str in e.response.data) {
          alert(e.response.data[str])
        }
        alert('Ошибка получения комментариев к посту')
      }
    }
  }
}
</script>

<style scoped>
.first {
  margin-bottom: 8px;
}
</style>