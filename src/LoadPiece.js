import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "../node_modules/three/build/three.module.js";

export default async function loadPiece(type, color) {
    const loader = new GLTFLoader();
    switch (type) {
        case 1: // pawn
            var gltf = await loader.loadAsync("../models/pawn/scene.gltf");
            break;
        case 2: // rook
            var gltf = await loader.loadAsync("../models/rook/scene.gltf");
            break;
        case 3: // knight
            var gltf = await loader.loadAsync("../models/knight/scene.gltf");
            break;
        case 4: // bishop
            var gltf = await loader.loadAsync("../models/bishop/scene.gltf");
            break;
        case 5: // queen
            var gltf = await loader.loadAsync("../models/queen/scene.gltf");
            break;
        case 6: // king
            var gltf = await loader.loadAsync("../models/king/scene.gltf");
            break;
    }
    const loaded_model = gltf.scene;
    loaded_model.traverse((node) => {
        if (node.isMesh) {
            node.gltf = gltf;
        }
    });
    if (color === 0 || color === 2) {
        // white
        loaded_model.traverse(function (o) {
            if (o.isMesh) {
                o.material = new THREE.MeshPhongMaterial({ color: 0xffffff });
            }
        });
        loaded_model.userData.color = "white";
    } else {
        // black
        loaded_model.traverse(function (o) {
            if (o.isMesh) {
                o.material = new THREE.MeshPhongMaterial({ color: 0x808080 });
            }
        });
        loaded_model.userData.color = "black";
        loaded_model.rotation.set(0, Math.PI, 0);
    }
    loaded_model.scale.set(1.2, 1.2, 1.2);
    loaded_model.receiveShadow = true;
    return loaded_model;
}
