import { Displace } from "../ShaderChunks/Displace";
import { Erode } from "../ShaderChunks/Erode";

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

${Displace}
${Erode}

void main() {
  vec2 offset = vec2(xoff, yoff);
  float newZ = position.z + Displace(uv * 2.0, offset);
  vec3 newPos = vec3(position.x, position.y, newZ);

  // float C = Displace(uv * 2.0, offset);
  // float N = Displace(vec2((uv.x) * 2.0, (uv.y + 1.0) * 2.0), offset);
  // float S = Displace(vec2((uv.x) * 2.0, (uv.y - 1.0) * 2.0), offset);
  // float E = Displace(vec2((uv.x + 1.0) * 2.0, (uv.y) * 2.0), offset);
  // float W = Displace(vec2((uv.x - 1.0) * 2.0, (uv.y) * 2.0), offset);

  // float newZ = Erode(C, N, E, S, W);
  // vec3 newPos = vec3(position.x, position.y, newZ);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`