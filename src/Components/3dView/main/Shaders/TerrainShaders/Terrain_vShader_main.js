export default `
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