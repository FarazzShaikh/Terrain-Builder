const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Defaults = {
    INTERNAL_doesCaptureMap: false,

    META_ProjectName: 'unnamedProject',
    META_mDate: new Date().toLocaleString('en-US', dateOptions),

    GEN_Resolution: 256,
    GEN_Seed: Math.random(),
    GEN_Scale: 2,
    GEN_Persistance: 0.5,
    GEN_Lacunarity: 2,
    GEN_Octaves: 6,
    GEN_Redistribution: 1,
    GEN_zScale: 0.5,
    GEN_xOff: 0,
    GEN_yOff: 0,

    TIME_displace: 2000,

    MAP_Resolution: 256,
}

export default Defaults