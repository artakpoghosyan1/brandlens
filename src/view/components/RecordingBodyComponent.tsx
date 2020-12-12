import * as React from 'react'
import { ControlButtonsComponent } from './ControlButtonsComponent'
import { recordingPageContainerCss } from '../styles/sharedStyles'
import { PageBodyComponent } from './shared/PageBodyComponent'
import { css } from 'emotion'
import { ControlButtonComponent } from './shared/ControlButtonComponent'
import { FlipIcon } from '../assets/icons/FlipIcon'
import { DropLeftComponent } from './shared/DropLeftComponent'
import { SpeedIcon } from '../assets/icons/SpeedIcon'
import { ControlButtonsItemComponent } from './ControlButtonsItemComponent'
import { IState } from '../../data/IState'
import { selectedTimerSelector } from '../../data/selectors/selectedTimerSelector'
import { setCurrentEffectAction, setSelectedTimerAction } from '../../data/actionCreators'
import { connect } from 'react-redux'
import { IEffect } from '../../models/IEffect'

interface IRecordingBodyComponentProps {
    setCurrentEffect: (currentEffect: IEffect[]) => void
    setSelectedTimer: (selectedTimer: number | null) => void
    selectedTimer: number | null
}

const recordingBodyCss = css`
    ${recordingPageContainerCss};
    margin-top: 40px;
`

export const RecordingBody: React.FC<IRecordingBodyComponentProps> = React.memo(({ setCurrentEffect, setSelectedTimer }) => {
    const onFilterClickHandler = () => {
        setCurrentEffect([
            {
                value: 'filter1',
                id: 'filter1',
            },
            {
                value: 'filter2',
                id: 'filter2',
            },
            {
                value: 'filter3',
                id: 'filter3',
            },
            {
                value: 'filter4',
                id: 'filter4',
            },
            {
                value: 'filter5',
                id: 'filter5',
            },
            {
                value: 'filter6',
                id: 'filter6',
            },
            {
                value: 'filter7',
                id: 'filter7',
            },
            {
                value: 'filter8',
                id: 'filter8',
            },
            {
                value: 'filter9',
                id: 'filter9',
            },
        ])
    }

    const onTimerChangeHandler = (value: number) => {
        setSelectedTimer(value)
    }

    return (
        <PageBodyComponent className={recordingBodyCss}>
            <ControlButtonsComponent>
                <ControlButtonsItemComponent>
                    <ControlButtonComponent>
                        <FlipIcon />
                    </ControlButtonComponent>
                </ControlButtonsItemComponent>

                <ControlButtonsItemComponent>
                    <DropLeftComponent
                        options={[
                            {
                                label: 'Off',
                                value: 0,
                            },
                            {
                                label: '3s',
                                value: 3,
                            },
                            {
                                label: '10s',
                                value: 10,
                            },
                        ]}
                        onChange={onTimerChangeHandler}
                    />
                </ControlButtonsItemComponent>

                <ControlButtonsItemComponent>
                    <ControlButtonComponent onClick={onFilterClickHandler} />
                </ControlButtonsItemComponent>

                <ControlButtonsItemComponent>
                    <ControlButtonComponent>
                        <SpeedIcon />
                    </ControlButtonComponent>
                </ControlButtonsItemComponent>
            </ControlButtonsComponent>
        </PageBodyComponent>
    )
})

const mapStateToProps = (state: IState) => ({
    selectedTimer: selectedTimerSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentEffect: (currentEffect) => dispatch(setCurrentEffectAction(currentEffect)),
    setSelectedTimer: (selectedTimer) => dispatch(setSelectedTimerAction(selectedTimer)),
})

export const RecordingBodyComponent = connect(mapStateToProps, mapDispatchToProps)(RecordingBody)
