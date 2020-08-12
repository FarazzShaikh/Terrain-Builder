import { Displace } from "../ShaderChunks/Displace";

export default `
const int MAX_ITERATIONS = 7;
precision mediump float;

uniform float seed;
uniform float scale;
uniform float persistance;
uniform float lacunarity;
uniform float redistribution;
uniform float xoff;
uniform float yoff;
uniform int octaves;

const float zscale = 1.0;

attribute vec2 position;
varying vec3 fcolor;
varying vec2 vPos;

${Displace}

void main() {
    vec2 offset = vec2(xoff, yoff);
    float col = Displace(position + 1.0, offset);
    fcolor = vec3(col);
    vPos = position;
    gl_Position = vec4(position, 0, 1);
}
`