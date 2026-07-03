const fpv = ({ camera, THREE, domElement, controls }) => {
  const property = {
    isMoving: false,
    height: 1.6,
    speed: 5,
    viewSpeed: 0.4,
    arrowDown: false,
    wasdDown: false,
    lastTouch: {
      x: 0,
      y: 0,
    },
    position: {
      x: 0,
      z: 0,
    },
    viewAngle: {
      theta: 0,
      phi: Math.PI / 2,
    },
    movement: {
      x: 0,
      y: 0,
    },
    mouseDownMove: false,
    trigger: {
      touch: false,
      mouse: false,
      arrow: false,
      wasd: false,
    },
    pressed: {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
      mouse: false,
      touch: false,
    },
    isActive: false,
  };

  function fpvStartFunction() {
    property.isMoving = true;
    property.pressed.mouse = true;
  }
  function fpvEndFunction() {
    property.isMoving = false;
    property.pressed.mouse = false;
  }
  function fpvMouseMoveFunction(e) {
    if (property.isMoving && property.trigger.mouse) {
      property.movement.x += e.movementX || e.mozMovementX || e.webkitMovementX || 0;
      property.movement.y += e.movementY || e.mozMovementY || e.webkitMovementY || 0;
    }
  }
  function fpvTouchStartFunction(e) {
    property.isMoving = true;
    property.pressed.touch = true;
    property.lastTouch.x = e.touches[0].clientX;
    property.lastTouch.y = e.touches[0].clientY;
  }
  function fpvTouchEndFunction(e) {
    property.isMoving = false;
    property.pressed.touch = false;
  }
  function fpvTouchMoveFunction(e) {
    if (property.isMoving && property.trigger.touch) {
      const deltaX = e.touches[0].clientX - property.lastTouch.x;
      const deltaY = e.touches[0].clientY - property.lastTouch.y;
      property.movement.x += deltaX;
      property.movement.y += deltaY;
      property.lastTouch.x = e.touches[0].clientX;
      property.lastTouch.y = e.touches[0].clientY;
      e.preventDefault();
    }
  }
  function fpvArrowDownFunction(e) {
    if (property.trigger.arrow) {
      switch (e.key) {
        case "ArrowUp":
          property.pressed.ArrowUp = true;
          property.isMoving = true;
          e.preventDefault();
          break;
        case "ArrowDown":
          property.pressed.ArrowDown = true;
          property.isMoving = true;
          e.preventDefault();
          break;
        case "ArrowLeft":
          property.pressed.ArrowLeft = true;
          property.isMoving = true;
          e.preventDefault();
          break;
        case "ArrowRight":
          property.pressed.ArrowRight = true;
          property.isMoving = true;
          e.preventDefault();
          break;
      }
    }
  }
  function fpvArrowUpFunction(e) {
    if (property.trigger.arrow) {
      switch (e.key) {
        case "ArrowUp":
          property.pressed.ArrowUp = false;
          break;
        case "ArrowDown":
          property.pressed.ArrowDown = false;
          break;
        case "ArrowLeft":
          property.pressed.ArrowLeft = false;
          break;
        case "ArrowRight":
          property.pressed.ArrowRight = false;
          break;
      }
      if (
        !property.pressed.ArrowUp &&
        !property.pressed.ArrowDown &&
        !property.pressed.ArrowLeft &&
        !property.pressed.ArrowRight
      ) {
        property.isMoving = false;
      }
    }
  }
  function fpvWASDDownFunction(e) {
    if (property.trigger.wasd) {
      switch (e.key) {
        case "w":
          property.pressed.KeyW = true;
          property.isMoving = true;
          break;
        case "a":
          property.pressed.KeyA = true;
          property.isMoving = true;
          break;
        case "s":
          property.pressed.KeyS = true;
          property.isMoving = true;
          break;
        case "d":
          property.pressed.KeyD = true;
          property.isMoving = true;
          break;
      }
    }
  }
  function fpvWASDUpFunction(e) {
    if (property.trigger.wasd) {
      switch (e.key) {
        case "w":
          property.pressed.KeyW = false;
          break;
        case "a":
          property.pressed.KeyA = false;
          break;
        case "s":
          property.pressed.KeyS = false;
          break;
        case "d":
          property.pressed.KeyD = false;
          break;
      }
      if (
        !property.pressed.KeyW &&
        !property.pressed.KeyA &&
        !property.pressed.KeyS &&
        !property.pressed.KeyD
      ) {
        property.isMoving = false;
      }
    }
  }

  return {

    height: {
      set: (height) => {
        camera.position.y = height;
        property.height = height;
      }
    },
    position: {
      set: (x, z) => {
        property.position.x = x;
        property.position.z = z;
        camera.position.x = x;
        camera.position.z = z;
      }
    },
    speed: {
      set: (speed) => {
        property.speed = speed;
      }
    },
    viewSpeed: {
      set: (viewSpeed) => {
        property.viewSpeed = viewSpeed;
      }
    },

    update: (delta) => {
      if (property.isMoving) {
        let pm = 1;
        let lr = -1;
        property.viewAngle.theta -= property.movement.y * property.viewSpeed * delta;
        property.viewAngle.phi += property.movement.x * property.viewSpeed * delta;
        property.movement.x = 0;
        property.movement.y = 0;
        if (property.pressed.ArrowDown || property.pressed.KeyS) {
          pm = -1;
        }
        if (property.pressed.ArrowUp || property.pressed.ArrowDown || property.pressed.KeyW || property.pressed.KeyS || (property.pressed.mouse && property.mouseDownMove) || property.pressed.touch) {
          property.position.x += pm * Math.cos(property.viewAngle.phi) * property.speed * delta;
          property.position.z += pm * Math.sin(property.viewAngle.phi) * property.speed * delta;
        }
        if (property.pressed.ArrowLeft || property.pressed.KeyA) {
          lr = 1;
        }
        if (property.pressed.ArrowLeft || property.pressed.KeyA || property.pressed.ArrowRight || property.pressed.KeyD) {
          property.position.x += lr * Math.sin(property.viewAngle.phi) * property.speed * delta;
          property.position.z -= lr * Math.cos(property.viewAngle.phi) * property.speed * delta;
        }
      }
      camera.position.set(property.position.x, property.height, property.position.z);
      controls.target.set(
        property.position.x + Math.cos(property.viewAngle.theta) * Math.cos(property.viewAngle.phi),
        property.height + Math.sin(property.viewAngle.theta),
        property.position.z + Math.cos(property.viewAngle.theta) * Math.sin(property.viewAngle.phi)
      );
    },

    connect: ({
      mouse = true,
      mouseDownMove = false,
      arrow = true,
      wasd = true,
      touch = true,
      height = null,
      speed = null,
      viewSpeed = null,
      position = null
    } = {}) => {
      if (height !== null) property.height = height;
      if (speed !== null) property.speed = speed;
      if (mouseDownMove !== null) property.mouseDownMove = mouseDownMove;
      if (viewSpeed !== null) property.viewSpeed = viewSpeed;
      if (position !== null) {
        property.position.x = position[0];
        property.position.z = position[1];
      }
      property.trigger.mouse = mouse;
      property.trigger.arrow = arrow;
      property.trigger.wasd = wasd;
      property.trigger.touch = touch;
      property.isActive = true;
      camera.position.set(property.position.x, property.height, property.position.z);

      if (mouse) {
        domElement.addEventListener("mousedown", fpvStartFunction);
        domElement.addEventListener("mouseup", fpvEndFunction);
        domElement.addEventListener("mousemove", fpvMouseMoveFunction);
        domElement.addEventListener("mouseleave", fpvEndFunction);
      }
      if (arrow) {
        window.addEventListener("keydown", fpvArrowDownFunction);
        window.addEventListener("keyup", fpvArrowUpFunction);
      }
      if (wasd) {
        window.addEventListener("keydown", fpvWASDDownFunction);
        window.addEventListener("keyup", fpvWASDUpFunction);
      }
      if (touch) {
        domElement.addEventListener("touchstart", fpvTouchStartFunction);
        domElement.addEventListener("touchend", fpvTouchEndFunction);
        domElement.addEventListener("touchmove", fpvTouchMoveFunction, { passive: false });
      }
    },
    disconnect: () => {
      property.isActive = false;
      if (property.trigger.mouse) {
        domElement.removeEventListener("mousedown", fpvStartFunction);
        domElement.removeEventListener("mouseup", fpvEndFunction);
        domElement.removeEventListener("mousemove", fpvMouseMoveFunction);
        domElement.removeEventListener("mouseleave", fpvEndFunction);
      }
      if (property.trigger.touch) {
        domElement.removeEventListener("touchstart", fpvStartFunction);
        domElement.removeEventListener("touchend", fpvEndFunction);
        domElement.removeEventListener("touchmove", fpvTouchMoveFunction);
      }
      if (property.trigger.arrow) {
        window.removeEventListener("keydown", fpvArrowDownFunction);
        window.removeEventListener("keyup", fpvArrowUpFunction);
      }
      if (property.trigger.wasd) {
        window.removeEventListener("keydown", fpvWASDDownFunction);
        window.removeEventListener("keyup", fpvWASDUpFunction);
      }
    },
    isActive: () => {
      return property.isActive;
    }
  }
}

export default fpv
