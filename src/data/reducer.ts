import { IState } from './ISstate'

const defaultState: IState = {
    isAllowedCamera: false,
}
export function app(state: IState = defaultState, action) {
    switch (action.type) {
        case 'TOGGLE_IS_ALLOWED_CAMERA':
            return {
                ...state,
                isAllowedCamera: action.isAllowedCamera,
            }
        default:
            return state
    }
}
