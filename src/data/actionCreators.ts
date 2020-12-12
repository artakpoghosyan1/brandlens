import * as types from './actions'
import { IEffect } from '../models/IEffect'
import { IUser } from '../models/IUser'
import { IRecordedVideo } from '../models/IRecordedVideo'

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

export const setRecordedVideoAction = (recordedVideo: IRecordedVideo) => {
    return {
        type: types.SET_RECORDED_VIDEO,
        recordedVideo,
    }
}

export const updateRecordedVideoAction = (recordedVideo: IRecordedVideo) => {
    return {
        type: types.UPDATE_RECORDED_VIDEO,
        recordedVideo,
    }
}

export const setCurrentVideoAction = (currentRecordedVideo: IRecordedVideo | null) => {
    return {
        type: types.SET_CURRENT_VIDEO,
        currentRecordedVideo,
    }
}

export const toggleSingleTrimSection = (openSingleTrim: boolean) => {
    return {
        type: types.TOGGLE_SINGLE_TRIM,
        openSingleTrim,
    }
}

export const setCombinedVideosAction = (combinedVideos: IRecordedVideo) => {
    return {
        type: types.SET_COMBINED_VIDEOS,
        combinedVideos,
    }
}

export const updateCombinedVideosTrimDataAction = (trimData: IRecordedVideo) => {
    return {
        type: types.UPDATE_COMBINED_VIDEOS_TRIM_DATA,
        trimData,
    }
}
