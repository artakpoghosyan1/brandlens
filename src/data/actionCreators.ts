import * as types from './actions'

export function setCurrentEffectAction(currentEffect) {
    return {
        type: types.SET_CURRENT_EFFECTS,
        currentEffect,
    }
}

export function setSelectedTimerAction(selectedTimer) {
    return {
        type: types.SET_SELECTED_TIMER,
        selectedTimer,
    }
}
