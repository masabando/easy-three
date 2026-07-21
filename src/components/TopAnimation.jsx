"use client";
import T from "./Lang";
import { useState } from "react";
import { DemoWorld } from "@/components/home/Demo";

export default function TopAnimation() {
  const [worldControl, setWorldControl] = useState(false);
  return (
    <div className="py-0 max-w-full flex flex-column justify-center items-center">
      <div className="relative max-w-full">
        <label className="label text-xs absolute top-2 right-2 z-10 bg-white/60 p-1 rounded font-medium">
          <T>
            <>Touch Control</>
            <>タッチ操作</>
          </T>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            defaultChecked={worldControl}
            onChange={(e) => setWorldControl(e.target.checked)}
          />
        </label>
        <DemoWorld
          worldControl={worldControl}
          style={{
            width: "600px",
            aspectRatio: "6 / 4",
            maxWidth: "100%",
            position: "relative",
          }}
        />
      </div>
    </div>

  )
}