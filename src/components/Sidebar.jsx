"use client";
import T from "./Lang";
import { Link } from "./BaseKit";
import { usePathname } from "next/navigation";
import { TbWorldCode } from "react-icons/tb";
import { FaTools, FaRunning, FaRobot } from "react-icons/fa";
import { IoBookOutline, IoCubeOutline, IoDownloadOutline } from "react-icons/io5";
import { FaBookBookmark } from "react-icons/fa6";
import { MdOutlineLightbulb, MdMiscellaneousServices, MdOutlineSchool } from "react-icons/md";
import { BsBadgeVr, BsLayers } from "react-icons/bs";
import { LuHandHelping, LuMouse } from "react-icons/lu";
import { FiLayers } from "react-icons/fi";

function ReferenceGroup({
  title,
  icon = null,
  items = {
    href: "",
    label: "",
    update: false,
    deprecated: false,
    nw: false,
  },
}) {
  const pathname = usePathname();
  return (
    <li>
      <h3 className="menu-title flex gap-2 items-center">
        {icon && icon}
        {title}
      </h3>
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
          <FaRunning size={16} color="hotpink" />
          <T>
            <>Getting Started</>
            <>使ってみる</>
          </T>
        </Link>
      </li>
      <li>
        <Link
          href="/getting-started/xr/"
          className={pathname === "/getting-started/xr/" ? "bg-gray-300" : ""}
          onClick={() => {
            document.querySelector("#menuSidebar").checked = false;
          }}
        >
          <BsBadgeVr size={16} color="hotpink" />
          <T>
            <>WebXR Support</>
            <>WebXR対応</>
          </T>
        </Link>
      </li>
      <li>
        <Link
          href="https://e3web-play.web.app"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            document.querySelector("#menuSidebar").checked = false;
          }}
        >
          <TbWorldCode size={16} color="dodgerblue" />
          <T>
            <>Try Online</>
            <>Webで試す</>
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
          <FaBookBookmark size={16} color="orange" />
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
          <MdOutlineSchool size={16} color="purple" />
          <T>
            <>Educational Use Cases</>
            <>教育機関向け</>
          </T>
        </Link>
      </li>
      <li>
        <Link
          href="/tool/"
          className={pathname === "/tool/" ? "bg-gray-300" : ""}
          onClick={() => {
            document.querySelector("#menuSidebar").checked = false;
          }}
        >
          <FaTools size={16} color="gray" />
          <T>
            <>Tool</>
            <>ツール</>
          </T>
        </Link>
      </li>
      <li>
        <Link
          href="/ai/"
          className={pathname === "/ai/" ? "bg-gray-300" : ""}
          onClick={() => {
            document.querySelector("#menuSidebar").checked = false;
          }}
        >
          <FaRobot size={16} color="gray" />
          <T>
            <>AI</>
            <>AIでの利用</>
          </T>
        </Link>
      </li>
      <li></li>
      <li>
        <a>
          <IoBookOutline size={16} color="green" />
          <T>
            <>Reference</>
            <>リファレンス</>
          </T>
        </a>
      </li>
      {/* <ul> */}
      <ReferenceGroup
        title="base"
        icon={<BsLayers size={16} color="green" />}
        items={[
          { href: "/reference/base/init/", label: "init" },
          { href: "/reference/base/animate/", label: "animate" },
          {
            href: "/reference/base/controls/",
            label: "controls",
          },
          {
            href: "/reference/base/fpv/",
            label: "fpv",
          },
          {
            href: "/reference/base/raycaster/",
            label: "raycaster",
            nw: true,
          },
          { href: "/reference/base/color/", label: "color" },
          { href: "/reference/base/xr/", label: "xr", nw: true },
          { href: "/reference/base/default/", label: "Default" },
          { href: "/reference/base/destroy/", label: "destroy" },
        ]}
      />
      <ReferenceGroup
        title="create (Mesh)"
        icon={<IoCubeOutline size={16} color="green" />}
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
        icon={<MdOutlineLightbulb size={16} color="green" />}
        items={[
          { href: "/reference/create/ambientLight/", label: "ambientLight" },
          {
            href: "/reference/create/directionalLight/",
            label: "directionalLight",
          },
          { href: "/reference/create/pointLight/", label: "pointLight" },
          { href: "/reference/create/spotLight/", label: "spotLight" },
          {
            href: "/reference/create/hemisphereLight/",
            label: "hemisphereLight",
          },
          {
            href: "/reference/create/rectAreaLight/",
            label: "rectAreaLight",
          },
        ]}
      />
      <ReferenceGroup
        title="create (Misc)"
        icon={<MdMiscellaneousServices size={16} color="green" />}
        items={[
          { href: "/reference/create/group/", label: "group" },
          { href: "/reference/create/text/", label: "text" },
          {
            href: "/reference/create/textTexture/",
            label: "textTexture",
          },
          { href: "/reference/create/fog/", label: "fog" },
          { href: "/reference/create/sky/", label: "sky" },
          { href: "/reference/create/ocean/", label: "ocean" },
          { href: "/reference/create/water/", label: "water" },
          {
            href: "/reference/create/positionalAudio/",
            label: "positionalAudio",
          },
          {
            href: "/reference/create/instances/",
            label: "instances",
          },
          {
            href: "/reference/create/material/",
            label: "material",
          },
          {
            href: "/reference/create/html/",
            label: "html",
            nw: true,
          },
          {
            href: "/reference/create/canvasTexture/",
            label: "canvasTexture",
            nw: true,
          },
          { href: "/reference/create/canvas/", label: "canvas", nw: true },
        ]}
      />
      <ReferenceGroup
        title="helper"
        icon={<LuHandHelping size={16} color="green" />}
        items={[
          { href: "/reference/helper/grid/", label: "grid" },
          { href: "/reference/helper/axes/", label: "axes" },
        ]}
      />
      <ReferenceGroup
        title="load"
        icon={<IoDownloadOutline size={16} color="green" />}
        items={[
          { href: "/reference/load/vrm/", label: "vrm" },
          { href: "/reference/load/bvh/", label: "bvh", deprecated: true },
          { href: "/reference/load/bvh2/", label: "bvh2" },
          { href: "/reference/load/gltf/", label: "gltf" },
          { href: "/reference/load/background/", label: "background" },
          { href: "/reference/load/texture/", label: "texture" },
          { href: "/reference/load/cubeTexture/", label: "cubeTexture" },
          { href: "/reference/load/videoTexture/", label: "videoTexture" },
        ]}
      />
      <ReferenceGroup
        title="event"
        icon={<LuMouse size={16} color="green" />}
        items={[
          { href: "/reference/event/mouse/", label: "mouse" },
          { href: "/reference/event/key/", label: "key" },
        ]}
      />
      <ReferenceGroup
        title="postprocessing"
        icon={<FiLayers size={16} color="green" />}
        items={[
          { href: "/reference/postprocessing/bloom/", label: "bloom" },
          {
            href: "/reference/postprocessing/selectedBloom/",
            label: "selectedBloom",
          },
          { href: "/reference/postprocessing/pixel/", label: "pixel" },
          { href: "/reference/postprocessing/mask/", label: "mask" },
          { href: "/reference/postprocessing/glitch/", label: "glitch" },
          { href: "/reference/postprocessing/bokeh/", label: "bokeh" },
        ]}
      />
      <ReferenceGroup
        title="tool"
        items={[
          {
            href: "/reference/tool/setPixelRatio/",
            label: "setPixelRatio",
          },
          {
            href: "/reference/tool/distance/",
            label: "distance",
            nw: true,
          },
        ]}
      />
    </ul>
  );
}
