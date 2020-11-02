import * as React from 'react'
import { css } from 'emotion'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'

interface IControlButtonComponentProps {}

const controlBtnCss = css`
    ${clearButtonDefaultStylesCss};
    background: rgba(255, 255, 255, 0.8);
    width: 44px;
    height: 44px;
    border-radius: 50%;
`

export const ControlButtonComponent: React.FC<IControlButtonComponentProps> = React.memo((props) => {
    return (
        <button className={controlBtnCss} {...props}>
            {props.children}
        </button>
    )
})
