import * as React from 'react'
import { css, cx } from 'emotion'

interface IPageComponentProps extends React.DOMAttributes<HTMLElement> {
    className?: string
}

const pageCss = css`
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const PageComponent: React.FC<IPageComponentProps> = (props) => {
    const { className, ...rest } = props

    return (
        <div className={cx(className || '', pageCss)} {...rest}>
            {props.children}
        </div>
    )
}
