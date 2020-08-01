export default `
varying float vNoise;

void main() {
    // if(vNoise < 0.1) {
    //     gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    // } else {
    //     gl_FragColor = vec4(vec3(vNoise), 1.0);
    // }
    gl_FragColor = vec4(vec3(vNoise), 1.0);
}
`