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

    const plane1 = create.canvas(
      (ctx) => {
        ctx.fillStyle = "red";
        ctx.fillRect(50, 50, 100, 100);
        ctx.fillStyle = "green";
        ctx.fillRect(100, 100, 100, 100);
        ctx.fillStyle = "blue";
        ctx.fillRect(150, 150, 100, 100);
      },
      {
        size: 1,
        resolution: 300,
        position: [-1, 0, 0],
      }
    );

    const plane2 = create.canvas(
      (ctx) => {
        ctx.fillStyle = "red";
        ctx.fillRect(50, 50, 100, 100);
        ctx.fillStyle = "green";
        ctx.fillRect(100, 100, 100, 100);
        ctx.fillStyle = "blue";
        ctx.fillRect(150, 150, 100, 100);
      },
      {
        size: 1,
        resolution: 300,
        transparent: false,
        position: [1, 0, 0],
      }
    );

    animate(({ delta }) => {
      plane1.rotation.x += delta;
      plane1.rotation.y += delta;
      plane2.rotation.x += delta;
      plane2.rotation.y += delta;
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

    const plane = create.canvas();

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
      plane.rotation.x += delta;
      plane.rotation.y += delta;
      plane.update((ctx, canvas) => draw(ctx, canvas, frameCount));
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
    camera.position.set(0, 0, 1.5);

    create.ambientLight();
    create.directionalLight();
    create.sky();

    const plane = create.canvas();

    const draw1 = (ctx, canvas) => {
      ctx.save();
      // red frame
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(2, 2, canvas.width - 4, canvas.height - 4);
      // text
      ctx.fillStyle = "black";
      ctx.font = "18px Arial"
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
      for (let r = maxR; r > 0; r -= 2) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(r * 2) % 360}, 100%, 50%)`;
        ctx.fill();
      }
      ctx.restore();
    }

    plane.update(draw1);

    animate(({ delta, frameCount }) => {
      plane.rotation.x += delta;
      plane.rotation.y += delta;
      switch (true) {
        case frameCount % 180 === 0:
          plane.update(draw1);
          break;
        case frameCount % 90 === 0:
          plane.update(draw2);
          break;
      }
    });
    return () => {
      destroy();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
}