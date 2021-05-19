import styled, { css } from "styled-components";

const thubmOffsetY = "0.3em";
const thumbDiameter = "1.3em";
const trackColor = "white";
const thumbColor = "white";
const trackHeight = "2px";

const track = css`
  box-sizing: border-box;
  border: none;
  height: 4px;
  background: #ccced0;
  border-radius: 8px;
`;

const trackFill = css`
  ${track};
  height: ${trackHeight};
  background-color: transparent;
  background-image: linear-gradient(${trackColor}, ${trackColor}),
    linear-gradient(#ccced0, #ccced0);
  background-size: var(--sx) 6px, calc(100% - var(--sx)) 4px;
  background-position: left center, right center;
  background-repeat: no-repeat;
`;

const fill = css`
  height: ${thubmOffsetY};
  background: ${trackFill};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  border: 2px solid #111111;
  width: ${thumbDiameter};
  height: ${thumbDiameter};
  border-radius: 50%;
  background: ${thumbColor};
  box-shadow: 0px 0px 5px rgba(66, 97, 255, 0.5);
  cursor: pointer;
`;

export const Slider = styled.input`
  &,
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus {
    outline: none;
  }

  &:focus::-webkit-slider-thumb {
    outline: none;
  }

  &:focus::-moz-range-thumb {
    outline: none;
  }

  &:focus::-ms-thumb {
    outline: none;
  }

  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--val) - var(--min)) / var(--range));
  --sx: calc(0.5 * ${thumbDiameter} + var(--ratio) * (100% - ${thumbDiameter}));

  margin: 0;
  padding: 0;
  height: ${thumbDiameter};
  width: 100%;
  background: transparent;
  font: 1em/1 arial, sans-serif;

  &::-webkit-slider-runnable-track {
    ${trackFill};
  }

  &::-moz-range-track {
    ${track};
  }

  &::-ms-track {
    ${track};
  }

  &::-moz-range-progress {
    ${fill};
  }

  &::-ms-fill-lower {
    ${fill};
  }

  &::-webkit-slider-thumb {
    margin-top: calc(0.5 * (${thubmOffsetY} - ${thumbDiameter}));
    ${thumb};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-thumb {
    margin-top: 0;
    ${thumb};
  }

  &::-ms-tooltip {
    display: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }
`;
