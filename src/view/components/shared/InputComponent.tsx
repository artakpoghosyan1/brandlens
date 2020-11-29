import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../../constants/Colors'

interface IInputComponentProps extends React.DOMAttributes<HTMLElement> {
    type: string
    placeholder: string
    value: string | number | undefined
    errorMessage?: string
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

const errorMessageCss = css`
    color: ${colors.errorColor};
    font-size: 12px;
    padding-left: 16px;
    margin-top: 7px;
`

export const InputComponent: React.FC<IInputComponentProps> = React.memo(({ value, errorMessage, ...rest }) => {
    return (
        <div className={inputWrapperCss}>
            <input className={inputCss} value={value || ''} {...rest} />

            {errorMessage && <p className={errorMessageCss}>{errorMessage}</p>}
        </div>
    )
})
