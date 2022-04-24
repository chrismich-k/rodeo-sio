import { useRef } from "react";
import { useGLTF } from "@react-three/drei/";
import { useFrame } from "@react-three/fiber";

function AnotherModel({ pitchValue, filterFrequency, props }) {
  const group = useRef();
  useFrame(() => {
    group.current.rotation.x += pitchValue / 230;
    group.current.rotation.z += filterFrequency / 290000;
  });
  const { nodes, materials } = useGLTF("/Model2_Comp.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Form01002.geometry}
        material={materials["Default OBJ.002"]}
        rotation={[Math.PI / 2, 0, 0]}
        {...props}
      >
        <meshStandardMaterial
          wireframe
          color="white"
          metalness=".8"
          roughness="0"
        />
      </mesh>
    </group>
  );
}

export default AnotherModel;
