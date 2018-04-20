define(['three', 'app/Cubelet', 'app/Face'], function(){


	function Edge(){
		this.type = 'Edge';
		this.ports=[];
	}

	Edge.prototype.topOf = function(face){
		this.ports.push(face);
		face.bottomConnector=this;
		return this;
	}

	Edge.prototype.rightOf = function(face){
		this.ports.push(face);
		face.leftConnector=this;
		return this;
	}

	Edge.prototype.bottomOf = function(face){
		this.ports.push(face);
		face.topConnector=this;
		return this;
	}

		Edge.prototype.leftOf = function(face){
		this.ports.push(face);
		face.rightConnector=this;
		return this;
	}



	Edge.prototype.notifyChange = function(face_from, cubelets){
		if(this.ports[0]===face_from){
			this.ports[1].notifyChange(this, cubelets);
		}
		else{
			this.ports[0].notifyChange(this, cubelets);
		}
	}



	return Edge;
});