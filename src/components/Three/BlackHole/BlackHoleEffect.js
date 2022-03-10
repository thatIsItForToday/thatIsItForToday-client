import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";

import DimentionCylinder from "./DimensionCylinder";

const BlackHoleEffect = () => {
  const lightRefOne = useRef();
  const lightRefTwo = useRef();

  return (
    <Container>
      <Canvas>
        <pointLight
          ref={lightRefOne}
          color="white"
          intensity={10}
          distance={8}
          position={[0, 0, 1]}
        />
        <pointLight
          ref={lightRefTwo}
          color="white"
          intensity={18}
          distance={3}
          position={[0, 0, 0]}
        />
        <ambientLight intensity={1.5} position={[3, 3, 0]} />
        <DimentionCylinder lights={[lightRefOne, lightRefTwo]} />
      </Canvas>
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5000;
`;

export default BlackHoleEffect;
