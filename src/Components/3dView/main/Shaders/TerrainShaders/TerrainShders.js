import { Displace } from "../ShaderChunks/Displace";
import { Erode } from "../ShaderChunks/Erode";
import { Island } from "../ShaderChunks/Island";

export const global = `
const int MAX_ITERATIONS = 7;


uniform float seed;
uniform float scale;
uniform float persistance;
uniform float lacunarity;
uniform float redistribution;
uniform float zscale;
uniform float xoff;
uniform float yoff;
uniform int octaves;

uniform bool island;

${Displace}
${Erode}
${Island}
`

export const main = `
vec2 offset = vec2(xoff, yoff);
float newZ = position.z + Displace(uv * 2.0, offset);
vec3 newPos = vec3(position.x, position.y, newZ);

vNoise = newPos.z;
if(island) {
	newPos.z *= makeIsland(newPos.xy * 2.0);
	vNoise = newPos.z;
}

//gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
vec3 transformed = vec3(newPos);
`