import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("./src/texture/earthMap.jpg");
const bumbTexture = textureLoader.load("./src/texture/mapBumb.jpg");
const cloudTexture = textureLoader.load("./src/texture/cloudMap.png");
const galaxyTexture = textureLoader.load("./src/texture/galaxyMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.earth-webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const earthGeometry = new THREE.SphereGeometry(0.65, 64, 64);
const cloudGeometry = new THREE.SphereGeometry(0.658, 64, 64);
const galaxyGeometry = new THREE.SphereGeometry(80, 64, 64);

// Materials
const earthMaterial = new THREE.MeshPhongMaterial();
earthMaterial.roughness = 1;
earthMaterial.metalness = 0;
earthMaterial.map = normalTexture;
earthMaterial.bumpMap = bumbTexture;
earthMaterial.bumpScale = 0.3;

const cloudMaterial = new THREE.MeshPhongMaterial();
cloudMaterial.map = cloudTexture;
cloudMaterial.transparent = true;

const galaxyMaterial = new THREE.MeshBasicMaterial();
galaxyMaterial.map = galaxyTexture;
galaxyMaterial.side = THREE.BackSide;

// Mesh
const sphere = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(sphere);

const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloud);

const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 5;
pointLight.position.y = 3;
pointLight.position.z = 8;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 4;
controls.minDistance = 2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const tick = () => {
  // Update objects
  sphere.rotation.y -= 0.001;
  galaxy.rotation.y -= 0.001;
  cloud.rotation.y += 0.0005;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
