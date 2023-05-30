import { gsap } from "../../node_modules/gsap/all.js";
import * as THREE from "../../node_modules/three/build/three.module.js";
import onPromotion from "./onPromotion.js";

let _validMoves = [];

// Shpere to show valid move
const sphere_path = new THREE.Mesh(new THREE.SphereGeometry(0.25, 64, 32), new THREE.MeshBasicMaterial({ color: 0xf8d110 }));
sphere_path.name = "path";

// Shpere to show whether can it enemy piece
const sphere_enemy = new THREE.Mesh(new THREE.SphereGeometry(0.25, 64, 32), new THREE.MeshBasicMaterial({ color: 0x7c501a }));
sphere_enemy.name = "path";

function isBlocked(world, enemyColor, x_path, z_path) {
    let flag_end = true;
    let flag_end_enemy = false;
    for (let k = 144; k <= world.scene.children[5].children.length - 1; k++) {
        let temp_piece = world.scene.children[5].children[k];

        let [x_piece, y_piece, z_piece] = temp_piece.userData.currPos;

        let color = temp_piece.userData.color;

        if (x_path == x_piece && z_path === z_piece) {
            flag_end = false;
            if (enemyColor) {
                if (color === enemyColor) flag_end_enemy = true;
            }
            break;
        }
    }
    return [flag_end, flag_end_enemy];
}

function pawnValidMoves(world, raycaster) {
    let validMoves = [];

    // Check if it is first move - pawn can move 2 steps
    if (raycaster._selectedMesh.userData.isFirstMove) {
        let [x, y, z] = raycaster._selectedMesh.userData.origPos;

        if (raycaster._selectedMesh.userData.color == "black") {
            // Check kill move
            for (let i of [
                [x + 2, z - 2],
                [x - 2, z - 2],
            ]) {
                let x_path = i[0];
                let z_path = i[1];
                if (x_path > 14 || z_path < 0 || x_path < 0) continue;
                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);

                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                }
            }

            for (let i = 2; i <= 4; i += 2) {
                let x_path = x;
                let z_path = z - i;
                if (z_path < 0) continue;

                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, null, x_path, z_path);

                if (flag_end) {
                    let sphere_ = sphere_path.clone();
                    sphere_.position.set(x_path, 0.5, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 0]);
                } else break;
            }
        } else {
            for (let i of [
                [x + 2, z + 2],
                [x - 2, z + 2],
            ]) {
                let x_path = i[0];
                let z_path = i[1];
                if (x_path > 14 || z_path > 14 || x_path < 0) continue;

                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);

                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                }
            }
            for (let i = 2; i <= 4; i += 2) {
                let x_path = x;
                let z_path = z + i;

                if (z_path > 14) continue;

                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, null, x_path, z_path);

                if (flag_end) {
                    let sphere_ = sphere_path.clone();
                    sphere_.position.set(x_path, 0.5, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 0]);
                } else break;
            }
        }
    } else {
        let [x, y, z] = raycaster._selectedMesh.userData.currPos;
        if (raycaster._selectedMesh.userData.color == "black") {
            for (let i of [
                [x + 2, z - 2],
                [x - 2, z - 2],
            ]) {
                let x_path = i[0];
                let z_path = i[1];

                if (x_path > 14 || z_path < 0 || x_path < 0) continue;

                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);

                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                }
            }
            for (let i = 2; i <= 2; i += 2) {
                let x_path = x;
                let z_path = z - i;

                if (z_path < 0) continue;

                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, null, x_path, z_path);

                if (flag_end) {
                    let sphere_ = sphere_path.clone();
                    sphere_.position.set(x_path, 0.5, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 0]);
                } else break;
            }
        } else {
            for (let i of [
                [x + 2, z + 2],
                [x - 2, z + 2],
            ]) {
                let x_path = i[0];
                let z_path = i[1];

                if (x_path > 14 || z_path > 14 || x_path < 0) continue;

                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);

                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                }
            }

            for (let i = 2; i <= 2; i += 2) {
                let x_path = x;
                let z_path = z + i;

                if (z_path > 14) continue;

                // Check if another piece is blocking valid moves
                let [flag_end, flag_end_enemy] = isBlocked(world, null, x_path, z_path);

                if (flag_end) {
                    let sphere_ = sphere_path.clone();
                    sphere_.position.set(x_path, 0.5, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 0]);
                } else break;
            }
        }
    }

    return validMoves;
}

function knightValidMoves(world, raycaster) {
    let validMoves = [];
    let [x, y, z] = raycaster._selectedMesh.userData.currPos;

    for (let i of [-4, +4]) {
        for (let j of [-2, +2]) {
            if (x + i < 0 || z + j > 14 || x + i > 14 || z + j < 0) continue;

            let x_path = x + i;
            let z_path = z + j;

            // Check if another piece is blocking valid moves
            if (raycaster._selectedMesh.userData.color == "black") {
                var [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);
            } else {
                var [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);
            }

            if (flag_end_enemy) {
                let sphere_ = sphere_enemy.clone();
                sphere_.position.set(x_path, 3, z_path);
                world.scene.add(sphere_);
                validMoves.push([[x_path, 0.5, z_path], 1]);
            } else {
                let sphere_ = sphere_path.clone();
                sphere_.position.set(x + i, 0.5, z + j);
                world.scene.add(sphere_);
                validMoves.push([[x + i, 0.5, z + j], 0]);
            }
        }
    }
    for (let i of [-2, +2]) {
        for (let j of [-4, +4]) {
            if (x + i < 0 || z + j > 14 || x + i > 14 || z + j < 0) continue;

            let x_path = x + i;
            let z_path = z + j;

            // Check if another piece is blocking valid moves
            if (raycaster._selectedMesh.userData.color == "black") {
                var [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);
            } else {
                var [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);
            }

            if (flag_end_enemy) {
                let sphere_ = sphere_enemy.clone();
                sphere_.position.set(x_path, 3, z_path);
                world.scene.add(sphere_);
                validMoves.push([[x_path, 0.5, z_path], 1]);
            } else {
                let sphere_ = sphere_path.clone();
                sphere_.position.set(x + i, 0.5, z + j);
                world.scene.add(sphere_);
                validMoves.push([[x + i, 0.5, z + j], 0]);
            }
        }
    }

    return validMoves;
}

function rookValidMoves(world, raycaster) {
    let validMoves = [];
    let [x, y, z] = raycaster._selectedMesh.userData.currPos;

    // 4 straight directions
    for (let j = 1; j <= 4; j++) {
        for (let i = 2; i <= 14; i += 2) {
            // rook moves forward (j === 1), rook moves to right (j === 2),
            // rook moves to left (j === 3), rook moves backward (j === 4)
            if (j === 1) {
                // Compute path
                var x_path = x;
                var z_path = z - i;

                // Check if path coordinate is valid
                if (z_path < 0) break;
            } else if (j == 2) {
                // Compute path
                var x_path = x + i;
                var z_path = z;

                // Check if path coordinate is valid
                if (x_path > 14) break;
            } else if (j == 3) {
                // Compute path
                var x_path = x - i;
                var z_path = z;

                // Check if path coordinate is valid
                if (x_path < 0) break;
            } else {
                // Compute path
                var x_path = x;
                var z_path = z + i;

                // Check if path coordinate is valid
                if (z_path > 14) break;
            }

            // Check if another piece is blocking valid moves
            if (raycaster._selectedMesh.userData.color == "black") {
                var [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);
            } else {
                var [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);
            }

            if (flag_end) {
                let sphere_ = sphere_path.clone();
                sphere_.position.set(x_path, 0.5, z_path);
                world.scene.add(sphere_);
                validMoves.push([[x_path, 0.5, z_path], 0]);
            } else {
                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                }
                break;
            }
        }
    }

    return validMoves;
}

function bishopValidMoves(world, raycaster) {
    let validMoves = [];
    let [x, y, z] = raycaster._selectedMesh.userData.currPos;

    // 4 diagonals directions
    for (let j = 1; j <= 4; j++) {
        for (let i = 2; i <= 14; i += 2) {
            if (j === 1) {
                if (x + i > 14 || z - i < 0) continue;
                var x_path = x + i;
                var z_path = z - i;
            } else if (j === 2) {
                if (x - i < 0 || z - i < 0) continue;
                var x_path = x - i;
                var z_path = z - i;
            } else if (j === 3) {
                if (x - i < 0 || z + i > 14) continue;
                var x_path = x - i;
                var z_path = z + i;
            } else {
                if (z + i > 14 || x + i > 14) continue;
                var x_path = x + i;
                var z_path = z + i;
            }

            // Check if another piece is blocking valid moves
            if (raycaster._selectedMesh.userData.color == "black") {
                var [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);
            } else {
                var [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);
            }

            if (flag_end) {
                let sphere_ = sphere_path.clone();
                sphere_.position.set(x_path, 0.5, z_path);
                world.scene.add(sphere_);
                validMoves.push([[x_path, 0.5, z_path], 0]);
            } else {
                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                    flag_end_enemy = false;
                }
                break;
            }
        }
    }

    return validMoves;
}

function queenValidMoves(world, raycaster) {
    let validMoves = [];
    let [x, y, z] = raycaster._selectedMesh.userData.currPos;

    // 4 diagonals directions
    for (let j = 1; j <= 4; j++) {
        for (let i = 2; i <= 14; i += 2) {
            if (j === 1) {
                if (x + i > 14 || z - i < 0) continue;
                var x_path = x + i;
                var z_path = z - i;
            } else if (j === 2) {
                if (x - i < 0 || z - i < 0) continue;
                var x_path = x - i;
                var z_path = z - i;
            } else if (j === 3) {
                if (x - i < 0 || z + i > 14) continue;
                var x_path = x - i;
                var z_path = z + i;
            } else {
                if (z + i > 14 || x + i > 14) continue;
                var x_path = x + i;
                var z_path = z + i;
            }

            // Check if another piece is blocking valid moves
            if (raycaster._selectedMesh.userData.color == "black") {
                var [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);
            } else {
                var [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);
            }

            if (flag_end) {
                let sphere_ = sphere_path.clone();
                sphere_.position.set(x_path, 0.5, z_path);
                world.scene.add(sphere_);
                validMoves.push([[x_path, 0.5, z_path], 0]);
            } else {
                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                    flag_end_enemy = false;
                }
                break;
            }
        }
    }

    // 4 straight directions
    for (let j = 1; j <= 4; j++) {
        for (let i = 2; i <= 14; i += 2) {
            // queen moves forward (j === 1), queen moves to right (j === 2),
            // queen moves to left (j === 3), queen moves backward (j === 4)
            if (j === 1) {
                // Compute path
                var x_path = x;
                var z_path = z - i;

                // Check if path coordinate is valid
                if (z_path < 0) break;
            } else if (j == 2) {
                // Compute path
                var x_path = x + i;
                var z_path = z;

                // Check if path coordinate is valid
                if (x_path > 14) break;
            } else if (j == 3) {
                // Compute path
                var x_path = x - i;
                var z_path = z;

                // Check if path coordinate is valid
                if (x_path < 0) break;
            } else {
                // Compute path
                var x_path = x;
                var z_path = z + i;

                // Check if path coordinate is valid
                if (z_path > 14) break;
            }

            // Check if another piece is blocking valid moves
            if (raycaster._selectedMesh.userData.color == "black") {
                var [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);
            } else {
                var [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);
            }

            if (flag_end) {
                let sphere_ = sphere_path.clone();
                sphere_.position.set(x_path, 0.5, z_path);
                world.scene.add(sphere_);
                validMoves.push([[x_path, 0.5, z_path], 0]);
            } else {
                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                    flag_end_enemy = false;
                }
                break;
            }
        }
    }

    return validMoves;
}

function kingValidMoves(world, raycaster, isKingFirstMove) {
    let validMoves = [];
    let [x, y, z] = raycaster._selectedMesh.userData.currPos;

    // Moving 8 directions
    for (let i of [-2, 0, 2]) {
        for (let j of [-2, 0, 2]) {
            if (x + i > 14 || x + i < 0 || z + j > 14 || z + j < 0) continue;
            if (i === 0 && j === 0) continue;
            let x_path = x + i;
            let z_path = z + j;

            // Check if another piece is blocking valid moves
            if (raycaster._selectedMesh.userData.color == "black") {
                var [flag_end, flag_end_enemy] = isBlocked(world, "white", x_path, z_path);
            } else {
                var [flag_end, flag_end_enemy] = isBlocked(world, "black", x_path, z_path);
            }

            if (flag_end) {
                let sphere_ = sphere_path.clone();
                sphere_.position.set(x_path, 0.5, z_path);
                world.scene.add(sphere_);
                validMoves.push([[x_path, 0.5, z_path], 0]);
            } else {
                if (flag_end_enemy) {
                    let sphere_ = sphere_enemy.clone();
                    sphere_.position.set(x_path, 3, z_path);
                    world.scene.add(sphere_);
                    validMoves.push([[x_path, 0.5, z_path], 1]);
                    flag_end_enemy = false;
                }
                continue;
            }
        }
    }

    // Check if castling is available and show castling valid moves
    if (raycaster._selectedMesh.userData.color == "black") {
        if (isKingFirstMove) {
            if (world.scene.children[5].children[103 + 44].userData.isFirstMove) {
                if (world.scene.children[5].children[107 + 44].userData.currPos !== world.scene.children[5].children[107 + 44].userData.origPos) {
                    if (world.scene.children[5].children[111 + 44].userData.currPos !== world.scene.children[5].children[111 + 44].userData.origPos) {
                        let sphere_ = sphere_path.clone();
                        sphere_.position.set(x - 4, 0.5, z);
                        world.scene.add(sphere_);
                        validMoves.push([[x - 4, 0.5, z], 2]);
                    }
                }
            }
            if (world.scene.children[5].children[131 + 44].userData.isFirstMove) {
                if (world.scene.children[5].children[119 + 44].userData.currPos !== world.scene.children[5].children[119 + 44].userData.origPos) {
                    if (world.scene.children[5].children[123 + 44].userData.currPos !== world.scene.children[5].children[123 + 44].userData.origPos) {
                        if (world.scene.children[5].children[127 + 44].userData.currPos !== world.scene.children[5].children[127 + 44].userData.origPos) {
                            let sphere_ = sphere_path.clone();
                            sphere_.position.set(x + 4, 0.5, z);
                            world.scene.add(sphere_);
                            validMoves.push([[x + 4, 0.5, z], 2]);
                        }
                    }
                }
            }
        }
    } else {
        if (isKingFirstMove) {
            if (world.scene.children[5].children[100 + 44].userData.isFirstMove) {
                if (world.scene.children[5].children[104 + 44].userData.currPos !== world.scene.children[5].children[104 + 44].userData.origPos) {
                    if (world.scene.children[5].children[108 + 44].userData.currPos !== world.scene.children[5].children[108 + 44].userData.origPos) {
                        let sphere_ = sphere_path.clone();
                        sphere_.position.set(x - 4, 0.5, z);
                        world.scene.add(sphere_);
                        validMoves.push([[x - 4, 0.5, z], 2]);
                    }
                }
            }
            if (world.scene.children[5].children[128 + 44].userData.isFirstMove) {
                if (world.scene.children[5].children[124 + 44].userData.currPos !== world.scene.children[5].children[124 + 44].userData.origPos) {
                    if (world.scene.children[5].children[120 + 44].userData.currPos !== world.scene.children[5].children[120 + 44].userData.origPos) {
                        if (world.scene.children[5].children[116 + 44].userData.currPos !== world.scene.children[5].children[116 + 44].userData.origPos) {
                            let sphere_ = sphere_path.clone();
                            sphere_.position.set(x + 4, 0.5, z);
                            world.scene.add(sphere_);
                            validMoves.push([[x + 4, 0.5, z], 2]);
                        }
                    }
                }
            }
        }
    }
    return validMoves;
}

function deletePath(world) {
    do {
        var selectedObject = world.scene.getObjectByName("path");
        world.scene.remove(selectedObject);
    } while (selectedObject !== undefined);
}

function isMoveValid(validMoves, move) {
    let isKillMove = false;
    let isCastlingMove = false;
    var item_as_string = JSON.stringify(move);

    var contains = validMoves.some(function (ele) {
        let isValid = JSON.stringify(ele[0]) === item_as_string;
        if (isValid && ele[1] === 1) isKillMove = true;
        if (isValid && ele[1] === 2) isCastlingMove = true;
        return isValid;
    });
    return [contains, isKillMove, isCastlingMove];
}

function moveAnimation(piece, dst) {
    // Move animation

    const timelineT = gsap.timeline();
    timelineT.to(piece.position, {
        x: dst[0],
        z: dst[1],
        duration: 0.5,
    });

    timelineT.to(piece.position, {
        y: 0.5,
        duration: 0.5,
    });
}

function changeCameraAfterAMove(world, flag) {
    if (flag[0]) {
        gsap.to(world.camera.position, {
            x: 6.5,
            y: 10,
            z: -6.5,
            duration: 1,
        });
        flag[0] = false;
    } else {
        gsap.to(world.camera.position, {
            x: 6.5,
            y: 10,
            z: 20,
            duration: 1,
        });
        flag[0] = true;
    }
}

let xb_d = 18,
    zb_d = 18,
    yb_d = -0.02;

let xw_d = -4,
    zw_d = -4,
    yw_d = -0.02;

export default function onClick(event, world, mouse, raycaster, flagChangeCamera) {
    // Locate mouse coordinate
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, world.camera);
    const found = raycaster.intersectObjects(world.scene.children);

    if (found.length > 0) {
        const clickedObject = found[0].object;
        const [dst_x, dst_y, dst_z] = clickedObject.position;
        if (clickedObject.parent.name !== "BOARD" && clickedObject.name !== "path" && clickedObject.gltf.scene.name !== "promotion" && clickedObject.gltf.scene.userData.isAlive) {
            // clickedObject is a piece
            raycaster._prevPieceName = clickedObject.parent.name;
            const oldSelectedMesh = raycaster._selectedMesh;
            raycaster._selectedMesh = clickedObject.gltf.scene;
            raycaster._prevPiece = clickedObject.gltf.scene;

            // Change seleted piece
            if (oldSelectedMesh) {
                gsap.to(oldSelectedMesh.position, {
                    y: 0.5,
                    duration: 0.5,
                });

                // Delete previous piece path
                deletePath(world);
            }

            // Select a piece
            if (oldSelectedMesh !== raycaster._selectedMesh) {
                // Move piece up
                gsap.to(raycaster._selectedMesh.position, {
                    y: 2,
                    duration: 0.5,
                });

                // Show valid moves
                if (raycaster._selectedMesh.userData.isAlive) {
                    if (clickedObject.parent.name.includes("Pawn")) {
                        _validMoves = pawnValidMoves(world, raycaster);
                    } else if (clickedObject.parent.name.includes("Knight")) {
                        _validMoves = knightValidMoves(world, raycaster);
                    } else if (clickedObject.parent.name.includes("Rook")) {
                        _validMoves = rookValidMoves(world, raycaster);
                    } else if (clickedObject.parent.name.includes("Bishop")) {
                        _validMoves = bishopValidMoves(world, raycaster);
                    } else if (clickedObject.parent.name.includes("Queen")) {
                        _validMoves = queenValidMoves(world, raycaster);
                    } else if (clickedObject.parent.name.includes("King")) {
                        let isKingFirstMove = raycaster._selectedMesh.userData.isFirstMove;
                        _validMoves = kingValidMoves(world, raycaster, isKingFirstMove);
                    }
                }
            } else {
                raycaster._selectedMesh = null;
            }
        } else if (clickedObject.parent.name !== "BOARD" && clickedObject.name !== "path" && clickedObject.gltf.scene.name === "promotion") {
            // Choose new piece for pawn promotion
            raycaster._selectedMesh = clickedObject.gltf.scene;

            raycaster._selectedMesh.userData.isAlive = true;
            raycaster._selectedMesh.userData.currPos = [raycaster._prevPiece.position.x, 0.5, raycaster._prevPiece.position.z];
            raycaster._selectedMesh.userData.isFirstMove = true;

            // Set position
            gsap.to(raycaster._selectedMesh.position, {
                x: raycaster._prevPiece.position.x,
                y: 0.5,
                z: raycaster._prevPiece.position.z,
                duration: 0.5,
            });

            // Pawn is unavailable
            if (raycaster._prevPiece.userData.color === "white") {
                gsap.to(raycaster._prevPiece.position, {
                    x: xw_d,
                    z: zw_d,
                    y: yw_d,
                    duration: 0.5,
                });
                xw_d += 2;
                if (xw_d === 18) {
                    zw_d += 2;
                    xw_d = -4;
                    yw_d = -0.04;
                }
                raycaster._prevPiece.userData.currPos = [xw_d, 0.5, zw_d];
            } else {
                gsap.to(raycaster._prevPiece.position, {
                    x: xb_d,
                    z: zb_d,
                    y: yb_d,
                    duration: 0.5,
                });
                xb_d -= 2;
                if (xb_d === -4) {
                    zb_d -= 2;
                    xb_d = 18;
                    yb_d = -0.04;
                }
                raycaster._prevPiece.userData.currPos = [xb_d, 0.5, zb_d];
            }

            raycaster._selectedMesh.name = "Pawn_Promotion";

            // Delete other pawn promotion options
            do {
                var selectedObject = world.scene.children[5].getObjectByName("promotion");
                world.scene.children[5].remove(selectedObject);
            } while (selectedObject !== undefined);

            // Hide text
            let promotion = document.querySelector("#promotion");
            promotion.style.display = "none";

            // Move camera
            gsap.to(world.camera.position, {
                x: 6.5,
                y: 10,
                z: 20,
                duration: 1,
                onUpdate: () => {
                    world.controls.target = new THREE.Vector3(6.5, 0, 6.5);
                },
            });
            set;

            // Change camera after a move
            setTimeout(() => {
                changeCameraAfterAMove(world, flagChangeCamera);
            }, 1000);
        } else {
            // clickedObject is not a piece, choose destination for seleted piece
            let [isValid, isKillMove, isCastlingMove] = isMoveValid(_validMoves, [dst_x, 0.5, dst_z]);
            if (isValid) {
                // Is the move killing enemy piece
                if (isKillMove) {
                    for (let k = 144; k <= world.scene.children[5].children.length - 1; k++) {
                        let temp_piece = world.scene.children[5].children[k];
                        let [x_piece, y_piece, z_piece] = temp_piece.userData.currPos;

                        if (dst_x == x_piece && dst_z === z_piece) {
                            // Piece is killed and move to corner
                            if (temp_piece.userData.color === "white") {
                                gsap.to(temp_piece.position, {
                                    x: xw_d,
                                    z: zw_d,
                                    y: yw_d,
                                    duration: 0.5,
                                });
                                xw_d += 2;
                                if (xw_d === 18) {
                                    zw_d += 2;
                                    xw_d = -4;
                                    yw_d = -0.04;
                                }
                                temp_piece.userData.currPos = [xw_d, 0.5, zw_d];
                            } else {
                                gsap.to(temp_piece.position, {
                                    x: xb_d,
                                    z: zb_d,
                                    y: yb_d,
                                    duration: 0.5,
                                });
                                xb_d -= 2;
                                if (xb_d === -4) {
                                    zb_d -= 2;
                                    xb_d = 18;
                                    yb_d = -0.04;
                                }
                                temp_piece.userData.currPos = [xb_d, 0.5, zb_d];
                            }

                            // Update current position and isAlive flag
                            temp_piece.userData.isAlive = false;

                            break;
                        }
                    }
                }

                // Is the move castling
                if (isCastlingMove) {
                    // oldSelectedMesh is king
                    const oldSelectedMesh = raycaster._selectedMesh;
                    if (oldSelectedMesh.userData.color === "black") {
                        let [x_prev, y_prev, z_prev] = oldSelectedMesh.userData.origPos;
                        if (dst_x == x_prev - 4) {
                            let rook = world.scene.children[5].children[103 + 44];
                            // Move rook
                            moveAnimation(rook, [clickedObject.position.x + 2, clickedObject.position.z]);

                            // Update currPos and isFirstMove flag
                            rook.userData.currPos = [clickedObject.position.x + 2, 0.5, clickedObject.position.z];
                            rook.userData.isFirstMove = false;
                        }
                        if (dst_x == x_prev + 4) {
                            let rook = world.scene.children[5].children[131 + 44];
                            // Move rook
                            moveAnimation(rook, [clickedObject.position.x - 2, clickedObject.position.z]);

                            // Update currPos and isFirstMove flag
                            rook.userData.currPos = [clickedObject.position.x - 2, 0.5, clickedObject.position.z];
                            rook.userData.isFirstMove = false;
                        }
                    } else {
                        let [x_prev, y_prev, z_prev] = oldSelectedMesh.userData.origPos;
                        if (dst_x === x_prev - 4 && dst_z === z_prev) {
                            let rook = world.scene.children[5].children[100 + 44];
                            // Move rook
                            moveAnimation(rook, [clickedObject.position.x + 2, clickedObject.position.z]);

                            // Update currPos and isFirstMove flag
                            rook.userData.currPos = [clickedObject.position.x + 2, 0.5, clickedObject.position.z];
                            rook.userData.isFirstMove = false;
                        }
                        if (dst_x === x_prev + 4 && dst_z === z_prev) {
                            let rook = world.scene.children[5].children[128 + 44];
                            // Move rook
                            moveAnimation(rook, [clickedObject.position.x - 2, clickedObject.position.z]);

                            // Update currPos and isFirstMove flag
                            rook.userData.currPos = [clickedObject.position.x - 2, 0.5, clickedObject.position.z];
                            rook.userData.isFirstMove = false;
                        }
                    }
                }

                // is the move promoting a pawn
                if (raycaster._prevPieceName.includes("Pawn") && (dst_z === 0 || dst_z === 14)) {
                    onPromotion(world, raycaster._prevPiece.userData.color);
                }

                // Change camera after a move
                setTimeout(() => {
                    changeCameraAfterAMove(world, flagChangeCamera);
                }, 1000);

                // Move piece
                moveAnimation(raycaster._selectedMesh, [clickedObject.position.x, clickedObject.position.z]);

                // Delete previous piece path
                deletePath(world);

                // Update current position
                raycaster._selectedMesh.userData.currPos = [dst_x, 0.5, dst_z];

                // Not first move anymore
                if (raycaster._selectedMesh.userData.isFirstMove) {
                    raycaster._selectedMesh.userData.isFirstMove = false;
                }

                // reset selectedMesh
                raycaster._selectedMesh = null;

                // Reset _validMoves
                _validMoves = [];
            } else {
                // TODO: add animation if move is invalid
                console.log("INVALID MOVE");
            }
        }
    } else {
        raycaster._selectedMesh = null;
    }
}
