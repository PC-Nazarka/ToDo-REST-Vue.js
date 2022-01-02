<template>
    <div class="container w-50 py-5">
        <h1>Вход</h1>
        <form>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Старый пароль</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Новый пароль</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Повтор нового пароля</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Изменить</button>
            <button @click="$router.push({name: 'changeEmail'})" class="btn btn-success me-3">Сменить email</button>
            <button @click="$router.push({name: 'editProfile'})" class="btn btn-success me-3">Редактировать профиль</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>
