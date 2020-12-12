import { createSelector } from 'reselect'
import { IState } from '../IState'
import { IRecordedVideo } from '../../models/IRecordedVideo'

export const recordedVideosURLsSelector = createSelector(
    (state: IState) => state.recordedVideos,
    (recordedVideos: IRecordedVideo[]) => recordedVideos.map((video: IRecordedVideo) => video.videoUrls)
)
