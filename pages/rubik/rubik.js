var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);





var dirLight = new THREE.PointLight(0xffffff, 0.5);

dirLight.position.set(1,2,3);

scene.add(dirLight);

var ambient = new THREE.AmbientLight( 0x101010 );
				scene.add( ambient );


camera.position.z=5;


class Face{
	constructor(center, size, center_color, other_color_list){
		this.elements = new THREE.Group();

		var cube_geom = new THREE.BoxGeometry(1,1,1);
		var cube_mat = new THREE.MeshPhongMaterial({color:center_color});
		
		var center_cube = new THREE.Mesh(cube_geom, cube_mat);
		center_cube.position.set(center[0],center[1], center[2]);
		

		this.elements.add(center_cube);

		scene.add(this.elements);
	}
}

var f1 = new Face([0,0,0], 1, 0xff0000); 
camera.position.applyAxisAngle(new THREE.Vector3(1,0,0), -0.7853);
function render(){
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	camera.position.applyAxisAngle(new THREE.Vector3(0,1,0), 0.01);
	camera.lookAt(new THREE.Vector3(0,0,0));
}

render();