![version](https://img.shields.io/github/v/tag/masabando/easy-three?style=flat&label=version)  
![last-commit](https://img.shields.io/github/last-commit/masabando/easy-three?style=flat)
![page-build-status](https://img.shields.io/github/actions/workflow/status/masabando/easy-three/nextjs.yml?style=flat)

![hits](https://img.shields.io/jsdelivr/gh/hm/masabando/easy-three?style=flat)
![npm](https://img.shields.io/npm/dm/%40masabando%2Feasy-three?style=flat&logo=npm)  
![license](https://img.shields.io/github/license/masabando/easy-three?style=flat)
![stars](https://img.shields.io/github/stars/masabando/easy-three?style=flat&logo=github)

# easy-three

[&#x1f389; Documentation](https://masabando.github.io/easy-three/)

Create stunning 3D with simple code.

## Three.js made simple
Three.js's powerful features, simplified for beginners.  
easy-three supports everything from creating objects to animations and lighting setups.

## No Installation Required
No special software or configuration is required. You can start right away with just a browser.  
It can also be used in environments where software installation is restricted, such as schools.

※ A server is required when loading resources such as images.

## Simple Code
You can create 3D objects with short code.  
Animations can also be set up easily.

```js
const { camera, create, animate } = init()
camera.position.set(1, 1, 1)
create.ambientLight()
create.directionalLight()
const cube = create.cube({ rounded: true, segments: 7 })
animate(({ time }) => {
  cube.rotation.x = time
  cube.rotation.y = time
})
```

## Quick and Easy Model Setup
Displaying models like VRM is simple ( internally uses three-vrm).  
Mouse-based camera operation is also easy.

## Can also be used with React
You can also use it directly with React.  
Perfect for adding a touch of 3D to your web page.

```js
const Simple = (props) => {
  const ref = useRef()
  useEffect(() => {
    const { camera, create, animate, destroy } = init(ref.current)
    camera.position.set(5, 5, 5);
    create.ambientLight()
    create.directionalLight()
    const cube = create.cube({ size: 3 })
    animate(({ time }) => {
      cube.rotation.x = time
      cube.rotation.y = time
    })
    return () => {
      destroy()
    }
  }, [])
  return (
    <div ref={ref} {...props}></div>
  )
}
```

# How to Use

See [Getting Started](https://masabando.github.io/easy-three/getting-started/)


## Using npm

```bash
npm install @masabando/easy-three three @pixiv/three-vrm
```

```js
import { init } from "@masabando/easy-three";
const { camera, create, animate, controls } = init();
```

### React
```js
import { init } from "@masabando/easy-three";
import EasyThreeContainer from "@masabando/easy-three/react/EasyThreeContainer";

const Sample() = {
  return (
    <EasyThreeContainer
      code={(r) => {
        const { camera, create, animate, destroy } = init(r);

        camera.position.set(5, 5, 5);
        create.ambientLight();
        create.directionalLight();

        const cube = create.cube({ size: 3 });

        animate(({ time }) => {
          cube.rotation.x = time;
          cube.rotation.y = time;
        });

        return { destroy };
      }}
     />
  )
}
```
Function `destroy` is used to clean up the scene when the component is unmounted.

If you want to use toggleControls for camera control, you can use it like this.
```js
import { init } from "@masabando/easy-three";
import EasyThreeContainer from "@masabando/easy-three/react/EasyThreeContainer";

const Sample() = {
  return (
    <EasyThreeContainer
      toggleControls
      code={(r) => {
        const { camera, create, controls, animate, destroy } = init(r);

        camera.position.set(5, 5, 5);
        create.ambientLight();
        create.directionalLight();

        const cube = create.cube({ size: 3 });

        animate(({ time }) => {
          cube.rotation.x = time;
          cube.rotation.y = time;
        });

        return { destroy, controls };
      }}
     />
  )
}
```


## Using CDN

You can use easy-three without downloading by using a CDN.
Importmap settings are also required.
```html
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/",
      "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
      "easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.32/dist/easy-three.js"
    }
  }
</script>
```

```js
import { init } from "easy-three";
```

## template
```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>easy-three template</title>
  <script type="importmap">
    {
      "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
        "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/",
        "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3/lib/three-vrm.module.min.js",
        "easy-three": "https://cdn.jsdelivr.net/gh/masabando/easy-three@0.0.32/dist/easy-three.js"
      }
    }
  </script>
</head>

<body>
  <script type="module">
    import { init } from "easy-three";
    const { camera, create, animate, controls } = init();

    controls.connect()
    camera.position.set(-2, 2, 2)
    create.ambientLight()
    create.directionalLight()
    create.cube()

    animate()
  </script>
</body>

</html>
```