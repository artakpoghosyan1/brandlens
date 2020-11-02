import * as React from 'react'
import { css } from 'emotion'

interface IInfoIconComponentProps {}

const infoIconCss = css``

export const InfoIconComponent: React.FC<IInfoIconComponentProps> = React.memo((props) => {
    return <button className={infoIconCss}></button>
})
