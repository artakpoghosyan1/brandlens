import * as React from 'react'
import video from '../../assets/videos/test4.webm'
import { css } from 'emotion'
import { TrimContext } from '../../contexts/TrimContext'
import { IState } from '../../../data/IState'
import { currentRecordedVideoSelector } from '../../../data/selectors/currentRecordedVideoSelector'
import { connect } from 'react-redux'
import { IRecordedVideo } from '../../../models/IRecordedVideo'
import { trimmedValueToSecond } from '../../../utilities/utilities'

interface ITrimVideoComponentProps {
    currentRecordedVideo: IRecordedVideo
}

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

export const TrimVideo: React.FC<ITrimVideoComponentProps> = React.memo(({ currentRecordedVideo: { framesCount, fps } }) => {
    const videoRef: React.RefObject<HTMLVideoElement> = React.createRef()
    const { videoCurrentTime, setVideoCurrentTime, shouldPauseTrimmingVideo, leftTrimValue, rightTrimValue } = React.useContext(
        TrimContext
    )

    React.useEffect(() => {
        videoRef.current!.currentTime = videoCurrentTime / fps

        if (shouldPauseTrimmingVideo) {
            videoRef.current!.pause()
        } else {
            videoRef.current!.play() // TODO fix
        }
    }, [shouldPauseTrimmingVideo, videoCurrentTime])

    React.useEffect(() => {
        if (videoCurrentTime > framesCount - Math.abs(rightTrimValue)) {
            videoRef.current!.currentTime = trimmedValueToSecond(leftTrimValue, fps)
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
                src={video}
                className={videoCss}
                onPlay={onPlayHandler}
                onPause={onPauseHandler}
                ref={videoRef}
            />
        </div>
    )
})

const mapStateToProps = (state: IState) => ({
    currentRecordedVideo: currentRecordedVideoSelector(state),
})

export const TrimVideoComponent = connect(mapStateToProps)(TrimVideo)
