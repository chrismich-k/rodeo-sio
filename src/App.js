import React, { useState } from "react";
import DrumMachine from "./components/DrumMachine";
import { AudioProvider } from "./components/AudioPlayer";
// import Scene from "./components/scene";
// import { Canvas } from "@react-three/fiber";
// import { Suspense } from "react";
// import { useRandomSound } from "./components/randomSound";
import styled from "styled-components";
import Modal from "./components/Modal";
import * as Tone from "tone";

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
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  return (
    <>
      <ContenedorBotones>
        <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>
          PRESS TO RUMBLE
        </Boton>
      </ContenedorBotones>

      <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}>
        <Contenido>
          <h1>RODEO</h1>
          <p>
            rodeo is an intuitive tool to experiment with a wild range of
            sounds.
          </p>
          <Boton onClick={() => Tone.start()}>Aceptar</Boton>
        </Contenido>
      </Modal>

      <AudioProvider>
        <DrumMachine />
      </AudioProvider>
    </>
  );
}

const ContenedorBotones = styled.div`
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Boton = styled.button`
  display: block;
  padding: 10px 30px;
  border-radius: 100px;
  color: #fff;
  border: none;
  background: #1766dc;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  transition: 0.3s ease all;
  &:hover {
    background: #0066ff;
  }
`;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    margin-bottom: 20px;
  }
  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
`;
