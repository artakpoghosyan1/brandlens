import * as React from 'react'
import { createScene } from '../../scenes/webCam'
import { Engine } from '@babylonjs/core/Engines/engine'
import { VideoRecorder } from '@babylonjs/core/Misc'

export const HomeComponent: React.FunctionComponent = React.memo((props) => {
  const canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef()
  const [videoRecorder, setVideoRecorder] = React.useState<VideoRecorder>()
  const [isRecordingSupported, setIsRecordingSupported] = React.useState<
    boolean
  >(false)
  const [startRecording, setStartRecording] = React.useState<boolean>(false)
  const [isRecordingComplete, setIsRecordingComplete] = React.useState<boolean>(
    false
  )
  const [recorderVideoURL, setRecorderVideoURL] = React.useState<string>('')

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

    engine.runRenderLoop(function () {
      if (scene) {
        scene.render()
      }
    })
  }, [])

  const handleOnStartClick = () => {
    if (isRecordingSupported) {
      setStartRecording(true)

      videoRecorder!.startRecording(null).then(function (blob) {
        const newBlob = new Blob([blob])
        const url = URL.createObjectURL(newBlob)
        setRecorderVideoURL(url)
      })

      setTimeout(() => {
        videoRecorder!.stopRecording()
        setIsRecordingComplete(true)
      }, 2000)
    }
  }

  return (
    <div className="canvas-wrapper">
      <div className="addthis_inline_share_toolbox share" id="share" />

      <canvas id="renderCanvas" ref={canvasRef} />
      <button id="start" className="start" onClick={handleOnStartClick}>
        <svg
          className={`video-loader ${startRecording ? 'recording' : ''}`}
          id="video-loader"
        >
          <circle
            cx="30"
            cy="30"
            r="20"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="4"
          />
          <circle
            id="progress"
            className="video-loader__progress"
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#f77a52"
            strokeWidth="4"
            strokeDasharray="339.292"
            strokeDashoffset="339.292"
          />
          <circle
            cx="30"
            cy="30"
            r="20"
            fill="#fff"
            stroke="#fff"
            strokeDashoffset="135.717"
          />
        </svg>
      </button>

      <div
        id="video-wrapper"
        className={`video-wrapper ${isRecordingComplete ? 'show' : ''}`}
      >
        <video
          src={recorderVideoURL}
          id="video"
          className="video"
          autoPlay
          loop
        />

        <div className="video-btns">
          <button id="retry" className="button retry" />
          <button id="ok" className="button ok" />
        </div>
      </div>
    </div>
  )
})
