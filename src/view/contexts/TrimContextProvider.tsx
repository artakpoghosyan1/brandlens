import * as React from 'react'
import { TrimContext } from './TrimContext'
import { useSelector } from 'react-redux'
import { IState } from '../../data/IState'
import { framesCountSumSelector } from '../../data/selectors/framesCountSumSelector'

export const TrimContextProvider: React.FC = ({ children }) => {
    const {
        fps,
        trimData: {
            leftTrimValue: leftTrimValueState,
            rightTrimValue: rightTrimValueState,
            rightTrimDragValue: rightTrimDragValueSate,
            leftTrimDragValue: leftTrimDragValueState,
        },
    } = useSelector((state: IState) => state.currentRecordedVideo)!
    const framesCount = useSelector(framesCountSumSelector)

    const [videoCurrentTime, setVideoCurrentTime] = React.useState<number>(0)
    const [shouldPauseTrimmingVideo, setShouldPauseTrimmingVideo] = React.useState<boolean>(false)
    const [leftTrimValue, setLeftTrimValue] = React.useState<number>(leftTrimValueState)
    const [rightTrimValue, setRightTrimValue] = React.useState<number>(rightTrimValueState)
    const [leftTrimDragValue, setLeftTrimDragValue] = React.useState<number>(leftTrimDragValueState)
    const [rightTrimDragValue, setRightTrimDragValue] = React.useState<number>(rightTrimDragValueSate)

    React.useEffect(() => {
        setLeftTrimValue(leftTrimValueState)
        setRightTrimValue(rightTrimValueState)
        setLeftTrimDragValue(leftTrimDragValueState)
        setRightTrimDragValue(rightTrimDragValueSate)
    }, [leftTrimValueState, rightTrimValueState, leftTrimDragValueState, rightTrimDragValueSate])

    return (
        <TrimContext.Provider
            value={{
                fps,
                framesCount,
                leftTrimValue,
                setLeftTrimValue,
                rightTrimValue,
                setRightTrimValue,
                videoCurrentTime,
                setVideoCurrentTime,
                leftTrimDragValue,
                setLeftTrimDragValue,
                rightTrimDragValue,
                setRightTrimDragValue,
                shouldPauseTrimmingVideo,
                setShouldPauseTrimmingVideo,
            }}
        >
            {children}
        </TrimContext.Provider>
    )
}
