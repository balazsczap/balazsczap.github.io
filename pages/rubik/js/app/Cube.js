define(['three', 'app/Cubelet', 'app/Face', 'app/Edge'], function(THREE, Cubelet, Face, Edge){
	const colors = {
		red: 0xbb0000,
		green: 0x00551c,
		blue: 0x000055,
		yellow: 0xccaa00,
		orange: 0xff5400,
		white: 0xffffff,
		black: 0x333333
	}

	function indexOf(array,item){
		function i_of(array, item, index_letter, index_obj){
			const nextChar = function(c){
				var code = c.charCodeAt(0);
				return String.fromCharCode(code+1);
			}

			if((index = array.indexOf(item))>=0){
				index_obj[index_letter] = index; 
				return index_obj
			}
			for(var i=0; i<array.length;++i){
				if(Array.isArray(array[i])){
					var ret;
					if((ret = i_of(array[i], item, nextChar(index_letter), index_obj))!=-1){
						ret[index_letter] = i;
						return ret;
					}

				}
			}
			return -1;
		}

		return i_of(array,item,'h', {});
	}

	function Cube(){
		THREE.Group.call(this);
		this.type = 'Cube';
		var cube = this;
		


		var f1 = new Cubelet().front(colors.red).bottom(colors.yellow).left(colors.green);
		var f2 = new Cubelet().front(colors.red).bottom(colors.yellow);
		var f3 = new Cubelet().front(colors.red).right(colors.blue).bottom(colors.yellow);
		var f4 = new Cubelet().front(colors.red).left(colors.green);
		var f5 = new Cubelet().front(colors.red);
		var f6 = new Cubelet().front(colors.red).right(colors.blue);
		var f7 = new Cubelet().front(colors.red).left(colors.green).top(colors.white);
		var f8 = new Cubelet().front(colors.red).top(colors.white);
		var f9 = new Cubelet().front(colors.red).top(colors.white).right(colors.blue);

		var c1 = new Cubelet().bottom(colors.yellow).left(colors.green);
		var c2 = new Cubelet().bottom(colors.yellow);
		var c3 = new Cubelet().right(colors.blue).bottom(colors.yellow);
		var c4 = new Cubelet().left(colors.green);
		var c5 = new Cubelet();
		var c6 = new Cubelet().right(colors.blue);
		var c7 = new Cubelet().left(colors.green).top(colors.white);
		var c8 = new Cubelet().top(colors.white);
		var c9 = new Cubelet().top(colors.white).right(colors.blue);

		var b1 = new Cubelet().back(colors.orange).bottom(colors.yellow).left(colors.green);
		var b2 = new Cubelet().back(colors.orange).bottom(colors.yellow);
		var b3 = new Cubelet().back(colors.orange).right(colors.blue).bottom(colors.yellow);
		var b4 = new Cubelet().back(colors.orange).left(colors.green);
		var b5 = new Cubelet().back(colors.orange);
		var b6 = new Cubelet().back(colors.orange).right(colors.blue);
		var b7 = new Cubelet().back(colors.orange).left(colors.green).top(colors.white);
		var b8 = new Cubelet().back(colors.orange).top(colors.white);
		var b9 = new Cubelet().back(colors.orange).top(colors.white).right(colors.blue);

		this.cubelets = [
		[[f7,f8,f9],
		 [f4,f5,f6],
		 [f1,f2,f3]],

		[[c7,c8,c9],
		 [c4,c5,c6],
		 [c1,c2,c3]],

		[[b7,b8,b9],
		 [b4,b5,b6],
		 [b1,b2,b3]]
		]; 


		for(var layer=-1; layer<=1;++layer){
			for(var i=-1; i<=1; ++i){
				for(var j=-1; j<=1; ++j){
					var current = this.cubelets[layer+1][i+1][j+1];
					current.translateOnAxis(new THREE.Vector3(j, -i, -layer), 1);
					this.add(current);
				}
			}
		}





		// this.front = new Face(this, this.cubelets[0], new THREE.Vector3(0,0,-1));
		// this.top = new Face(this, [[b7, b8, b9],
		// 					[c7, c8, c9],
		// 					[f7, f8, f9]], 
		// 					new THREE.Vector3(0,-1,0));
		// this.right = new Face(this, [[f9, c9, b9],
		// 						[f6, c6, b6],
		// 						[f3, c3, b3]], 
		// 						new THREE.Vector3(-1,0,0));
		// this.left = new Face(this, [[b7, f7, c7],
		// 						[b4, c4, f4],
		// 						[b1, c1, f1]], 
		// 						new THREE.Vector3(1,0,0));
		// this.bottom = new Face(this, [[b1, b2, b3],
		// 					[c1, c2, c3],
		// 					[f1, f2, f3]], 
		// 					new THREE.Vector3(0,1,0));
		// this.back = new Face(this, [[b7, b8, b9],
		// 					[b4, b5, b6],
		// 					[b1, b2, b3]],
		// 					new THREE.Vector3(0,0,1));	

		this.front = new Face(this, 
		   [[[0,0,0],[0,0,1],[0,0,2]],
			[[0,1,0],[0,1,1],[0,1,2]],
			[[0,2,0],[0,2,1],[0,2,2]]],
			 new THREE.Vector3(0,0,-1));

		this.top = new Face(this, 
		   [[[2,0,0],[2,0,1],[2,0,2]],
			[[1,0,0],[2,0,1],[2,0,2]],
			[[0,0,0],[2,0,1],[2,0,2]]],
			 new THREE.Vector3(0,-1,0));

		this.right = new Face(this, 
		   [[[0,0,2],[1,0,2],[2,0,2]],
			[[0,1,2],[1,1,2],[2,1,2]],
			[[0,2,2],[1,2,2],[2,2,2]]],
			 new THREE.Vector3(-1,0,0));

		this.left = new Face(this, 
		   [[[2,0,0],[1,0,2],[0,0,0]],
			[[2,1,0],[1,1,2],[0,1,0]],
			[[2,2,0],[1,2,2],[0,2,0]]],
			 new THREE.Vector3(1,0,0));

		this.bottom = new Face(this, 
		   [[[2,2,2],[2,2,1],[2,2,0]],
			[[1,2,2],[1,2,1],[1,2,0]],
			[[0,2,2],[0,2,1],[0,2,0]]],
			 new THREE.Vector3(0,1,0));

		this.back = new Face(this, 
		   [[[2,0,2],[2,0,1],[2,0,0]],
			[[2,1,2],[2,1,1],[2,1,0]],
			[[2,2,2],[2,2,1],[2,2,0]]],
			 new THREE.Vector3(0,0,1));






		//debug stuff
		this.front.name = "front";
		this.back.name = "back";
		this.top.name = "top";
		this.right.name = "right";
		this.left.name = "left";
		this.bottom.name = "bottom";


		// new Edge().topOf(this.top).topOf(this.back);
		// new Edge().rightOf(this.top).topOf(this.right);
		// new Edge().bottomOf(this.top).topOf(this.front);
		// new Edge().leftOf(this.top).topOf(this.left);

		// new Edge().topOf(this.bottom).bottomOf(this.back);
		// new Edge().rightOf(this.bottom).bottomOf(this.right);
		// new Edge().bottomOf(this.bottom).bottomOf(this.front);
		// new Edge().leftOf(this.bottom).bottomOf(this.left);

		// new Edge().rightOf(this.front).leftOf(this.right);
		// new Edge().leftOf(this.front).rightOf(this.left);
		// new Edge().rightOf(this.back).rightOf(this.right);
		// new Edge().leftOf(this.back).leftOf(this.left);

		// for (var i = 0; i < 4; i++) {
		// 	setTimeout(function(){
		// 		cube.bottom.rotate();
		// 	},500*(i+1));
		// }


		console.log(cube);
		// cube.top.rotate();
		// cube.bottom.rotate();
		// cube.left.rotate();
		// cube.back.rotate();
		
		// cube.front.rotate();
		// cube.top.rotate();
		// cube.left.rotate();
		// cube.right.rotate();
		// cube.back.rotate();
		// cube.bottom.rotate();

		// this.remove(this.front.bottom[1]);

	}


	Cube.prototype = Object.assign(Object.create(THREE.Group.prototype),{constructor: Cube});
	

	Cube.prototype.swap = function(current, next){
		var indexObj = indexOf(this.cubelets, current);
		this.cubelets[indexObj.h][indexObj.i][indexObj.j] = next;
	}

	Cube.prototype.indexOf = function(item){
		return indexOf(this.cubelets,item);
	}

	Cube.prototype.elementAt = function(indexObj){
		return this.cubelets[indexObj.h][indexObj.i][indexObj.j];
	}

	Cube.prototype.assign = function(indexObj, item){
		this.cubelets[indexObj.h][indexObj.i][indexObj.j] = item;
	}

	return Cube;
});