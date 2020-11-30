import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../../constants/Colors'
import { IRecordedVideo } from '../../../models/IRecordedVideo'
import { IState } from '../../../data/IState'
import { currentRecordedVideoSelector } from '../../../data/selectors/currentRecordedVideoSelector'
import { connect } from 'react-redux'
import { DRAG_BTN_WIDTH, TrimSliderComponent } from './TrimSliderComponent'
import { FrameThumbsComponent } from './FrameThumbsComponent'
import { TrimContext } from '../../contexts/TrimContext'
import { frameUnitToSecond, getFrameUnit, getTrimmedWidthInPx, mapRange } from '../../../utilities/utilities'

interface ITrimComponentProps {
    currentRecordedVideo: IRecordedVideo
}

const trimCss = css`
    display: flex;
    height: 64px;
    position: relative;

    &:before,
    &:after {
        content: '';
        width: ${DRAG_BTN_WIDTH}px;
        min-width: ${DRAG_BTN_WIDTH}px;
        background-color: ${colors.emperor};
        height: 100%;
        position: absolute;
    }

    &:before {
        left: 0;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    &:after {
        right: 0;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
`

export const Trim: React.FC<ITrimComponentProps> = React.memo(({ currentRecordedVideo: { framesCount, fps } }) => {
    const [leftDragValue, setLeftDragValue] = React.useState<number>(0)
    const [rightDragValue, setRightDragValue] = React.useState<number>(0)

    const [parentWidth, setParentWidth] = React.useState<number>(0)
    const [trimDirection, setTrimDirection] = React.useState<string | null>(null)

    const trim = React.useContext(TrimContext)
    const frameThumbsRef: React.RefObject<HTMLDivElement> = React.useRef(null)

    const onTrimHandler = React.useCallback(
        (e, ui, isLeft) => {
            if (isLeft) {
                trim.setLeftTrimValue((leftTrimValue) =>
                    Math.round(leftTrimValue + mapRange(ui.deltaX, 0, parentWidth, 0, framesCount))
                )
                setLeftDragValue((leftTrimX) => leftTrimX + ui.deltaX)
            } else {
                setRightDragValue((rightDragValue) => rightDragValue + ui.deltaX)
                trim.setRightTrimValue((rightTrimValue) =>
                    Math.round(rightTrimValue + mapRange(ui.deltaX, 0, parentWidth, 0, framesCount))
                )
            }
        },
        [framesCount, parentWidth, trim.videoCurrentTime, trim.headerValue]
    )

    const onTrimStartHandler = React.useCallback((value, isLeftStart) => {
        setTrimDirection(isLeftStart ? 'left' : 'right')
        trim.setShouldPauseTrimmingVideo(true)
    }, [])

    const onTrimStopHandler = React.useCallback(() => {
        trim.setShouldPauseTrimmingVideo(false)
        setTrimDirection(null)
    }, [trim.videoCurrentTime])

    const frameUnit = React.useMemo(() => getFrameUnit(parentWidth, framesCount), [parentWidth, framesCount])

    const getTrimSlideMaxPoint = (trimValue) =>
        getTrimmedWidthInPx(framesCount, trimValue, frameUnit) - frameUnitToSecond(frameUnit, fps)

    const leftSlideBounds = React.useMemo(
        () => ({
            left: 0,
            right: getTrimSlideMaxPoint(trim.rightTrimValue), // limitation for trimming to the right
        }),
        [trim.rightTrimValue, framesCount, fps, parentWidth]
    )

    const rightSlideBounds = React.useMemo(
        () => ({
            left: -getTrimSlideMaxPoint(trim.leftTrimValue), // limitation for trimming to the left,
            right: 0,
        }),
        [trim.leftTrimValue, framesCount, fps, parentWidth]
    )

    React.useEffect(() => {
        setParentWidth(frameThumbsRef.current!.offsetWidth)
    }, [frameThumbsRef.current])

    React.useEffect(() => {
        if (trimDirection && trim.shouldPauseTrimmingVideo) {
            const trimValue = trimDirection === 'left' ? trim.leftTrimValue : framesCount + trim.rightTrimValue

            trim.setVideoCurrentTime(trimValue)
            trim.setHeaderValue(trimValue)
        }
    }, [trim.shouldPauseTrimmingVideo, trim.leftTrimValue, trim.rightTrimValue, trimDirection])

    return (
        <div className={trimCss}>
            <TrimSliderComponent
                onTrimHandler={onTrimHandler}
                onTrimStartHandler={onTrimStartHandler}
                onTrimStopHandler={onTrimStopHandler}
                bounds={leftSlideBounds}
                grid={[frameUnit, 0]}
                isLeft
            />

            <FrameThumbsComponent
                parentWidth={parentWidth}
                leftDragValue={Math.round(leftDragValue)}
                rightDragValue={rightDragValue}
                rightTrimValue={trim.rightTrimValue}
                leftTrimValue={trim.leftTrimValue}
                frameThumbsRef={frameThumbsRef}
            />

            <TrimSliderComponent
                onTrimHandler={onTrimHandler}
                onTrimStartHandler={onTrimStartHandler}
                onTrimStopHandler={onTrimStopHandler}
                bounds={rightSlideBounds}
                grid={[frameUnit, 0]}
            />
        </div>
    )
})

const mapStateToProps = (state: IState) => ({
    currentRecordedVideo: currentRecordedVideoSelector(state),
})

export const TrimComponent = connect(mapStateToProps)(Trim)
