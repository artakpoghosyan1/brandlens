import { Mesh, UniversalCamera } from '@babylonjs/core'
import { Analyser } from '@babylonjs/core/Audio/analyser'
import * as BABYLON from '@babylonjs/core'
import { Effect } from '@babylonjs/core/Materials/effect'
import { ShaderMaterial } from '@babylonjs/core/Materials/shaderMaterial'
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture'
import { Color4, Vector3, Plane } from '@babylonjs/core/Maths/math'
import { Scene } from '@babylonjs/core/scene'
import { Sound } from '@babylonjs/core/Audio/sound'

import musicFile from '../../view/assets/images/music-15s.mp3'
import overlayVideo from '../../view/assets/images/overlayAnimation.mp4'
import countdownVideo from '../../view/assets/images/countdown.mp4'

export function step_1(engine, offsetWidth, offsetHeight) {
    let myVideo
    let isAssigned = false

    let scene = new Scene(engine)
    scene.clearColor = new Color4(0.0, 0.0, 0.0)

    Effect.ShadersStore['customVertexShader'] = `
        precision highp float;
        // Attributes
        attribute vec3 position;
        attribute vec2 uv;
        // Uniforms
        uniform mat4 worldViewProjection;
        // Varying
        varying vec2 vUV;
        void main(void) {
            gl_Position = worldViewProjection * vec4(position, 1.0);
            vUV = uv;
        }`

    Effect.ShadersStore['customFragmentShader'] = `precision highp float;
        varying vec2 vUV;
        uniform sampler2D textureSampler;
        uniform float iTime;

        float phaser(float pct, float phase, float e) {
            return clamp( (phase-1.+pct*(1.+e))/e, 0., 1.);
        }

        void main(void) {
            vec2 uv = vUV;
            float offset = 0.5;
            float edge = 5.0;
            vec2 uvR = ((uv * 2.0 - 1.0) / vec2(phaser(iTime, offset * 1.0 / 3.0, edge) + 1.0)) * 0.5 + 0.5;
            vec2 uvG = ((uv * 2.0 - 1.0) / vec2(phaser(iTime, offset * 2.0 / 3.0, edge) + 1.0)) * 0.5 + 0.5;
            vec2 uvB = ((uv * 2.0 - 1.0) / vec2(phaser(iTime, offset, edge) + 1.0)) * 0.5 + 0.5;
            vec4 color = vec4(texture(textureSampler, uvR).r,texture(textureSampler, uvG).g,texture(textureSampler, uvB).b, 1.0);
            gl_FragColor = color;
        }`

    Effect.ShadersStore['overlayVertexShader'] = `precision highp float;
        // Attributes
        attribute vec3 position;
        attribute vec2 uv;
        // Uniforms
        uniform mat4 worldViewProjection;
        // Varying
        varying vec2 vUV;
        void main(void) {
            gl_Position = worldViewProjection * vec4(position, 1.0);
            vUV = uv;
        }`

    Effect.ShadersStore['overlayFragmentShader'] = `precision highp float;

        varying vec2 vUV;
        
        uniform sampler2D textureSampler;
        
        void main(void) {
            vec2 uv = vUV;
            uv.y *= 0.5;
            float alpha = texture(textureSampler, uv).r;
            uv.y += 0.5;
            vec3 color = texture(textureSampler, uv).rgb;
            gl_FragColor = vec4(color,alpha);
        }`

    let overlayMaterial = new ShaderMaterial(
        'overlay material shader',
        scene,
        {
            vertex: 'overlay',
            fragment: 'overlay',
        },
        {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'],
        }
    )

    let countdownMaterial = new ShaderMaterial(
        'countdown material shader',
        scene,
        {
            vertex: 'overlay',
            fragment: 'overlay',
        },
        {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'],
        }
    )

    let effectMaterial = new ShaderMaterial(
        'effect shader',
        scene,
        {
            vertex: 'custom',
            fragment: 'custom',
        },
        {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection', 'iTime'],
        }
    )
    let camera = new UniversalCamera('camera1', new Vector3(0, 0, 0), scene)
    let width = offsetWidth
    let height = offsetHeight
    let aspect = 0.5625
    if (width / height > height / width) {
        camera.fov = Math.PI / 1.71
        aspect = 1.77778
    }
    let plane1 = Mesh.CreatePlane('plane1', 4.75, scene)
    plane1.rotation.z = Math.PI
    plane1.position.z = -5.35
    plane1.rotation.y = Math.PI
    plane1.scaling.x = aspect
    camera.setTarget(Vector3.Zero())

    let overlayPlane = Mesh.CreatePlane('overlay plane', 2, scene)
    overlayPlane.position.z = -2.0
    overlayPlane.rotation.y = Math.PI
    overlayPlane.scaling.scale(3)

    let countdownPlane = Mesh.CreatePlane('countdown plane', 2, scene)
    countdownPlane.position.z = -2.0
    countdownPlane.rotation.y = Math.PI

    let textTexture1 = new VideoTexture('overlay video', overlayVideo, scene, true)
    textTexture1.video.pause()
    textTexture1.video.loop = false

    let textTexture2 = new VideoTexture('countdown video', countdownVideo, scene, true)
    textTexture2.video.pause()
    textTexture2.video.loop = false

    overlayMaterial.setTexture('textureSampler', textTexture1)
    overlayMaterial.backFaceCulling = false
    overlayMaterial.alpha = 0.9999
    overlayMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD

    overlayPlane.material = overlayMaterial

    countdownMaterial.setTexture('textureSampler', textTexture2)
    countdownMaterial.alpha = 0.9999
    countdownMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD

    countdownPlane.material = countdownMaterial

    effectMaterial.backFaceCulling = false
    effectMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD
    // effectMaterial.setFloat('offset', 0.5)
    // effectMaterial.setFloat('edge', 5.0)

    textTexture1.video.onended = function () {
        overlayPlane.dispose(true, true)
        console.log('overlayPlane disposed')
    }
    textTexture2.video.onended = function () {
        countdownPlane.dispose(false, false)
        console.log('countdownPlane disposed')
    }

    // let playStatus = false
    textTexture2.video.play()
    setTimeout(() => {
        textTexture1.video.play()
    }, 4600)

    // let time = 1.0
    // time.toPrecision(5)
    // setInterval(() => {
    //     time += 0.001
    //     effectMaterial.setFloat('time', +time.toPrecision(5))
    // }, 1)

    // Create our video texture
    VideoTexture.CreateFromWebCam(
        scene,
        function (videoTexture) {
            myVideo = videoTexture
            effectMaterial.setTexture('textureSampler', myVideo)
        },
        {
            minWidth: 1280,
            minHeight: 720,
            maxWidth: 1280,
            maxHeight: 720,
            deviceId: '',
            aspectRatio: 1.7777777778,
            frameRate: 30,
        }
    )

    let music = new Sound('Music', musicFile, scene, function () {
        // Sound has been downloaded & decoded
        setTimeout(() => {
            music.play()
        }, 3000)
    })

    let myAnalyser = new Analyser(scene)
    let audioDestination = BABYLON.Engine.audioEngine.audioContext?.destination
    myAnalyser!.FFT_SIZE = 64
    myAnalyser!.SMOOTHING = 0.5
    let biquadFilter = BABYLON.Engine.audioEngine.audioContext?.createBiquadFilter()
    biquadFilter!.type = 'lowpass'
    biquadFilter!.frequency.value = 180
    myAnalyser.connectAudioNodes(biquadFilter!, audioDestination!)
    // @ts-ignore
    BABYLON.Engine.audioEngine.connectToAnalyser(myAnalyser)

    let smoothstep = function (min, max, value) {
        var x = Math.max(0, Math.min(1, (value - min) / (max - min)))
        return x * x * (3 - 2 * x)
    }

    let CalculateRMS = function (arr: Float32Array) {
        let Squares = arr.map((val) => val * val)
        let Sum = Squares.reduce((acum, val) => acum + val)
        let Mean = Sum / arr.length
        return Math.sqrt(Mean)
    }

    let gaussianKernel1d = (function () {
        const sqr2pi = Math.sqrt(2 * Math.PI)

        return function gaussianKernel1d(size: number, sigma: number) {
            let width = (size / 2) | 0
            let kernel = new Float32Array(width * 2 + 1)
            let norm = 1.0 / (sqr2pi * sigma)
            let coefficient = 2 * sigma * sigma
            let total = 0
            let x = 0

            for (x = -width; x <= width; x++) {
                total += kernel[width + x] = norm * Math.exp((-x * x) / coefficient)
            }

            for (x = 0; x < kernel.length; x++) {
                kernel[x] /= total
            }

            return kernel
        }
    })()

    let gaussianFilter = function (value: number, size: number, sigma: number) {
        let filteredValue = 0
        let dataArray: number[] = []
        let kernel = gaussianKernel1d(size, sigma)
        for (let i = 0; i < 10; i++) {
            filteredValue += value * kernel[i]
        }
        return filteredValue
    }

    let audioRms: Float32Array = new Float32Array(myAnalyser!.FFT_SIZE / 2)
    scene.registerBeforeRender(function () {
        let frequencyData = myAnalyser!.getByteFrequencyData()
        for (let i = 0; i < myAnalyser!.getFrequencyBinCount(); i++) {
            audioRms[i] = frequencyData[i] / 255
        }
        // console.log(CalculateRMS(audioRms))
        effectMaterial.setFloat('iTime', CalculateRMS(audioRms))
        // overlayPlane.position.x = CalculateRMS(audioRms) * 2
    })

    scene.onBeforeRenderObservable.add(function () {
        if (myVideo !== undefined && !isAssigned) {
            if (myVideo.video.readyState == 4) {
                plane1.material = effectMaterial
                isAssigned = true
            }
        }
    })
    // var imgNm = 0;

    // scene.registerAfterRender(function(){
    //     if(imgNm++ < 90) {
    //         Tools.CreateScreenshotUsingRenderTarget(engine, camera, 200);
    //     }
    // })

    /******* Recording *******/

    const outputNode = BABYLON.Engine.audioEngine.audioContext!.createMediaStreamDestination()
    BABYLON.Engine.audioEngine.masterGain.connect(outputNode)

    // @ts-ignore
    let recorder = new BABYLON.VideoRecorder(scene.getEngine(), { audioTracks: outputNode.stream.getAudioTracks() })

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render()
        }
    })

    const startRecording = (): Promise<Blob> => {
        return recorder!.startRecording('video_file.webm', 20)
    }

    const stopRecording = () => {
        recorder!.stopRecording()
        scene.dispose()
        engine.stopRenderLoop()
    }

    return { scene, startRecording, stopRecording }
}
