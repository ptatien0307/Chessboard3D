import { gsap } from "../../node_modules/gsap/all.js";

export default function onChangeCamera(event, world) {
    switch (event.key) {
        case "1":
            gsap.to(world.camera.position, {
                x: 6.5,
                y: 10,
                z: 20,
                duration: 1,
            });
            break;
        case "2":
            gsap.to(world.camera.position, {
                x: 20,
                y: 10,
                z: 6.5,
                duration: 1,
            });
            break;
        case "3":
            gsap.to(world.camera.position, {
                x: 6.5,
                y: 10,
                z: -6.5,
            });
            break;
        case "4":
            gsap.to(world.camera.position, {
                x: -7,
                y: 10,
                z: 6.5,
                duration: 1,
            });
            break;
    }
}
