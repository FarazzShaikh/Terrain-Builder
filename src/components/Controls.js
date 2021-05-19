import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { SLIDERS } from "../Defaults";
import { Slider } from "./Slider";

const _SliderContainer = styled.div`
  width: 80%;
  color: white;
  margin: 15px 0px;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const ControlsContainer = styled.div`
  width: 25vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function SliderContainer({ label, def, min, max, step, onChange }) {
  const [value, setValue] = useState(def);

  function onSliderChange(e) {
    onChange({
      [label]: Number(e.target.value),
    });
  }

  return (
    <_SliderContainer>
      <SliderLabel>
        {label}
        <div>{value ?? "xxx"}</div>
      </SliderLabel>
      <Slider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onMouseUp={onSliderChange}
      />
    </_SliderContainer>
  );
}

function createSliders(options, setOptions) {
  function onChange(newOpt) {
    setOptions({ ...options, ...newOpt });
  }

  return Object.keys(SLIDERS).map((k, i) => {
    return (
      <SliderContainer
        key={i} // 👈 Use index as unique key
        label={k} // 👈 Use the key as a lebel
        {...SLIDERS[k]} // 👈 Use the option's properies as props
        onChange={onChange}
      />
    );
  });
}

export default function Controls({ options, setOptions }) {
  return (
    <ControlsContainer>{createSliders(options, setOptions)}</ControlsContainer>
  );
}
