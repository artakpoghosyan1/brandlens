import * as React from 'react'
import { CSSTransition } from 'react-transition-group'
import { css, cx } from 'emotion'
import { ClockIcon } from '../../assets/icons/ClockIcon'
import { ControlButtonComponent } from './ControlButtonComponent'
import { IState } from '../../../data/IState'
import { selectedTimerSelector } from '../../../data/selectors/selectedTimerSelector'
import { connect } from 'react-redux'
import { clearButtonDefaultStylesCss } from '../../styles/sharedStyles'
import { colors } from '../../constants/Colors'

interface IDropLeftComponentProps {
    selectedTimer: number
    onChange: (value: number) => void
    options: {
        label: string
        value: number
    }[]
}

const dropLeftWrapperCss = css`
    position: relative;
`

const optionsListCss = css`
    background-color: rgba(123, 123, 123, 0.8);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    height: 100%;
    border-radius: 25px;
    align-items: center;
    overflow: hidden;
    padding: 0 53px 0 20px;
    z-index: 0;
`

const optionsListSelectedCss = css`
    padding-right: 83px;
`

const optionsListItemCss = css`
    & + & {
        margin-left: 23px;
    }
`

const optionBtnCss = css`
    ${clearButtonDefaultStylesCss};

    color: #fff;
    font-size: 18px;
`

const optionBtnSelectedCss = css`
    color: ${colors.disabledTextColor};
`

const targetButtonCss = css`
    z-index: 1;
`

const selectedTimerCss = css`
    font-size: 18px;
    font-weight: 700;
    color: #000;
`

const targetButtonSelectedCss = css`
    width: 77px !important;
    justify-content: space-between !important;
    padding: 0 15px;
    border-radius: 25px !important;
`

export const DropLeft: React.FC<IDropLeftComponentProps> = React.memo((props) => {
    const [showDropLeft, setShowDropLeft] = React.useState(false)

    const onTargetClick = (): void => {
        setShowDropLeft((showDropLeft) => !showDropLeft)
    }

    const onItemClickHandler = (value: number): void => {
        props.onChange && props.onChange(value)
        setShowDropLeft(false)
    }

    return (
        <div className={dropLeftWrapperCss}>
            <ControlButtonComponent
                large
                onClick={onTargetClick}
                className={cx(targetButtonCss, props.selectedTimer ? targetButtonSelectedCss : '')}
            >
                {props.selectedTimer > 0 && <span className={selectedTimerCss}>{props.selectedTimer}s</span>}
                <ClockIcon />
            </ControlButtonComponent>

            <CSSTransition in={showDropLeft} timeout={300} classNames="drop-left" unmountOnExit>
                <ul className={cx(optionsListCss, props.selectedTimer ? optionsListSelectedCss : '')}>
                    {props.options.map(({ label, value }) => {
                        const isSelected = props.selectedTimer === value

                        return (
                            <li className={optionsListItemCss} key={label}>
                                <button
                                    className={cx(optionBtnCss, isSelected ? optionBtnSelectedCss : '')}
                                    onClick={() => onItemClickHandler(value)}
                                    disabled={isSelected}
                                >
                                    {label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </CSSTransition>
        </div>
    )
})

const mapStateToProps = (state: IState) => ({
    selectedTimer: selectedTimerSelector(state),
})

export const DropLeftComponent = connect(mapStateToProps)(DropLeft)
