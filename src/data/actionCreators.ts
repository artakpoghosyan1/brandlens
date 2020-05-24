import * as types from './actions'

export function toggleIsAllowedCameraAction(isAllowedCamera: boolean) {
    return {
        type: types.TOGGLE_IS_ALLOWED_CAMERA,
        isAllowedCamera,
    }
}

export function changeCurrentSceneAction(currentScene: string) {
    return {
        type: types.CHANGE_CURRENT_SCENE,
        currentScene,
    }
}
