import React, { useEffect, useContext } from "react";
import { MyAudioContext } from "./AudioPlayer";
import * as Tone from "tone";
import "./globals.css";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./scene";

const random = (min, max) => Math.random() * (max - min) + min;
const Test = ()=> {
  
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
    setFilterFrequencyTwo
  } = useContext(MyAudioContext);
  console.log("Test", pitchValueOne)



  return null;
}
export default function TonePlayer() {
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
    setFilterFrequencyTwo
  } = useContext(MyAudioContext);
  console.log("TonPlayer", pitchValueOne)


  useEffect(() => {
    Tone.start();
  }, []);

  return (
    <div className="mainWrapper">
  


      <div className="boxContainer">
      <div className="controlContainer">
      <button className="negro-button"
        onClick={() => {
          setPitchValueOne(random(0.001, 2));
          setPitchValueTwo(random(0.001, 2));
          setFilterFrequencyOne(random(0, 8000));
          setFilterFrequencyTwo(random(0, 8000));
          setVolumeValueOne(random(-19, 3));
          setVolumeValueTwo(random(-19, 3));
        }}
      >  
      </button>
         
        <input type="range"
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
              <button className="negro-button" 
        onClick={() => {
          setPitchValueOne(random(0.001, 2));
          setPitchValueTwo(random(0.001, 2));
          setFilterFrequencyOne(random(0, 8000));
          setFilterFrequencyTwo(random(0, 8000));
          setVolumeValueOne(random(-19, 3));
          setVolumeValueTwo(random(-19, 3));
        }}
      >  
      </button> 
  
        <input type="range" 
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


        <input type="range"
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
         <input type="range"
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
        <Canvas shadows camera={{position:[0,0.4,0]}}> 
        <Test />
        <color attach="background" args={["white"]} />
       
        <Suspense fallback={null}>
          <Scene pitchValue={pitchValueOne} filterFrequency={filterFrequencyOne}  /> 
        </Suspense>
      </Canvas>
      </div>

      <div className="renderBox">
        <Canvas shadows camera={{position:[0,0.4,0]}}>
        <color attach="background" args={["white"]} />
     
        <Suspense fallback={null}>
          <Scene pitchValue={pitchValueTwo} filterFrequency={filterFrequencyTwo}/> 
        </Suspense>
      </Canvas>
      </div></div>
  
        <div className="volumeContainer">
        <input type="range"
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
        <input type="range"
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

<div className="buttonContainer">
        <button className="blackButton"
          type="button"
          onClick={() => {
            playerOne.start();
            playerTwo.start();
          }}
        >
          🔊
        </button>
        <button className="blackButton"
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
    </div>
  );
}
