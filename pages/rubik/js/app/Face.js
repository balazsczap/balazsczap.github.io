define(['three', 'app/Cubelet'], function(THREE){

	function Face(center, top, right, bottom, left){
		THREE.Group.call(this);
		this.type = 'Face';


		var face = this;
		[[center],top,right,bottom,left].forEach(function(edge){
			edge.forEach(function(c){
				// c.translateX(3);
				face.add(c);
			})
		})
		this.topEdge = top.slice(0);
		this.rightEdge = right.slice(0);
		this.bottomEdge = bottom.slice(0);
		this.leftEdge = left.slice(0);

	}

	Face.prototype = Object.assign(Object.create(THREE.Group.prototype),{constructor: Face});

	return Face;
});