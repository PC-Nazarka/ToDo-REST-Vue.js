import {createRouter, createWebHistory} from 'vue-router'
import LogIn from "@/pages/LogIn.vue"
import SignIn from "@/pages/SignIn.vue"
import AccountUser from "@/pages/AccountUser.vue"
import SearchList from "@/pages/SearchList.vue"
import EditProfile from "@/pages/EditProfile.vue"
import ChangePassword from "@/pages/ChangePassword.vue"
import ChangeUsername from "@/pages/ChangeUsername.vue"
import NewTodos from "@/pages/NewTodos.vue"
import DeleteAccount from "@/pages/DeleteAccount.vue"


const routes = [
    {
        path: '/',
        name: 'Home',
        component: NewTodos
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/:userId',
        name: 'AccountUser',
        component: AccountUser,
        children: [
            {
                path: '/edit/profile',
                name: 'EditProfile',
                component: EditProfile,
            },
            {
                path: '/change/password',
                name: 'ChangePassword',
                component: ChangePassword,
            },
            {
                path: '/change/username',
                name: 'ChangeUsername',
                component: ChangeUsername,
            },
            {
                path: '/delete',
                name: 'DeleteAccount',
                component: DeleteAccount,
            }
        ]
    },
    {
        path: '/search',
        name: 'SearchList',
        component: SearchList
    },
    {
        path: '/wall',
        name: 'NewTodos',
        component: NewTodos
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
