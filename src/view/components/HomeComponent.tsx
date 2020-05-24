import * as React from 'react'
import { createScene } from '../../scenes/webCam'
import { Engine } from '@babylonjs/core/Engines/engine'
import { VideoRecorder } from '@babylonjs/core/Misc'
import { StartRecordingButtonComponent } from './StartRecordingButtonComponent'
import { RecordingProgressBarComponent } from './RecordingProgressBarComponent'
import { css } from 'emotion'
import { VideoComponent } from './VideoComponent'
import { getLocalStorage } from '../shared/utilities/getLocalStorage'
import { Scene } from '@babylonjs/core'

const homePageWrapperClass = css`
    position: relative;
    overflow: hidden;
    height: 100%;

    @media (min-width: 1025px) {
        margin: 0 auto;
        width: 1024px;
    }
`

const storage = getLocalStorage()

export const HomeComponent: React.FunctionComponent = React.memo(() => {
    const canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef()
    const [videoRecorder, setVideoRecorder] = React.useState<VideoRecorder>()
    const [isRecordingSupported, setIsRecordingSupported] = React.useState<
        boolean
    >(false)
    const [isRecording, setIsRecording] = React.useState<boolean>(false)
    const [isRecordingComplete, setIsRecordingComplete] = React.useState<
        boolean
    >(false)
    const [recordedVideoURL, setRecordedVideoURL] = React.useState<string>('')
    const [scene, setScene] = React.useState<Scene | null>(null)

    React.useEffect(() => {
        const engine = new Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        })

        setIsRecordingSupported(VideoRecorder.IsSupported(engine))
        setVideoRecorder(new VideoRecorder(engine))

        const scene = createScene(
            engine,
            canvasRef.current!.offsetWidth,
            canvasRef.current!.offsetHeight
        )
        setScene(scene)

        engine.runRenderLoop(function () {
            if (scene) {
                scene.render()
            }
        })
    }, [])

    const handleOnStartClick = () => {
        if (isRecordingSupported) {
            setIsRecording(true)

            videoRecorder!.startRecording(null).then(function (blob) {
                const newBlob = new Blob([blob])
                const url = URL.createObjectURL(newBlob)
                setRecordedVideoURL(url)

                const videoCollection = storage.getItem('videoCollection')

                if (videoCollection) {
                    videoCollection.push(url)
                    storage.setItem('videoCollection', videoCollection)
                } else {
                    storage.setItem('videoCollection', [url])
                }
            })

            setTimeout(() => {
                videoRecorder!.stopRecording()
                setIsRecording(false)
                setIsRecordingComplete(true)
                scene!.dispose()
            }, 2000)
        }
    }

    return (
        <div className={homePageWrapperClass}>
            <RecordingProgressBarComponent isRecording={isRecording} />

            <div className="addthis_inline_share_toolbox share" id="share" />

            <canvas id="renderCanvas" ref={canvasRef} />

            <StartRecordingButtonComponent
                onClick={handleOnStartClick}
                isRecording={isRecording}
            />

            <VideoComponent
                videoURL={recordedVideoURL}
                isRecordingComplete={isRecordingComplete}
            />
        </div>
    )
})
