// import { useFrame } from "@react-three/fiber";
// import { useState, useRef, useContext } from "react";
// import { MyAudioContext } from "./AudioPlayer";


// const Box =  ({pitchValue,filterFrequency}) => {

//   const box = useRef();
//   useFrame(() => {
//     box.current.rotation.x += (pitchValue/100);
//     box.current.rotation.z += (filterFrequency/100000)
//   });

//   return (
//     <>
//       <mesh
//         ref={box}
//         castShadow
//         receiveShadow
    
//       >
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial
//           color="white"
//           metalness=".8"
//           roughness="0"
//         />
//       </mesh>
      
//     </>
//   );
// };

// export default Box;
