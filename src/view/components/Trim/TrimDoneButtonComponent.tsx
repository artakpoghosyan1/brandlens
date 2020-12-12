import * as React from 'react'
import { clearButtonDefaultStylesCss } from '../../styles/sharedStyles'
import { DoneIcon } from '../../assets/icons/DoneIcon'

interface ITrimDoneButtonComponentProps {}

export const TrimDoneButtonComponent: React.FC<ITrimDoneButtonComponentProps> = React.memo(() => {
    const onClickHandler = () => {}

    return (
        <button className={clearButtonDefaultStylesCss} data-testid="trim-done-button" onClick={onClickHandler}>
            <DoneIcon />
        </button>
    )
})
