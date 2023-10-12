import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xeeb5d4);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Set initial controls properties (optional)
controls.enableDamping = true; // Adds smooth damping to the controls
controls.dampingFactor = 0.05; // Adjust damping factor
controls.rotateSpeed = 30; // Adjust rotation speed
controls.zoomSpeed = 0.5; // Adjust zoom speed
controls.panSpeed = 0.5; // Adjust panning speed

// Add a hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 1);
hemisphereLight.position.set(1, 2, 3);
scene.add(hemisphereLight);

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Increase intensity
directionalLight.position.set(2, 1, 5);
scene.add(directionalLight);

// Load the 3D model
const loader = new GLTFLoader();

loader.load(
  "chrome_ball/scene.gltf",
  function (gltf) {
    const model = gltf.scene;

    // Scale the model
    model.scale.set(2, 2, 2);

    scene.add(model);
  },
  undefined,
  function (error) {
    console.log("erorr");
    console.error(error);
  }
);

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
