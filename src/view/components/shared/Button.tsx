import * as React from 'react'
import { css } from 'emotion'

interface IButtonProps {
    onClick: () => void
}

const buttonClass = css`
    padding: 0;
    background: none;
    border: 1px solid #fff;
    padding: 10px 25px;
    color: #fff;
    font-size: 16px;
    border-radius: 2px;
    font-family: 'Electrolize', sans-serif;
    cursor: pointer;
`

export const Button: React.FunctionComponent<IButtonProps> = React.memo((props) => {
    return (
        <>
            <button className={buttonClass} onClick={props.onClick}>
                {props.children}
            </button>
        </>
    )
})
