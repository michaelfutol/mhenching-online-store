"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const lightColors = ["#f3cf72", "#d96a5f", "#78a98b", "#6e91b7", "#f0e6c8"];

function snowStyle(index: number): CSSProperties {
  const left = (index * 37 + 11) % 100;
  const delay = -((index * 1.7) % 12);
  const duration = 10 + (index % 8) * 1.3;
  const size = 2 + (index % 4);
  const drift = -16 + (index % 7) * 6;
  return {
    "--snow-left": `${left}%`,
    "--snow-delay": `${delay}s`,
    "--snow-duration": `${duration}s`,
    "--snow-size": `${size}px`,
    "--snow-drift": `${drift}px`
  } as CSSProperties;
}

function lightStyle(index: number): CSSProperties {
  return {
    "--light-color": lightColors[index % lightColors.length],
    "--light-delay": `${-(index % 9) * 0.43}s`,
    "--light-duration": `${3.8 + (index % 5) * 0.55}s`
  } as CSSProperties;
}

export function ChristmasAmbient() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("mhenching-christmas-magic");
    if (stored === "off") setEnabled(false);
  }, []);

  function toggle() {
    setEnabled((current) => {
      const next = !current;
      window.localStorage.setItem("mhenching-christmas-magic", next ? "gentle" : "off");
      return next;
    });
  }

  return (
    <>
      <div className={`christmas-ambient ${enabled ? "christmas-ambient--on" : "christmas-ambient--off"}`} aria-hidden="true">
        <div className="christmas-lights">
          {Array.from({ length: 26 }, (_, index) => (
            <span className="christmas-bulb" style={lightStyle(index)} key={index} />
          ))}
        </div>
        <div className="christmas-snow">
          {Array.from({ length: 34 }, (_, index) => (
            <span className="snowflake" style={snowStyle(index)} key={index} />
          ))}
        </div>
      </div>
      <button className="christmas-magic-toggle" type="button" onClick={toggle} aria-pressed={enabled}>
        <span aria-hidden="true">✦</span> Christmas magic: {enabled ? "Gentle" : "Off"}
      </button>
    </>
  );
}
