import { useEffect, useState } from "react";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function useRandomSound(tick, config) {
  const [sound, setSound] = useState(
    config.build(getRandomNumber(config.min, config.max))
  );
  useEffect(() => {
    setSound(config.build(getRandomNumber(config.min, config.max)));
  }, [tick, config]);
  return sound;
}
