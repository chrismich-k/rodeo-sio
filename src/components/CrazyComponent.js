import { useRef } from "react";
import { useGLTF } from "@react-three/drei/";
import { useFrame } from "@react-three/fiber";

function CrazyComponent({ pitchValue, filterFrequency, props }) {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.x += pitchValue / 100;
    group.current.rotation.z += filterFrequency / 180000;

    // group.current.rotation.x += 0.1;
  });

  const { nodes, materials } = useGLTF("/jae_sofa.glb");

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        ref={group}
        geometry={nodes.Form01001.geometry}
        material={materials["Default OBJ"]}
        rotation={[Math.PI / 2, 0, 0]}
        {...props}
      >
        <meshStandardMaterial wireframe color="black" />
      </mesh>
    </group>
  );
}

export default CrazyComponent;
