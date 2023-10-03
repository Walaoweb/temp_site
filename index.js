import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
import {TWEEN} from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/tween.module.min.js';
import { CSS2DObject, CSS2DRenderer } from 'https://unpkg.com/three@0.127.0/examples/jsm/renderers/CSS2DRenderer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild( labelRenderer.domElement );

window.addEventListener( 'resize', onWindowResize );
window.addEventListener("mousemove", onmousemove, false);

const controls = new OrbitControls( camera, labelRenderer.domElement );
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI/2;
camera.position.set( 0, 30, 100 );
controls.update();

//floor
const matFloor = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
matFloor.transparent = true;
matFloor.opacity = 0.7;
matFloor.side = THREE.DoubleSide;
const geoFloor = new THREE.PlaneGeometry( 1000, 1000 );
const mshFloor = new THREE.Mesh( geoFloor, matFloor );
mshFloor.rotation.x = - Math.PI * 0.5;
scene.add( mshFloor );

var myObj;

loader.load(
	// resource URL
	'landing_text.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

        gltf.scene.scale.set(0.8,0.8,0.8);

        gltf.scene.position.y = 10;
        gltf.scene.rotation.x += Math.PI/2

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

        myObj = gltf.scene;

        myObj.lookAt(0,-100,0);
        myObj.position.y = 32;

        camera.position.y +=10;
        controls.update();

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

loader.load(
	// resource URL
	'whatsapp_3d.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

        gltf.scene.position.x = -50;
        gltf.scene.position.y = 45;
        gltf.scene.position.z = 0;
        gltf.scene.scale.set(20,20,20)

        gltf.scene.lookAt(camera.position);

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

loader.load(
	// resource URL
	'gmail_3d.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

        gltf.scene.position.x = 45;
        gltf.scene.position.y = 53;
        gltf.scene.position.z = 0;
        gltf.scene.scale.set(6,6,6)

        gltf.scene.lookAt(camera.position);

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

const spotLight1 = createSpotlight( 0xFF0000 );
const spotLight2 = createSpotlight( 0x00FF00 );
const spotLight3 = createSpotlight( 0x0000FF );
const spotLight4 = createSpotlight( 0xebcc34, Math.PI/4, 250 );
spotLight1.position.set( 100, 75, 130 );
spotLight2.position.set( 0, 75, 130 );
spotLight3.position.set( -100, 75, 130 );
spotLight4.position.set( 0, 200, 20 );
scene.add( spotLight1, spotLight2, spotLight3, spotLight4 );
scene.add( spotLight1.target, spotLight2.target, spotLight3.target );

scene.add( new THREE.AmbientLight(0xffffff, 0.4));


/*let lightHelper1, lightHelper2, lightHelper3, lightHelper4;
lightHelper1 = new THREE.SpotLightHelper( spotLight1 );
lightHelper2 = new THREE.SpotLightHelper( spotLight2 );
lightHelper3 = new THREE.SpotLightHelper( spotLight3 );
lightHelper4 = new THREE.SpotLightHelper( spotLight4 );
scene.add( lightHelper1, lightHelper2, lightHelper3, lightHelper4 );*/

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function onmousemove( event ) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

}

function createSpotlight( color, myang, mydist ) {

    const newObj = new THREE.SpotLight( color, 10 );

    newObj.castShadow = true;
    newObj.angle = myang||0.3;
    newObj.penumbra = 0.2;
    newObj.decay = 2;
    newObj.distance = mydist||200;

    return newObj;
}

function tween( light ) {
    new TWEEN.Tween( light ).to( {
        angle: ( Math.random() * 0.7 ) + 0.3,
        penumbra: Math.random() + 1
    }, Math.random() * 3000 + 2000 )
        .easing( TWEEN.Easing.Quadratic.Out ).start();

    new TWEEN.Tween( light.target.position ).to( {
        x: (Math.random() * 50 - 25),
        y: (Math.random() * 50 - 25),
        z: (Math.random() * 50 - 25)
    }, Math.random() * 3000 + 2000 )
    .easing( TWEEN.Easing.Quadratic.Out ).start();
        
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    tween( spotLight1 );
    tween( spotLight2 );
    tween( spotLight3 );

    /*if(myObj){
        new TWEEN.Tween( myObj.scale ).to( {
            x: (myObj.scale.x += 0.1),
            y: (myObj.scale.y += 0.1),
            z: (myObj.scale.z += 0.1)
        }, Math.random() * 3000 + 2000 )
        .easing( TWEEN.Easing.Quadratic.Out ).start();
    }*/

    setTimeout( animate, 5000 );
}

function render() {

    TWEEN.update();

    /*if ( lightHelper1 ) lightHelper1.update();
    if ( lightHelper2 ) lightHelper2.update();
    if ( lightHelper3 ) lightHelper3.update();*/

    renderer.render( scene, camera );
    controls.update();

    requestAnimationFrame( render );

}

render();
animate();