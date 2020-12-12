import * as React from 'react'
import video from '../../assets/videos/test4.webm'
import { css } from 'emotion'
import { TrimContext } from '../../contexts/TrimContext'
import { IState } from '../../../data/IState'
import { useSelector } from 'react-redux'
import { trimmesCountToSecond } from '../../../utilities/utilities'

interface ITrimVideoComponentProps {}

const videoWrapperCss = css`
    position: relative;
    width: 80%;
    height: 100%;
    margin: 0 auto;
`

const videoCss = css`
    position: absolute;
    height: 100%;
    width: 100%;
`

let intervalId: any

export const TrimVideoComponent: React.FC<ITrimVideoComponentProps> = React.memo(() => {
    const videoRef: React.RefObject<HTMLVideoElement> = React.createRef()
    const {
        videoCurrentTime,
        setVideoCurrentTime,
        shouldPauseTrimmingVideo,
        leftTrimValue,
        rightTrimValue,
        framesCount,
        fps,
    } = React.useContext(TrimContext)

    const recordedVideos = useSelector(({ recordedVideos }: IState) => recordedVideos)

    // TODO temporary solution
    const videos = React.useMemo(() => {
        const videos: any[] = []
        for (let i = 0; i < recordedVideos.length; i++) {
            videos.push(video)
        }

        return videos
    }, [recordedVideos])

    const { framesCounts } = useSelector((state: IState) => state.currentRecordedVideo)!

    React.useEffect(() => {
        videoRef.current!.currentTime = videoCurrentTime / fps

        if (shouldPauseTrimmingVideo) {
            videoRef.current!.pause()
        } else {
            videoRef.current!.play() // TODO fix
        }

        // if (videos.length > 1) {
        //     let i = 0
        //
        //     while (videoCurrentTime === framesCounts[i]) {
        //         videoRef.current!.src = videos[i]
        //         i++
        //     }
        //
        //     // framesCounts.forEach(framesCount => {
        //     //     if(thisVideo.currentTime === framesCount) {
        //     //
        //     //     }
        //     // })
        // }
    }, [shouldPauseTrimmingVideo, videoCurrentTime])

    React.useEffect(() => {
        if (videoCurrentTime > framesCount - Math.abs(rightTrimValue)) {
            videoRef.current!.currentTime = trimmesCountToSecond(leftTrimValue, fps)
            setVideoCurrentTime(leftTrimValue)
        }
    }, [videoCurrentTime, rightTrimValue, videoRef.current])

    const onPlayHandler = () => {
        const thisVideo = videoRef.current!

        intervalId = setInterval(() => {
            setVideoCurrentTime(Math.ceil(thisVideo.currentTime * fps))
        }, 40)
    }

    const onPauseHandler = () => {
        clearInterval(intervalId)
    }

    return (
        <div className={videoWrapperCss}>
            <video
                loop
                autoPlay
                src={videos[0]}
                className={videoCss}
                onPlay={onPlayHandler}
                onPause={onPauseHandler}
                ref={videoRef}
            />
        </div>
    )
})
