import * as React from 'react'
import { css } from 'emotion'

interface IStartRecordingButtonComponentProps {
    onClick: () => void
    isRecording: boolean
}

const startBtnClass = css`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #fff;
    border: none;
    position: absolute;
    left: 50%;
    bottom: 25px;
    transform: translateX(-30px);
    transition: all 0.2s;
    z-index: 10;
    cursor: pointer;
`

const startBtnRecordingClass = css`
    background-color: red;
`

export const StartRecordingButtonComponent: React.FunctionComponent<IStartRecordingButtonComponentProps> = React.memo((props) => {
    return (
        <button
            disabled={props.isRecording}
            className={`${startBtnClass} ${props.isRecording ? startBtnRecordingClass : ''}`}
            onClick={props.onClick}
        />
    )
})
