import { IEffect } from '../models/IEffect'
import { IUser } from '../models/IUser'
import { IRecordedVideo } from '../models/IRecordedVideo'

export interface IState {
    currentEffects: IEffect[] | null
    selectedTimer: number
    userData: IUser | null
    recordedVideos: IRecordedVideo[]
    currentRecordedVideo: IRecordedVideo | null
    openSingleTrim: boolean
    combinedVideos: IRecordedVideo | null
}
