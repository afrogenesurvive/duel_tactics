import React from "react";
import { images, ImageRefs } from "./imageResources";

export function ImagePreloader() {
  return (
    <>
      {Object.entries(images).map(([name, src]) => (
        <img
          key={name}
          ref={ImageRefs[name]}
          src={src}
          alt=""
          style={{ display: "none" }}
        />
      ))}
    </>
  );
}
