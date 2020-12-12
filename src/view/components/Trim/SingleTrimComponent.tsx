import * as React from 'react'
import { css } from 'emotion'
import { clearButtonDefaultStylesCss } from '../../styles/sharedStyles'
import { DoneSmallIcon } from '../../assets/icons/DoneSmallIcon'
import { CloseSmallIcon } from '../../assets/icons/CloseSmallIcon'
import { RefreshIcon } from '../../assets/icons/RefreshIcon'
import { RemoveIcon } from '../../assets/icons/RemoveIcon'
import { TrimComponent } from './TrimComponent'
import { TrimContext } from '../../contexts/TrimContext'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSingleTrimSection, updateRecordedVideoAction } from '../../../data/actionCreators'
import { IState } from '../../../data/IState'
import { IRecordedVideo } from '../../../models/IRecordedVideo'

interface ISingleTrimComponentProps {}

const headerCss = css`
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
`

const bodyCss = css`
    margin: 34px 0 42px 0;
`

const footerCss = css`
    display: flex;
    justify-content: space-around;
`

export const SingleTrimComponent: React.FC<ISingleTrimComponentProps> = React.memo(() => {
    const { leftTrimValue, rightTrimValue, leftTrimDragValue, rightTrimDragValue } = React.useContext(TrimContext)
    const currentRecordedVideo = useSelector((state: IState) => state.currentRecordedVideo)!

    const dispatch = useDispatch()

    const onDoneClickHandler = () => {
        const video: IRecordedVideo = {
            ...currentRecordedVideo,
            trimData: {
                ...currentRecordedVideo.trimData,
                leftTrimValue,
                rightTrimValue,
                leftTrimDragValue,
                rightTrimDragValue,
            },
        }
        dispatch(updateRecordedVideoAction(video))
        dispatch(toggleSingleTrimSection(false))
    }

    return (
        <div>
            <header className={headerCss}>
                <button className={clearButtonDefaultStylesCss}>
                    <CloseSmallIcon />
                </button>

                <button className={clearButtonDefaultStylesCss} onClick={onDoneClickHandler}>
                    <DoneSmallIcon />
                </button>
            </header>

            <div className={bodyCss}>
                <TrimComponent />
            </div>

            <footer className={footerCss}>
                <button className={clearButtonDefaultStylesCss}>
                    <RefreshIcon />
                </button>

                <button className={clearButtonDefaultStylesCss}>
                    <RemoveIcon />
                </button>
            </footer>
        </div>
    )
})
