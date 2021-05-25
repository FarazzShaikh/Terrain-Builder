
uniform int uOctaves;
uniform float uPersistance;
uniform float uLacunarity;
uniform float uScale;
uniform float uOffsetX;
uniform float uOffsetY;

vec3 displace(vec3 point) {
  gln_tFBMOpts pfbmOpts = gln_tFBMOpts(1.0, uPersistance, uLacunarity, uScale,
                                       1.0, uOctaves, false, false);

  vec3 n = point;

  vec2 offset = vec2(uOffsetX / 100.0, uOffsetY / 100.0);

  n.z = gln_normalize(gln_pfbm(n.xy + offset, pfbmOpts) * 0.5) - 0.2;

  return n;
}
vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
                                       : vec3(0.0, -v.z, v.y));
}