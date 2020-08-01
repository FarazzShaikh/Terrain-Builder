import { Displace } from "../ShaderChunks/Displace";

export default `
const int MAX_ITERATIONS = 7;

uniform float scale;
uniform float persistance;
uniform float lacunarity;
uniform float redistribution;
uniform float zScale;
uniform float xOff;
uniform float yOff;
uniform int octaves;

${Displace}

void main() {
  vec2 offset = vec2(xOff, yOff);
  float newZ = position.z + Displace(uv * 2.0, offset);
  vec3 newPos = vec3(position.x, position.y, newZ);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`