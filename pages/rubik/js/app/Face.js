// define(['three', 'app/Edge'], function(THREE, Edge){
// 	var flattenUnique = (array,accum) => {
// 		array.forEach((e)=>Array.isArray(e)?flattenUnique(e,accum):accum.indexOf(e)<0?accum.push(e):1 );
// 		return accum;
// 	}
// 	var id_counter =0;
// 	function Face(cubelets, forwardDir){
// 		this.type = 'Face';
// 		this.id=id_counter++;
// 		/*
// 			7->8->9
// 				  |
// 			4	  6
// 			|	  |	
// 			1<-2<-3

// 		*/
// 		this.top = [cubelets[0][0], cubelets[0][1], cubelets[0][2]];
// 		this.right = [cubelets[0][2], cubelets[1][2], cubelets[2][2]];
// 		this.bottom = [cubelets[2][0], cubelets[2][1], cubelets[2][2]];
// 		this.left = [cubelets[0][0], cubelets[1][0], cubelets[2][0]];


// 		var upDir = new new THREE.Vector3().subVectors(cubelets[0][1].position, cubelets[1][1].position);
// 		var rightDir = new new THREE.Vector3().subVectors(cubelets[1][2].position, cubelets[1][1].position);
// 		if(forwardDir.z<0 || forwardDir.x <0 || forwardDir.y < 0){
// 			this.top.reverse();
// 			this.right.reverse();
// 			this.left.reverse();
// 			this.bottom.reverse();
// 		}

// 		// for(var i=0; i<cubelets.length;++i){
// 		// 	for(var j=0; j<cubelets[i].length;++j){
// 		// 		this.edgeCubelets.push(cubelets[i][j]);			
// 		// 	}
// 		// }



// 		// var upDir = new THREE.Vector3().subVectors(cubelets[0][1].position, cubelets[1][1].position);
// 		// var rightDir = new THREE.Vector3().subVectors(cubelets[1][2].position, cubelets[1][1].position);
// 		this.forwardDir = forwardDir;

// 	}



// 	Face.prototype.refreshEdges = function(){
// 		this.top = this.edgeCubelets.slice(0,3); 
// 		this.right = this.edgeCubelets.slice(2,5); 
// 		this.bottom = this.edgeCubelets.slice(4,7); 
// 		this.left = this.edgeCubelets.slice(6,8); 
// 		this.left.push(this.edgeCubelets[0]);	
// 	}

// 	// Face.prototype.refreshFullEdge = function(){
// 	// 	this.edgeCubelets = [this.top[0], this.top[1],  this.top[2],  this.right[1],  this.right[2], this.bottom[1], this.bottom[2], this.left[1], this.left[2]];
// 	// }

// 	Face.prototype.rotate = function(){

		// var allCubelets = flattenUnique([this.top,this.right,this.bottom,this.left],[]);

// 		var forward = this.forwardDir;
// 		allCubelets.forEach(function(e){
// 			e.rotateAroundWorldAxis(forward,Math.PI/2);
// 		});

// 		//temp variables for logical rotation
// 		var [top,right,bottom,left] = [this.left.slice(), this.top.slice(),this.right.slice(),this.bottom.slice()];
	
// 		// this.top=left;
// 		// this.right=top;
// 		// this.bottom = right;
// 		// this.left = bottom;

// 		// this.topEdge.notifyChange(this, this.top);
// 		// this.rightEdge.notifyChange(this, this.right);
// 		// this.bottomEdge.notifyChange(this, this.bottom);
// 		// this.leftEdge.notifyChange(this, this.left);

// 		this.topEdge.notifyChange(this, top);
// 		// this.rightEdge.notifyChange(this, right);
// 		// this.bottomEdge.notifyChange(this, bottom);
// 		// this.leftEdge.notifyChange(this, left);
// 	}
// 	// Face.prototype.rotateBack = function(){
// 	// 	var forward = this.forwardDir;
// 	// 	this.edgeCubelets.forEach(function(e){
// 	// 		e.rotateAroundWorldAxis(forward,-Math.PI/2);
// 	// 	});

// 	// 	for(var i=0; i<this.top.length-1;++i) this.edgeCubelets.push(this.edgeCubelets.shift());

// 	// 	this.refreshEdges();

// 	// 	this.topEdge.notifyChange(this, this.top);
// 	// 	this.rightEdge.notifyChange(this, this.right);
// 	// 	this.bottomEdge.notifyChange(this, this.bottom);
// 	// 	this.leftEdge.notifyChange(this, this.left);
// 	// }

// 	// Face.prototype.rotateOnAxis = function(axis,angle){
// 	// 	this.edgeCubelets.forEach(function(e){
// 	// 		e.rotateAroundWorldAxis(axis,angle);
// 	// 	});
// 	// }


// 	Face.prototype.notifyChange = function(edge, cubelets){
// 		// const commonIndex = (a, b) => {var i; a.forEach(function(e){
// 		// 			if(b.indexOf(e)>=0) i=b.indexOf(e);
// 		// 		});
// 		// 		return i;}
// 		switch(edge){
// 			case this.topEdge:
// 				// var topIndexForRight = commonIndex(this.right, this.top);
// 				// var topIndexForLeft = commonIndex(this.left,this.top);
// 				this.top = cubelets;
// 				this.left[0]=this.top[0];
// 				this.right[0]=this.top[2];

// 				break;
// 			case this.rightEdge:
// 				// var rightIndexForTop = commonIndex(this.top, this.right);
// 				// var rightIndexForBottom = commonIndex(this.bottom,this.right);
// 				this.right = cubelets;
// 				this.top[2]=this.right[0];
// 				this.bottom[2]=this.right[2];
// 				break;
// 			case this.bottomEdge:
// 				// var bottomIndexForRight = commonIndex(this.right, this.bottom);
// 				// var bottomIndexForLeft = commonIndex(this.left,this.bottom);
// 				this.bottom = cubelets;
// 				this.left[2]=this.bottom[0];
// 				this.right[2]=this.bottom[2];
// 				break;
// 			case this.leftEdge:
// 				// var leftIndexForTop = commonIndex(this.top, this.left);
// 				// var leftIndexForBottom = commonIndex(this.bottom,this.left);
// 				this.left = cubelets;
// 				this.top[0]=this.left[0];
// 				this.bottom[0]=this.left[2];
// 				break;
// 		}

// 	}

// 	return Face;
// });

// regexp: cubelets\[(\d)\]\[(\d)\]
// \{i:\1, j:\2\}
define(['three', 'app/Edge'], function(THREE, Edge){

	var id_counter =0;
	function Face(cube, indices, forwardDir){
		this.type = 'Face';
		this.id=id_counter++;
		this.cube = cube;
		// this.cubelets = cubelets;
		this.indices = indices;
		this.forwardDir = forwardDir;

		/*
			7->8->9
				  |
			4	  6
			|	  |	
			1<-2<-3
		*/

		

	}

	function indexWith(what, ind){
		console.log(what);
		console.log(ind);
		return what[ind[0]][ind[1]][ind[2]];
	}

	function indexWithAssign(what,ind,val){
		what[ind[0]][ind[1]][ind[2]] = val;
	}

	function flatten(arr){
		return arr.reduce(function(flat, toFlatten){
			return flat.concat(toFlatten);
		}, []);
	}
	Face.prototype.getFlatFromIndices = function(){
		var face = this;
		var flatIndices = flatten(this.indices);
		var cubelets = [];
		flatIndices.forEach(function(index){
			cubelets.push(indexWith(face.cube.cubelets, index));
		});

		return cubelets;
	}


	Face.prototype.rotate = function(){
		var face = this;
		face.rotateLogical();
		face.getFlatFromIndices().forEach(function(cubelet){
			cubelet.rotateAroundWorldAxis(face.forwardDir,Math.PI/2);
		});
	}

	Face.prototype.rotateLogical = function(){
		var cube = this.cube;
		var face = this;
		var ind = this.indices;
		
		var temp = indexWith(cube.cubelets, ind[0][0]);
		console.log(temp); 
	}

	// Face.prototype.refreshIndices = function(){
	// 	this.indices = [];
	// 	for(var i=0; i<this.cubelets.length;++i){
	// 		this.indices.push([]);
	// 		for(var j=0; j<this.cubelets[i].length;++j){
	// 			this.indices[i].push(this.cube.indexOf(this.cubelets[i][j]));
	// 		}
	// 	}
	// }

	// Face.prototype.refreshCubeletsFromCube = function(){
	// 	for(var i=0; i<this.cubelets.length;++i){
	// 		for(var j=0; j<this.cubelets[i].length;++j){
	// 			this.cubelets[i][j] = this.cube.elementAt(this.indices[i][j]);
	// 		}
	// 	}
	// }


	// Face.prototype.refreshCubeletsToCube = function(){
	// 	for(var i=0; i<this.cubelets.length;++i){
	// 		for(var j=0; j<this.cubelets[i].length;++j){
	// 			this.cube.assign(this.indices[i][j], this.cubelets[i][j]);
	// 		}
	// 	}
	// }

	// Face.prototype.rotateLogical = function(){

	// 	this.refreshCubeletsFromCube();

	// 	var cubelets_rotated = [];
	// 	cubelets_rotated.push([this.cubelets[2][0], this.cubelets[1][0], this.cubelets[0][0]]);
	// 	cubelets_rotated.push([this.cubelets[2][1], this.cubelets[1][1], this.cubelets[0][1]]);
	// 	cubelets_rotated.push([this.cubelets[2][2], this.cubelets[1][2], this.cubelets[0][2]]);
	// 	this.cubelets = cubelets_rotated;

	// 	this.refreshCubeletsToCube();

	// 	// for(var i=0; i<this.top.length-1;++i) this.edgeCubelets.push(this.edgeCubelets.shift());

	// 	// face.cube.updateCubelets(function(cubelets){
	// 	// 	for(var i=0; i<face.indices.length;++i){
	// 	// 		for(var j=0; j<face.indices[i].length;++j){
	// 	// 			var [cube_layer, cube_i, cube_j] = [face.edgeIndices.layer, face.edgeIndices.i, face.edgeIndices.j];
	// 	// 			cubelets[cube_layer][cube_i][cube_j] = cubelets_rotated[i][j];
	// 	// 		}
	// 	// 	}
	// 	// 	return cubelets;
	// 	// })

	
	// }
	return Face;
});

