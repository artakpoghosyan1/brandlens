import * as React from 'react'
import { Button } from './shared/Button'
import previewVideo from '../assets/images/preview.mp4'
import { css } from 'emotion'
import { toggleIsAllowedCameraAction } from '../../data/actionCreators'
import { connect } from 'react-redux'

interface IPreviewPageComponentProps {
    toggleIsAllowedCamera: (isAllowedCamera: boolean) => void
}

const previewPageClass = css`
    color: #fff;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 15px;
`

const previewVideoClass = css`
    height: 70%;
    display: block;
`

const previewTitleClass = css`
    letter-spacing: 1.1px;
    font-size: 21px;
    margin: 0;
`

const PreviewPage: React.FunctionComponent<IPreviewPageComponentProps> = React.memo((props) => {
    const handleOnAllowClock = () => {
        props.toggleIsAllowedCamera(true)
    }

    return (
        <div className={previewPageClass}>
            <h1 className={previewTitleClass}>Welcome to Brandlens demo</h1>

            <video src={previewVideo} className={previewVideoClass} />

            <Button onClick={handleOnAllowClock}>Allow camera</Button>
        </div>
    )
})

const mapDispatchToProps = (dispatch) => ({
    toggleIsAllowedCamera: (isAllowedCamera) => dispatch(toggleIsAllowedCameraAction(isAllowedCamera)),
})

export const PreviewPageComponent = connect(null, mapDispatchToProps)(PreviewPage)
