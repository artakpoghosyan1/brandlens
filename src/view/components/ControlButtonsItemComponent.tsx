import * as React from 'react'
import { css } from 'emotion'

interface IControlButtonsItemComponentProps {}

const controlsListItemCss = css`
    & + & {
        margin-top: 20px;
    }
`

export const ControlButtonsItemComponent: React.FC<IControlButtonsItemComponentProps> = React.memo(({ children }) => {
    return <li className={controlsListItemCss}>{children}</li>
})
