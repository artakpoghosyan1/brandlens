export interface IRecordedVideo {
    id: string
    videoUrls: string[]
    frameThumbnails: string[]
    framesCounts: number[]
    fps: number
    trimData: ITrimData
}
