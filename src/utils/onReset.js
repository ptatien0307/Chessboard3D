import { gsap } from "../../node_modules/gsap/all.js";

export default function onReset(world, game) {
    for (const piece of game.board.children) {
        if (piece.name != "grid" && piece.name != "") {
            console.log(piece);
            gsap.to(piece.position, {
                x: piece.userData.origPos[0],
                y: piece.userData.origPos[1],
                z: piece.userData.origPos[2],
                duration: 0.5,
            });

            piece.userData.currPos = [piece.userData.origPos[0], piece.userData.origPos[1], piece.userData.origPos[2]];
            piece.userData.isFirstMove = true;
            piece.userData.isAlive = true;
        }
    }
    do {
        var selectedObject = world.scene.children[5].getObjectByName("Pawn_Promotion");
        world.scene.children[5].remove(selectedObject);
    } while (selectedObject !== undefined);
}
