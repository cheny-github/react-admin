import store from 'store'

// 获取/设置 当前登录的用户
export default {
    setUser(user){
        store.set('user_key',user)
    },
    getUser(){
        return store.get('user_key')
    },
    logOut(){
        store.remove('user_key')
    }
}