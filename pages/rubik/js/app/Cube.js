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

		this.front = new Face(cubelets[0], new THREE.Vector3(0,0,-1));
		this.top = new Face([[b7, b8, b9],
							[c7, c8, c9],
							[f7, f8, f9]], 
							new THREE.Vector3(0,-1,0));
		this.right = new Face([[f9, c9, b9],
								[f6, c6, b6],
								[f3, c3, b3]], 
								new THREE.Vector3(-1,0,0));
		this.left = new Face([[f7, c7, b7],
								[f4, c4, b4],
								[f1, c1, b1]], 
								new THREE.Vector3(1,0,0));
		this.bottom = new Face([[b1, b2, b3],
							[c1, c2, c3],
							[f1, f2, f3]], 
							new THREE.Vector3(0,1,0));
		this.back = new Face(cubelets[2], new THREE.Vector3(0,0,1));



		//debug stuff
		this.front.name = "front";
		this.back.name = "back";
		this.top.name = "top";
		this.right.name = "right";
		this.left.name = "left";
		this.bottom.name = "bottom";


		new Edge().topOf(this.top).topOf(this.back);
		new Edge().rightOf(this.top).topOf(this.right);
		new Edge().bottomOf(this.top).topOf(this.front);
		new Edge().leftOf(this.top).topOf(this.left);

		new Edge().topOf(this.bottom).bottomOf(this.back);
		new Edge().rightOf(this.bottom).bottomOf(this.right);
		new Edge().bottomOf(this.bottom).bottomOf(this.front);
		new Edge().leftOf(this.bottom).bottomOf(this.left);

		new Edge().rightOf(this.front).leftOf(this.right);
		new Edge().leftOf(this.front).rightOf(this.left);
		new Edge().rightOf(this.back).rightOf(this.right);
		new Edge().leftOf(this.back).leftOf(this.left);

		// for (var i = 0; i < 4; i++) {
		// 	setTimeout(function(){
		// 		cube.bottom.rotate();
		// 	},500*(i+1));
		// }

		// cube.front.rotate();
		// cube.right.rotate();
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


	return Cube;
});