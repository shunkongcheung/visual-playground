import * as THREE from "three";
import { BaseComponent } from "./BaseComponent";

export class RotateCube implements BaseComponent {
  object: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.object = new THREE.Mesh(geometry, material);
  }

  update() {
    this.object.rotation.x += 0.01;
    this.object.rotation.y += 0.01;
  }
}
