import { ReferenceLink } from "@/components/reference-link";
import { deviceParts } from "@/data/device";
import styles from "./teaching-figures.module.css";

function Mos2Sheet({ offset = 0 }: { offset?: number }) {
  return (
    <g transform={`translate(0 ${offset})`}>
      <g fill="none" stroke="#b6a1e8" strokeWidth="2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${62 + i * 56} 55l28 28-28 28m28-28 28-28m-28 28 28 28`} />
        ))}
      </g>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <circle cx={62 + i * 56} cy="55" r="7" fill="#f6c453" stroke="#ad7509" />
          <circle cx={62 + i * 56} cy="111" r="7" fill="#f6c453" stroke="#ad7509" />
          {i < 6 ? <circle cx={90 + i * 56} cy="83" r="10" fill="#b49fea" stroke="#8b5cf6" /> : null}
        </g>
      ))}
      <g fill="currentColor" fontSize="18">
        <text x="427" y="61">S</text>
        <text x="427" y="89">Mo</text>
        <text x="427" y="117">S</text>
      </g>
    </g>
  );
}

export function Mos2StructureFigure() {
  return (
    <figure className={styles.figure}>
      <div className={styles.comparison}>
        <div className={styles.diagram}>
          <h3>One monolayer, three atomic planes</h3>
          <svg viewBox="0 0 480 260" role="img" aria-label="Side-view projection of one MoS₂ monolayer: a molybdenum plane between two sulfur planes.">
            <Mos2Sheet offset={40} />
            <path d="M30 95h-9v56h9" fill="none" stroke="var(--muted)" strokeWidth="2" />
            <text x="62" y="212" fill="currentColor" fontSize="18">Sulfur–molybdenum–sulfur</text>
          </svg>
          <p>
            A semiconducting 1H sheet has trigonal-prismatic coordination.
            A monolayer contains all three planes; it is not one plane of atoms.
          </p>
        </div>
        <div className={styles.diagram}>
          <h3>A bilayer contains two sheets</h3>
          <svg viewBox="0 0 480 260" role="img" aria-label="Side-view projection of a MoS₂ bilayer with two sulfur–molybdenum–sulfur sheets separated by an interlayer gap; lateral stacking registry is not represented.">
            <Mos2Sheet offset={-25} />
            <Mos2Sheet offset={105} />
            <path d="M30 86h-9v74h9" fill="none" stroke="var(--muted)" strokeWidth="2" />
            <text x="62" y="131" fill="var(--muted)" fontSize="18">Interlayer gap</text>
          </svg>
          <p>
            Interlayer coupling and lateral registry affect the bands. Ideal
            2H and 3R stacking differ in how neighbouring sheets align.
          </p>
        </div>
      </div>
      <figcaption>
        Original conceptual side-view projections, not microscopy or molecular
        dynamics. Distances and sphere sizes are illustrative; full coordination
        and 2H/3R registry cannot be read from these projections.
        <ReferenceLink id="engineering2024" from="/why-mos2#atomic-structure" />
        <ReferenceLink id="yang-stacking2026" from="/why-mos2#atomic-structure" />
      </figcaption>
    </figure>
  );
}

export function TransistorStructureFigure() {
  return (
    <figure className={styles.figure}>
      <svg className={styles.crossSection} viewBox="0 0 520 280" role="img" aria-label="Conceptual top-gated MoS₂ transistor cross-section. Gold source and drain contact the channel. A chromium/gold top gate sits on HfO₂ above the channel, while a separate SiO₂ support oxide and silicon substrate sit below.">
        <rect x="140" y="195" width="310" height="60" rx="3" fill="#66717b" />
        <rect x="140" y="150" width="310" height="45" fill="#bb905d" />
        <rect x="140" y="140" width="310" height="10" fill="#b49fea" />
        <rect x="144" y="87" width="60" height="53" rx="3" fill="#d6ad55" />
        <rect x="376" y="87" width="60" height="53" rx="3" fill="#d6ad55" />
        <rect x="208" y="87" width="164" height="53" rx="3" fill="#62b7b4" />
        <rect x="235" y="50" width="110" height="37" rx="3" fill="#d6ad55" />
        <g fill="currentColor" fontSize="18" textAnchor="middle">
          <text x="290" y="33">Cr/Au top gate</text>
          <text x="174" y="72">Au source</text>
          <text x="406" y="72">Au drain</text>
          <text x="295" y="232">Silicon substrate</text>
        </g>
        <g fill="#111e2d" fontSize="18" textAnchor="middle">
          <text x="290" y="120">HfO₂ dielectric</text>
          <text x="295" y="179">SiO₂ support oxide</text>
        </g>
        <path d="M108 145h27" fill="none" stroke="var(--muted)" strokeWidth="2" />
        <g fill="currentColor" fontSize="18">
          <text x="5" y="132">MoS₂</text>
          <text x="5" y="155">channel</text>
        </g>
      </svg>
      <figcaption>
        Original conceptual cross-section with cited material examples, not a
        replica of one measured device. Thicknesses are exaggerated. The HfO₂
        gate dielectric and SiO₂ support oxide have different roles; contact
        barriers and electric-field distributions are not computed.
        <ReferenceLink id="radis2011" from="/device#interactive-device" />
      </figcaption>
    </figure>
  );
}

export function DeviceComponentRoles() {
  return (
    <dl className={styles.roles}>
      {deviceParts.map((part) => (
        <div key={part.id}>
          <dt>{part.name}</dt>
          <dd>{part.material}</dd>
          <dd>{part.role}</dd>
        </div>
      ))}
    </dl>
  );
}

function InterfaceCrossSection({ seeded }: { seeded: boolean }) {
  return (
    <svg viewBox="0 0 480 260" role="img" aria-label={seeded
      ? "Conceptual cross-section with an insulating carbon-dot assembly between the MoS₂ channel and a continuous HfO₂ film."
      : "Conceptual bare-MoS₂ control with discontinuous HfO₂ islands and gaps, without a carbon-dot assembly."}>
      <rect x="25" y="190" width="430" height="38" rx="3" fill="#53677c" />
      <rect x="25" y="171" width="430" height="19" fill="#b49fea" />
      {seeded ? (
        <>
          <rect x="25" y="95" width="430" height="58" rx="4" fill="#62b7b4" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
            <ellipse key={i} cx={40 + i * 31} cy="163" rx="13" ry="7" fill="#80dedc" />
          ))}
          <text x="240" y="75" fill="currentColor" textAnchor="middle" fontSize="18">Continuous HfO₂ film</text>
        </>
      ) : (
        <>
          <path d="M25 171v-34q0-25 25-25h36q25 0 25 25v34m39 0v-49q0-28 28-28h39q28 0 28 28v49m48 0v-24q0-27 27-27h16q27 0 27 27v24m35 0v-45q0-28 28-28h19v73" fill="#62b7b4" />
          <text x="240" y="75" fill="currentColor" textAnchor="middle" fontSize="18">Discontinuous HfO₂ islands</text>
        </>
      )}
      <g fill="#111e2d" textAnchor="middle" fontSize="17">
        <text x="240" y="186">MoS₂ channel</text>
      </g>
      <text x="240" y="216" fill="currentColor" textAnchor="middle" fontSize="18">Supporting stack</text>
      {seeded ? <text x="240" y="253" fill="currentColor" textAnchor="middle" fontSize="18">Carbon dots at the interface</text> : null}
    </svg>
  );
}

export function InterfaceComparisonFigure() {
  return (
    <figure className={styles.figure}>
      <div className={styles.comparison}>
        <div className={styles.diagram}>
          <h3>Without carbon dots</h3>
          <InterfaceCrossSection seeded={false} />
          <p>
            The bare-surface control shows discontinuous oxide growth. Gaps in
            a film and its measured electrical properties are different tests.
          </p>
        </div>
        <div className={styles.diagram}>
          <h3>With carbon dots</h3>
          <InterfaceCrossSection seeded />
          <p>
            Functional groups at dot edges assist HfO₂ nucleation. The insulating
            assembly remains between the semiconductor and the high-κ oxide.
          </p>
        </div>
      </div>
      <figcaption>
        Original conceptual comparison based on Wong et al., not an experimental
        image or a reproduced publisher figure. Dot placement, gaps and layer
        thicknesses are illustrative. The carbon dots are not a conducting
        graphene sheet; this diagram predicts no leakage, yield or lifetime.
        <ReferenceLink id="wong2026" from="/discoveries/mos2-interface-breakthrough#interactive-stack" />
      </figcaption>
    </figure>
  );
}
