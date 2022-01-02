import {createStore} from 'vuex'
import axios from "axios";
import router from "../router";

export default createStore({
    state: {
        url: 'http://127.0.0.1:8000/api/v1/',
        access: '',
        refresh: '',
        user: Object,
        isUpdated: false
    },
    mutations: {
        setAccess(state, access) {
            state.access = access
        },
        setRefresh(state, refresh) {
            state.refresh = refresh
        },
        setUser(state, user) {
            state.user = user
        },
        setIsUpdated(state, bool) {
            state.isUpdated = bool
        }
    },
    getters: {
        getUrl(state) {
            return state.url
        },
        getAccess(state) {
            return state.access
        },
        getRefresh(state) {
            return state.refresh
        },
        getUser(state) {
            return state.user
        },
        getIsUpdated(state) {
            return state.isUpdated
        }
    },
    actions: {
        async setUser({commit, state}) {
            try {
                const response = await axios.get(state.url + "auth/users/me/",
                    {
                        headers:
                            {
                                "Authorization": 'JWT ' + state.access
                            }
                    })
                commit('setUser', response.data)
            } catch (e) {
                alert('Ошибка входа. Повторите попытку')
            }
        },
        async setAccess({commit, state}) {
            if (state.access !== '') {
                try {
                    const response = await axios.post(state.url + "auth/jwt/verify/",
                        {
                            token: state.access
                        })
                } catch (error) {
                    if (error.response.status === 401) {
                        try {
                            const response_refresh = await axios.post(state.url + "auth/jwt/refresh/",
                                {
                                    refresh: state.refresh
                                })
                            commit('setAccess', response_refresh.data.access)
                        } catch (e) {
                            alert('Ошибка получения нового токена')
                        }
                    }
                }
            }
        }
    }
})
