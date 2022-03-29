import * as THREE from "three";

export interface BaseControl {
  handleKeyDown: (event: KeyboardEvent, element: HTMLElement) => any;
  handleKeyUp: (event: KeyboardEvent, element: HTMLElement) => any;
  handleMouseDown: (event: MouseEvent, element: HTMLElement) => any;
  handleMouseMove: (event: MouseEvent, element: HTMLElement) => any;
  handleMouseUp: (event: MouseEvent, element: HTMLElement) => any;
  handleResize: (element: HTMLElement) => any;
  update: (camera: THREE.PerspectiveCamera, delta: number) => any;
}
