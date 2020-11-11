import * as React from 'react'
import { InfoIcon } from '../assets/icons/InfoIcon'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'

interface IInfoIconComponentProps {}

export const InfoIconComponent: React.FC<IInfoIconComponentProps> = React.memo(() => {
    return (
        <button className={clearButtonDefaultStylesCss}>
            <InfoIcon />
        </button>
    )
})
