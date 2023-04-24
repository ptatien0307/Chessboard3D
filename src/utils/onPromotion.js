import { gsap } from "../../node_modules/gsap/all.js";
import * as THREE from "../../node_modules/three/build/three.module.js";
import loadPiece from "../LoadPiece.js";

export default async function onPromotion(world, color) {
    let promotion = document.querySelector("#promotion");
    promotion.style.display = "flex";

    // Move camera
    gsap.to(world.camera.position, {
        x: 6.5,
        y: 10,
        z: 20,
        duration: 0.5,
        onUpdate: () => {
            world.controls.target = new THREE.Vector3(6.5, 10, 10);
        },
    });

    let pos = 0.5;
    for (let i of [2, 3, 4, 5]) {
        if (color === "white") {
            var piece = await loadPiece(i, 0);
        } else {
            var piece = await loadPiece(i, 14);
        }
        piece.name = "promotion";
        piece.position.set(pos, 10, 10);
        piece.userData.currPos = [pos, 10, 10];
        piece.userData.origPos = [10, 10, 10];
        piece.userData.isAlive = true;
        world.scene.children[3].add(piece);
        pos += 4;
    }
}
