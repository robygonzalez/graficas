import * as THREE from './three_library.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(1, 2, 4);
        scene.add(light);
    }

    const headGeometry = new THREE.BoxGeometry(2, 2, 2); //widht, height, depth
    const torsoGeometry = new THREE.BoxGeometry(3, 2, 3);
    const legsGeometry = new THREE.BoxGeometry(2, 2, 2);
    const shoesGeometry = new THREE.BoxGeometry(1, 2, 2);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    function makeTexturedInstance(geometry, materials, x) {
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const loader = new THREE.TextureLoader();
    const materials = [
        new THREE.MeshBasicMaterial({ map: loader.load('https://robygonzalez.github.io/graficas/images/head_top.jpeg') }), //top
        new THREE.MeshBasicMaterial({ map: loader.load('https://robygonzalez.github.io/graficas/images/head_top.jpg') }), //bottom
        new THREE.MeshBasicMaterial({ map: loader.load('https://robygonzalez.github.io/graficas/images/head_front.jpg') }), //front
        new THREE.MeshBasicMaterial({ map: loader.load('https://robygonzalez.github.io/graficas/images/head_back.jpg') }), //back
        new THREE.MeshBasicMaterial({ map: loader.load('https://robygonzalez.github.io/graficas/images/head_right.jpg') }), //right
        new THREE.MeshBasicMaterial({ map: loader.load('https://robygonzalez.github.io/graficas/images/head_left.jpg') }), //left
    ];

    const cubes = [
        makeTexturedInstance(headGeometry, materials, -3.5), //geomtry, color, x
        makeInstance(torsoGeometry, 0x0eaeae, -1),
        makeInstance(legsGeometry, 0x494697, 1.5),
        makeInstance(shoesGeometry, 0x6b6b6b, 2.5),
    ];

    function render(time) {
        time *= 0.001;  // convert time to seconds

        cubes.forEach((cube, ndx) => {
            const speed = 1 + 1 * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}

window.onload = main();
