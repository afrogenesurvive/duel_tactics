import React from "react";
import { images, ImageRefs } from "./imageResources";

export function ImagePreloader({ refsSource }) {
  return (
    <>
      {/* {Object.entries(images).map(([name, src]) => (
        <img
          key={name}
          ref={ImageRefs[name]}
          src={src}
          alt=""
          style={{ display: "none" }}
        />
      ))} */}
      {Object.entries(images).map(([refKey, src]) => {
        const ref = refsSource?.[refKey];
        if (!ref) return null;

        // change className based on image??

        return (
          <img key={refKey} ref={ref} src={src} alt="" className="hidden playerImgs" />
        );
      })}
    </>
  );
}
