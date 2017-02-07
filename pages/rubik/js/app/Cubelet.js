define(['three'], function(THREE){
	const underlay_color = 0x333333;
	var i =0;

	

	function Cubelet(){
		THREE.Group.call(this);
		this.type = 'Cubelet';
		this.name = (++i).toString();

		var underlay_cube = new THREE.Mesh(new THREE.BoxGeometry(0.99, 0.99, 0.99), new THREE.MeshPhongMaterial({color:underlay_color, side:THREE.DoubleSide}));
		this.add(underlay_cube);

		

		// if(front!==undefined){
		// 	var front_mat=new THREE.MeshPhongMaterial({color:front, side: THREE.DoubleSide});
		// 	this.front_face=new THREE.Mesh(face_geom, front_mat);
		// 	this.front_face.translateZ(0.5);
		// 	this.add(this.front_face);
		// }

		// if(top!==undefined){
		// 	var top_mat=new THREE.MeshPhongMaterial({color:top, side: THREE.DoubleSide});
		// 	this.top_face=new THREE.Mesh(face_geom, top_mat);

		// 	this.top_face.translateY(0.5);
		// 	this.top_face.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);

		// 	this.add(this.top_face);
		// }
		// if(right!==undefined){
		// 	var right_mat=new THREE.MeshPhongMaterial({color:right, side: THREE.DoubleSide});
		// 	this.right_face=new THREE.Mesh(face_geom, right_mat);

		// 	this.right_face.translateX(0.5);
		// 	this.right_face.rotateOnAxis(new THREE.Vector3(0,1,0),-Math.PI/2);

		// 	this.add(this.right_face);
		// }


		this.castShadow = true;
		this.receiveShadow = true;
	}


	Cubelet.prototype = Object.assign(Object.create(THREE.Group.prototype),{constructor: Cubelet});


	Cubelet.prototype.rotateAroundWorldAxis = function(axis, radians) {
		var q = new THREE.Quaternion();
		q.setFromAxisAngle(axis,radians);
		this.quaternion.premultiply(q);
		this.position.applyQuaternion(q);
	}


	function createFace(c){
		var face_geom = new THREE.PlaneGeometry(0.95,0.95);
		var mat=new THREE.MeshPhongMaterial({color:c, side: THREE.DoubleSide});
		var face=new THREE.Mesh(face_geom, mat);
		
		return face;
	}

	Cubelet.prototype.front = function(color){
		if(this.front_face == undefined){
			this.front_face = createFace(color);
			this.front_face.translateZ(0.5);
			this.add(this.front_face);
			return this;
		}
		this.front_face.material.color.setHex(color);
		return this;

	}

	Cubelet.prototype.top = function(color){
		if(this.top_face == undefined){
			this.top_face = createFace(color);
			this.top_face.translateY(0.5);
			this.top_face.rotation.x = Math.PI/2;
			this.add(this.top_face);
			return this;
		}
		this.top_face.material.color.setHex(color);
		return this;
	}


	Cubelet.prototype.right = function(color){
		if(this.right_face == undefined){
			this.right_face = createFace(color);
			this.right_face.translateX(0.5);
			this.right_face.rotation.y = Math.PI/2;
			this.add(this.right_face);
			return this;
		}
		this.right_face.material.color.setHex(color);
		return this;
	}


	Cubelet.prototype.bottom = function(color){
		if(this.bottom_face == undefined){
			this.bottom_face = createFace(color);
			this.bottom_face.translateY(-0.5);
			this.bottom_face.rotation.x = -Math.PI/2;
			this.add(this.bottom_face);
			return this;
		}
		this.bottom_face.material.color.setHex(color);
		return this;
	}

	Cubelet.prototype.left = function(color){
		if(this.left_face == undefined){
			this.left_face = createFace(color);
			this.left_face.translateX(-0.5);
			this.left_face.rotation.y = -Math.PI/2;
			this.add(this.left_face);
			return this;
		}
		this.left_face.material.color.setHex(color);
		return this;
	}

	Cubelet.prototype.back = function(color){
		if(this.back_face == undefined){
			this.back_face = createFace(color);
			this.back_face.translateZ(-0.5);
			this.add(this.back_face);
			return this;
		}
		this.back_face.material.color.setHex(color);
		return this;
	}


	Cubelet.prototype.clone = function(){
		var c = new Cubelet(this.front_color, this.top_color, this.right_color);
		c.matrix = this.matrix;
		c.position.copy(this.position);
		c.rotation.copy(this.rotation);
		return c;
	}

	return Cubelet;
});