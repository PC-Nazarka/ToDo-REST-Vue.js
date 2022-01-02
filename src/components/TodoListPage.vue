<template>
  <div @click="this.closeModal">
    <div class="d-flex w-100 justify-content-between">
      <h1 class="py-4">TODO LIST</h1>
      <div class="btn_block">
        <button type="button" @click="this.openModalCreate" data-bs-toggle="modal" data-bs-target="#modelCreate"
                class="btn btn-success rounded-circle">+
        </button>
      </div>
    </div>
    <div>
      <div class="d-flex justify-content-between">
        <h5>Активные</h5>
        <h5 class="pe-2">{{ this.listActiveTodos.length }}</h5>
      </div>
      <hr>
      <ul class="list-group">
        <div v-if="this.listActiveTodos.length">
          <ListItem v-for="task in this.listActiveTodos" :task="task" :key="task.id"
                    @edit="this.editTask"
                    @remove="this.deleteTask"
                    @openModalEdit="this.openModalEdit"
                    @openModalShare="this.openModalShare"></ListItem>
        </div>
        <div v-else>
          <p>Нет активных задач</p>
        </div>
      </ul>
    </div>

    <div class="mt-5">
      <div class="d-flex justify-content-between">
        <h5>Завершенные</h5>
        <h5 class="pe-2">{{ this.listCompleteTodos.length }}</h5>
      </div>
      <hr>
      <ul class="list-group">
        <div v-if="this.listCompleteTodos.length">
          <ListItem v-for="task in this.listCompleteTodos" :task="task" :key="task.id"
                    @edit="this.editTask"
                    @remove="this.deleteTask"
                    @openModalEdit="this.openModalEdit"
                    @openModalShare="this.openModalShare"></ListItem>
        </div>
        <div v-else>
          <p>Нет завершенных задач</p>
        </div>
      </ul>
      <br>
    </div>
    <ModalCreate v-show="this.modalCreate" @createItem="this.createTask"></ModalCreate>
    <ModalShare v-show="this.modalShare" @shareItem="this.shareTask"></ModalShare>
    <ModalEdit v-show="this.modalEdit" @editItem="this.editTask" :task="this.task"></ModalEdit>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue"
import ModalCreate from "./ModalCreate.vue"
import ModalEdit from "./ModalEdit.vue"
import ModalShare from "./ModalShare.vue"
import axios from 'axios'

export default {
  name: "TodoListPage",
  components: {
    ModalCreate,
    ModalEdit,
    ModalShare,
    ListItem
  },
  data() {
    return {
      listActiveTodos: [],
      listCompleteTodos: [],
      modalEdit: false,
      modalCreate: false,
      modalShare: false,
      task: Object(),
      isUpdated: false
    }
  },
  methods: {
    async shareTask(text) {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.post(this.$store.state.url + `wall/create-post/`,
            {
              task: this.task.id,
              text: text
            },
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        this.closeModal()
        this.isUpdated = true
        this.$emit('update', this.isUpdated)
        this.isUpdated = false
      } catch (e) {
        alert('Ошибка обновления задачи')
      }
    },
    async createTask(name, description) {
      this.modalCreate = false
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.post(this.$store.state.url + `todo/create/`,
            {
              name: name,
              description: description,
              done: false,
            },
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        await this.fetchTasks()
        this.closeModal()
      } catch (e) {
        alert('Ошибка обновления задачи')
      }
    },
    async editTask(task) {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.put(this.$store.state.url + `todo/${task.id}/`,
            {
              name: task.name,
              description: task.description,
              done: task.done,
            },
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        this.closeModal()
        await this.fetchTasks()
        this.isUpdated = true
        this.$emit('update', this.isUpdated)
        this.isUpdated = false
      } catch (e) {
        alert('Ошибка обновления задачи')
      }
    },
    async deleteTask(task) {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.delete(this.$store.state.url + `todo/${task.id}/`,
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        await this.fetchTasks()
        this.isUpdated = true
        this.$emit('update', this.isUpdated)
        this.isUpdated = false
      } catch (e) {
        alert('Ошибка удаления задачи')
      }
    },
    async fetchTasks() {
      try {
        await this.$store.dispatch('setAccess')
        const response = await axios.get(this.$store.state.url + `${this.$store.state.user.id}/todos/`,
            {
              headers:
                  {
                    "Authorization": 'JWT ' + this.$store.state.access
                  }
            })
        this.packageTodos(response)
      } catch (e) {
        alert('Ошибка')
      }
    },
    packageTodos(response) {
      this.listActiveTodos = response.data.filter(todo => todo.done === false)
      this.listCompleteTodos = response.data.filter(todo => todo.done === true)
    },
    openModalShare(task) {
      this.task = task
      this.modalShare = true
    },
    openModalCreate() {
      this.modalCreate = true
    },
    openModalEdit(task) {
      this.task = task
      this.modalEdit = true
    },
    closeModal() {
      if (this.modalEdit || this.modalCreate || this.modalShare) {
        this.modalEdit = false
        this.modalCreate = false
        this.modalShare = false
      }
    },
  },
  mounted() {
    if (this.$store.state.access !== '' && this.$store.state.user !== Object) {
      this.fetchTasks()
    }
  }
}
</script>

<style scoped>
h1.py-4 {
  padding: 0 !important;
}

.btn_block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

hr {
  margin: 10px 0;
}
</style>
