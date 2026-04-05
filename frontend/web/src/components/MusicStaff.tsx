/**
 * SVG five-line staff with Beethoven's "Ode to Joy" melody
 * rendered as note heads. Used as a decorative hero background.
 *
 * Staff mapping (treble clef, y increases downward):
 *   Line 5 (F5) = y30 | Line 4 (D5) = y40 | Line 3 (B4) = y50
 *   Line 2 (G4) = y60 | Line 1 (E4) = y70
 *   Below staff: D4 = y75, C4 = y80 (ledger line)
 */

const STAFF_LINES = [30, 40, 50, 60, 70];

/* Pitch → y-position on the staff. */
const PITCH_Y: Record<string, number> = {
  F5: 30,
  E5: 35,
  D5: 40,
  C5: 45,
  B4: 50,
  A4: 55,
  G4: 60,
  F4: 65,
  E4: 70,
  D4: 75,
  C4: 80,
};

/**
 * Beethoven — "Ode to Joy" (Symphony No. 9, 4th mvt.)
 * Two 4-bar phrases in C major.
 */
const ODE_TO_JOY: string[] = [
  /* Bar 1 */ "E4", "E4", "F4", "G4",
  /* Bar 2 */ "G4", "F4", "E4", "D4",
  /* Bar 3 */ "C4", "C4", "D4", "E4",
  /* Bar 4 */ "E4", "D4", "D4",
  /* Bar 5 */ "E4", "E4", "F4", "G4",
  /* Bar 6 */ "G4", "F4", "E4", "D4",
  /* Bar 7 */ "C4", "C4", "D4", "E4",
  /* Bar 8 */ "D4", "C4", "C4",
];

/* Bar line positions (after beat 4 of each full bar). */
const BAR_INDICES = [4, 8, 12, 15, 19, 23, 27];

export function MusicStaff() {
  const startX = 60;
  const spacing = 24;
  const staffWidth = startX + ODE_TO_JOY.length * spacing + 20;

  return (
    <svg
      viewBox={`0 10 ${staffWidth} 80`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Staff lines */}
      {STAFF_LINES.map((y) => (
        <line
          key={y}
          x1={0}
          y1={y}
          x2={staffWidth}
          y2={y}
          stroke="currentColor"
          strokeWidth={0.6}
        />
      ))}

      {/* Treble clef (Unicode glyph) */}
      <text
        x={8}
        y={72}
        fontSize={42}
        fill="currentColor"
        fontFamily="serif"
      >
        {"\uD834\uDD1E"}
      </text>

      {/* Bar lines */}
      {BAR_INDICES.map((idx) => {
        const x = startX + idx * spacing - spacing / 2;
        return (
          <line
            key={`bar-${idx}`}
            x1={x}
            y1={STAFF_LINES[0]!}
            x2={x}
            y2={STAFF_LINES[4]!}
            stroke="currentColor"
            strokeWidth={0.5}
          />
        );
      })}

      {/* Note heads */}
      {ODE_TO_JOY.map((pitch, i) => {
        const cx = startX + i * spacing;
        const cy = PITCH_Y[pitch]!;
        const stemUp = cy >= 50;
        const stemX = stemUp ? cx + 3.5 : cx - 3.5;
        const stemY1 = stemUp ? cy - 1 : cy + 1;
        const stemY2 = stemUp ? cy - 22 : cy + 22;

        return (
          <g key={i}>
            {/* Ledger line for C4 (below staff) */}
            {pitch === "C4" && (
              <line
                x1={cx - 7}
                y1={80}
                x2={cx + 7}
                y2={80}
                stroke="currentColor"
                strokeWidth={0.6}
              />
            )}

            {/* Note head — slightly tilted filled ellipse */}
            <ellipse
              cx={cx}
              cy={cy}
              rx={4}
              ry={3}
              fill="currentColor"
              transform={`rotate(-12 ${cx} ${cy})`}
            />

            {/* Stem */}
            <line
              x1={stemX}
              y1={stemY1}
              x2={stemX}
              y2={stemY2}
              stroke="currentColor"
              strokeWidth={0.8}
            />
          </g>
        );
      })}

      {/* Final double bar line */}
      <line
        x1={staffWidth - 12}
        y1={STAFF_LINES[0]!}
        x2={staffWidth - 12}
        y2={STAFF_LINES[4]!}
        stroke="currentColor"
        strokeWidth={0.5}
      />
      <line
        x1={staffWidth - 8}
        y1={STAFF_LINES[0]!}
        x2={staffWidth - 8}
        y2={STAFF_LINES[4]!}
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  );
}
