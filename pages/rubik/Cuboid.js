class Cuboid{
	constructor(front,top, right){
		var elements = new THREE.Group();

		var underlay_cube = new THREE.Mesh(new THREE.BoxGeometry(0.999, 0.999, 0.999), new THREE.MeshPhongMaterial({color:0x333333, side:THREE.DoubleSide}));
		elements.add(underlay_cube);

		var face_geom = new THREE.PlaneGeometry(0.95,0.95);

		var front_mat=new THREE.MeshPhongMaterial({color:front, side: THREE.DoubleSide});
		var front_face=new THREE.Mesh(face_geom, front_mat);
		front_face.translateZ(0.5);

		elements.add(front_face);
		if(top!==undefined){
			var top_mat=new THREE.MeshPhongMaterial({color:top, side: THREE.DoubleSide});
			var top_face=new THREE.Mesh(face_geom, top_mat);

			top_face.translateY(0.5);
			top_face.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);

			elements.add(top_face);
		}
		if(right!==undefined){
			var right_mat=new THREE.MeshPhongMaterial({color:right, side: THREE.DoubleSide});
			var right_face=new THREE.Mesh(face_geom, right_mat);

			right_face.translateX(0.5);
			right_face.rotateOnAxis(new THREE.Vector3(0,1,0),-Math.PI/2);

			elements.add(right_face);
		}
		scene.add(elements);

		decorate(elements, this);

		return elements;
	}

	ayy(){console.log("lmao");}



}