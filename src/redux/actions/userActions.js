import {ActionsTypes} from '../contants/actions-types'

export const setUser = (user) => ({type: ActionsTypes.SET_USER, payload: user})

export const logUserOut = () => ({type: ActionsTypes.LOG_OUT})

export const autoSignIn = () => ({type: ActionsTypes.AUTO_SIGN_IN})
