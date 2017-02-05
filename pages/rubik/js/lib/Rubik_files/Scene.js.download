define(['three.min', 'OrbitControls'], function(THREE, OrbitControls){
	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	scene.camera = camera;

	var renderer = new THREE.WebGLRenderer( { antialias: true });
	scene.renderer = renderer;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	renderer.shadowMap.enabled = true;

	scene.background = new THREE.Color( 0x0c0c0c );

	controls = new OrbitControls( camera, renderer.domElement );

	return scene;

});