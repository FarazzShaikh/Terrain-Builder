export default `
precision mediump float;
varying vec3 fcolor;
varying vec2 vPos;

void main() {
    gl_FragColor = vec4(fcolor, 1.0);
}
`