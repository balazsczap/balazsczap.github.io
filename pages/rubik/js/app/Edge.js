define(['three', 'app/Cubelet', 'app/Face'], function(){

	var i =0;
	function Edge(){
		this.type = 'Edge';
		this.ports=[];

	}

	Edge.prototype.topOf = function(face){
		this.ports.push({face: face, edge: face.top});

		face.topEdge=this;
		return this;
	}

	Edge.prototype.rightOf = function(face){
		this.ports.push({face: face, edge: face.right});
		face.rightEdge=this;
		return this;
	}

	Edge.prototype.bottomOf = function(face){
		this.ports.push({face: face, edge: face.bottom});
		face.bottomEdge=this;
		return this;
	}

		Edge.prototype.leftOf = function(face){
		this.ports.push({face: face, edge: face.left});
		face.leftEdge=this;
		return this;
	}



	Edge.prototype.notifyChange = function(face_from, cubelets){
		console.log(this.ports[0].face);
		console.log(this.ports[1].face);
		console.log(cubelets);
		if(this.ports[0].edge[0]!=this.ports[1].edge[0]){
			this.ports[1].face.notifyChange(this, cubelets.reverse());
			this.ports[0].face.notifyChange(this, cubelets.reverse());
		}
		else{
			this.ports[1].face.notifyChange(this, cubelets);
			this.ports[0].face.notifyChange(this, cubelets);
		}
		console.log(this.ports[0].face);
		console.log(this.ports[1].face);
	}



	return Edge;
});