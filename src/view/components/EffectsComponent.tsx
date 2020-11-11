import * as React from 'react'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { CloseSmallIcon } from '../assets/icons/CloseSmallIcon'
import { css, cx } from 'emotion'
import { connect } from 'react-redux'
import { IState } from '../../data/IState'
import { currentEffectSelector } from '../../data/selectors/currentEffectsSelector'
import { IEffect } from '../../models/IEffect'
import { setCurrentEffectAction } from '../../data/actionCreators'

interface IEffectsComponentProps {
    currentEffects: IEffect[] | null
    onChange: (value: string) => void
    setCurrentEffect: (currentEffect: null) => void
}

const effectsContainer = css`
    position: absolute;
    padding-top: 33px;
    bottom: 0;
    left: 0;
    width: 100%;
`

const optionsWrapperCss = css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0 8px;
`

const optionsListCss = css`
    display: flex;
    overflow-x: auto;
    padding: 10px 0 10px 8px;
`

const optionItemCss = css`
    & + & {
        margin-left: 16px;
    }
`

const optionBtnCss = css`
    ${clearButtonDefaultStylesCss};
    width: 64px;
    min-width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 3px solid #fff;
`

const closeBtnCss = css`
    ${clearButtonDefaultStylesCss};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-6px);
`

const resetEffectsCss = css`
    background-color: rgba(0, 0, 0, 0.36);
    border: none;
    position: sticky;
    left: 0;
    margin-right: 8px;
`

export const Effects: React.FC<IEffectsComponentProps> = React.memo((props) => {
    const onCloseClickHandler = () => {
        props.setCurrentEffect(null)
    }

    return (
        <div className={effectsContainer}>
            <button className={closeBtnCss} onClick={onCloseClickHandler}>
                <CloseSmallIcon />
            </button>

            <div className={optionsWrapperCss}>
                <button className={cx(optionBtnCss, resetEffectsCss)} onClick={() => ''}></button>
                <ul className={optionsListCss}>
                    {props.currentEffects &&
                        props.currentEffects.map((effect) => {
                            return (
                                <li className={optionItemCss} key={effect.id}>
                                    <button className={optionBtnCss} onClick={() => props.onChange(effect.value)}></button>
                                </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
})

const mapStateToProps = (state: IState) => ({
    currentEffects: currentEffectSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentEffect: (currentEffect) => dispatch(setCurrentEffectAction(currentEffect)),
})

export const EffectsComponent = connect(mapStateToProps, mapDispatchToProps)(Effects)
