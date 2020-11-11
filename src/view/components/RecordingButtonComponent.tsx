import * as React from 'react'
import { css } from 'emotion'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { colors } from '../constants/Colors'

interface IRecordingButtonComponentProps {}

const borderCss = css`
    width: 100%;
    height: 100%;
    background-color: #fff;
    top: -9px;
    left: -9px;
    width: calc(100% + 18px);
    height: calc(100% + 18px);
    z-index: -1;
    transition: all 0.2s ease-in-out;
`

const recordingButtonCss = css`
    &,
    & span {
        border-radius: 50%;
        position: absolute;
    }

    ${clearButtonDefaultStylesCss};
    transition: all 0.3s ease-in-out;
    background-color: ${colors.recordingBtnColor};
    width: 70px;
    height: 70px;
    bottom: 0;
    left: 50%;
    margin-left: -45px;
    box-shadow: inset 0 0 0 10px ${colors.recordingBtnDarkerColor};

    &:hover {
        box-shadow: inset 0 0 0 0 ${colors.recordingBtnDarkerColor}, 0 0 0 10px rgba(222, 8, 21, 0.4);

        span {
            width: 8px;
            height: 8px;
            top: 50%;
            left: 50%;
            transform: translate(-4px, -4px);
            z-index: 1;
        }
    }
`

export const RecordingButtonComponent: React.FC<IRecordingButtonComponentProps> = React.memo(() => {
    return (
        <button className={recordingButtonCss}>
            <span className={borderCss} />
        </button>
    )
})
