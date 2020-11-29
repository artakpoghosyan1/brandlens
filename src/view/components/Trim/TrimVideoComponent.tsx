import * as React from 'react'
import video from '../../assets/videos/test4.webm'
import { css } from 'emotion'
import { TrimContext } from '../../contexts/TrimContext'
import { IState } from '../../../data/IState'
import { videoDataSelector } from '../../../data/selectors/videoDataSelector'
import { connect } from 'react-redux'
import { IVideoData } from '../../../models/VideoData'
import { trimmedValueToSecond } from '../../../utilities/utilities'

interface ITrimVideoComponentProps {
    videoData: IVideoData
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

export const TrimVideo: React.FC<ITrimVideoComponentProps> = React.memo(({ videoData: { framesCount, fps } }) => {
    const videoRef: React.RefObject<HTMLVideoElement> = React.createRef()
    const {
        videoCurrentTime,
        setHeaderValue,
        headerValue,
        shouldPauseTrimmingVideo,
        leftTrimValue,
        rightTrimValue,
    } = React.useContext(TrimContext)

    React.useEffect(() => {
        videoRef.current!.currentTime = videoCurrentTime / fps

        if (shouldPauseTrimmingVideo) {
            videoRef.current!.pause()
        } else {
            videoRef.current!.play() // TODO fix
        }
    }, [shouldPauseTrimmingVideo, videoCurrentTime])

    React.useEffect(() => {
        if (headerValue > framesCount - Math.abs(rightTrimValue)) {
            videoRef.current!.currentTime = trimmedValueToSecond(leftTrimValue, fps)
            setHeaderValue(leftTrimValue)
        }
    }, [headerValue, rightTrimValue, videoRef.current])

    const onPlayHandler = () => {
        const thisVideo = videoRef.current!

        intervalId = setInterval(() => {
            setHeaderValue(Math.ceil(thisVideo.currentTime * fps))
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
    videoData: videoDataSelector(state),
})

export const TrimVideoComponent = connect(mapStateToProps)(TrimVideo)
