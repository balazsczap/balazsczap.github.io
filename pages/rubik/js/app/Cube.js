define(['three', 'app/Cubelet', 'app/Face'], function(THREE, Cubelet, Face){
	const colors = {
		red: 0xff0000,
		green: 0x00ff00,
		blue: 0x0000ff,
		yellow: 0xffff00,
		orange: 0xFF4500,
		white: 0xffffff,
		black: 0x333333
	}

	function Cube(){
		THREE.Group.call(this);
		this.type = 'Cube';

		
		var f5 = new Cubelet(colors.red);
		this.add(f5);

		var f8 = new Cubelet(colors.red, colors.white);
		f8.translateY(1);
		// this.add(f8);

		var f6 = new Cubelet(colors.red, colors.blue);
		f6.translateX(1);
		f6.rotation.set(0,0,-Math.PI/2);
		// this.add(f6);

		var f4 = new Cubelet(colors.red, colors.green);
		f4.translateX(-1);
		f4.rotation.set(0,0,Math.PI/2);
		// this.add(f4);

		var f2 = new Cubelet(colors.red, colors.yellow);
		f2.translateY(-1);
		f2.rotation.set(0,0,Math.PI);
		// this.add(f2);

		var f7 = new Cubelet(colors.red, colors.green,  colors.white);
		f7.translateX(-1);
		f7.translateY(1);
		f7.rotation.set(0,0,Math.PI/2);
		// this.add(f7);

		var f9 = new Cubelet(colors.red, colors.white, colors.blue);
		f9.translateX(1);
		f9.translateY(1);
		f9.rotation.set(0,0,0);
		// this.add(f9);

		var f1 = new Cubelet(colors.red, colors.yellow, colors.green);
		f1.translateX(-1);
		f1.translateY(-1);
		f1.rotation.set(0,0,Math.PI);
		// this.add(f1);

		var f3 = new Cubelet(colors.red, colors.blue, colors.yellow);
		f3.translateX(1);
		f3.translateY(-1);
		f3.rotation.set(0,0,-Math.PI/2);
		// this.add(f3);

		this.front = new Face(f5, [f7,f8,f9], [f9,f6,f3], [f1,f2,f3], [f1,f4,f7]);
		this.add(this.front);


		var [b7,b8,b9,b4,b5,b6,b1,b2,b3] = [f7,f8,f9,f4,f5,f6,f1,f2,f3].map(function(f){
			var b = f.clone();

			return b;
		});
		
		b9.setRightColor(colors.green);
		b6.setTopColor(colors.green);
		b3.setTopColor(colors.green);
		b7.setTopColor(colors.blue);
		b4.setTopColor(colors.blue);
		b1.setRightColor(colors.blue);



		var [c7,c8,c9,c4,c5,c6,c1,c2,c3] = [f7,f8,f9,f4,f5,f6,f1,f2,f3].map(function(f){
			var c = f.clone();
			c.translateZ(-1);
			return c;
		});


		this.back = new Face(b5, [b7,b8,b9], [b9,b6,b3], [b1,b2,b3], [b1,b4,b7]);
		this.back.translateZ(-2);
		this.add(this.back);

		var i=0;
		this.back.children.forEach(function(f){
			f.translateZ(i++/2);
		})

		this.back.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI);
		// console.log(b5)


		// console.log(b5);

		// console.log(this.front.position);
		// console.log(f5.position);

		
		// var b5 = new Cubelet(colors.orange);
		// b5.translateZ(-2);
		// b5.rotation.set(0,Math.PI,0);
		// // this.add(f5);

		// var b8 = new Cubelet(colors.orange, colors.white);
		// b8.translateY(1);
		// b8.translateZ(-2);
		// b8.rotation.set(0,Math.PI,0);
		// // this.add(b8);

		// var b6 = new Cubelet(colors.orange, colors.blue);
		// b6.translateX(1);
		// b6.translateZ(-2);
		// b6.rotation.set(0,Math.PI,Math.PI/2);
		// // this.add(b6);

		// var b4 = new Cubelet(colors.orange, colors.green);
		// b4.translateX(-1);
		// b4.translateZ(-2);
		// b4.rotation.set(0,Math.PI,-Math.PI/2);
		// // this.add(b4);

		// var b2 = new Cubelet(colors.orange, colors.yellow);
		// b2.translateY(-1);
		// b2.translateZ(-2);
		// b2.rotation.set(0,Math.PI,Math.PI);
		// // this.add(b2);

		// var b7 = new Cubelet(colors.orange, colors.white,colors.green);
		// b7.translateX(-1);
		// b7.translateY(1);
		// b7.translateZ(-2);
		// b7.rotation.set(0,Math.PI,0);
		// // this.add(b7);

		// var b9 = new Cubelet(colors.orange, colors.blue, colors.white);
		// b9.translateX(1);
		// b9.translateY(1);
		// b9.translateZ(-2);
		// b9.rotation.set(0,Math.PI,Math.PI/2);
		// // this.add(b9);

		// var b1 = new Cubelet(colors.orange,  colors.green, colors.yellow);
		// b1.translateX(-1);
		// b1.translateY(-1);
		// b1.translateZ(-2);
		// b1.rotation.set(0,Math.PI,-Math.PI/2);
		// // this.add(b1);

		// var b3 = new Cubelet(colors.orange,  colors.yellow, colors.blue);
		// b3.translateX(1);
		// b3.translateY(-1);
		// b3.translateZ(-2);
		// b3.rotation.set(0,Math.PI,Math.PI);


		// var c7 = new Cubelet(colors.black, colors.green, colors.white);
		// c7.translateX(-1);
		// c7.translateY(1);
		// c7.translateZ(-1);
		// c7.rotation.set(0,0,Math.PI/2);

		// var c4 = new Cubelet(colors.black, colors.green);
		// c4.translateX(-1);
		// c4.translateY(0);
		// c4.translateZ(-1);
		// c4.rotation.set(0,0,Math.PI/2);

		// var c1 = new Cubelet(colors.black, colors.yellow, colors.green);
		// c1.translateX(-1);
		// c1.translateY(-1);
		// c1.translateZ(-1);
		// c1.rotation.set(0,0,Math.PI);

		// this.back = new Face(b5, [b7,b8,b9], [b9,b6,b3], [b1,b2,b3], [b1,b4,b7])
		// this.add(this.back);


		// this.left = new Face(c4, [b7,c7,f7], [f7,f4,f1], [b1,c1,f1], [b1,b4,b7]);
		// this.left.position.set(c4.position.x, c4.position.y, c4.position.z)
		// this.add(this.left);
		// console.log(this.left.position);
		// console.log(c4.position);
		// this.left.rotation.set(Math.PI/2,0,0);



		/*

		var underlay_cube = new THREE.Mesh(new THREE.BoxGeometry(0.999, 0.999, 0.999), new THREE.MeshPhongMaterial({color:underlay_color, side:THREE.DoubleSide}));
		this.add(underlay_cube);

		var Cube_geom = new THREE.PlaneGeometry(0.95,0.95);

		var front_mat=new THREE.MeshPhongMaterial({color:front, side: THREE.DoubleSide});
		var front_Cube=new THREE.Mesh(Cube_geom, front_mat);
		front_Cube.translateZ(0.5);

		this.add(front_Cube);
		if(top!==undefined){
			var top_mat=new THREE.MeshPhongMaterial({color:top, side: THREE.DoubleSide});
			var top_Cube=new THREE.Mesh(Cube_geom, top_mat);

			top_Cube.translateY(0.5);
			top_Cube.rotateOnAxis(new THREE.Vector3(1,0,0),Math.PI/2);

			this.add(top_Cube);
		}
		if(right!==undefined){
			var right_mat=new THREE.MeshPhongMaterial({color:right, side: THREE.DoubleSide});
			var right_Cube=new THREE.Mesh(Cube_geom, right_mat);

			right_Cube.translateX(0.5);
			right_Cube.rotateOnAxis(new THREE.Vector3(0,1,0),-Math.PI/2);

			this.add(right_Cube);
		}
		*/
	}


	Cube.prototype = Object.assign(Object.create(THREE.Group.prototype),{constructor: Cube});

	return Cube;
});