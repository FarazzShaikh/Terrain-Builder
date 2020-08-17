export const Island = `

float makeIsland(vec2 p)
{
    float dist = distance(p.xy,vec2(0.0));
    float height = 1.0 - dist / 0.8;

    height = height < 0.0 ? 0.0 : height;

    return height;
}
`