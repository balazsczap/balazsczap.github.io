define(['three.min', 'app/Cubelet'], function(THREE){

	function Edge(left, center, right){
		THREE.Group.call(this);
		this.type = 'Edge';

		
		this.add(left,center,right);
		/*

		var underlay_cube = new THREE.Mesh(new THREE.BoxGeometry(0.999, 0.999, 0.999), new THREE.MeshPhongMaterial({color:underlay_color, side:THREE.DoubleSide}));
		this.add(underlay_cube);

		var Edge_geom = new THREE.PlaneGeometry(0.95,0.95);

		var front_mat=new THREE.MeshPhongMaterial({color:front, side: THREE.DoubleSide});
		var front_Edge=new THREE.Mesh(Edge_geom, front_mat);
		front_Edge.translateZ(0.5);

		this.add(front_Edge);
		if(top!==undefined){
			var top_mat=new THREE.MeshPhongMaterial({color:top, side: THREE.DoubleSide});
			var top_Edge=new THREE.Mesh(Edge_geom, top_mat);

			top_Edge.translateY(0.5);
			top_Edge.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);

			this.add(top_Edge);
		}
		if(right!==undefined){
			var right_mat=new THREE.MeshPhongMaterial({color:right, side: THREE.DoubleSide});
			var right_Edge=new THREE.Mesh(Edge_geom, right_mat);

			right_Edge.translateX(0.5);
			right_Edge.rotateOnAxis(new THREE.Vector3(0,1,0),-Math.PI/2);

			this.add(right_Edge);
		}
		*/
	}

	Edge.prototype = Object.assign(Object.create(THREE.Group.prototype),{constructor: Edge});

	return Edge;
});