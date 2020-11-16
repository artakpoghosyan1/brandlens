import * as React from 'react'
import { css, cx } from 'emotion'

interface IPageHeaderComponentProps extends React.DOMAttributes<HTMLElement> {
    className?: string
}

const headerCss = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const PageHeaderComponent: React.FC<IPageHeaderComponentProps> = React.memo((props) => {
    const { className, children, ...rest } = props

    return (
        <header className={cx(headerCss, className || '')} {...rest}>
            {children}
        </header>
    )
})
