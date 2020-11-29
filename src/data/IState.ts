import { IEffect } from '../models/IEffect'
import { IUser } from '../models/IUser'
import { IVideoData } from '../models/VideoData'

export interface IState {
    currentEffects: IEffect[] | null
    selectedTimer: number
    userData: IUser | null
    videoData: IVideoData[] | null
}
