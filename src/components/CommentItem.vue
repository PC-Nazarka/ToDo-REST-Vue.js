<template>
  <div class="comment">
    <hr class="comment">
    <div class="fw-bold" @click="$router.push({name: 'AccountUser', params: {userId: comment.user.id}})">{{ comment.user.username }}</div>
    <div class="fw-normal">{{ comment.text }}</div>
    <div class="fw-lighter">{{ comment.date_time }}</div>
  </div>
</template>

<script>
export default {
  name: "CommentItem",
  props: {
    comment: Object
  }
}
</script>

<style scoped>
div.comment{
  margin: 0 0 10px 0;
}

hr.comment{
  margin-bottom: 5px;
}
</style>