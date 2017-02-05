define(['three', 'app/Cubelet', 'app/Face'], function(THREE, Cubelet, Face){
	const colors = {
		red: 0xbb0000,
		green: 0x00bb44,
		blue: 0x0000aa,
		yellow: 0xccaa00,
		orange: 0xff5400,
		white: 0xffffff,
		black: 0x333333
	}



	function Cube(){
		THREE.Group.call(this);
		this.type = 'Cube';
		var cube = this;
		


		var f5 = new Cubelet().front(colors.red);
		var f8 = new Cubelet().front(colors.red).top(colors.white);
		var f6 = new Cubelet().front(colors.red).right(colors.blue);
		var f4 = new Cubelet().front(colors.red).left(colors.green);
		var f2 = new Cubelet().front(colors.red).bottom(colors.yellow);
		var f7 = new Cubelet().front(colors.red).left(colors.green).top(colors.white);
		var f9 = new Cubelet().front(colors.red).top(colors.white).right(colors.blue);
		var f1 = new Cubelet().front(colors.red).bottom(colors.yellow).left(colors.green);
		var f3 = new Cubelet().front(colors.red).right(colors.blue).bottom(colors.yellow);

		var c5 = new Cubelet();
		var c8 = new Cubelet().top(colors.white);
		var c6 = new Cubelet().right(colors.blue);
		var c4 = new Cubelet().left(colors.green);
		var c2 = new Cubelet().bottom(colors.yellow);
		var c7 = new Cubelet().left(colors.green).top(colors.white);
		var c9 = new Cubelet().top(colors.white).right(colors.blue);
		var c1 = new Cubelet().bottom(colors.yellow).left(colors.green);
		var c3 = new Cubelet().right(colors.blue).bottom(colors.yellow);

		var b5 = new Cubelet().back(colors.orange);
		var b8 = new Cubelet().back(colors.orange).top(colors.white);
		var b6 = new Cubelet().back(colors.orange).right(colors.blue);
		var b4 = new Cubelet().back(colors.orange).left(colors.green);
		var b2 = new Cubelet().back(colors.orange).bottom(colors.yellow);
		var b7 = new Cubelet().back(colors.orange).left(colors.green).top(colors.white);
		var b9 = new Cubelet().back(colors.orange).top(colors.white).right(colors.blue);
		var b1 = new Cubelet().back(colors.orange).bottom(colors.yellow).left(colors.green);
		var b3 = new Cubelet().back(colors.orange).right(colors.blue).bottom(colors.yellow);

		var cubelets = [
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
					var current = cubelets[layer+1][i+1][j+1];
					current.translateOnAxis(new THREE.Vector3(j, -i, -layer), 1);
					this.add(current);
				}
			}
		}

		this.front = [[f7,f8,f9],
					  [f4,f5,f6],
					  [f1,f2,f3]];

	}


	Cube.prototype = Object.assign(Object.create(THREE.Group.prototype),{constructor: Cube});


	Cube.prototype.rotateFront = function(){
		for (var i = 0; i < this.front.length; i++) {
			for (var j = 0; j < this.front[i].length; j++) {
				this.front[i][j].rotateAroundWorldAxis(new THREE.Vector3(0,0,1), -Math.PI/2);
			};
		};
	}



	return Cube;
});