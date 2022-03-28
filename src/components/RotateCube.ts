import * as THREE from "three";
import { BaseComponent } from "./BaseComponent";

export class RotateCube implements BaseComponent<THREE.Mesh> {
  private cube: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
  }

  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }

  render() {
    return this.cube;
  }
}
