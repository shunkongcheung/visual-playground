import { Object3D } from "three";

export interface BaseComponent<E extends Object3D> {
  animate: () => any;
  render: () => E;
}
