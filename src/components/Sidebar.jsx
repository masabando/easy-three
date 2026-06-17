"use client"
import T from "./Lang";
import { Link } from "./BaseKit";
import { usePathname } from "next/navigation";

function ReferenceGroup({
  title,
  items = {
    href: "",
    label: "",
    update: false,
    deprecated: false,
    nw: false,
  }
}) {
  const pathname = usePathname();
  return (
    <li>
      <h3 className="menu-title">{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <Link
              className={pathname === item.href ? "bg-gray-300" : ""}
              href={item.href}
              onClick={() => {
                document.querySelector("#menuSidebar").checked = false;
              }}
            >
              {item.label}
              {item.update && (
                <span className="badge badge-outline badge-accent badge-sm">
                  Update
                </span>
              )}
              {item.deprecated && (
                <span className="badge badge-outline badge-error badge-sm">
                  Deprecated
                </span>
              )}
              {item.nw && (
                <span className="badge badge-outline badge-info badge-sm">
                  New
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <ul className="menu bg-white w-56 min-h-full p-0 pt-24 pb-30">
      <li>
        <Link
          href="/getting-started/"
          className={pathname === "/getting-started/" ? "bg-gray-300" : ""}
          onClick={() => {
            document.querySelector("#menuSidebar").checked = false;
          }}
        >
          <T>
            <>Getting Started</>
            <>使ってみる</>
          </T>
        </Link>
      </li>
      <li>
        <Link
          href="/examples/"
          className={pathname === "/examples/" ? "bg-gray-300" : ""}
          onClick={() => {
            document.querySelector("#menuSidebar").checked = false;
          }}
        >
          <T>
            <>Examples</>
            <>使い方の例</>
          </T>
        </Link>
      </li>
      <li>
        <Link
          href="/classroom/"
          className={pathname === "/classroom/" ? "bg-gray-300" : ""}
          onClick={() => {
            document.querySelector("#menuSidebar").checked = false;
          }}
        >
          <T>
            <>Educational Use Cases</>
            <>教育機関向け</>
          </T>
        </Link>
      </li>
      <li></li>
      <li>
        <a>
          <T>
            <>Reference</>
            <>リファレンス</>
          </T>
        </a>
      </li>
        {/* <ul> */}
          <ReferenceGroup
            title="base"
            items={[
              { href: "/reference/base/init/", label: "init" },
              { href: "/reference/base/animate/", label: "animate" },
              { href: "/reference/base/controls/", label: "controls", update: true },
              { href: "/reference/base/color/", label: "color" },
              { href: "/reference/base/default/", label: "Default" },
              { href: "/reference/base/destroy/", label: "destroy" },
            ]}
          />
          <ReferenceGroup
            title="create (Mesh)"
            items={[
              { href: "/reference/create/object/", label: "object" },
              { href: "/reference/create/cube/", label: "cube/box" },
              { href: "/reference/create/sphere/", label: "sphere" },
              { href: "/reference/create/plane/", label: "plane" },
              { href: "/reference/create/cone/", label: "cone" },
              { href: "/reference/create/octahedron/", label: "octahedron" },
              { href: "/reference/create/shape/", label: "shape" },
              { href: "/reference/create/torus/", label: "torus / torusKnot" },
              { href: "/reference/create/capsule/", label: "capsule / cylinder" },
              { href: "/reference/create/circle/", label: "circle / ring" },
            ]}
          />
          <ReferenceGroup
            title="create (Lights)"
            items={[
              { href: "/reference/create/ambientLight/", label: "ambientLight" },
              { href: "/reference/create/directionalLight/", label: "directionalLight" },
              { href: "/reference/create/pointLight/", label: "pointLight" },
              { href: "/reference/create/spotLight/", label: "spotLight" },
              { href: "/reference/create/hemisphereLight/", label: "hemisphereLight" },
              { href: "/reference/create/rectAreaLight/", label: "rectAreaLight", nw: true },
            ]}
          />
          <ReferenceGroup
            title="create (Misc)"
            items={[
              { href: "/reference/create/group/", label: "group" },
              { href: "/reference/create/text/", label: "text" },
              { href: "/reference/create/textTexture/", label: "textTexture" },
              { href: "/reference/create/fog/", label: "fog" },
              { href: "/reference/create/sky/", label: "sky", nw: true },
              { href: "/reference/create/ocean/", label: "ocean", nw: true },
              { href: "/reference/create/water/", label: "water", nw: true },
              { href: "/reference/create/positionalAudio/", label: "positionalAudio", nw: true },
            ]}
          />
          <ReferenceGroup
            title="helper"
            items={[
              { href: "/reference/helper/grid/", label: "grid" },
              { href: "/reference/helper/axes/", label: "axes" },
            ]}
          />
          <ReferenceGroup
            title="load"
            items={[
              { href: "/reference/load/vrm/", label: "vrm", update: true },
              { href: "/reference/load/bvh/", label: "bvh", deprecated: true },
              { href: "/reference/load/bvh2/", label: "bvh2", nw: true },
              { href: "/reference/load/gltf/", label: "gltf" },
              { href: "/reference/load/background/", label: "background" },
              { href: "/reference/load/texture/", label: "texture" },
              { href: "/reference/load/cubeTexture/", label: "cubeTexture" },
              { href: "/reference/load/videoTexture/", label: "videoTexture" },
            ]}
          />
          <ReferenceGroup
            title="event"
            items={[
              { href: "/reference/event/mouse/", label: "mouse" },
              { href: "/reference/event/key/", label: "key" },
            ]}
          />
          <ReferenceGroup
            title="postprocessing"
            items={[
              { href: "/reference/postprocessing/bloom/", label: "bloom" },
              { href: "/reference/postprocessing/selectedBloom/", label: "selectedBloom" },
              { href: "/reference/postprocessing/pixel/", label: "pixel" },
              { href: "/reference/postprocessing/mask/", label: "mask" },
              { href: "/reference/postprocessing/glitch/", label: "glitch" },
              { href: "/reference/postprocessing/bokeh/", label: "bokeh" },
            ]}
          />
        {/* </ul> */}
      {/* </li> */}
    </ul>
  );
}