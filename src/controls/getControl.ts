import { PerspectiveCamera } from "three";
import { BaseControl } from "./BaseControl";

export const getControl = <T extends BaseControl>(
  control: T,
  camera: PerspectiveCamera,
  element: HTMLElement
) => {
  const onKeyup = (evt: KeyboardEvent) => control.handleKeyUp(evt, element);
  const onKeydown = (evt: KeyboardEvent) => control.handleKeyDown(evt, element);

  const onMousedown = (evt: MouseEvent) =>
    control.handleMouseDown(evt, element);
  const onMousemove = (evt: MouseEvent) =>
    control.handleMouseMove(evt, element);
  const onMouseup = (evt: MouseEvent) => control.handleMouseUp(evt, element);

  window.addEventListener("keyup", onKeyup);
  window.addEventListener("keydown", onKeydown);

  element.addEventListener("mousedown", onMousedown);
  element.addEventListener("mousemove", onMousemove);
  element.addEventListener("mouseup", onMouseup);

  return {
    dispose: () => {
      window.removeEventListener("keyup", onKeyup);
      window.removeEventListener("keydown", onKeydown);

      element.removeEventListener("mousedown", onMousedown);
      element.removeEventListener("mousemove", onMousemove);
      element.removeEventListener("mouseup", onMouseup);
    },
    handleResize: () => control.handleResize(element),
    update: (delta: number) => control.update(camera, delta),
  };
};
