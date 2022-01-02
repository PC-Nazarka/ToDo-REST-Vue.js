<template>
    <div class="container w-50 py-5">
        <h1>Вход</h1>
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Введите новый адресс электронной почты, на который будет выслано письмо с подверждением</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Изменить</button>
            <button @click="$router.push({name: 'editProfile'})" class="btn btn-success me-3">Редактировать профиль</button>
            <button @click="$router.push({name: 'changePassword'})" class="btn btn-success">Сменить пароль</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>
