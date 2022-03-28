import { Object3D } from "three";

export interface BaseComponent {
  animate: () => any;
  render: () => Object3D;
}
