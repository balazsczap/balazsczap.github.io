var vertexShader=
`
attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`.trim();




var fragmentShader=
`
void main(void) {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`.trim();



var shaders = {
	"shader-vs": vertexShader,
	"shader-fs": fragmentShader
};



