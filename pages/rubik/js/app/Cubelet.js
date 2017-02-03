define(['three'], function(THREE){
	const underlay_color = 0x333333;

	function Cubelet(front, top, right){
		THREE.Group.call(this);
		this.type = 'Cubelet';
		
		this.front_sticker=front;
		this.top_sticker=top;
		this.right_sticker=right;

		var underlay_cube = new THREE.Mesh(new THREE.BoxGeometry(0.999, 0.999, 0.999), new THREE.MeshPhongMaterial({color:underlay_color, side:THREE.DoubleSide}));
		this.add(underlay_cube);

		var face_geom = new THREE.PlaneGeometry(0.95,0.95);

		if(front!==undefined){
			var front_mat=new THREE.MeshPhongMaterial({color:front, side: THREE.DoubleSide});
			this.front_face=new THREE.Mesh(face_geom, front_mat);
			this.front_face.translateZ(0.5);
			this.add(this.front_face);
		}

		if(top!==undefined){
			var top_mat=new THREE.MeshPhongMaterial({color:top, side: THREE.DoubleSide});
			this.top_face=new THREE.Mesh(face_geom, top_mat);

			this.top_face.translateY(0.5);
			this.top_face.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);

			this.add(this.top_face);
		}
		if(right!==undefined){
			var right_mat=new THREE.MeshPhongMaterial({color:right, side: THREE.DoubleSide});
			this.right_face=new THREE.Mesh(face_geom, right_mat);

			this.right_face.translateX(0.5);
			this.right_face.rotateOnAxis(new THREE.Vector3(0,1,0),-Math.PI/2);

			this.add(this.right_face);
		}


		this.castShadow = true;
		this.receiveShadow = true;
	}


	Cubelet.prototype = Object.assign(Object.create(THREE.Group.prototype),{constructor: Cubelet});

	Cubelet.prototype.changeTopColor = function(color){
		this.right_face.material.color.setHex(color);
	}

	Cubelet.prototype.clone = function(){
		var g = THREE.Group.prototype.clone.call(this,false);
		this.children.forEach(function(e){g.add(e.clone(false));});
		return g;
	}

	return Cubelet;
});