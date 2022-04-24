import { useRef } from "react";
import { useGLTF } from "@react-three/drei/";
import { useFrame } from "@react-three/fiber";

function MasModel({ pitchValue, filterFrequency, props }) {
  const group = useRef();
  useFrame(() => {
    group.current.rotation.x += pitchValue / 130;
    group.current.rotation.z += filterFrequency / 630000;
  });
  const { nodes, materials } = useGLTF("/Model3_Comp.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Form01003.geometry}
        material={materials["Default OBJ.003"]}
        rotation={[Math.PI / 2, -3, 0]}
        {...props}
      >
        <meshStandardMaterial wireframe color="white" />
      </mesh>
    </group>
  );
}

export default MasModel;
