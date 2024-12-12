import React from "react";
import "./Poti.css";

export default function Poti(props) {
  return (
    <input
      value={props.value}
      type="range"
      onChange={props.volume}
      min={props.type === "vol"}
      {...props}
    ></input>
  );
}
