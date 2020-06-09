import { Scene } from '@babylonjs/core/scene'
import { Color4, Vector3 } from '@babylonjs/core/Maths/math'
import { ShaderMaterial } from '@babylonjs/core/Materials/shaderMaterial'
import { Effect } from '@babylonjs/core/Materials/effect'
import { VideoTexture } from '@babylonjs/core/Materials/Textures/videoTexture'
import { Mesh, UniversalCamera } from '@babylonjs/core'

export function step_2(engine, offsetWidth, offsetHeight) {
    Effect.ShadersStore['defaultVertexShader'] =
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

    Effect.ShadersStore['defaultFragmentShader'] = `varying vec2 vUV;
    uniform sampler2D textureSampler;

    void main(void) {
        vec2 uv = vUV;
        vec4 color = texture(textureSampler, uv);
        gl_FragColor = color;
    }`

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
    let plane1 = Mesh.CreatePlane('plane1', 2.0, scene)
    plane1.rotation.z = Math.PI
    plane1.position.z = -1.0
    plane1.rotation.y = Math.PI
    plane1.scaling.x = aspect
    camera.setTarget(Vector3.Zero())

    let shaderMaterial = new ShaderMaterial(
        'camera video shader',
        scene,
        {
            vertex: 'default',
            fragment: 'default',
        },
        {
            attributes: ['position', 'normal', 'uv'],
            uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection'],
        }
    )

    shaderMaterial.backFaceCulling = false

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
