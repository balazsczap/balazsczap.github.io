define(['three', 'app/Edge'], function(THREE, Edge){


	function Face(cubelets, forwardDir){
		this.type = 'Face';

		/*
			7->8->9
				  |
			4	  6
			|	  |
			1<-2<-3

			0->1->2
				  |
			4	  3
			|	  |
			1<-2<-4
		*/

		this.edgeCubelets = [cubelets[0][0], cubelets[0][1], cubelets[0][2], cubelets[1][2],
			 cubelets[2][2], cubelets[2][1], cubelets[2][0], cubelets[1][0]];



		// for(var i=0; i<cubelets.length;++i){
		// 	for(var j=0; j<cubelets[i].length;++j){
		// 		this.edgeCubelets.push(cubelets[i][j]);			
		// 	}
		// }
		this.refreshEdges();


		// var upDir = new THREE.Vector3().subVectors(cubelets[0][1].position, cubelets[1][1].position);
		// var rightDir = new THREE.Vector3().subVectors(cubelets[1][2].position, cubelets[1][1].position);
		this.forwardDir = forwardDir;

	}

	Face.prototype.refreshEdges = function(){
		this.top = this.edgeCubelets.slice(0,3); 
		this.right = this.edgeCubelets.slice(2,5); 
		this.bottom = this.edgeCubelets.slice(4,7); 
		this.left = this.edgeCubelets.slice(6,8); 
		this.left.push(this.edgeCubelets[0]);	
	}

	Face.prototype.refreshFullEdge = function(){
		this.edgeCubelets = [this.top[0], this.top[1],  this.top[2],  this.right[1],  this.right[2], this.bottom[1], this.bottom[2], this.left[1], this.left[2]];
	}

	Face.prototype.rotate = function(){
		var forward = this.forwardDir;
		this.edgeCubelets.forEach(function(e){
			e.rotateAroundWorldAxis(forward,Math.PI/2);
		});

		for(var i=0; i<this.top.length-1;++i) this.edgeCubelets.unshift(this.edgeCubelets.pop());

		this.refreshEdges();

		this.topEdge.notifyChange(this, this.top);
		this.rightEdge.notifyChange(this, this.right);
		this.bottomEdge.notifyChange(this, this.bottom);
		this.leftEdge.notifyChange(this, this.left);
	}
	Face.prototype.rotateBack = function(){
		var forward = this.forwardDir;
		this.edgeCubelets.forEach(function(e){
			e.rotateAroundWorldAxis(forward,-Math.PI/2);
		});

		for(var i=0; i<this.top.length-1;++i) this.edgeCubelets.push(this.edgeCubelets.shift());

		this.refreshEdges();

		this.topEdge.notifyChange(this, this.top);
		this.rightEdge.notifyChange(this, this.right);
		this.bottomEdge.notifyChange(this, this.bottom);
		this.leftEdge.notifyChange(this, this.left);
	}

	// Face.prototype.rotateOnAxis = function(axis,angle){
	// 	this.edgeCubelets.forEach(function(e){
	// 		e.rotateAroundWorldAxis(axis,angle);
	// 	});
	// }


	Face.prototype.notifyChange = function(edge, cubelets){
		switch(edge){
			case this.topEdge:
				this.edgeCubelets[0]=cubelets[0];
				this.edgeCubelets[1]=cubelets[1];
				this.edgeCubelets[2]=cubelets[2];
				break;

			case this.rightEdge:
				this.edgeCubelets[2]=cubelets[0];
				this.edgeCubelets[3]=cubelets[1];
				this.edgeCubelets[4]=cubelets[2];
				break;

			case this.bottomEdge:
				this.edgeCubelets[4]=cubelets[0];
				this.edgeCubelets[5]=cubelets[1];
				this.edgeCubelets[6]=cubelets[2];
				break;
			case this.leftEdge:

				this.edgeCubelets[6]=cubelets[0];
				this.edgeCubelets[7]=cubelets[1];
				this.edgeCubelets[0]=cubelets[2];
				break;
		}

		this.refreshEdges();

	}

	return Face;
});