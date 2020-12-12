import * as React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { setCurrentEffectAction, setSelectedTimerAction } from '../../data/actionCreators'
import { IEffect } from '../../models/IEffect'
import { IState } from '../../data/IState'
import { selectedTimerSelector } from '../../data/selectors/selectedTimerSelector'

interface IControlButtonsComponentProps {
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const RecordingControls: React.FC<IControlButtonsComponentProps> = React.memo(({ children }) => {
    return (
        <div className={controlsWrapperCss}>
            <ul className={controlsListCss} data-testid="controls">
                {children}
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

export const ControlButtonsComponent = connect(mapStateToProps, mapDispatchToProps)(RecordingControls)
