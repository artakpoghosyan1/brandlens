import * as React from 'react'
import { css } from 'emotion'

interface IRecordingProgressBarComponentProps {
    isRecording: boolean
}

const progressBarClass = css`
    height: 7px;
    background: #fff;
    opacity: 0;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 10;
`

const progressBarInnerClass = css`
    width: 0;
    height: 100%;
    background-color: red;
    transition: all 2s;
`

const fillClass = css`
    width: 100%;
`

const showClass = css`
    opacity: 1;
`

export const RecordingProgressBarComponent: React.FunctionComponent<IRecordingProgressBarComponentProps> = React.memo((props) => {
    return (
        <div className={`${progressBarClass} ${props.isRecording ? showClass : ''}`}>
            <div className={`${progressBarInnerClass} ${props.isRecording ? fillClass : ''}`} />
        </div>
    )
})
