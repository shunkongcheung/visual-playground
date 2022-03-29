import { Scene } from "three";
import { BaseComponent } from "./BaseComponent";

export const getComponent = <T extends BaseComponent>(
  component: T,
  scene: Scene
) => {
  scene.add(component.object);
  return {
    update: (delta: number) => component.update(delta),
  };
};
