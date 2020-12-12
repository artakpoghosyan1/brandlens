import * as React from 'react'
import { css } from 'emotion'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../../data/IState'
import { IRecordedVideo } from '../../../models/IRecordedVideo'
import { setCurrentVideoAction, toggleSingleTrimSection } from '../../../data/actionCreators'
import { SingleTrimComponent } from './SingleTrimComponent'
import { CSSTransition } from 'react-transition-group'

interface ITrimThumbsComponentProps {}

const trimThumbsCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
`

const trimThumbsItemCss = css`
    width: 64px;
    height: 64px;
    background: #e0e0e0;
    border-radius: 8px;

    & + & {
        margin-left: 12px;
    }

    &.active {
        border: 2px solid #2b77e9;
    }
`

export const TrimThumbsComponent: React.FC<ITrimThumbsComponentProps> = React.memo(() => {
    const recordedVideos = useSelector((state: IState) => state.recordedVideos)
    const openSingleTrim = useSelector((state: IState) => state.openSingleTrim)
    const dispatch = useDispatch()

    const onClickHandler = (selectedVideoId: string): void => {
        const selectedVideo = recordedVideos.find((video: IRecordedVideo) => video.id === selectedVideoId)!

        dispatch(setCurrentVideoAction(selectedVideo))
        dispatch(toggleSingleTrimSection(true))
    }

    return recordedVideos.length ? (
        <div className={'trimThumbsCss'}>
            <CSSTransition in={openSingleTrim} timeout={200} classNames="trim" unmountOnExit>
                <SingleTrimComponent />
            </CSSTransition>

            <CSSTransition in={!openSingleTrim} timeout={200} classNames="trim" unmountOnExit>
                <div className={trimThumbsCss} data-testid="trim-thumbs">
                    {recordedVideos.map((video: IRecordedVideo) => (
                        <div
                            key={video.id}
                            className={`${trimThumbsItemCss} ${false ? 'active' : ''}`}
                            onClick={() => onClickHandler(video.id)}
                        />
                    ))}
                </div>
            </CSSTransition>
        </div>
    ) : null
})
