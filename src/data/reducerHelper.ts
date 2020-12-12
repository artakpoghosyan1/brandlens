import { IRecordedVideo } from '../models/IRecordedVideo'

export const updateRecordedVideos = (recordedVideos: IRecordedVideo[], newRecordedVideo: IRecordedVideo): IRecordedVideo[] => {
    return recordedVideos.map((video: IRecordedVideo) => {
        if (video.id === newRecordedVideo.id) {
            return newRecordedVideo
        } else {
            return video
        }
    })
}
