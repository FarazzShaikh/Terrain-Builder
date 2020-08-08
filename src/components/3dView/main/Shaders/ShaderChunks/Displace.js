import { sNoise } from "./sNoise";

export const Displace = `
${sNoise}
float Displace(vec2 uv, vec2 offset)
{
    float noise = 0.0;
    float totalAmplitude = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;

    float seedOffset = (seed * 100.0) + (seed * 10.0);

    for(int i = 0; i < MAX_ITERATIONS; i++)
    {
        if(i > octaves) {
            break;
        }
        totalAmplitude += amplitude;
        noise += snoise(((uv + offset + seedOffset) / scale) * frequency) * amplitude;
        frequency *= lacunarity;
        amplitude *= persistance;
    }

    float normalizedNoise = pow(((noise + 1.0) / 2.0), redistribution);
    vNoise = (normalizedNoise  / totalAmplitude);
    float final = (normalizedNoise  / totalAmplitude) * zscale;
    return final;
}
`