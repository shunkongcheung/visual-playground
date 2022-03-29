import { Object3D } from "three";

export interface BaseComponent {
  object: Object3D;
  update: (delta: number) => any;
}
