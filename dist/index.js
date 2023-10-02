import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 0, 100 );
controls.update();

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const spotLight = new THREE.SpotLight( 0xebc034, 1, 200 );
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 1;
spotLight.decay = 0.2;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 10;
spotLight.shadow.focus = 1;
spotLight.position.set( 100, 50, 100 );
scene.add( spotLight );

const lightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( lightHelper );

const axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );

loader.load(
	// resource URL
	'Walaoweb.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

        gltf.scene.lookAt(0,-100,0);

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

function animate() {
	requestAnimationFrame( animate );

    controls.update();

	renderer.render( scene, camera );
}

animate();