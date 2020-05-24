import { TOGGLE_IS_ALLOWED_CAMERA } from './actions'

export function toggleIsAllowedCameraAction(isAllowedCamera) {
    return {
        type: TOGGLE_IS_ALLOWED_CAMERA,
        isAllowedCamera,
    }
}
