import * as THREE from "three";
import * as Components from "./components";
import { getControl, FirstPersonControl } from "./controls";

const getCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(-1, 2, 3);

  return camera;
};

const getRenderer = () => {
  const renderer = new THREE.WebGLRenderer();
  const MARGIN = 40;
  renderer.setSize(window.innerWidth - MARGIN, window.innerHeight - MARGIN);
  document.body.appendChild(renderer.domElement);
  return renderer;
};

const handleWindowResize = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const insertBackground = (scene: THREE.Scene) => {
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
};

const insertLighting = (scene: THREE.Scene) => {
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(3, 10, 10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
};

(() => {
  const scene = new THREE.Scene();
  const clock = new THREE.Clock();
  const camera = getCamera();
  const renderer = getRenderer();
  const control = getControl(
    new FirstPersonControl(),
    camera,
    renderer.domElement
  );

  window.addEventListener("load", () => {
    insertBackground(scene);
    insertLighting(scene);

    const components = Object.values(Components).map(
      (Component) => new Component()
    );

    components.map((component) => scene.add(component.object));

    function animate() {
      requestAnimationFrame(animate);
      // components.map((component) => component.animate());
      control.update(clock.getDelta());
      renderer.render(scene, camera);
    }
    animate();
  });

  window.addEventListener("resize", () => {
    handleWindowResize(camera, renderer);
    control.handleResize();
  });
  control.handleResize();
})();
