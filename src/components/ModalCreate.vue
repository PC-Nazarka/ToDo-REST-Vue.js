<template>
  <!-- Modal for create -->
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" id="modelCreate"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Новый элемент</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="col-form-label">Название</label>
                <input type="text" v-model="this.name" class="form-control">
              </div>
              <div class="mb-3">
                <label class="col-form-label">Описание</label>
                <textarea class="form-control" v-model="this.description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            <button type="button" @click="$emit('createItem', this.name, this.description); this.name=''; this.description='';" class="btn btn-primary">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "ModalCreate",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: '',
      description: ''
    }
  }
}
</script>