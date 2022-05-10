import React, { useState, useEffect, useRef, useMemo } from "react";
import { Player } from "tone";
import Sound from "./sounds/weirdDrum.mp3";
import SecondSound from "./sounds/nuevo9.mp3";
import * as Tone from "tone";
import "./globals.css";
import { useRandomSound } from "./randomSound";

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

export const MyAudioContext = React.createContext({});

const initialFilterFrequencyOne = 5000;
const initialFilterFrequencyTwo = 5000;
const initialVolumeValueOne = 2;
const initialVolumeValueTwo = 2;
const initialPitchValueOne = 0.1;
const initialPitchValueTwo = 1;

export const AudioProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const sound1 = useRandomSound(counter, soundConfig.nuevo);
  const sound2 = useRandomSound(counter, soundConfig.sound2);
  const playerOne = useMemo(() => new Player(Sound), []);
  const playerTwo = useMemo(() => new Player(SecondSound), []);

  useEffect(() => {
    playerOne.load(sound1);
    playerTwo.load(sound2);
  }, [sound1, sound2, playerOne, playerTwo]);
  const [volumeValueOne, setVolumeValueOne] = useState(initialVolumeValueOne);
  useEffect(() => {
    playerOne.volume.value = volumeValueOne;
  }, [playerOne, volumeValueOne]);

  const [volumeValueTwo, setVolumeValueTwo] = useState(initialVolumeValueTwo);
  useEffect(() => {
    playerTwo.volume.value = volumeValueTwo;
  }, [playerTwo, volumeValueTwo]);

  const [pitchValueOne, setPitchValueOne] = useState(initialPitchValueOne);
  useEffect(() => {
    playerOne.playbackRate = pitchValueOne;
  }, [playerOne, pitchValueOne]);

  const [pitchValueTwo, setPitchValueTwo] = useState(initialPitchValueTwo);

  useEffect(() => {
    playerTwo.playbackRate = pitchValueTwo;
  }, [playerTwo, pitchValueTwo]);

  useEffect(() => {
    playerOne.loop = true;
    playerTwo.loop = true;
  }, [playerOne, playerTwo]);

  const filter = useRef();

  const [filterFrequencyOne, setFilterFrequencyOne] = useState(
    initialFilterFrequencyOne
  );

  useEffect(() => {
    filter.current = new Tone.BiquadFilter(
      initialFilterFrequencyOne,
      "lowpass"
    ).toDestination();
    playerOne.chain(filter.current);
  }, [playerOne, filter]);

  useEffect(() => {
    filter.current.set({ frequency: parseFloat(filterFrequencyOne) });
  }, [filterFrequencyOne, filter]);

  const filterTwo = useRef();
  const [filterFrequencyTwo, setFilterFrequencyTwo] = useState(
    initialFilterFrequencyTwo
  );

  useEffect(() => {
    filterTwo.current = new Tone.BiquadFilter(
      initialFilterFrequencyTwo,
      "lowpass"
    ).toDestination();
    playerTwo.chain(filterTwo.current);
  }, [playerTwo, filterTwo]);

  useEffect(() => {
    filterTwo.current.set({ frequency: parseFloat(filterFrequencyTwo) });
  }, [filterFrequencyTwo, filterTwo]);

  //LFO
  // useEffect(() => {
  // 	const lfo = new Tone.LFO("2n").start();
  // 	lfo.connect(pitchValueOne);
  //   }, [pitchValueOne]);

  return (
    <MyAudioContext.Provider
      value={{
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
        filterFrequencyTwo,
        setFilterFrequencyTwo,
        pitchValueTwo,
        setPitchValueTwo,
        setCounter,
      }}
    >
      {children}
    </MyAudioContext.Provider>
  );
};
