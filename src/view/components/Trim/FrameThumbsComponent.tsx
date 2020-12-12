import * as React from 'react'
import Slider from 'react-rangeslider'
import { TrimContext } from '../../contexts/TrimContext'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { getFrameUnit, getTrimmedWidthInPx } from '../../../utilities/utilities'
import { useSelector } from 'react-redux'
import { IState } from '../../../data/IState'

interface IFrameThumbsComponentProps {
    frameThumbsRef: React.RefObject<HTMLDivElement>
    parentWidth: number
}

const FrameThumbsStyled = styled('div')<{ leftTrimDragValue: number; rightTrimDragValue: number; headerWidth }>`
    flex-grow: 1;
    position: relative;
    border-radius: 8px;

    &:after,
    &:before {
        content: '';
        position: absolute;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        top: 0;
        z-index: 1;
    }

    &:before {
        width: ${(props) => props.leftTrimDragValue}px;
        left: 0;
    }

    &:after {
        width: ${(props) => Math.abs(props.rightTrimDragValue)}px;
        right: 0;
    }

    .header-slider {
        width: ${(props) => props.headerWidth}px;
        left: ${(props) => props.leftTrimDragValue}px;
    }
`

const FrameStyled = styled('div')<{ img: string }>`
    flex-grow: 1;
    background: no-repeat url(${(props) => props.img});
    background-size: cover;
`

const headerSliderCss = css`
    position: absolute !important;
    height: 100%;
    width: 100%;
    z-index: 100;

    .rangeslider__handle {
        position: absolute;
        top: -4px;
        height: 72px;
        width: 4px;
        background-color: #fff;
        box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;

        &:after {
            width: 15px;
            content: '';
            position: absolute;
            height: 100%;
            left: -7px;
        }

        &:focus {
            outline: none;
        }
    }
`

const framesThumbsCss = css`
    position: relative;
    display: flex;
    height: 100%;
`

export const FrameThumbsComponent: React.FC<IFrameThumbsComponentProps> = React.memo(({ parentWidth, frameThumbsRef }) => {
    const {
        videoCurrentTime,
        setVideoCurrentTime,
        leftTrimDragValue,
        rightTrimDragValue,
        leftTrimValue,
        rightTrimValue,
        framesCount,
        setShouldPauseTrimmingVideo,
    } = React.useContext(TrimContext)
    const { frameThumbnails } = useSelector((state: IState) => state.currentRecordedVideo)!

    const [headerWidth, setHeaderWidth] = React.useState<number>(0)
    const frameUnit = React.useMemo(() => getFrameUnit(parentWidth, framesCount), [parentWidth, framesCount])

    const onBeforeChangeHandler = React.useCallback(() => {
        setShouldPauseTrimmingVideo(true)
    }, [])

    const onAfterChangeHandler = React.useCallback(() => {
        setShouldPauseTrimmingVideo(false)
    }, [])

    const onHeaderChange = React.useCallback((value: number | number[] | undefined | null): void => {
        if (!Array.isArray(value) && value) {
            setVideoCurrentTime(value)
        }
    }, [])

    React.useEffect(() => {
        const trimmedValue: number = Math.abs(rightTrimValue) + leftTrimValue

        setHeaderWidth(getTrimmedWidthInPx(framesCount, trimmedValue, frameUnit))
    }, [framesCount, leftTrimValue, rightTrimValue, frameUnit])

    return (
        <FrameThumbsStyled
            data-testid="frame-thumbs-wrapper"
            leftTrimDragValue={leftTrimDragValue}
            rightTrimDragValue={rightTrimDragValue}
            headerWidth={headerWidth}
            ref={frameThumbsRef}
        >
            <Slider
                className={`${headerSliderCss} header-slider`}
                min={leftTrimValue}
                max={framesCount + rightTrimValue}
                value={videoCurrentTime}
                orientation="horizontal"
                onChangeStart={onBeforeChangeHandler}
                onChange={onHeaderChange}
                onChangeComplete={onAfterChangeHandler}
            />

            <div className={framesThumbsCss} data-testid="frames-thumbs">
                {frameThumbnails.map((frame, i) => {
                    return <FrameStyled img={frame} key={frame + i} />
                })}
            </div>
        </FrameThumbsStyled>
    )
})
