requirejs.config({
	baseUrl: "js/lib",
	paths:{
		app:'../app'
	}
});

// function indexOf(array,item){
// 	function i_of(array, item, index_letter, index_obj){
// 		const nextChar = function(c){
// 			var code = c.charCodeAt(0);
// 			return String.fromCharCode(code+1);
// 		}

// 		if((index = array.indexOf(item))>=0){
// 			index_obj[index_letter] = index; 
// 			return index_obj
// 		}
// 		for(var i=0; i<array.length;++i){
// 			if(Array.isArray(array[i])){
// 				var ret;
// 				if((ret = i_of(array[i], item, nextChar(index_letter), index_obj))!=-1){
// 					ret[index_letter] = i;
// 					return ret;
// 				}

// 			}
// 		}
// 		return -1;
// 	}

// 	return i_of(array,item,'h', {});
// }


requirejs(['require-jquery', 'three', 'app/Scene', 'app/Cubelet', 'app/Face', 'app/Cube'], function($, THREE, scene, Cubelet, Face, Cube){
	// var f1 = 11;
	// var f2 = 12;
	// var f3 = 13;
	// var f4 = 14;
	// var f5 = 15;
	// var f6 = 16;
	// var f7 = 17;
	// var f8 = 18;
	// var f9 = 19;

	// var c1 = 21;
	// var c2 = 22;
	// var c3 = 23;
	// var c4 = 24;
	// var c5 = 25;
	// var c6 = 26;
	// var c7 = 27;
	// var c8 = 28;
	// var c9 = 29;

	// var b1 = 31;
	// var b2 = 32;
	// var b3 = 33;
	// var b4 = 34;
	// var b5 = 35;
	// var b6 = 36;
	// var b7 = 37;
	// var b8 = 38;
	// var b9 = 39;
	// var cubelets = [
	// [[f7,f8,f9],
	//  [f4,f5,f6],
	//  [f1,f2,f3]],

	// [[c7,c8,c9],
	//  [c4,c5,c6],
	//  [c1,c2,c3]],

	// [[b7,b8,b9],
	//  [b4,b5,b6],
	//  [b1,b2,b3]]
	// ]; 







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

	var ambient = new THREE.AmbientLight( 0x333333 );
	scene.add( ambient );

	var camera = scene.camera;
	var renderer = scene.renderer;
	
	camera.position.z=8;
	camera.position.x=4;
	camera.position.y=6;



	var cube = new Cube();
	scene.add(cube);
	// var c1 = 21;
	// scene.add(c1);

	// var c2 = 22;
	// c2.translateX(-1);
	// scene.add(c2);

	// var c3 = 23;
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

	$(document).keypress(function(e){
		switch(e.charCode){
			case 102:
				cube.front.rotate();
				break;
			// case 70:
			// 	cube.front.rotateBack();
			// 	break;
			case 116:
				cube.top.rotate();
				break;
			case 114:
				cube.right.rotate();
				break;
			case 108:
				cube.left.rotate();
				break;
			case 100:
				cube.bottom.rotate();
				console.log(cube);
				break;
			case 98:
				cube.back.rotate();
				console.log(cube);
				break;
		}
	});

});