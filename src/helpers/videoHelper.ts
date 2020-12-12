import { IRecordedVideo } from '../models/IRecordedVideo'

export const createCombinedVideos = (recordedVideos: IRecordedVideo[]): IRecordedVideo => {
    const initialValue: IRecordedVideo = {
        id: 'combinedVideos',
        videoUrls: [],
        frameThumbnails: [],
        framesCounts: [],
        fps: 0,
        trimData: {
            leftTrimValue: 0,
            rightTrimValue: 0,
            leftTrimDragValue: 0,
            rightTrimDragValue: 0,
            videoCurrentTime: 0,
        },
    }

    return recordedVideos.reduce((combinedVideos, video: IRecordedVideo): IRecordedVideo => {
        combinedVideos.videoUrls.push(...video.videoUrls)
        combinedVideos.framesCounts.push(...video.framesCounts)
        combinedVideos.fps = video.fps
        combinedVideos.frameThumbnails.push(...video.frameThumbnails)
        combinedVideos.trimData = {
            ...combinedVideos.trimData,
        }

        return combinedVideos
    }, initialValue)
}
