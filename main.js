import * as THREE from "three";

const w = window.innerWidth;
const h = window.inner.Height;
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerpectveCamera(fov, aspect, near, far)
camera.postion.z = 2;
const scene = new THREE.scene();


renderer.render(scene, camera);

