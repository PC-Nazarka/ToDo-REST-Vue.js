<template>
  <!-- Modal for share -->
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" id="modelShare" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Публикация элемента</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="col-form-label">Текст публикации</label>
                <textarea class="form-control" v-model="this.text"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            <button type="button" @click="$emit('shareItem', text); this.text=''" class="btn btn-primary">Опубликовать
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ModalShare",
  data() {
    return {
      text: ''
    }
  }
}
</script>