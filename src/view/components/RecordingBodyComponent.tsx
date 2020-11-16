import * as React from 'react'
import { RecordingControlsComponent } from './RecordingControlsComponent'
import { recordingPageContainerCss } from '../styles/sharedStyles'
import { PageBodyComponent } from './shared/PageBodyComponent'
import { css } from 'emotion'

const recordingBodyCss = css`
    ${recordingPageContainerCss};
    margin-top: 40px;
`

export const RecordingBodyComponent: React.FC = React.memo(() => {
    return (
        <PageBodyComponent className={recordingBodyCss}>
            <RecordingControlsComponent />
        </PageBodyComponent>
    )
})
