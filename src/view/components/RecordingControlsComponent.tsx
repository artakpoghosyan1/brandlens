import * as React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { ControlButtonComponent } from './shared/ControlButtonComponent'
import { DropLeftComponent } from './shared/DropLeftComponent'
import { SpeedIcon } from '../assets/icons/SpeedIcon'
import { FlipIcon } from '../assets/icons/FlipIcon'
import { setCurrentEffectAction, setSelectedTimerAction } from '../../data/actionCreators'
import { IEffect } from '../../models/IEffect'
import { IState } from '../../data/IState'
import { selectedTimerSelector } from '../../data/selectors/selectedTimerSelector'

interface IRecordingControlsComponentProps {
    setCurrentEffect: (currentEffect: IEffect[]) => void
    setSelectedTimer: (selectedTimer: number | null) => void
    selectedTimer: number | null
}

const controlsWrapperCss = css`
    float: right;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const controlsListCss = css`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const controlsListItemCss = css`
    & + & {
        margin-top: 20px;
    }
`

export const RecordingControls: React.FC<IRecordingControlsComponentProps> = React.memo((props) => {
    const onFilterClickHandler = () => {
        props.setCurrentEffect([
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
        props.setSelectedTimer(value)
    }

    return (
        <div className={controlsWrapperCss}>
            <ul className={controlsListCss} data-testid="controls">
                <li className={controlsListItemCss}>
                    <ControlButtonComponent>
                        <FlipIcon />
                    </ControlButtonComponent>
                </li>

                <li className={controlsListItemCss}>
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
                </li>

                <li className={controlsListItemCss}>
                    <ControlButtonComponent onClick={onFilterClickHandler} />
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

const mapStateToProps = (state: IState) => ({
    selectedTimer: selectedTimerSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentEffect: (currentEffect) => dispatch(setCurrentEffectAction(currentEffect)),
    setSelectedTimer: (selectedTimer) => dispatch(setSelectedTimerAction(selectedTimer)),
})

export const RecordingControlsComponent = connect(mapStateToProps, mapDispatchToProps)(RecordingControls)
