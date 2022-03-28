import * as THREE from "three";
import { Heart, Line, RotateCube } from "./components";

const getSetup = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  const MARGIN = 20;
  renderer.setSize(window.innerWidth - MARGIN, window.innerHeight - MARGIN);
  document.body.appendChild(renderer.domElement);

  return { camera, renderer, scene };
};

window.addEventListener("load", () => {
  const { camera, renderer, scene } = getSetup();

  const components = [new Heart(), new Line(), new RotateCube()];

  components.map((component) => scene.add(component.render()));

  function animate() {
    requestAnimationFrame(animate);
    components.map((component) => component.animate());
    renderer.render(scene, camera);
  }
  animate();
});
