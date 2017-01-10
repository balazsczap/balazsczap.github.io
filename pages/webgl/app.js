var gl;
var shaderProgram;
function start(){
	var canvas = $("#glcanvas")[0];
	gl = initWebGL(canvas);

	if(!gl){
		return;
	}

	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	initShaders();
	initBuffers();

	setInterval(drawScene, 15);
}

function initWebGL(canvas){
	gl = null;
	gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	if(!gl){
		console.log("Unable to initialize WebGL");
	}

	return gl;
}

function getShader(gl, name, type){

	var shaderScript, source, currentChild, shader;
	source = shaders[name];


	shader = gl.createShader(type);

	gl.shaderSource(shader,source);
	gl.compileShader(shader);


	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {  
      console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));  
      gl.deleteShader(shader);
      return null;  
	}
	
	return shader;
}

function initShaders(){
	var vertexShader = getShader(gl, "shader-vs", gl.VERTEX_SHADER);
	var fragmentShader = getShader(gl, "shader-fs", gl.FRAGMENT_SHADER);

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader); 
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram); 

	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		console.log("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
	}

	gl.useProgram(shaderProgram);

	vertexPosAttrib = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPosAttrib);

}



function initBuffers(){


	
	squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [
	1.0,1.0,0.0,
	2.0,2.0,0,0,
	-1.0,1.0,0.0,
	1.0,-1.0,0.0,
	2.0,2.0,0,0,
	-1.0,-1.0,0.0

	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

var mvMatrix
var perspMatrix;


function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

function drawScene(){
	var screenWidth = $("#glcanvas").width();
	var screenHeight = $("#glcanvas").height();
	var horizAspect = screenHeight/screenWidth;

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	perspMatrix = makePerspective(45, 1/horizAspect, 0.1, 100.0);
	mvMatrix = Matrix.I(4);
	mvMatrix = mvMatrix.x(Matrix.Translation($V([-0.0, 0.0, -6.0])).ensure4x4());
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
	gl.vertexAttribPointer(vertexPosAttrib, 3, gl.FLOAT, false,0,0);
	setMatrixUniforms();
	gl.drawArrays(gl.TRIANGLES, 0, 5);
}