import * as React from 'react'
import { css, cx } from 'emotion'

interface IPageBodyComponentProps extends React.DOMAttributes<HTMLElement> {
    className?: string
}

const bodyCss = css`
    flex-grow: 1;
`

export const PageBodyComponent: React.FC<IPageBodyComponentProps> = React.memo((props) => {
    const { className, children, ...rest } = props

    return (
        <div className={cx(bodyCss, className || '')} {...rest}>
            {children}
        </div>
    )
})
