import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { DoneCircleIcon } from '../assets/icons/DoneCircleIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setCombinedVideosAction, setCurrentVideoAction } from '../../data/actionCreators'
import { IState } from '../../data/IState'
import { createCombinedVideos } from '../../helpers/videoHelper'

export const RecordingDoneButtonComponent: React.FC = React.memo(() => {
    const history = useHistory()
    const dispatch = useDispatch()
    const recordedVideos = useSelector((state: IState) => state.recordedVideos)

    const onClickHandler = (): void => {
        const newCreatedCombinedVideos = createCombinedVideos(recordedVideos)

        dispatch(setCurrentVideoAction(newCreatedCombinedVideos))
        dispatch(setCombinedVideosAction(newCreatedCombinedVideos))

        history.push('edit')
    }

    return (
        <button className={clearButtonDefaultStylesCss} onClick={onClickHandler}>
            <DoneCircleIcon />
        </button>
    )
})
