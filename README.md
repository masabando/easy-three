![easy-three-badge](https://data.jsdelivr.com/v1/package/gh/masabando/easy-three/badge)

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

