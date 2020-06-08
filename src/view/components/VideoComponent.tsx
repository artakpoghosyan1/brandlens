import * as React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { IState } from '../../data/ISstate'
import { changeCurrentSceneAction } from '../../data/actionCreators'
import { currentSceneSelector } from '../../data/selectors/currentSceneSelector'
import retryIcon from '../assets/images/retry_button.png'
import okIcon from '../assets/images/ok_button.png'

interface IVideoComponentProps {
    videoURL: string
    changeCurrentScene: (currentScene: string) => void
    currentScene: string
    setRetry: (retry: boolean) => void
}

const videoWrapperClass = css`
    text-align: center;
    // visibility: hidden;
    // opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    transition: 0.7s all;
`

const retryClass = css`
    background-image: url(${retryIcon});
`

const okClass = css`
    background-image: url(${okIcon});
`

const Video: React.FunctionComponent<IVideoComponentProps> = React.memo((props) => {
    const handleOnrNextStepClick = () => {
        let step = +props.currentScene.split('_')[1]
        props.changeCurrentScene(`step_${++step}`)
    }

    const handleOnrRetryClick = () => {
        props.setRetry(true)
    }

    return (
        <div id="video-wrapper" className={videoWrapperClass}>
            <video src={props.videoURL} id="video" className="video" autoPlay loop />

            <div className="video-btns">
                <button id="retry" className={`button ${retryClass}`} onClick={handleOnrRetryClick} />
                {/*<button id="ok" className={`button ${okClass}`} onClick={handleOnrNextStepClick} />*/}
            </div>
        </div>
    )
})

const mapDispatchToProps = (dispatch) => ({
    changeCurrentScene: (currentScene) => dispatch(changeCurrentSceneAction(currentScene)),
})

const mapStateToProps = (state: IState) => ({
    currentScene: currentSceneSelector(state),
})

export const VideoComponent = connect(mapStateToProps, mapDispatchToProps)(Video)
