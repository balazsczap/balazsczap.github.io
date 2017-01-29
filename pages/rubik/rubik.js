var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


scene.background = new THREE.Color( 0x0c0c0c );


var dirLight = new THREE.PointLight(0xffffff, 0.5);

dirLight.position.set(1,2,3);

scene.add(dirLight);

var ambient = new THREE.AmbientLight( 0x101010 );
				scene.add( ambient );


var colors = {
	red: 0xff0000,
	green: 0x00ff00,
	blue: 0x0000ff,
	yellow: 0xffff00,
	orange: 0xff9933,
	white: 0xffffff
}

camera.position.z=5;
camera.position.x=-1;

class Cuboid{
	constructor(front,top, right){
		this.elements = new THREE.Group();

		var underlay_cube = new THREE.Mesh(new THREE.BoxGeometry(0.999, 0.999, 0.999), new THREE.MeshPhongMaterial({color:0x333333, side:THREE.DoubleSide}));
		this.elements.add(underlay_cube);

		var face_geom = new THREE.PlaneGeometry(0.95,0.95);

		var front_mat=new THREE.MeshPhongMaterial({color:front, side: THREE.DoubleSide});
		var front_face=new THREE.Mesh(face_geom, front_mat);
		front_face.translateZ(0.5);

		this.elements.add(front_face);
		if(top!==undefined){
			var top_mat=new THREE.MeshPhongMaterial({color:top, side: THREE.DoubleSide});
			var top_face=new THREE.Mesh(face_geom, top_mat);

			top_face.translateY(0.5);
			top_face.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);

			this.elements.add(top_face);
		}
		if(right!==undefined){
			var right_mat=new THREE.MeshPhongMaterial({color:right, side: THREE.DoubleSide});
			var right_face=new THREE.Mesh(face_geom, right_mat);

			right_face.translateX(0.5);
			right_face.rotateOnAxis(new THREE.Vector3(0,1,0),-Math.PI/2);

			this.elements.add(right_face);
		}
		scene.add(this.elements);
	}

	rotateOnAxis(axis, angle){this.elements.rotateOnAxis(axis,angle);}
	translateOnAxis(axis, dist){this.elements.translateOnAxis(axis,dist);}
	translateX(dist){this.elements.translateX(dist);}
	translateY(dist){this.elements.translateY(dist);}
	translateZ(dist){this.elements.translateZ(dist);}
	get position(){return this.elements.position;}
}

class Face{
	constructor(center, size, center_color, other_color_list){
		this.elements = new THREE.Group();

		var cube_geom = new THREE.PlaneGeometry(0.95,0.95);
		var cube_mat = new THREE.MeshPhongMaterial({color:center_color, side: THREE.DoubleSide});
		
		for(var i=-1; i<2;++i){
			for(var j=-1; j<2;++j){
				var center_cube = new THREE.Mesh(cube_geom, cube_mat);
				center_cube.position.set(center[0]+i,center[1], center[2]+j);
				console.log(center_cube);
				this.elements.add(center_cube);
			}
		}




		scene.add(this.elements);
	}
}



var c1 = new Cuboid(colors.red,colors.white,colors.blue);
var c2 = new Cuboid(colors.red, colors.white);
var c3 = new Cuboid(colors.red, colors.green, colors.white);
c2.translateX(-1);
c3.translateX(-2);
c3.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI/2);
//var f1 = new Face([0,0,0], 1, 0xff0000); 
camera.position.applyAxisAngle(new THREE.Vector3(1,0,0), -Math.PI/4);
function render(){
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	camera.position.applyAxisAngle(new THREE.Vector3(0,1,0), 0.014);
	camera.lookAt(c2.position);
	dirLight.position.applyAxisAngle(new THREE.Vector3(0,1,0), 0.014);
}

render();