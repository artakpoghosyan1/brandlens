import * as React from 'react'
import { css, cx } from 'emotion'

interface ITitleComponentProps {
    large?: boolean
    className?: string
}

const titleSharedCss = css`
    text-align: center;
`

const titleCss = css`
    ${titleSharedCss};
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 15px;
`

const titleLargeCss = css`
    ${titleSharedCss};
    font-size: 24px;
    font-weight: 700;
`

export const TitleComponent: React.FC<ITitleComponentProps> = React.memo(({ large, children, className }) => {
    return large ? (
        <h2 className={cx(titleLargeCss, className)}>{children}</h2>
    ) : (
        <h1 className={cx(titleCss, className)}>{children}</h1>
    )
})

TitleComponent.defaultProps = {
    className: '',
}
