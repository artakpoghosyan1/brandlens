import * as React from 'react'
import { css } from 'emotion'
import { InfoIconComponent } from './InfoIconComponent'
import { ControlButtonComponent } from './ControlButtonComponent'
import { DropLeftComponent } from './shared/DropLeftComponent'
import { SpeedIcon } from '../assets/icons/SpeedIcon'
import { FlipIcon } from '../assets/icons/FlipIcon'
import { ClockIcon } from '../assets/icons/ClockIcon'

interface IRecordingControlsComponentProps {}

const controlsWrapperCss = css`
    float: right;
    padding-right: 22px;
`

const controlsListCss = css`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const controlsListItemCss = css`
    & + & {
        margin-top: 20px;
    }
`

export const RecordingControlsComponent: React.FC<IRecordingControlsComponentProps> = React.memo(() => {
    return (
        <div className={controlsWrapperCss}>
            <InfoIconComponent />

            <ul className={controlsListCss}>
                <li className={controlsListItemCss}>
                    <ControlButtonComponent>
                        <FlipIcon />
                    </ControlButtonComponent>
                </li>

                <li className={controlsListItemCss}>
                    <DropLeftComponent
                        target={
                            <ControlButtonComponent>
                                <ClockIcon />
                            </ControlButtonComponent>
                        }
                    />
                </li>

                <li className={controlsListItemCss}>
                    <ControlButtonComponent />
                </li>

                <li className={controlsListItemCss}>
                    <ControlButtonComponent>
                        <SpeedIcon />
                    </ControlButtonComponent>
                </li>
            </ul>
        </div>
    )
})
