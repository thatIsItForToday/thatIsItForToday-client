import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    font-family: 'Open Sans', sans-serif, "ABeeZee";
    color: inherit;
  }

  *, :after, :before {
    box-sizing: border-box;
    flex-shrink: 0;
  }

  :root {
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  html, body {
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    width: 100vw;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  button {
    background: none;
    border :0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  #root .ql-container {
    border-bottom-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
    background: #fefcfc;
  }

  #root .ql-snow.ql-toolbar {
    display: block;
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }

  #root .ql-editor {
    min-height: 15rem;
  }
`;

export default GlobalStyle;
