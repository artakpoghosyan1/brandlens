import * as types from './actions'
import { IState } from './IState'
import { updateRecordedVideos } from './reducerHelper'
import { recordedVideoMockData } from '../mockData/recordedVideoMockData'

const initialState: IState = {
    currentEffects: null,
    selectedTimer: 0,
    userData: null,
    recordedVideos: recordedVideoMockData,
    currentRecordedVideo: null,
    openSingleTrim: false,
    combinedVideos: null,
}

export const reducer = (state: IState = initialState, action): IState => {
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

        case types.SET_CURRENT_VIDEO:
            return {
                ...state,
                currentRecordedVideo: action.currentRecordedVideo,
            }

        case types.SET_RECORDED_VIDEO:
            return {
                ...state,
                recordedVideos: [...state.recordedVideos, action.recordedVideo],
            }

        case types.UPDATE_RECORDED_VIDEO:
            return {
                ...state,
                recordedVideos: updateRecordedVideos(state.recordedVideos, action.recordedVideo),
            }

        case types.TOGGLE_SINGLE_TRIM:
            return {
                ...state,
                openSingleTrim: action.openSingleTrim,
            }

        case types.SET_COMBINED_VIDEOS:
            return {
                ...state,
                combinedVideos: action.combinedVideos,
            }

        case types.UPDATE_COMBINED_VIDEOS_TRIM_DATA:
            return {
                ...state,
                combinedVideos: {
                    ...state.combinedVideos!,
                    trimData: action.trimData,
                },
            }

        default:
            return state
    }
}
