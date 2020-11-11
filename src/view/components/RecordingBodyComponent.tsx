import * as React from 'react'
import { RecordingControlsComponent } from './RecordingControlsComponent'
import { css } from 'emotion'
import { recordingPageContainerCss } from '../styles/sharedStyles'

interface IRecordingBodyComponentProps {}

const bodyCss = css`
    ${recordingPageContainerCss};
    flex-grow: 1;
`

export const RecordingBodyComponent: React.FC<IRecordingBodyComponentProps> = React.memo(() => {
    return (
        <div className={bodyCss}>
            <RecordingControlsComponent />
        </div>
    )
})
