const calcRem = size => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

const spacing = {
  small: calcRem(10),
  base: calcRem(12),
  lg: calcRem(14),
  xl: calcRem(16),
  xxl: calcRem(18),
  xxxl: calcRem(20),
};

const colors = {
  blue: "#2196f3",
  lightBlue: "#90caf9",
  white: "#ffffff",
  gray_1: "#222222",
  gray_2: "#767676",
  green_1: "#3cb46e",
};

const container = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  flexSpaceBetween: `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexSpaceAround: `
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  flexStartColumn: `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `,
  flexEnd: `
    display: flex;
    justify-content: flex-end;
    algin-items: center;
  `,
};

const theme = {
  fontSizes,
  spacing,
  colors,
  container,
};

export default theme;
