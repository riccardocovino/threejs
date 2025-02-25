import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
//import { UnrealBloomPass } from "post/UnrealBloomPass.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
 
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

// Orbit
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// Light
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
directionalLight.castShadow = true;
scene.add( directionalLight );
directionalLight.position.set( 10, 10, 10);

const hemilight = new THREE.HemisphereLight(0xffffff, 0x7c7c7c);
scene.add(hemilight)


// Videotexture pannello
const video = document.getElementById( 'video' );
const texture = new THREE.VideoTexture( video );
texture.colorSpace = THREE.SRGBColorSpace;
const geometry = new THREE.PlaneGeometry( 16, 9 );
geometry.scale( 0.5, 0.5, 0.5 );
const material = new THREE.MeshBasicMaterial( { map: texture } );
const streamprojector = new THREE.Mesh( geometry, material );
streamprojector.lookAt( camera.position );
scene.add( streamprojector );
streamprojector.position.set(0, 0, -5);

// 3D GLTF Objects
const loader = new GLTFLoader().setPath( 'public/' );
loader.load( 'A01.gltf', function ( gltf ) {
scene.add( gltf.scene );
const logo = gltf.scene
logo.position.set( 0, 0, -0.4);
logo.scale.set(3, 3, 3)
} );

const loader1 = new GLTFLoader().setPath( 'public/' );
loader1.load( 'ARCA_white.gltf', function ( gltf ) {
scene.add( gltf.scene );
const logo_white = gltf.scene
logo_white.position.set( 0, 0, -0.41)
} );

const loader2 = new GLTFLoader().setPath( 'public/' );
loader2.load( 'wall.gltf', function ( gltf ) {
scene.add( gltf.scene );
const wall = gltf.scene
wall.receiveShadow = true;
wall.castShadow = true; 
wall.position.set( 0, 0, -0.5)
} );

// 3D spheres
const geo = new THREE.IcosahedronGeometry(0.5, 1);
const mat = new THREE.MeshStandardMaterial({
    color: 0xccff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);
mesh.castShadow = true; 
mesh.receiveShadow = true;
mesh.position.set( 0, -1, 0);

const wirefatMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wiremeshfat = new THREE.Mesh(geo, wirefatMat);
wiremeshfat.scale.setScalar(1.03);
mesh.add(wiremeshfat);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0x010101,
    wireframe: true
})

const wiremesh = new THREE.Mesh(geo, wireMat);
wiremesh.scale.setScalar(1.001);
mesh.add(wiremesh);

if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

    const constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };

    navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

        // apply the stream to the video element used in the texture

        video.srcObject = stream;
        video.play();

    } ).catch( function ( error ) {

        console.error( 'Unable to access the camera/webcam.', error );

    } );

} else {

    console.error( 'MediaDevices interface not available.' );
}

// update
function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize( window.innerWidth, window.innerHeight );

}


