import * as React from 'react'
import { css } from 'emotion'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { colors } from '../constants/Colors'

interface IRecordingButtonComponentProps {}

const recordingButtonCss = css`
    ${clearButtonDefaultStylesCss};
    border-radius: 50%;
    width: 90px;
    height: 90px;
    position: relative;
    border: 10px solid #fff;
    overflow: hidden;
    position: absolute;
    bottom: 55px;
    left: 50%;
    margin-left: -45px;

    &:after {
        background-color: ${colors.recordingBtnColor};
        box-shadow: inset 0 0 0 10px ${colors.recordingBtnDarkerColor};
        display: block;
        border-radius: 50%;
        top: 0;
        left: 0;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
    }
`

export const RecordingButtonComponent: React.FC<IRecordingButtonComponentProps> = React.memo(() => {
    return <button className={recordingButtonCss} />
})
