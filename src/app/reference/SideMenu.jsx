"use client";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

export default function SideMenu({ setOpen }) {
  const router = useRouter();
  return (
    <div className="mt-4 pb-4">
      <Menu
        onClick={(e) => {
          router.push(`/reference/${e.key}`);
          setOpen ? setOpen(false) : null;
        }}
        style={{ width: "100%" }}
        mode="inline"
        items={[
          { type: "divider" },
          {
            key: "base",
            label: "base",
            type: "group",
            children: [
              { key: "base/init", label: "init" },
              { key: "base/animate", label: "animate" },
              { key: "base/controls", label: "controls" },
              { key: "base/color", label: "color" },
              { key: "base/default", label: "Default" },
              { key: "base/destroy", label: "destroy" },
            ],
          },
          { type: "divider" },
          {
            key: "create",
            label: "create (Mesh)",
            type: "group",
            children: [
              { key: "create/object", label: "object" },
              { key: "create/cube", label: "cube / box" },
              // { key: "create/box", label: "box" },
              { key: "create/sphere", label: "sphere" },
              { key: "create/plane", label: "plane" },
              { key: "create/cone", label: "cone" },
              { key: "create/octahedron", label: "octahedron" },
              { key: "create/shape", label: "shape" },
              { key: "create/torus", label: "torus / torusKnot" },
              { key: "create/capsule", label: "capsule / cylinder" },
              { key: "create/circle", label: "circle / ring" },
            ],
          },
          { type: "divider" },
          {
            key: "create/lights",
            label: "create (Lights)",
            type: "group",
            children: [
              { key: "create/ambientLight", label: "ambientLight" },
              { key: "create/directionalLight", label: "directionalLight" },
              { key: "create/pointLight", label: "pointLight" },
            ],
          },
          { type: "divider" },
          {
            key: "create/misc",
            label: "create (Misc)",
            type: "group",
            children: [
              { key: "create/group", label: "group" },
              { key: "create/text", label: "text" },
              { key: "create/textTexture", label: "textTexture" },
              { key: "create/fog", label: "fog" },
            ],
          },
          { type: "divider" },
          {
            key: "helper",
            label: "helper",
            type: "group",
            children: [
              { key: "helper/grid", label: "grid" },
              { key: "helper/axes", label: "axes" },
            ],
          },
          { type: "divider" },
          {
            key: "load",
            label: "load",
            type: "group",
            children: [
              { key: "load/vrm", label: "vrm" },
              { key: "load/gltf", label: "gltf" },
              { key: "load/background", label: "background" },
              { key: "load/texture", label: "texture" },
              { key: "load/cubeTexture", label: "cubeTexture" },
              { key: "load/videoTexture", label: "videoTexture" },
            ],
          },
          { type: "divider" },
          {
            key: "event",
            label: "event",
            type: "group",
            children: [
              { key: "event/mouse", label: "mouse" },
              { key: "event/key", label: "key" },
            ],
          },
          { type: "divider" },
          {
            key: "postprocessing",
            label: "postprocessing",
            type: "group",
            children: [
              { key: "postprocessing/bloom", label: "bloom" },
              { key: "postprocessing/selectedBloom", label: "selectedBloom" },
              { key: "postprocessing/pixel", label: "pixel" },
              { key: "postprocessing/mask", label: "mask" },
              { key: "postprocessing/glitch", label: "glitch" },
              { key: "postprocessing/bokeh", label: "bokeh" },
            ],
          },
          { type: "divider" },
        ]}
      />
    </div>
  );
}
