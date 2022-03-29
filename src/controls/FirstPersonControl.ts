import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { BaseControl } from "./BaseControl";

enum MoveDirection {
  Forward,
  Backward,
  Left,
  Right,
  // Up,
  // Down,
}

interface Coord {
  x: number;
  y: number;
}

export class FirstPersonControl implements BaseControl {
  private FORWARD_MOUSE_BTN: Array<number> = []; // 0]; // left button
  private BACKWARD_MOUSE_BTN: Array<number> = []; // 2]; // right button

  private FORWARD_KEYS: Array<string> = ["ArrowUp", "KeyW"];
  private BACKWARD_KEYS: Array<string> = ["ArrowDown", "KeyS"];
  private LEFT_KEYS: Array<string> = ["ArrowLeft", "KeyA"];
  private RIGHT_KEYS: Array<string> = ["ArrowRight", "KeyD"];

  private MOVEMENT_SPEED = 5;
  private HORIZONTAL_ROATE_SPEED = 0.125;
  private VERTICAL_ROTATE_SPEED = 0.125;

  // private UP_KEYS = ['KeyR'];
  // private DOWN_KEYS = ['KeyF'];

  private view: Coord;
  private mouse: Coord;
  private rotate: Coord;

  private isMoving: boolean;
  private moveDirection: MoveDirection;

  constructor() {
    this.view = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.rotate = { x: 0, y: 0 };

    this.isMoving = false;
    this.moveDirection = MoveDirection.Forward;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.FORWARD_KEYS.includes(event.code)) {
      this.moveDirection = MoveDirection.Forward;
      this.isMoving = true;
    } else if (this.BACKWARD_KEYS.includes(event.code)) {
      this.moveDirection = MoveDirection.Backward;
      this.isMoving = true;
    } else if (this.LEFT_KEYS.includes(event.code)) {
      this.moveDirection = MoveDirection.Left;
      this.isMoving = true;
    } else if (this.RIGHT_KEYS.includes(event.code)) {
      this.moveDirection = MoveDirection.Right;
      this.isMoving = true;
    }
    // else if(this.UP_KEYS.includes(event.code)){
    //   this.moveDirection = MoveDirection.Up;
    //   this.isMoving = true;
    // }
    // else if(this.DOWN_KEYS.includes(event.code)){
    //   this.moveDirection = MoveDirection.Down;
    //   this.isMoving = true;
    // }
  }

  handleKeyUp() {
    this.isMoving = false;
  }

  handleResize(element: HTMLElement) {
    this.view = {
      x: element.offsetWidth / 2,
      y: element.offsetHeight / 2,
    };
  }

  handleMouseUp() {
    this.isMoving = false;
  }

  handleMouseMove(event: MouseEvent, element: HTMLElement) {
    this.mouse = {
      x: event.pageX - element.offsetLeft - this.view.x,
      y: event.pageY - element.offsetTop - this.view.y,
    };
  }

  handleMouseDown(event: MouseEvent) {
    const isForward = this.FORWARD_MOUSE_BTN.includes(event.button);
    const isBackward = this.BACKWARD_MOUSE_BTN.includes(event.button);

    this.isMoving = isForward || isBackward;
    if (!this.isMoving) return;

    this.moveDirection = isForward
      ? MoveDirection.Forward
      : MoveDirection.Backward;
  }

  update(camera: PerspectiveCamera, delta: number) {
    const targetPosition = new Vector3();

    const actualMoveSpeed = delta * this.MOVEMENT_SPEED;

    if (this.isMoving && this.moveDirection === MoveDirection.Forward)
      camera.translateZ(-actualMoveSpeed);

    if (this.isMoving && this.moveDirection === MoveDirection.Backward)
      camera.translateZ(actualMoveSpeed);

    if (this.isMoving && this.moveDirection === MoveDirection.Left)
      camera.translateX(-actualMoveSpeed);

    if (this.isMoving && this.moveDirection === MoveDirection.Right)
      camera.translateX(actualMoveSpeed);

    // if (this.isMoving && this.moveDirection === MoveDirection.Up)
    //   camera.translateY( actualMoveSpeed );

    // if (this.isMoving && this.moveDirection === MoveDirection.Down)
    //   camera.translateY( - actualMoveSpeed );

    const actualRotateSpeed = delta * this.HORIZONTAL_ROATE_SPEED;

    this.rotate.x -= this.mouse.x * actualRotateSpeed;
    this.rotate.y -= this.mouse.y * delta * this.VERTICAL_ROTATE_SPEED;
    this.rotate.y = Math.max(-85, Math.min(85, this.rotate.y));

    const phi = MathUtils.degToRad(90 - this.rotate.y);
    const theta = MathUtils.degToRad(this.rotate.x);

    const position = camera.position;
    targetPosition.setFromSphericalCoords(1, phi, theta).add(position);
    console.log(targetPosition);

    camera.lookAt(targetPosition);
  }
}
