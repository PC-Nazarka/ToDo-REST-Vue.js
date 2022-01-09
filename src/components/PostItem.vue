<template>
  <div>
    <div class="wrap border rounded">
      <p>{{ post.text }}</p>
      <li class="list-group-item">
        <div class="checked_place">
          <input class="form-check-input me-1" v-model="post.task.done" disabled type="checkbox">
        </div>
        <div>
          <div class="d-flex w-100 justify-content-between">
            <h5 class="h5">{{ post.task.name }}</h5>
          </div>
          <div class="d-flex w-100 justify-content-between">
            <p class="mb-1">{{ post.task.description }}</p>
          </div>
        </div>
      </li>
      <p class="first">By
        <button class="btn-white" @click="$router.push({name: 'AccountUser', params: {userId: post.user.id}})">
          {{ post.user.username }}
        </button>
        at {{ post.date_time }}
      </p>
    </div>
    <comment-block :id="this.post.id"></comment-block>
  </div>
</template>

<script>
import CommentBlock from "./CommentBlock";

export default {
  name: "PostItem",
  components: {
    CommentBlock
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.first {
  margin-bottom: 8px;
}

.btn-white {
  background-color: #fff;
  border: none;
  padding: 0;
}

.wrap {
  padding: 8px 15px;
  margin: 30px 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.list-group-item {
  display: flex;
  flex-direction: row;
}

.checked_place {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
}

.h5 {
  margin: 0px;
}

.list-group-item {
  margin-bottom: 10px;
}
</style>