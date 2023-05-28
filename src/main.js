import * as THREE from "../node_modules/three/build/three.module.js";
import Scene from "./Scene.js";
import ChessBoard from "./ChessBoard.js";
import onChangeCamera from "./utils/onChangeCamera.js";
import onReset from "./utils/onReset.js";
import onClick from "./utils/onClick.js";
import onChangeBackground from "./utils/onChangeBackground.js";
import { RGBELoader } from "../../node_modules/three/examples/jsm/loaders/RGBELoader.js";

// Init world
const world = new Scene();
world.initScene();

// Init chessboard
const game = new ChessBoard();
const chessGroup = new THREE.Group();
world.scene.add(game.board);

// Init mouse and raycaster
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
raycaster._selectedMesh = null;
raycaster._prevPieceName = null;
raycaster._prevPiece = null;

let flagChangeCamera = [true];

// Select piece to move
window.addEventListener("click", (event) => {
    onClick(event, world, mouse, raycaster, flagChangeCamera);
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

// Change scene background
let backgroundBtn2 = document.querySelector("#background2");
backgroundBtn2.addEventListener("click", () => {
    new RGBELoader().load("../../models/background/blocky_photo_studio_2k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        world.scene.background = texture;
        world.scene.environment = texture;
    });
});
let backgroundBtn3 = document.querySelector("#background3");
backgroundBtn3.addEventListener("click", () => {
    new RGBELoader().load("../../models/background/brown_photostudio_05_2k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        world.scene.background = texture;
        world.scene.environment = texture;
    });
});
let backgroundBtn4 = document.querySelector("#background4");
backgroundBtn4.addEventListener("click", () => {
    new RGBELoader().load("../../models/background/scythian_tombs_2_2k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        world.scene.background = texture;
        world.scene.environment = texture;
    });
});
let backgroundBtn5 = document.querySelector("#background5");
backgroundBtn5.addEventListener("click", () => {
    new RGBELoader().load("../../models/background/sunflowers_puresky_2k.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        world.scene.background = texture;
        world.scene.environment = texture;
    });
});
let backgroundBtn1 = document.querySelector("#background1");
backgroundBtn1.addEventListener("click", () => {
    world.scene.background = null;
    world.scene.environment = null;
});

// Instruction
let menu = document.querySelector("#menu");
menu.addEventListener("click", () => {
    const menu_items = document.querySelector("#menu-items");
    const icon = document.querySelector("#icon");
    if (menu_items.style.display === "flex") {
        menu_items.style.display = "none";
        icon.style.transform = "rotate(0deg)";
    } else {
        icon.style.transform = "rotate(90deg)";
        menu_items.style.display = "flex";
    }
});

const animate = () => {
    requestAnimationFrame(animate);
    world.render();
    world.controls.update();
};
animate();
