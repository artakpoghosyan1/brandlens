import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../../constants/Colors'

interface IInputComponentProps {
    type: string
    placeholder: string
}

const inputCss = css`
    background: ${colors.inputBgColor};
    border: none;
    height: 44px;
    border-radius: 8px;
    font-size: 15px;
    width: 100%;
    color: ${colors.secondaryTextColor};
    padding: 0 15px;
`

const inputWrapperCss = css`
    & + & {
        margin-top: 12px;
    }
`

export const InputComponent: React.FC<IInputComponentProps> = React.memo((props) => {
    return (
        <div className={inputWrapperCss}>
            <input type={props.type} className={inputCss} placeholder={props.placeholder} />
        </div>
    )
})
