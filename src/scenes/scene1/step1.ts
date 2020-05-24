import { Scene } from '@babylonjs/core/scene'
import { Color4, Vector3 } from '@babylonjs/core/Maths/math'
import { ShaderMaterial } from '@babylonjs/core/Materials/shaderMaterial'
import { Effect } from '@babylonjs/core/Materials/effect'
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture'
import { Mesh, UniversalCamera } from '@babylonjs/core'

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

    plane1.scaling.x = aspect

    let shaderMaterial = new ShaderMaterial(
        'shader',
        scene,
        {
            vertex: 'custom',
            fragment: 'custom',
        },
        {
            attributes: ['position', 'normal', 'uv'],
            uniforms: [
                'world',
                'worldView',
                'worldViewProjection',
                'view',
                'projection',
            ],
        }
    )

    let time = 1.0
    time.toPrecision(5)
    setInterval(() => {
        time += 0.001
        shaderMaterial.setFloat('time', +time.toPrecision(5))
    }, 1)

    shaderMaterial.backFaceCulling = false
    shaderMaterial.setFloat('time', time)

    // Create our video texture
    VideoTexture.CreateFromWebCam(
        scene,
        function (videoTexture) {
            myVideo = videoTexture
            shaderMaterial.setTexture('textureSampler', myVideo)
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

    scene.onBeforeRenderObservable.add(function () {
        if (myVideo !== undefined && !isAssigned) {
            if (myVideo.video.readyState == 4) {
                plane1.material = shaderMaterial
                isAssigned = true
            }
        }
    })

    return scene
}
