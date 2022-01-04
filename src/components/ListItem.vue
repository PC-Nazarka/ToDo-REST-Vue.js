<template>
  <div>
    <li class="list-group-item list-group-item-action">
      <div class="checked_place">
        <input class="form-check-input me-1" v-model="task.done" @click="this.editTask" type="checkbox">
      </div>
      <div class="list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="h5">{{ task.name }}</h5>
          <div class="dropdown">
            <button class="btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              <h6>&hellip;</h6>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li>
                <button @click="$emit('openModalShare', task)" class="dropdown-item" data-bs-toggle="modal" type="button"
                        data-bs-target="#modelShare">Поделиться</button>
              </li>
              <li>
                <button @click="$emit('openModalEdit', task)" class="dropdown-item" data-bs-toggle="modal"
                        data-bs-target="#modelEdit" type="button">Изменить
                </button>
              </li>
              <li>
                <button @click="$emit('remove', task)" class="dropdown-item" type="button">Удалить</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="mb-1">{{ task.description }}</p>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    editTask() {
      this.task.done = !this.task.done
      this.$emit('edit', this.task)
    }
  }
}
</script>

<style scoped>
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
