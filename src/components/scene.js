import { OrbitControls } from "@react-three/drei";
import Model from "./LocosComponents3D/LocoComponent";
import MasModel from "./LocosComponents3D/MasComponent";

const Scene = ({ pitchValue, filterFrequency }) => {
  return (
    <group>
      <ambientLight intensity={0.01} />
      <spotLight castShadow intensity={1} position={[1, 0.5, 2]} />
      <OrbitControls />
      <Model pitchValue={pitchValue} filterFrequency={filterFrequency} />
      <MasModel pitchValue={pitchValue} filterFrequency={filterFrequency} />
    </group>
  );
};

export default Scene;
