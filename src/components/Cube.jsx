import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures.js";
import { useStore } from "../hooks/useStore.js";
import { useState } from "react";

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [removeCube] = useStore(state => [state.removeCube])
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const activeTexture = textures[texture + "Texture"];

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered();
      }}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        if (e.altKey) {
          removeCube(id);
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? 'grey' : 'white'}
        transparent
        map={activeTexture}
        attach='material'
      />
    </mesh>
  );
};
