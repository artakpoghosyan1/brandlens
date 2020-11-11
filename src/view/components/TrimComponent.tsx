import * as React from 'react'
import { css } from 'emotion'
import Draggable from 'react-draggable'
import { clearButtonDefaultStylesCss } from '../styles/sharedStyles'
import { colors } from '../constants/Colors'
import styled from '@emotion/styled'

interface ITrimComponentProps {
    frameImages: string[]
}

const trimCss = css`
    display: flex;
    height: 68px;
`

const dragButtonsCss = css`
    ${clearButtonDefaultStylesCss};
    width: 30px;
    min-width: 30px;
    background-color: ${colors.caribbeanGreen};
    position: relative;
    z-index: 1;

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

const TrimContentStyled = styled('div')<{ leftTrimX: number; rightTrimX: number }>`
    flex-grow: 1;
    display: flex;
    position: relative;
    border-radius: 8px;

    &:after,
    &:before {
        content: '';
        position: absolute;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        top: 0;
    }

    &:before {
        width: ${(props) => props.leftTrimX}px;
        left: 0;
    }

    &:after {
        width: ${(props) => Math.abs(props.rightTrimX)}px;
        right: 0;
    }
`

const FrameStyled = styled('div')<{ img: string }>`
    flex-grow: 1;
    background: no-repeat url(${(props) => props.img});
    background-size: cover;
`

export const TrimComponent: React.FC<ITrimComponentProps> = React.memo((props) => {
    const [leftTrimX, setLeftTrimX] = React.useState<number>(0)
    const [rightTrimX, setRightTrimX] = React.useState<number>(0)

    const handleLeftDrag = (e, ui) => {
        setLeftTrimX((leftDragX) => leftDragX + ui.deltaX)
    }

    const handleRightDrag = (e, ui) => {
        setRightTrimX((rightDragY) => rightDragY + ui.deltaX)
    }

    const handleStart = (xxx) => {
        console.log('handleStart', xxx)
    }

    return (
        <div className={trimCss}>
            <Draggable bounds={{ left: 0, right: 120 }} axis="x" onStart={handleStart} onDrag={handleLeftDrag}>
                <button className={leftDragCss} />
            </Draggable>

            <TrimContentStyled leftTrimX={leftTrimX} rightTrimX={rightTrimX}>
                {props.frameImages.map((frame, i) => {
                    return <FrameStyled img={frame} key={frame + i} />
                })}
            </TrimContentStyled>

            <Draggable bounds={{ left: -120, right: 0 }} axis="x" onStart={handleStart} onDrag={handleRightDrag}>
                <button className={rightDragCss} />
            </Draggable>
        </div>
    )
})
