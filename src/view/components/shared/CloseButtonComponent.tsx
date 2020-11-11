import * as React from 'react'
import { css, cx } from 'emotion'
import { clearButtonDefaultStylesCss } from '../../styles/sharedStyles'
import { CloseIcon } from '../../assets/icons/CloseIcon'

interface ICloseButtonComponentProps {
    className?: string
}

const closeIconCss = css`
    cursor: pointer;
`

export const CloseButtonComponent: React.FC<ICloseButtonComponentProps> = React.memo((props) => {
    return (
        <button className={cx(clearButtonDefaultStylesCss, closeIconCss, props.className || '')}>
            <CloseIcon />
        </button>
    )
})
