import * as React from 'react'
import Slider from 'react-rangeslider'
import { TrimContext } from '../../contexts/TrimContext'
import styled from '@emotion/styled'
import { css, cx } from 'emotion'
import { IState } from '../../../data/IState'
import { videoDataSelector } from '../../../data/selectors/videoDataSelector'
import { connect } from 'react-redux'
import { IVideoData } from '../../../models/VideoData'
import { getFrameUnit, getTrimmedWidthInPx } from '../../../utilities/utilities'

interface IFrameThumbsComponentProps {
    leftDragValue: number
    rightDragValue: number
    videoData: IVideoData
    frameThumbsRef: React.RefObject<HTMLDivElement>
    parentWidth: number
    rightTrimValue: number
    leftTrimValue: number
}

const FrameThumbsStyled = styled('div')<{ leftDragValue: number; rightDragValue: number; headerWidth }>`
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
        width: ${(props) => props.leftDragValue}px;
        left: 0;
    }

    &:after {
        width: ${(props) => Math.abs(props.rightDragValue)}px;
        right: 0;
    }

    .header-slider {
        width: ${(props) => props.headerWidth}px;
        left: ${(props) => props.leftDragValue}px;
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

export const FrameThumbs: React.FC<IFrameThumbsComponentProps> = React.memo(
    ({
        rightTrimValue,
        leftTrimValue,
        leftDragValue,
        rightDragValue,
        parentWidth,
        videoData: { framesCount, frameThumbnails },
        frameThumbsRef,
    }) => {
        const { headerValue, onHeaderChange, setShouldPauseTrimmingVideo } = React.useContext(TrimContext)

        const [headerWidth, setHeaderWidth] = React.useState(0)
        const frameUnit = React.useMemo(() => getFrameUnit(parentWidth, framesCount), [parentWidth, framesCount])

        const onBeforeChangeHandler = React.useCallback(() => {
            setShouldPauseTrimmingVideo(true)
        }, [])

        const onAfterChangeHandler = React.useCallback(() => {
            setShouldPauseTrimmingVideo(false)
        }, [])

        React.useEffect(() => {
            const trimmedValue = Math.abs(rightTrimValue) + leftTrimValue
            setHeaderWidth(getTrimmedWidthInPx(framesCount, trimmedValue, frameUnit))
        }, [framesCount, leftTrimValue, rightTrimValue, frameUnit])

        return (
            <FrameThumbsStyled
                data-testid="frame-thumbs-wrapper"
                leftDragValue={leftDragValue}
                rightDragValue={rightDragValue}
                headerWidth={headerWidth}
                ref={frameThumbsRef}
            >
                <Slider
                    className={`${headerSliderCss} header-slider`}
                    min={leftTrimValue}
                    max={framesCount + rightTrimValue}
                    value={headerValue}
                    orientation="horizontal"
                    onChangeStart={onBeforeChangeHandler}
                    onChange={onHeaderChange}
                    onChangeComplete={onAfterChangeHandler}
                />

                <div className={framesThumbsCss}>
                    {frameThumbnails.map((frame, i) => {
                        return <FrameStyled img={frame} key={frame + i} />
                    })}
                </div>
            </FrameThumbsStyled>
        )
    }
)

const mapStateToProps = (state: IState) => ({
    videoData: videoDataSelector(state),
})

export const FrameThumbsComponent = connect(mapStateToProps)(FrameThumbs)
