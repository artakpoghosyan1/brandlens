import * as types from './actions'
import { IState } from './IState'

const initialState: IState = {
    currentEffects: null,
    selectedTimer: 0,
    userData: null,
    recordedVideos: [],
    currentRecordedVideo: null,
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_CURRENT_EFFECTS:
            return {
                ...state,
                currentEffects: action.currentEffect,
            }

        case types.SET_SELECTED_TIMER:
            return {
                ...state,
                selectedTimer: action.selectedTimer,
            }

        case types.SET_USER_DATE:
            return {
                ...state,
                userData: action.userData,
            }

        default:
            return state
    }
}
