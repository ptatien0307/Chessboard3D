import { RGBELoader } from "../../node_modules/three/examples/jsm/loaders/RGBELoader.js";

export default function onChangeBackground(world, type) {
    switch (type) {
        case 2:
            var path = "../../models/background/blocky_photo_studio_2k.hdr";
        case 3:
            var path = "../../models/background/brown_photostudio_05_2k.hdr";
        case 4:
            var path = "../../models/background/scythian_tombs_2_2k.hdr";
        case 5:
            var path = "../../models/background/sunflowers_puresky_2k.hdr";
        case 1:
            var path = null;
    }
    if (path)
        new RGBELoader().load(path, function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            world.scene.background = texture;
            world.scene.environment = texture;
        });
}
