import * as THREE from "three";
import { BaseComponent } from "./BaseComponent";

export class RotateCube implements BaseComponent<THREE.Mesh> {
  private _object: THREE.Mesh;
  get object() {
    return this._object;
  }

  constructor() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this._object = new THREE.Mesh(geometry, material);
  }

  animate() {
    this._object.rotation.x += 0.01;
    this._object.rotation.y += 0.01;
  }

  render() {
    return this._object;
  }
}
