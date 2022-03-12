import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";

const CanvasContainer = ({ children }) => {
  return (
    <BackgroundContainer>
      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={1.2} position={[1, 1, 0]} />
        {children}
      </Canvas>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 10vh;
  left: 0;
  z-index: -10;
  width: 100vw;
  height: 90vh;
`;

export default CanvasContainer;
