import * as React from 'react'
import { Engine } from '@babylonjs/core/Engines/engine'
import * as BABYLON from '@babylonjs/core'
import { css } from 'emotion'

import { step_2 } from '../../scenes/scene1/step2'
import { step_1 } from '../../scenes/scene1/step1'
import { RecordingButtonComponent } from './RecordingButtonComponent'
import { RecordingControlsComponent } from './RecordingControlsComponent'
import { CloseButtonComponent } from './shared/CloseButtonComponent'

interface IRecordingComponentProps {}

const recorderPageCss = css`
    height: 100%;
`

const recorderCanvasCss = css`
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
`

export const RecordingComponent: React.FC<IRecordingComponentProps> = React.memo(() => {
    const canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef()
    const [isRecording, setIsRecording] = React.useState<boolean>(false)
    const [recordedVideoURL, setRecordedVideoURL] = React.useState<string | undefined>(undefined)
    const [retry, setRetry] = React.useState<boolean>(false)

    const [videoSrc, setVideoSrc] = React.useState('')
    const [message, setMessage] = React.useState('Click Start to transcode')

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
        <div className={recorderPageCss}>
            <canvas id="renderCanvas" ref={canvasRef} className={recorderCanvasCss} />

            <CloseButtonComponent />

            <RecordingControlsComponent />

            <RecordingButtonComponent />
        </div>
    )
})
