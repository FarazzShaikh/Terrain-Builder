export const Erode = `

float rand(float p) {
    p = fract(p * .1031);
    p *= p + 19.19;
    p *= p + p;
    return fract(p);
}

float Erode(float C, float N, float S, float E, float W) {
    float raindropProb = rand(C);
    bool isRain = raindropProb > 0.01;
    
    float final = isRain ? 0.0 : 1.0;
    return final;
}
`