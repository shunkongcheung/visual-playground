import * as THREE from "three";
import { BaseComponent } from "./BaseComponent";

export class Line implements BaseComponent<THREE.Line> {
  private _object: THREE.Line;
  get object() {
    return this._object;
  }

  constructor() {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this._object = new THREE.Line(geometry, material);
  }

  animate() {
    // nothing to do
  }

  render() {
    return this._object;
  }
}
