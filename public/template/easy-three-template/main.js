import { init } from "@masabando/easy-three";
const { camera, create, animate, controls } = init();

controls.connect()
camera.position.set(-2, 2, 2)
create.ambientLight()
create.directionalLight()
create.cube()

animate(({ delta, time }) => {

})
