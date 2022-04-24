import { OrbitControls } from "@react-three/drei";
import CrazyComponent from "./LocosComponents3D/CrazyComponent";
import AnotherModel from "./LocosComponents3D/EsteComponent";

const Scene2 = ({ pitchValue, filterFrequency }) => {
  return (
    <group>
      <ambientLight intensity={0.1} />
      <spotLight castShadow intensity={0.5} position={[1, 1, 3]} />
      <OrbitControls />
      <CrazyComponent
        pitchValue={pitchValue}
        filterFrequency={filterFrequency}
      />
      <AnotherModel pitchValue={pitchValue} filterFrequency={filterFrequency} />
    </group>
  );
};

export default Scene2;
