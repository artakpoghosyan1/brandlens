import * as React from 'react'
import { css } from 'emotion'
import { colors } from '../../constants/Colors'
import { DRAG_BTN_WIDTH, TrimSliderComponent } from './TrimSliderComponent'
import { FrameThumbsComponent } from './FrameThumbsComponent'
import { TrimContext } from '../../contexts/TrimContext'
import { frameUnitToSecond, getFrameUnit, getTrimmedWidthInPx, mapRange } from '../../../utilities/utilities'

interface ITrimComponentProps {}

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

export const TrimComponent: React.FC<ITrimComponentProps> = React.memo(() => {
    const [parentWidth, setParentWidth] = React.useState<number>(0)
    const [trimDirection, setTrimDirection] = React.useState<string | null>(null)

    const trimContext = React.useContext(TrimContext)
    const frameThumbsRef: React.RefObject<HTMLDivElement> = React.useRef(null)

    React.useEffect(() => {
        if (frameThumbsRef.current) {
            setParentWidth(frameThumbsRef.current!.offsetWidth)
        }
    }, [frameThumbsRef.current])

    const onTrimHandler = React.useCallback(
        (e, ui, isLeft) => {
            if (isLeft) {
                trimContext.setLeftTrimValue((leftTrimValue) =>
                    Math.round(leftTrimValue + mapRange(ui.deltaX, 0, parentWidth, 0, trimContext.framesCount))
                )
                trimContext.setLeftTrimDragValue((leftTrimX) => leftTrimX + ui.deltaX)
            } else {
                trimContext.setRightTrimDragValue((rightTrimDragValue) => rightTrimDragValue + ui.deltaX)
                trimContext.setRightTrimValue((rightTrimValue) =>
                    Math.round(rightTrimValue + mapRange(ui.deltaX, 0, parentWidth, 0, trimContext.framesCount))
                )
            }
        },
        [trimContext.framesCount, parentWidth, trimContext.videoCurrentTime]
    )

    const onTrimStartHandler = React.useCallback((value, isLeftStart) => {
        setTrimDirection(isLeftStart ? 'left' : 'right')
        trimContext.setShouldPauseTrimmingVideo(true)
    }, [])

    const onTrimStopHandler = React.useCallback(() => {
        trimContext.setShouldPauseTrimmingVideo(false)
        setTrimDirection(null)
    }, [trimContext.videoCurrentTime])

    React.useEffect(() => {
        if (trimDirection && trimContext.shouldPauseTrimmingVideo) {
            const trimValue =
                trimDirection === 'left'
                    ? trimContext.leftTrimValue
                    : trimContext.framesCount - Math.abs(trimContext.rightTrimValue)

            trimContext.setVideoCurrentTime(trimValue)
        }
    }, [trimContext.shouldPauseTrimmingVideo, trimContext.leftTrimValue, trimContext.rightTrimValue, trimDirection])

    const frameUnit = React.useMemo(() => getFrameUnit(parentWidth, trimContext.framesCount), [
        parentWidth,
        trimContext.framesCount,
    ])

    const getTrimSliderMaxPoint = React.useCallback(
        (trimValue) =>
            getTrimmedWidthInPx(trimContext.framesCount, trimValue, frameUnit) - frameUnitToSecond(frameUnit, trimContext.fps),
        [trimContext.framesCount, frameUnit, trimContext.fps]
    )

    const leftSlideBounds = React.useMemo(
        () => ({
            left: 0,
            right: getTrimSliderMaxPoint(trimContext.rightTrimValue), // limitation for trimming to the right (1s)
        }),
        [trimContext.rightTrimValue, trimContext.framesCount, trimContext.fps, parentWidth, trimContext.leftTrimDragValue]
    )

    const rightSlideBounds = React.useMemo(
        () => ({
            left: -getTrimSliderMaxPoint(trimContext.leftTrimValue), // limitation for trimming to the left (1s)
            right: 0,
        }),
        [trimContext.leftTrimValue, trimContext.framesCount, trimContext.fps, parentWidth, trimContext.rightTrimDragValue]
    )

    return (
        <div className={trimCss}>
            <TrimSliderComponent
                defaultPosition={{
                    x: trimContext.leftTrimDragValue,
                    y: 0,
                }}
                onTrimHandler={onTrimHandler}
                onTrimStartHandler={onTrimStartHandler}
                onTrimStopHandler={onTrimStopHandler}
                bounds={leftSlideBounds}
                grid={[frameUnit, 0]}
                isLeft
            />

            <FrameThumbsComponent parentWidth={parentWidth} frameThumbsRef={frameThumbsRef} />

            <TrimSliderComponent
                defaultPosition={{
                    x: -trimContext.rightTrimDragValue,
                    y: 0,
                }}
                onTrimHandler={onTrimHandler}
                onTrimStartHandler={onTrimStartHandler}
                onTrimStopHandler={onTrimStopHandler}
                bounds={rightSlideBounds}
                grid={[frameUnit, 0]}
            />
        </div>
    )
})
