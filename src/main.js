import * as THREE from "../node_modules/three/build/three.module.js";

import Scene from "./Scene.js";
import ChessBoard from "./ChessBoard.js";
import onChangeCamera from "./utils/onChangeCamera.js";
import onReset from "./utils/onReset.js";
import onClick from "./utils/onClick.js";

// Init world
const world = new Scene();
world.initScene();

// Init chessboard
const game = new ChessBoard();
world.scene.add(game.board);

// Init mouse and raycaster
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
raycaster._selectedMesh = null;
raycaster._prevPieceName = null;

raycaster._prevPiece = null;
// Select piece to move
window.addEventListener("click", (event) => {
    onClick(event, world, mouse, raycaster, game);
});

// Change camera position
window.addEventListener("keydown", (event) => {
    onChangeCamera(event, world);
});

// Reset chessboard, move all piece to its original position
let resetbtn = document.querySelector("#reset");
resetbtn.addEventListener("click", () => {
    onReset(world, game);
});

const animate = () => {
    requestAnimationFrame(animate);
    world.render();
    world.controls.update();
};
animate();