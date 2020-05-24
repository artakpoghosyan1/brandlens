import * as React from 'react'
import { css } from 'emotion'

interface IVideoComponentProps {
    videoURL: string
    isRecordingComplete: boolean
}

const videoWrapperClass = css`
    text-align: center;
    // visibility: hidden;
    // opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    transition: 0.7s all;
`

export const VideoComponent: React.FunctionComponent<IVideoComponentProps> = React.memo(
    (props) => {
        return (
            <>
                {props.isRecordingComplete ? (
                    <div id="video-wrapper" className={videoWrapperClass}>
                        <video
                            src={props.videoURL}
                            id="video"
                            className="video"
                            autoPlay
                            loop
                        />

                        <div className="video-btns">
                            <button id="retry" className="button retry" />
                            <button id="ok" className="button ok" />
                        </div>
                    </div>
                ) : null}
            </>
        )
    }
)
