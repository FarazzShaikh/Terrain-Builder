class T_Slider {
  constructor(def, min, max, step) {
    this.def = def;
    this.min = min;
    this.max = max;
    this.step = step;
  }
}

export const SLIDERS = {
  Octaves: new T_Slider(5, 1, 10, 1),
  Persistance: new T_Slider(0.5, 0.1, 1, 0.1),
  Lacunarity: new T_Slider(2, 0.1, 4, 0.1),
  Scale: new T_Slider(2, 0.1, 10, 0.1),
  OffsetX: new T_Slider(0, 0, 100, 1),
  OffsetY: new T_Slider(0, 0, 100, 1),
};

const _OPTIONS = {};

Object.keys(SLIDERS).map((k) => {
  _OPTIONS[k] = SLIDERS[k].def;
});

export const OPTIONS = _OPTIONS;
