import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, MirroredRepeatWrapping } from "three";

import { IMAGE_URL } from "../../../config/constants";

const DimentionCylinder = ({ lights }) => {
  const textureRef = useRef();
  const meshRef = useRef();

  const textureLoader = new TextureLoader();
  const texture = textureLoader.load(IMAGE_URL.DIMENSION, texture => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    texture.repeat.set(1, 1);
  });

  useFrame((state, delta) => {
    meshRef.current.rotation.x = 89.5;
    meshRef.current.position.z += 0.015;

    lights.forEach(light => {
      light.current.position.z += 0.015;
    });

    texture.offset.y -= 0.003;
    texture.offset.x += 0.002;
  });

  return (
    <mesh ref={meshRef} scale={1} position={[0, 0, 0]}>
      <cylinderBufferGeometry args={[0, 12, 1, 64, 10, true, 30]} />
      <meshStandardMaterial map={texture} ref={textureRef} />
    </mesh>
  );
};

export default DimentionCylinder;
