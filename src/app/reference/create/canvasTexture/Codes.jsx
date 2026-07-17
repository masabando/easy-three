"use client";
import { useEffect, useRef } from "react";
import { init } from "@dist/easy-three.js";
import { noto } from "@/app/noto";

export function Ex1(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, THREE, destroy } = init(ref.current);
    camera.position.set(0, 0, 3);

    create.ambientLight();
    create.directionalLight();
    create.sky()

    const texture = create.canvasTexture(
      (ctx) => {
        ctx.fillStyle = "red";
        ctx.fillRect(50, 50, 100, 100);
        ctx.fillStyle = "green";
        ctx.fillRect(100, 100, 100, 100);
        ctx.fillStyle = "blue";
        ctx.fillRect(150, 150, 100, 100);
      },
      {
        size: 300,
      }
    );

    const cube = create.cube({
      size: 1,
      position: [-1, 0, 0],
      option: {
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      },
    });

    const sphere = create.sphere({
      size: 0.7,
      position: [1, 0, 0],
      option: {
        map: texture,
      },
    });

    animate(({ delta }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      sphere.rotation.x += delta;
      sphere.rotation.y += delta * 0.7;
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex2(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, THREE, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();
    create.sky();

    const texture = create.canvasTexture();

    const cube = create.cube({
      size: 1,
      option: {
        transparent: true,
        map: texture,
        side: THREE.DoubleSide,
      },
    });

    const draw = (ctx, canvas, frameCount) => {
      ctx.save();
      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // translate to center
      ctx.translate(canvas.width / 2, canvas.height / 2);
      // draw rainbow circles
      const maxR = Math.ceil(Math.hypot(canvas.width, canvas.height) / 2);
      for (let r = maxR; r > 0; r -= 10) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${(r * 2 - frameCount * 5) % 360}, 100%, 50%, 0.1)`;
        ctx.fill();
      }
      ctx.restore();
    }


    animate(({ delta, frameCount }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      texture.update((ctx, canvas) => draw(ctx, canvas, frameCount));
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}

export function Ex3(props) {
  const ref = useRef();
  useEffect(() => {
    const { camera, create, animate, THREE, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);

    create.ambientLight();
    create.directionalLight();
    create.sky();

    const texture = create.canvasTexture();

    const cube = create.cube({
      size: 1,
      option: {
        transparent: true,
        map: texture,
        side: THREE.DoubleSide,
      },
    });

    const draw1 = (ctx, canvas) => {
      ctx.save();
      // red frame
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(10, 10, canvas.width - 20, canvas.height - 20);
      // text
      ctx.fillStyle = "black";
      ctx.font = "90px Arial"
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("easy-three", canvas.width / 2, canvas.height / 2);
      ctx.restore();
    }

    const draw2 = (ctx, canvas) => {
      ctx.save();
      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // translate to center
      ctx.translate(canvas.width / 2, canvas.height / 2);
      // draw rainbow circles
      const maxR = Math.ceil(Math.hypot(canvas.width, canvas.height) / 2);
      for (let r = maxR; r > 0; r -= 10) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(r * 2) % 360}, 100%, 50%)`;
        ctx.fill();
      }
      ctx.restore();
    }

    texture.update(draw1);

    animate(({ delta, frameCount }) => {
      cube.rotation.x += delta;
      cube.rotation.y += delta;
      switch (true) {
        case frameCount % 180 === 0:
          texture.update(draw1);
          break;
        case frameCount % 90 === 0:
          texture.update(draw2);
          break;
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}