import { gsap } from "../../node_modules/gsap/all.js";
import * as THREE from "../../node_modules/three/build/three.module.js";
import loadPiece from "../LoadPiece.js";

export default async function onPromotion(world, color) {
    // Move camera
    gsap.to(world.camera.position, {
        x: 20,
        y: 10,
        z: 20,
        duration: 0.5,
    });
    for (let i of [2, 3, 4, 5]) {
        if (color === "white") {
            var piece = await loadPiece(i, 0);
        } else {
            var piece = await loadPiece(i, 14);
        }
        piece.name = "promotion";
        piece.position.set(i * 5, 10, 10);
        piece.userData.currPos = [i * 5, 10, 10];
        piece.userData.origPos = [10, 10, 10];
        piece.userData.isAlive = true;
        world.scene.children[3].add(piece);
    }
}
