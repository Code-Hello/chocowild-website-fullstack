import { css } from "styled-components";

// ----------------------
// Media queries
// ----------------------

const sizes = {
  xLarge: 1200,
  large: 1024,
  normal: 974,
  small: 768,
  xSmall: 576,
  xxSmall: 400,
};

const mediaMax = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${(sizes[label] - 1) / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

const mediaMin = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default {
  // Colors.
  white: "#f8f8f8",
  beige: "#f1d6a3",
  coffeeLight: "#e3b04b",
  coffee: "#e69f12",
  grey: "#3a3835",
  blackLight: "#2b2b28",
  black: "#0f0f0e",
  // Fonts.
  fontWeightNormal: 500,
  fontWeightBold: 900,
  // Media queries.
  mediaMax,
  mediaMin,
};
