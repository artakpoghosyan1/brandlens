import * as React from 'react'
import { css, cx } from 'emotion'

interface IPageContainerComponentProps extends React.DOMAttributes<HTMLElement> {
    className?: string
}

const pageCss = css`
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const PageContainerComponent: React.FC<IPageContainerComponentProps> = (props) => {
    const { className, ...rest } = props

    return (
        <div className={cx(className || '', pageCss)} {...rest}>
            {props.children}
        </div>
    )
}
