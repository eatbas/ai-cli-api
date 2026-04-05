import { useId } from "react";

/**
 * Decorative piano-key strip used as a section divider.
 * Renders one octave (7 white keys + 5 black keys) as a tiling SVG pattern.
 */
export function PianoKeyDivider() {
  const patternId = `pk-${useId().replace(/:/g, "")}`;

  /* One octave = 7 white keys each 10 units wide = 70 units.
     Black keys (C# D# F# G# A#) sit between the appropriate pairs. */
  const whiteKeyXs = [0, 10, 20, 30, 40, 50, 60];
  const blackKeyXs = [7, 17, 37, 47, 57];

  return (
    <div className="w-full h-3" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="70"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            {whiteKeyXs.map((x) => (
              <rect
                key={`w${x}`}
                x={x}
                y={0}
                width={10}
                height={12}
                fill="white"
                stroke="#d4d4d4"
                strokeWidth={0.4}
              />
            ))}
            {blackKeyXs.map((x) => (
              <rect
                key={`b${x}`}
                x={x}
                y={0}
                width={6}
                height={7.5}
                fill="black"
                rx={0.6}
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
