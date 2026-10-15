import {
  atomicColors,
  createAtomicStructure,
} from "@/lib/science/atomic-structure";
import styles from "./home-material-motifs.module.css";

const structures = {
  graphene: createAtomicStructure("graphene", 1, "2H", 1),
  mos2: createAtomicStructure("mos2", 1, "2H", 1),
};
const motifs = [
  {
    className: styles.graphene,
    structure: structures.graphene,
  },
  {
    className: styles.mos2,
    structure: structures.mos2,
  },
  {
    className: styles.graphene + " " + styles.echo,
    structure: structures.graphene,
  },
  {
    className: styles.mos2 + " " + styles.echo,
    structure: structures.mos2,
  },
];

// Original decorative projections of the lab's ideal lattices, not measurement data.
export function HomeMaterialMotifs() {
  return (
    <div className={styles.field} aria-hidden="true">
      {motifs.map(({ className, structure }) => (
        <div key={className} className={styles.motif + " " + className}>
          <div className={styles.turn}>
            <svg viewBox="-145 -110 290 220" fill="none" focusable="false">
              <g stroke="#9cbed1" strokeWidth="1.3" strokeLinecap="round">
                {structure.bonds.map(({ a, b }) => (
                  <line
                    key={a + "-" + b}
                    x1={structure.atoms[a].position[0] * 20}
                    y1={
                      structure.atoms[a].position[2] * 20 -
                      structure.atoms[a].position[1] * 13
                    }
                    x2={structure.atoms[b].position[0] * 20}
                    y2={
                      structure.atoms[b].position[2] * 20 -
                      structure.atoms[b].position[1] * 13
                    }
                  />
                ))}
              </g>
              {structure.atoms
                .toSorted((a, b) => a.position[1] - b.position[1])
                .map((atom) => (
                  <circle
                    key={atom.kind + ":" + atom.position.join(",")}
                    cx={atom.position[0] * 20}
                    cy={atom.position[2] * 20 - atom.position[1] * 13}
                    r={
                      atom.element === "C" ? 4.2 : atom.element === "Mo" ? 5.4 : 4.4
                    }
                    fill={atomicColors[atom.kind]}
                    stroke="#d9e8f1"
                    strokeWidth="0.65"
                  />
                ))}
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
