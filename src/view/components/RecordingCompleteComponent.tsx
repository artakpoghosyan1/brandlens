import * as React from 'react'
import { PageComponent } from './shared/PageComponent'
import { PageHeaderComponent } from './shared/PageHeaderComponent'
import { BackIcon } from '../assets/icons/BackIcon'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { PageBodyComponent } from './shared/PageBodyComponent'
import { ControlButtonComponent } from './shared/ControlButtonComponent'
import { ControlButtonsItemComponent } from './ControlButtonsItemComponent'
import { ControlButtonsComponent } from './ControlButtonsComponent'
import { ButtonComponent } from './shared/ButtonComponent'
import { NextIcon } from '../assets/icons/NextIcon'
import video from '../assets/videos/overlayAnimation.mp4'
import { css } from 'emotion'

interface IRecordingCompleteComponentProps {}

const completeVideo = css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
`

const completeCss = css`
    padding: 0 12px;
`

export const RecordingCompleteComponent: React.FC<IRecordingCompleteComponentProps> = React.memo(() => {
    return (
        <PageComponent data-testid="complete" className={completeCss}>
            <video src={video} autoPlay loop={true} className={completeVideo} />

            <PageHeaderComponent>
                <button className={clearButtonDefaultStylesCss}>
                    <BackIcon />
                </button>
            </PageHeaderComponent>

            <PageBodyComponent>
                <ControlButtonsComponent>
                    <ControlButtonsItemComponent>
                        <ControlButtonComponent>
                            <button className={clearButtonDefaultStylesCss}>/\</button>
                        </ControlButtonComponent>
                    </ControlButtonsItemComponent>
                </ControlButtonsComponent>
            </PageBodyComponent>

            <footer>
                <ButtonComponent>
                    Next
                    <NextIcon />
                </ButtonComponent>
            </footer>
        </PageComponent>
    )
})
