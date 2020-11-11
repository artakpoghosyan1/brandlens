import * as React from 'react'
import { CloseButtonComponent } from './shared/CloseButtonComponent'
import { InfoIconComponent } from './InfoIconComponent'
import { css } from 'emotion'
import { recordingPageContainerCss } from '../styles/sharedStyles'

interface IRecordingHeaderComponentProps {}

const headerCss = css`
    ${recordingPageContainerCss};
    padding-top: 5px;
    padding-right: 14px;
`

const headerButtonsCss = css`
    display: flex;
    justify-content: space-between;
`

const recordingBarCss = css`
    background: rgba(63, 61, 61, 0.58);
    border-radius: 30px;
    height: 15px;
    margin-bottom: 10px;
`

export const RecordingHeaderComponent: React.FC<IRecordingHeaderComponentProps> = React.memo(() => {
    return (
        <header className={headerCss}>
            <div className={recordingBarCss}></div>
            <div className={headerButtonsCss}>
                <CloseButtonComponent />

                <InfoIconComponent />
            </div>
        </header>
    )
})
