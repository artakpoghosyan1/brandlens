import * as React from 'react'
import { Engine } from '@babylonjs/core/Engines/engine'
import { VideoRecorder } from '@babylonjs/core/Misc'
import { StartRecordingButtonComponent } from './StartRecordingButtonComponent'
import { RecordingProgressBarComponent } from './RecordingProgressBarComponent'
import { css } from 'emotion'
import { VideoComponent } from './VideoComponent'
import { getLocalStorage } from '../../utilities/getLocalStorage'
import { Scene } from '@babylonjs/core'
import { scene1 } from '../../scenes/scene1'
import { currentSceneSelector } from '../../data/selectors/currentSceneSelector'
import { connect } from 'react-redux'
import { IState } from '../../data/ISstate'
import { step_2 } from '../../scenes/scene1/step2'
import { step_1 } from '../../scenes/scene1/step1'

interface IHomeComponentProps {
    currentScene: string
}

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
const scene1Collection = scene1()

const Home: React.FunctionComponent<IHomeComponentProps> = React.memo((props) => {
    const canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef()
    const [isRecording, setIsRecording] = React.useState<boolean>(false)
    const [isRecordingComplete, setIsRecordingComplete] = React.useState<boolean>(false)
    const [recordedVideoURL, setRecordedVideoURL] = React.useState<string>('')
    const [currentScene, setCurrentScene] = React.useState<Scene | null>(null)
    const [retry, setRetry] = React.useState<boolean>(false)
    const [engine, setEngine] = React.useState<Engine | null>(null)

    React.useEffect(() => {
        setIsRecordingComplete(false)

        const engineObj = new Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        })

        setEngine(engineObj)

        const scene = step_2(engineObj, canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight)

        engineObj.runRenderLoop(function () {
            if (scene) {
                scene.render()
            }
        })

        setCurrentScene(scene)
    }, [])

    const saveVideoInLocalStorage = (url) => {
        const videoCollection = storage.getItem('videoCollection')

        if (videoCollection) {
            videoCollection.push(url)
            storage.setItem('videoCollection', videoCollection)
        } else {
            storage.setItem('videoCollection', [url])
        }
    }

    const handleOnStartClick = () => {
        setRetry(false)
        const recorder = new VideoRecorder(engine!)

        if (VideoRecorder.IsSupported(engine!)) {
            const scene = step_1(engine, canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight)

            engine!.runRenderLoop(function () {
                if (scene) {
                    scene.render()
                }
            })

            setTimeout(() => {
                setIsRecording(true)
                recorder!.startRecording('file.webm', 20).then(function (blob) {
                    currentScene!.dispose()

                    const newBlob = new Blob([blob])
                    const url = URL.createObjectURL(newBlob)
                    setRecordedVideoURL(url)

                    saveVideoInLocalStorage(url)
                })
            }, 3000)

            setTimeout(() => {
                recorder!.stopRecording()
                setIsRecording(false)
                setIsRecordingComplete(true)
                // currentScene!.dispose()
            }, 15000)
        }
    }

    return (
        <div className={homePageWrapperClass}>
            <RecordingProgressBarComponent isRecording={isRecording} />

            <div className="addthis_inline_share_toolbox share" id="share" />

            <canvas id="renderCanvas" ref={canvasRef} />

            <StartRecordingButtonComponent onClick={handleOnStartClick} isRecording={isRecording} />

            {isRecordingComplete && !retry && <VideoComponent videoURL={recordedVideoURL} setRetry={setRetry} />}
        </div>
    )
})

const mapStateToProps = (state: IState) => ({
    currentScene: currentSceneSelector(state),
})

export const HomeComponent = connect(mapStateToProps)(Home)
