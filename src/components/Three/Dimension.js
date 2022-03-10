import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, MirroredRepeatWrapping } from "three";

import { IMAGE_URL } from "../../config/constants";

const Dimension = props => {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load(IMAGE_URL.DIMENSION, texture => {});

  useFrame(() => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    texture.repeat.set(1, 1);

    texture.offset.y -= 0.0001;
  });

  return (
    <mesh scale={8}>
      <planeBufferGeometry args={[2.2, 1, 1]} />
      <meshPhongMaterial map={texture} />
    </mesh>
  );
};

Dimension.propTypes = {};

export default Dimension;
