import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// Background

const spaceTexture = new THREE.TextureLoader().load("mars.jpeg");
scene.background = spaceTexture;

// Avatar

const nazTexture = new THREE.TextureLoader().load("lightX.png");

const naz = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 4),
  new THREE.MeshBasicMaterial({ map: nazTexture })
);

scene.add(naz);

// Moon

const moonTexture = new THREE.TextureLoader().load("marsmoon.jpeg");
const normalMoonTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalMoonTexture,
  })
);

const surfaceCratersTexture = new THREE.TextureLoader().load(
  "surface-craters.jpeg"
);

const surfaceCraters = new THREE.Mesh(
  new THREE.SphereGeometry(3, 20, 20),
  new THREE.MeshStandardMaterial({
    map: surfaceCratersTexture,
    normalMap: normalMoonTexture,
  })
);

scene.add(moon);

scene.add(surfaceCraters);

moon.position.z = 30;
moon.position.setX(-10);

surfaceCraters.position.z = 20;
surfaceCraters.position.setX(-30);
surfaceCraters.position.setY(-10);

naz.position.z = -8;
naz.position.x = 5;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  surfaceCraters.rotation.x -= 0.05;
  surfaceCraters.rotation.y -= 0.075;
  surfaceCraters.rotation.z -= 0.05;

  naz.rotation.y += 0.01;
  naz.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("marscarter.jpeg"),
    normalMap: normalMoonTexture,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

animate();
