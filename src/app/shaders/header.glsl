
gln_tFBMOpts pfbmOpts = gln_tFBMOpts(1.0, 0.4, 2.0, 2.5, 1.0, 5, false, false);

vec3 displace(vec3 point) {
  vec3 n = point;

  n.z = gln_normalize(gln_pfbm(n.xy, pfbmOpts) * 0.5) - 0.2;

  return n;
}
vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
                                       : vec3(0.0, -v.z, v.y));
}