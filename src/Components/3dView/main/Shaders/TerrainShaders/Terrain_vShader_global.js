import { Displace } from "../ShaderChunks/Displace";
import { Erode } from "../ShaderChunks/Erode";
import { Island } from "../ShaderChunks/Island";

export default `
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