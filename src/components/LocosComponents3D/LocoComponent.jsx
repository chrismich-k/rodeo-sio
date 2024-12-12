import { useRef } from "react";
import { useGLTF } from "@react-three/drei/";
import { useFrame } from "@react-three/fiber";

function Model({ pitchValue, filterFrequency, props }) {
  const group = useRef();
  useFrame(() => {
    group.current.rotation.x += pitchValue / 50;
    group.current.rotation.z += filterFrequency / 630000;
  });
  const { nodes, materials } = useGLTF("/Model1_Comp.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        ref={group}
        geometry={nodes.Form01.geometry}
        material={materials["Default OBJ"]}
        rotation={[Math.PI / 0.7, 0, 0]}
        {...props}
      >
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

export default Model;
