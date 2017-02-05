requirejs.config({
	baseUrl: "js/lib",
	paths:{
		app:'../app'
	}
});

requirejs(['require-jquery', 'three', 'app/Scene', 'app/Cubelet', 'app/Face', 'app/Cube'], function(JQ, THREE, scene, Cubelet, Face, Cube){


	


	


	var pointLight = new THREE.PointLight(0xffffff, 5,10, 1);
	pointLight.position.set(4,6,4);

	var plight2 = new THREE.PointLight(0xffffff, 5,10, 1);
	plight2.position.set(-4,-7,-5);

	pointLight.castShadow = true; 
	var pointLightHelper = new THREE.PointLightHelper( pointLight, 0.1 );
	scene.add( pointLightHelper );

	var pointLightHelper2 = new THREE.PointLightHelper( plight2, 0.1 );
	scene.add( pointLightHelper2 );
	// pointLight.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 32,32), new THREE.MeshBasicMaterial({color:0xffff00})));
	scene.add(pointLight);
	scene.add(plight2);

	var ambient = new THREE.AmbientLight( 0x101010 );
	scene.add( ambient );

	var camera = scene.camera;
	var renderer = scene.renderer;
	
	camera.position.z=8;
	camera.position.x=4;
	camera.position.y=6;



	var cube = new Cube();
	scene.add(cube);
	// var c1 = new Cubelet(colors.red, colors.white, colors.blue);
	// scene.add(c1);

	// var c2 = new Cubelet(colors.red, colors.white);
	// c2.translateX(-1);
	// scene.add(c2);

	// var c3 = new Cubelet(colors.red, colors.green, colors.white);
	// c3.translateX(-2);
	// c3.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI/2);
	// scene.add(c3);
	
	var prevTime = Date.now();
	function render(){
		var currTime = Date.now();
		var elapsed = currTime-prevTime; 
		prevTime = currTime;

		requestAnimationFrame(render);
		renderer.render(scene, camera);
		// camera.position.applyAxisAngle(new THREE.Vector3(0,1,0), 0.014);
		// camera.position.applyAxisAngle(new THREE.Vector3(1,0,0), 0.007);
		camera.lookAt(cube.position);
		// pointLight.position.applyAxisAngle(new THREE.Vector3(0,1,0), 0.014);
		// pointLight.lookAt(cube.position);
		// plight2.position.applyAxisAngle(new THREE.Vector3(0,1,0), 0.014);
		// plight2.lookAt(cube.position);

	}
	render();

	JQ(document).keypress(function(e){
		if(e.charCode==97){
			cube.rotateFront();
		}
	});
});