import * as React from 'react'
import { css, cx } from 'emotion'
import { clearButtonDefaultStylesCss } from '../../styles/sharedStyles'
import { CloseIcon } from '../../assets/icons/CloseIcon'

interface ICloseButtonComponentProps {}

const closeIconCss = css`
    cursor: pointer;
`

export const CloseButtonComponent: React.FC<ICloseButtonComponentProps> = React.memo(() => {
    return (
        <button className={cx(clearButtonDefaultStylesCss, closeIconCss)}>
            <CloseIcon />
        </button>
    )
})
