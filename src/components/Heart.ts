import * as THREE from "three";
import { BaseComponent } from "./BaseComponent";

export class Heart implements BaseComponent {
  object: THREE.Mesh;

  constructor() {
    const heartShape = new THREE.Shape();
    const SCALE = 0.5;

    heartShape.bezierCurveTo(
      25 * SCALE,
      25 * SCALE,
      20 * SCALE,
      0 * SCALE,
      0 * SCALE,
      0 * SCALE
    );
    heartShape.bezierCurveTo(
      -30 * SCALE,
      0 * SCALE,
      -30 * SCALE,
      35 * SCALE,
      -30 * SCALE,
      35 * SCALE
    );
    heartShape.bezierCurveTo(
      -30 * SCALE,
      55 * SCALE,
      -10 * SCALE,
      77 * SCALE,
      25 * SCALE,
      95 * SCALE
    );
    heartShape.bezierCurveTo(
      60 * SCALE,
      77 * SCALE,
      80 * SCALE,
      55 * SCALE,
      80 * SCALE,
      35 * SCALE
    );
    heartShape.bezierCurveTo(
      80 * SCALE,
      35 * SCALE,
      80 * SCALE,
      0 * SCALE,
      50 * SCALE,
      0 * SCALE
    );
    heartShape.bezierCurveTo(
      35,
      0 * SCALE,
      25 * SCALE,
      25 * SCALE,
      25 * SCALE,
      25 * SCALE
    );

    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    this.object = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
  }

  update() {
    this.object.rotation.y += 0.01;
  }
}
