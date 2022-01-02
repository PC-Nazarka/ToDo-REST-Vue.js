<template>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Никнейм</label>
                <input type="text" class="form-control" id="exampleInputEmail1">
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Имя</label>
                <input type="text" class="form-control" id="exampleInputEmail1">
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Изменить</button>
            <button @click="$router.push({name: 'changePassword'})" class="btn btn-success">Сменить пароль</button>
            <button @click="$router.push({name: 'changeEmail'})" class="btn btn-success me-3">Сменить email</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>
