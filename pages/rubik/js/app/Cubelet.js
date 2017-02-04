define(['three'], function(THREE){
	const underlay_color = 0x333333;

	function Cubelet(front, top, right){
		THREE.Group.call(this);
		this.type = 'Cubelet';
		
		this.top_color = top;
		this.front_color = front;
		this.right_color = right;

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

	Cubelet.prototype.setTopColor = function(color){
		if(this.top_face==undefined){console.warn("This Cubelet has no top face."); return;}
		this.top_face.material.color.setHex(color);
	}

	Cubelet.prototype.setFrontColor = function(color){
		console.log(this);
		if(this.front_face==undefined){console.warn("This Cubelet has no front face."); return;}
		this.front_face.material.color.setHex(color);
	}

	Cubelet.prototype.setRightColor = function(color){
		console.log(this);
		if(this.right_face==undefined){console.warn("This Cubelet has no right face."); return;}
		this.right_face.material.color.setHex(color);
	}

	Cubelet.prototype.clone = function(){
		console.log(this);
		var c = new Cubelet(this.front_color, this.top_color, this.right_color);
		
		c.matrix = this.matrix;
		c.position.copy(this.position);
		c.rotation.copy(this.rotation);
		console.log(c);
		return c;
	}

	return Cubelet;
});