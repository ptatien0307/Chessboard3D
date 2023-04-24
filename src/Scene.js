import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

export default class Scene {
    constructor(camera, scene, controls, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.renderer = renderer;
    }

    initScene() {
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(6.5, 10, 20);

        // Scence
        this.scene = new THREE.Scene();

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#background"),
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;

        this.renderer.setClearColor(0x000000, 1);

        // Orbit control
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(6.5, 0, 6.5);

        // light
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight1.position.set(50, 50, 50);
        directionalLight1.castShadow = true;
        directionalLight1.shadow.mapSize.width = 2048;
        directionalLight1.shadow.mapSize.height = 2048;
        const d = 30;
        directionalLight1.shadow.camera.left = -d;
        directionalLight1.shadow.camera.right = d;
        directionalLight1.shadow.camera.top = d;
        directionalLight1.shadow.camera.bottom = -d;
        this.scene.add(directionalLight1);
        // this.scene.add(new THREE.CameraHelper(directionalLight1.shadow.camera));

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight2.position.set(-50, 50, -50);
        directionalLight2.castShadow = true;
        directionalLight2.shadow.mapSize.width = 2048;
        directionalLight2.shadow.mapSize.height = 2048;
        directionalLight2.shadow.camera.left = -d;
        directionalLight2.shadow.camera.right = d;
        directionalLight2.shadow.camera.top = d;
        directionalLight2.shadow.camera.bottom = -d;
        this.scene.add(directionalLight2);
        // this.scene.add(new THREE.CameraHelper(directionalLight2.shadow.camera));

        const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
        this.scene.add(ambientLight);

        window.addEventListener("resize", () => this.onWindowResize());
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}
