"use client"
import { useEffect, useRef, useState } from "react";
import { init } from "@dist/easy-three.js";

export function Ex1(props) {
  const ref = useRef();
  const containerRef = useRef();
  useEffect(() => {
    const { camera, create, controls, animate, destroy } = init(ref.current);
    camera.position.set(0, 0, 2);
    controls.connect();
    create.ambientLight();
    create.directionalLight();

    const div = document.createElement("div");
    div.style.width = "100px";
    div.style.height = "100px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "space-around";
    div.style.alignItems = "center";
    div.style.backgroundColor = "#aaa";
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "10000px";
    div.innerHTML = "HTML Mesh"
    containerRef.current.appendChild(div);

    create.html(div, {
      scale: [15, 15, 15]
    });

    animate();
    return () => {
      destroy();
    };
  }, []);
  return (
    <div ref={containerRef} className="max-w-full overflow-hidden relative">
      <div ref={ref} {...props}></div>
    </div>
  );
}

export function Ex2(props) {
  const ref = useRef();
  const meshRef = useRef();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const { camera, create, animate, controls, destroy } = init(ref.current);
    camera.position.set(1, 1, 2);
    controls.connect();
    create.ambientLight();
    create.directionalLight();

    create.html(meshRef.current, {
      scale: [15, 15, 15]
    })

    animate(({ delta }) => {
    });
    return () => {
      destroy();
    };
  }, []);
  return (
    <div className="flex flex-wrap gap-4">
      <div ref={ref} {...props}></div>
      <div ref={meshRef}
        style={{
          background: "#aaa",
          border: "1px solid #000",
          height: "160px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div className="text-3xl">{count}</div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setCount(count + 1)
          }}
        >count</button>

      </div>
    </div>
  );
}
