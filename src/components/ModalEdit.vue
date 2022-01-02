<template>
  <!-- Modal for edit -->
  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" id="modelEdit" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Редактирование элемента</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="col-form-label">Название</label>
              <input type="text" v-model="task.name" class="form-control">
            </div>
            <div class="mb-3">
              <label class="col-form-label">Описание</label>
              <textarea class="form-control" v-model="task.description"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" @click="$emit('editItem', task)" class="btn btn-primary">Редактировать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalEdit",
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>