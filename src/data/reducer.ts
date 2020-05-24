import { IState } from './ISstate'
import * as types from './actions'

const defaultState: IState = {
    isAllowedCamera: false,
    currentScene: 'step_1',
}

export function app(state: IState = defaultState, action) {
    switch (action.type) {
        case types.TOGGLE_IS_ALLOWED_CAMERA:
            return {
                ...state,
                isAllowedCamera: action.isAllowedCamera,
            }
        case types.CHANGE_CURRENT_SCENE:
            return {
                ...state,
                currentScene: action.currentScene,
            }
        default:
            return state
    }
}
