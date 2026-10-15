export const sizeScaleExamples = [
  { label: "Carbon C–C bond", measurement: "Bond length in graphene", nm: 0.142, reference: "neto2009" },
  { label: "Graphene lattice", measurement: "In-plane lattice constant", nm: 0.246, reference: "neto2009" },
  { label: "Graphite layers", measurement: "Interlayer spacing", nm: 0.34, reference: "neto2009" },
  { label: "MoS₂ monolayer", measurement: "Nominal layer thickness", nm: 0.65, reference: "radis2011" },
  { label: "DNA", measurement: "Representative width", nm: 2.5, reference: "iin-nanoscale" },
  { label: "Virus", measurement: "Example diameter", nm: 100, reference: "iin-nanoscale" },
  { label: "Visible light", measurement: "Example wavelength", nm: 550, reference: "iin-nanoscale" },
  { label: "Red blood cell", measurement: "Representative diameter", nm: 7000, reference: "iin-nanoscale" },
  { label: "Human hair", measurement: "Example width", nm: 80000, reference: "iin-nanoscale" },
] as const;

export function selectedScaleExample(power: number) {
  // Compare log positions so sub-nanometre examples cannot overlap in selection.
  return sizeScaleExamples.find(
    (example) => Math.abs(power - Math.log10(example.nm)) < 1e-8,
  );
}

const lengthFormat = new Intl.NumberFormat("en", { maximumFractionDigits: 3 });

export function formatScaleLength(nm: number) {
  return nm < 1000
    ? `${lengthFormat.format(nm)} nm`
    : `${lengthFormat.format(nm / 1000)} µm`;
}
