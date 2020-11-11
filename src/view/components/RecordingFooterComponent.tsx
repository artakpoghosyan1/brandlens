import * as React from 'react'
import { RecordingButtonComponent } from './RecordingButtonComponent'
import { ControlButtonComponent } from './shared/ControlButtonComponent'
import { css } from 'emotion'
import { EffectsComponent } from './EffectsComponent'
import { recordingPageContainerCss } from '../styles/sharedStyles'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { setCurrentEffectAction } from '../../data/actionCreators'
import { IEffect } from '../../models/IEffect'
import { IState } from '../../data/IState'
import { currentEffectSelector } from '../../data/selectors/currentEffectsSelector'

interface IRecordingFooterComponentProps {
    setCurrentEffect: (currentEffects: IEffect[]) => void
    currentEffects: IEffect[] | null
}

const footerCss = css``

const footerActionsCss = css`
    ${recordingPageContainerCss};
    position: relative;
    height: 91px;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
`

export const RecordingFooter: React.FC<IRecordingFooterComponentProps> = React.memo((props) => {
    const openEffectsOnClickHandler = () => {
        props.setCurrentEffect([
            {
                value: 'effect1',
                id: 'effect1',
            },
            {
                value: 'effect2',
                id: 'effect2',
            },
            {
                value: 'effect3',
                id: 'effect3',
            },
            {
                value: 'effect4',
                id: 'effect4',
            },
            {
                value: 'effect5',
                id: 'effect5',
            },
            {
                value: 'effect6',
                id: 'effect6',
            },
            {
                value: 'effect7',
                id: 'effect7',
            },
            {
                value: 'effect8',
                id: 'effect8',
            },
            {
                value: 'effect9',
                id: 'effect9',
            },
        ])
    }

    const openEffects = !!props.currentEffects

    return (
        <footer className={footerCss}>
            <CSSTransition in={!openEffects} timeout={200} classNames="record-wrapper" unmountOnExit>
                <div className={footerActionsCss}>
                    <ControlButtonComponent
                        large
                        onClick={openEffectsOnClickHandler}
                        data-testid="open-effects"
                    ></ControlButtonComponent>

                    <RecordingButtonComponent />
                </div>
            </CSSTransition>

            <CSSTransition in={openEffects} timeout={300} classNames="effects" unmountOnExit>
                <EffectsComponent onChange={(value) => console.log(value)} />
            </CSSTransition>
        </footer>
    )
})

const mapStateToProps = (state: IState) => ({
    currentEffects: currentEffectSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentEffect: (currentEffect) => dispatch(setCurrentEffectAction(currentEffect)),
})

export const RecordingFooterComponent = connect(mapStateToProps, mapDispatchToProps)(RecordingFooter)
