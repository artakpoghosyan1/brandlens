import * as types from './actions'
import { IEffect } from '../models/IEffect'
import { IUser } from '../models/IUser'

export const setCurrentEffectAction = (currentEffect: IEffect[] | null) => {
    return {
        type: types.SET_CURRENT_EFFECTS,
        currentEffect,
    }
}

export const setSelectedTimerAction = (selectedTimer: number | null) => {
    return {
        type: types.SET_SELECTED_TIMER,
        selectedTimer,
    }
}

export const setUserDataAction = (userData: IUser) => {
    return {
        type: types.SET_USER_DATE,
        userData,
    }
}
