import React, { useEffect, useState } from "react";
import DrumMachine from "./components/DrumMachine";
import { AudioProvider } from "./components/AudioPlayer";
import Scene from "./components/scene";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useRandomSound } from "./components/randomSound";

const soundConfig = {
  nuevo: {
    min: 3,
    max: 31,
    build: (number) => {
      return `/sounds/mono-nuevo${number}.mp3`;
    },
  },
  sound2: {
    min: 0,
    max: 40,
    build: (number) => {
      return `/sounds/mono-Samples_ULLTECH${number}-Audio.mp3`;
    },
  },
};

export default function App() {
  return (
    <>
      <AudioProvider>
        <DrumMachine />
      </AudioProvider>
    </>
  );
}
