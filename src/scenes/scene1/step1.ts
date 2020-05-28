import { Mesh, UniversalCamera } from '@babylonjs/core'
import { Animation } from '@babylonjs/core/Animations/animation'
import { EasingFunction, CircleEase } from '@babylonjs/core/Animations/easing'
import { Effect } from '@babylonjs/core/Materials/effect'
import { ShaderMaterial } from '@babylonjs/core/Materials/shaderMaterial'
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture'
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture'
import { Color4, Vector3 } from '@babylonjs/core/Maths/math'
import { Scene } from '@babylonjs/core/scene'
import { Sound, AudioSceneComponent } from '@babylonjs/core/Audio'
import musicFile from '../../view/assets/images/music_1.mp3'

export function step_1(engine, offsetWidth, offsetHeight) {
    Effect.ShadersStore['customVertexShader'] =
        '\r\n' +
        'precision highp float;\r\n' +
        '// Attributes\r\n' +
        'attribute vec3 position;\r\n' +
        'attribute vec2 uv;\r\n' +
        '// Uniforms\r\n' +
        'uniform mat4 worldViewProjection;\r\n' +
        '// Varying\r\n' +
        'varying vec2 vUV;\r\n' +
        'void main(void) {\r\n' +
        '    gl_Position = worldViewProjection * vec4(position, 1.0);\r\n' +
        '    vUV = uv;\r\n' +
        '}\r\n'

    Effect.ShadersStore['customFragmentShader'] =
        '\r\n' +
        'precision highp float;\r\n' +
        'varying vec2 vUV;\r\n' +
        'uniform sampler2D textureSampler;\r\n' +
        'uniform float time;\r\n' +
        'float band(float t, float start, float end, float blur){\r\n' +
        '   float step1 = smoothstep(start - blur, start + blur, t);\r\n' +
        '   float step2 = smoothstep(end + blur, end - blur, t);\r\n' +
        '   return min(step1, step2);\r\n' +
        '}\r\n' +
        'void main(void) {\r\n' +
        '    float num = 2.0;\r\n' +
        '    vec2 uv = vUV;\r\n' +
        '   float offset = 1./num;\r\n' +
        '   float crop = 0.2;\r\n' +
        '   float feather = 0.1;\r\n' +
        '   vec4 color = vec4(0);\r\n' +
        '   for (float i = 0.; i < num; i ++) {\r\n' +
        '       float xOffset = fract(uv.x - i * offset + crop + time);\r\n' +
        '       float bleed = band(xOffset, crop, 1. - crop, feather);\r\n' +
        '       color += texture(textureSampler, vec2(xOffset,uv.y)) * bleed;\r\n' +
        '   }\r\n' +
        '   color.rgb = pow(mix(color.rgb, vec3(dot(color.rgb, vec3(0.2125, 0.7154, 0.0721))), vec3(0.8)), vec3(1.3));\r\n' +
        '   color.a = 1.;\r\n' +
        '   gl_FragColor = color;\r\n' +
        '}\r\n'

    Effect.ShadersStore['overlayVertexShader'] =
        '\r\n' +
        'precision highp float;\r\n' +
        '// Attributes\r\n' +
        'attribute vec3 position;\r\n' +
        'attribute vec2 uv;\r\n' +
        '// Uniforms\r\n' +
        'uniform mat4 worldViewProjection;\r\n' +
        '// Varying\r\n' +
        'varying vec2 vUV;\r\n' +
        'void main(void) {\r\n' +
        '    gl_Position = worldViewProjection * vec4(position, 1.0);\r\n' +
        '    vUV = uv;\r\n' +
        '}\r\n'

    Effect.ShadersStore['overlayFragmentShader'] =
        '\r\n' +
        'precision highp float;\r\n' +
        'varying vec2 vUV;\r\n' +
        'uniform sampler2D textureSampler;\r\n' +
        'void main(void) {\r\n' +
        '    vec2 uv = vUV;\r\n' +
        '   vec4 color = texture(textureSampler, uv);\r\n' +
        '   gl_FragColor = color * color.a + vec4(0.1);\r\n' +
        '}\r\n'

    let myVideo
    let isAssigned = false

    let scene = new Scene(engine)
    scene.clearColor = new Color4(0.0, 0.0, 0.0)

    let camera = new UniversalCamera('camera1', new Vector3(0, 0, 0), scene)
    let width = offsetWidth
    let height = offsetHeight
    let aspect = 0.5625
    if (width / height > height / width) {
        camera.fov = Math.PI / 1.71
        aspect = 1.77778
    }
    let plane1 = Mesh.CreatePlane('plane1', 7, scene)
    plane1.rotation.z = Math.PI
    plane1.position.z = -2.35
    plane1.rotation.y = Math.PI
    camera.setTarget(Vector3.Zero())

    let plane2 = Mesh.CreatePlane('plane2', 2, scene)
    plane2.rotation.x = Math.PI
    plane2.position.z = -2.0
    plane2.rotation.y = Math.PI

    let plane3 = Mesh.CreatePlane('plane3', 2, scene)
    plane3.rotation.x = Math.PI
    plane3.position.z = -2.0
    plane3.rotation.y = Math.PI

    let plane4 = Mesh.CreatePlane('plane4', 2, scene)
    plane3.rotation.x = Math.PI
    plane3.position.z = -2.0
    plane3.rotation.y = Math.PI

    let xSlideCool = new Animation(
        'xSlideCool',
        'position.x',
        60,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )

    let keyFramesCool: { frame: number; value: number }[] = []

    keyFramesCool.push({
        frame: 0,
        value: -4,
    })

    keyFramesCool.push({
        frame: 15,
        value: 0,
    })

    keyFramesCool.push({
        frame: 25,
        value: 0,
    })

    keyFramesCool.push({
        frame: 40,
        value: 4,
    })

    let easingFunction = new CircleEase()
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
    xSlideCool.setEasingFunction(easingFunction)
    xSlideCool.setKeys(keyFramesCool)

    // plane2.animations = [];
    // plane2.animations.push(xSlideCool);

    let xSlideWithIt = new Animation(
        'xSlideWithIt',
        'position.x',
        60,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )
    let keyFramesWithIt: { frame: number; value: number }[] = []

    keyFramesWithIt.push({
        frame: 0,
        value: 4,
    })

    keyFramesWithIt.push({
        frame: 15,
        value: 0,
    })

    keyFramesWithIt.push({
        frame: 25,
        value: 0,
    })

    keyFramesWithIt.push({
        frame: 40,
        value: -4,
    })
    xSlideWithIt.setKeys(keyFramesWithIt)
    xSlideWithIt.setEasingFunction(easingFunction)
    // plane3.animations = [];
    // plane3.animations.push(xSlideWithIt);

    let xSlideCrew = new Animation(
        'xSlideCrew',
        'position.x',
        60,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )
    let keyFramesCrew: { frame: number; value: number }[] = []

    keyFramesCrew.push({
        frame: 0,
        value: 4,
    })

    keyFramesCrew.push({
        frame: 15,
        value: 0,
    })

    keyFramesCrew.push({
        frame: 25,
        value: 0,
    })

    keyFramesCrew.push({
        frame: 40,
        value: -4,
    })
    xSlideCrew.setKeys(keyFramesCrew)
    xSlideCrew.setEasingFunction(easingFunction)

    const font = 'bold 150px monospace'
    let textTexture1 = new DynamicTexture('text texture 1', { width: 512, height: 512 }, scene, true)
    textTexture1.drawText('Sick', 100, 300, font, 'white', 'black', false, true)
    let textTexture2 = new DynamicTexture('text texture 2', { width: 512, height: 512 }, scene, true)
    textTexture2.drawText('With it', 100, 300, font, 'white', 'black', false, true)
    let textTexture3 = new DynamicTexture('text texture 3', { width: 512, height: 512 }, scene, true)
    textTexture3.drawText('Crew', 100, 300, font, 'white', 'black', false, true)
    let textTexture4 = new DynamicTexture('text texture 4', { width: 512, height: 512 }, scene, true)
    textTexture4.drawText('Drop', 100, 300, font, 'white', 'black', false, true)

    let effectMaterial = new ShaderMaterial(
        'shader',
        scene,
        {
            vertex: 'custom',
            fragment: 'custom',
        },
        {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'],
        }
    )

    let overlayMaterial = new ShaderMaterial(
        'shader',
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

    let time = 1.0
    time.toPrecision(5)
    setInterval(() => {
        time += 0.001
        effectMaterial.setFloat('time', +time.toPrecision(5))
    }, 1)

    effectMaterial.backFaceCulling = false
    effectMaterial.setFloat('time', time)
    overlayMaterial.backFaceCulling = false

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
        // music.play();
    })

    let musicComponent = new AudioSceneComponent(scene)
    // scene.sounds = [music]

    scene.onBeforeRenderObservable.add(function () {
        if (myVideo !== undefined && !isAssigned) {
            if (myVideo.video.readyState == 4) {
                plane1.material = effectMaterial
                overlayMaterial.setTexture('textureSampler', textTexture1)
                plane2.material = overlayMaterial
                overlayMaterial.setTexture('textureSampler', textTexture2)
                plane3.material = overlayMaterial
                plane2.material = overlayMaterial
                let animation1 = scene.beginAnimation(plane2, 0, 100, true)
                animation1.onAnimationEnd = () => {
                    scene.beginAnimation(plane3, 0, 100, true)
                    console.log('second animation started')
                }
                scene.beginDirectAnimation(plane2, [xSlideCool], 0, 50)
                scene.beginDirectAnimation(plane3, [xSlideWithIt], 50, 100)

                isAssigned = true
            }
        }
    })

    return scene
}
