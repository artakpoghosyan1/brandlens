import * as React from 'react'
import { Engine } from '@babylonjs/core/Engines/engine'
import * as BABYLON from '@babylonjs/core'
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
// import { createFFmpeg } from '@ffmpeg/ffmpeg'

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
    const [recordedVideoURL, setRecordedVideoURL] = React.useState<string | undefined>(undefined)
    const [retry, setRetry] = React.useState<boolean>(false)

    const [videoSrc, setVideoSrc] = React.useState('')
    const [message, setMessage] = React.useState('Click Start to transcode')

    // const ffmpeg = createFFmpeg({
    //     log: true,
    // });

    // const transcode = async () => {
    //     setMessage('Loading ffmpeg-core.js');
    //     await ffmpeg.load();
    //     setMessage('Start transcoding');
    //     await ffmpeg.write('file1.webm', '../assets/videos/file1.webm');
    //     await ffmpeg.write('file2.webm', '../assets/videos/file2.webm');
    //     await ffmpeg.concatDemuxer(["file1.webm", "file2.webm"], "output--.mp4");
    //     setMessage('Complete concatenating');
    //     const data = ffmpeg.read('output--.mp4');
    //     console.log('++++++++', data)
    //     setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
    // };

    React.useEffect(() => {
        const engineObj = new Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        })

        const scene = step_2(engineObj, canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight)

        engineObj.runRenderLoop(function () {
            if (scene) {
                scene.render()
            }
        })
    }, [retry])

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
        const engine_ = new Engine(canvasRef.current, true, {
            preserveDrawingBuffer: true,
            stencil: true,
        })

        if (BABYLON.VideoRecorder.IsSupported(engine_!)) {
            const { scene, startRecording, stopRecording } = step_1(
                engine_,
                canvasRef.current!.offsetWidth,
                canvasRef.current!.offsetHeight
            )

            setTimeout(() => {
                setIsRecording(true)

                startRecording().then(function (blob) {
                    const newBlob = new Blob([blob])
                    const url = URL.createObjectURL(newBlob)
                    setRecordedVideoURL(url)

                    saveVideoInLocalStorage(url)
                })
            }, 3000)

            setTimeout(() => {
                stopRecording()
                setIsRecording(false)
                setRetry(false)
                scene.dispose()
            }, 18000)
        }
    }

    const retryRecording = () => {
        setRetry(true)
        setRecordedVideoURL(undefined)
    }

    return (
        <div className={homePageWrapperClass}>
            <RecordingProgressBarComponent isRecording={isRecording} />

            <div className="addthis_inline_share_toolbox share" id="share" />

            <canvas id="renderCanvas" ref={canvasRef} />

            <StartRecordingButtonComponent onClick={handleOnStartClick} isRecording={isRecording} />

            {recordedVideoURL && <VideoComponent videoURL={recordedVideoURL} retryRecording={retryRecording} />}

            {/*<video src={videoSrc} controls id='output-video'></video><br/>*/}
            {/*<button onClick={transcode} >ssjfasdfkljaslfj;askjf</button>*/}
            <p>{message}</p>
        </div>
    )
})

const mapStateToProps = (state: IState) => ({
    currentScene: currentSceneSelector(state),
})

export const HomeComponent = connect(mapStateToProps)(Home)
