const defaultUserState = {
    isAuthenticated: false,
    user: {}
}


const userReducer = (state = defaultUserState, action) => {
    switch (action.type) {
        case "SET_USER":
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('username', action.payload.username)
            return {
                isAuthenticated: true,
                user: {...action.payload}
            }
        case "LOG_OUT":
            localStorage.clear()
            return {
                isAuthenticated: false,
                user: {}
            }
        case "AUTO_SIGN_IN":
            return {
                isAuthenticated: true,
                user: {
                    username: localStorage.getItem('username'),
                    token: localStorage.getItem('token')
                }
            }
        default:
            return state
    }
}

export default userReducer