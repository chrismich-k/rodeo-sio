import React, { useState, useEffect, useContext } from "react";
import { MyAudioContext } from "./AudioPlayer";
import * as Tone from "tone";
import "./globals.css";
import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Scene from "./scene";
import Scene2 from "./scene2";
import { Player } from "tone";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { Glitch } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import styled from "styled-components";
import Modal from "./Modal";

const random = (min, max) => Math.random() * (max - min) + min;

export default function TonePlayer() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const {
    playerOne,
    playerTwo,
    filterFrequencyOne,
    setFilterFrequencyOne,
    volumeValueOne,
    setVolumeValueOne,
    pitchValueOne,
    setPitchValueOne,
    volumeValueTwo,
    setVolumeValueTwo,
    pitchValueTwo,
    setPitchValueTwo,
    filterFrequencyTwo,
    setFilterFrequencyTwo,
    setCounter,
  } = useContext(MyAudioContext);

  useEffect(() => {
    Tone.start();
  }, []);

  return (
    <div className="mainWrapper">
      <div className="boxContainer">
        <div className="controlContainer">
          <button
            className="negro-button"
            onClick={() => {
              playerOne.stop();
              playerTwo.stop();
              setPitchValueOne(random(0.001, 2));
              setPitchValueTwo(random(0.001, 2));
              setFilterFrequencyOne(random(0, 8000));
              setFilterFrequencyTwo(random(0, 8000));
              setVolumeValueOne(random(-19, 3));
              setVolumeValueTwo(random(-19, 3));
              setCounter((previousState) => previousState + 1);
              playerOne.autostart = true;
              playerTwo.autostart = true;
            }}
          ></button>

          <input
            type="range"
            onChange={(event) => {
              setPitchValueOne(parseFloat(event.target.value));
              console.log(event.target.value);
            }}
            value={pitchValueOne}
            id="pitch-box"
            name="vol"
            min={0.001}
            max={2}
            step="0.1"
          ></input>
        </div>

        <div className="controlContainer">
          <button
            className="negro-button"
            onClick={() => {
              setPitchValueOne(random(0.01, 2));
              setPitchValueTwo(random(0.001, 2));
              setFilterFrequencyOne(random(0, 8000));
              setFilterFrequencyTwo(random(0, 8000));
              setVolumeValueOne(random(-19, 3));
              setVolumeValueTwo(random(-19, 3));
            }}
          ></button>

          <input
            type="range"
            onChange={(event) => {
              setPitchValueTwo(parseFloat(event.target.value));
              console.log(event.target.value);
            }}
            value={pitchValueTwo}
            id="pitch-box2"
            name="vol2"
            min={0.001}
            max={2}
            step="0.1"
          ></input>
        </div>
      </div>

      <div className="filterContainer">
        <div className="filterBox">
          <input
            type="range"
            onChange={(event) => {
              setFilterFrequencyOne(parseFloat(event.target.value));
              console.log(event.target.value);
            }}
            value={filterFrequencyOne}
            id="filterM"
            name="fil"
            min={0}
            max={8000}
            step="0.1"
          ></input>
        </div>

        <div className="filterBox">
          <input
            type="range"
            onChange={(event) => {
              setFilterFrequencyTwo(parseFloat(event.target.value));
              console.log(event.target.value);
            }}
            value={filterFrequencyTwo}
            id="filterM2"
            name="fil2"
            min={0}
            max={8000}
            step="0.1"
          ></input>
        </div>
      </div>

      <div className="renderContainer">
        <div className="renderBox">
          <Canvas shadows camera={{ position: [0, 0.1, 0] }}>
            <color attach="background" args={["white"]} />
            <EffectComposer>
              <Noise opacity={0.8} />
              <Vignette eskil={false} offset={0.1} darkness={0.51} />
              <Glitch
                delay={[0.3, 2]} // min and max glitch delay
                duration={[0.3, 1]} // min and max glitch duration
                strength={[pitchValueOne, pitchValueTwo]} // min and max glitch strength
                columns={[20]}
                mode={GlitchMode.SPORADIC} // glitch mode
                dtSize={[1]}
                active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                ratio={filterFrequencyOne} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
              />
            </EffectComposer>
            <Suspense fallback={null}>
              <Scene
                pitchValue={pitchValueOne}
                filterFrequency={filterFrequencyOne}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="renderBox">
          <Canvas shadows camera={{ position: [0, 0.4, 0] }}>
            <color attach="background" args={["white"]} />
            <EffectComposer>
              <Noise opacity={0.5} />
              <Vignette eskil={false} offset={0.1} darkness={0.51} />
              <Glitch
                delay={[0.3, 2]} // min and max glitch delay
                duration={[0.2, 1]} // min and max glitch duration
                strength={[pitchValueOne, pitchValueTwo]} // min and max glitch strength
                mode={GlitchMode.SPORADIC} // glitch mode
                active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                ratio={filterFrequencyTwo} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
              />
            </EffectComposer>

            <Suspense fallback={null}>
              <Scene2
                pitchValue={pitchValueTwo}
                filterFrequency={filterFrequencyTwo}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="volumeContainer">
        <input
          type="range"
          onChange={(event) => {
            setVolumeValueOne(parseFloat(event.target.value));
            console.log(event.target.value);
          }}
          value={volumeValueOne}
          id="volM1"
          name="vol"
          min={-90}
          max={3}
          step="0.1"
        ></input>
        <input
          type="range"
          onChange={(event) => {
            setVolumeValueTwo(parseFloat(event.target.value));
            console.log(event.target.value);
          }}
          value={volumeValueTwo}
          id="volM2"
          name="vol2"
          min={-90}
          max={3}
          step="0.1"
        ></input>

        <div className="image">
          <img src="/rodeoimagen2.jpg" alt="" />
        </div>

        <div className="buttonContainer">
          <button
            className="blackButton"
            type="button"
            onClick={() => {
              playerOne.start();
              playerTwo.start();
            }}
          >
            🔊
          </button>

          <button
            className="blackButton"
            type="button"
            onClick={() => {
              playerOne.stop();
              playerTwo.stop();
            }}
          >
            ᙮
          </button>
        </div>
      </div>
      <div>
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
            <Boton onClick={() => Tone.start()}>Enter App</Boton>
          </Contenido>
        </Modal>
      </div>
    </div>
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
