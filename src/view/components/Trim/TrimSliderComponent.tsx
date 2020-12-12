import * as React from 'react'
import Draggable, { DraggableBounds } from 'react-draggable'
import { css } from 'emotion'
import { clearButtonDefaultStylesCss } from '../../styles/sharedStyles'
import { colors } from '../../constants/Colors'

interface ITrimSliderComponentProps {
    onTrimHandler: (e: any, ui: any, isLeft: boolean) => void
    onTrimStartHandler: (value: any, isLeft: boolean) => void
    onTrimStopHandler: () => void
    isLeft?: boolean
    bounds: DraggableBounds
    grid: [number, number]
    defaultPosition?: { x: number; y: number }
}

export const DRAG_BTN_WIDTH = 30

const dragButtonsCss = css`
    ${clearButtonDefaultStylesCss};
    width: ${DRAG_BTN_WIDTH}px;
    min-width: ${DRAG_BTN_WIDTH}px;
    background-color: ${colors.caribbeanGreen};
    position: relative;
    z-index: 2;

    &:after {
        background-color: #fff;
        border-radius: 50%;
        content: '';
        width: 7px;
        height: 7px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-3.5px, -3.5px);
        z-index: 1;
    }
`

const leftDragCss = css`
    ${dragButtonsCss};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
`

const rightDragCss = css`
    ${dragButtonsCss};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
`

export const TrimSliderComponent: React.FC<ITrimSliderComponentProps> = React.memo(
    ({ onTrimHandler, onTrimStartHandler, onTrimStopHandler, isLeft, ...rest }) => {
        return (
            <Draggable
                {...rest}
                axis="x"
                onStart={(value) => onTrimStartHandler(value, !!isLeft)}
                onDrag={(e, ui) => onTrimHandler(e, ui, !!isLeft)}
                onStop={onTrimStopHandler}
            >
                <button className={`${isLeft ? leftDragCss : rightDragCss} trim-button`} />
            </Draggable>
        )
    }
)
