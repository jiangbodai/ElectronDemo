export default{
    state: {
        noInternet : false,
        role: '超级管理员'
    },
    mutations: {
        changeRole(state, role){
            state.role = role;
        }
    },
}