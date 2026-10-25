export const foundationDetails: Record<
  string,
  { title: string; paragraphs: string[]; reference: string }
> = {
  nanoscale: {
    title: "Surface-to-volume ratio: geometry and its limits",
    paragraphs: [
      "For a sphere of diameter d, S/V = 6/d. Smaller particles therefore place a larger fraction of their atoms near a surface, where bonding, adsorption and chemistry can differ from the interior. The ratio has units of inverse length; it is not itself a reaction rate or a measure of electrical conductivity.",
      "For a broad plate of area A and thickness t, neglecting its edges gives S/V ≈ 2/t. This continuum analogy explains why both faces of a thin sheet matter. At atomic thickness, volume and thickness need an explicit convention, and substrate interfaces, defects and passivation also matter. The spherical slider is not a quantitative model of graphene or MoS₂.",
    ],
    reference: "assets",
  },
  quantum: {
    title: "Discrete levels, crystal bands and forbidden gaps",
    paragraphs: [
      "A standing electron wave in an ideal one-dimensional infinite well must satisfy its boundaries. Allowed energies are Eₙ = n²h²/(8mₑL²), or approximately 0.376 n²/L² eV when L is in nm and mₑ is the free-electron mass. Narrowing the well increases level spacing as 1/L². Finite barriers and a material's effective mass change this model.",
      "Crystal bands arise from electrons in a periodic lattice, with many allowed states labelled by wave vector. They are not simply the three levels in this isolated-box illustration. A band gap separates the valence-band maximum from the conduction-band minimum; defects and disorder can introduce additional states. The well demonstrates confinement, not the numerical MoS₂ band gap.",
    ],
    reference: "quantum",
  },
  "graphene-structure": {
    title: "How a honeycomb lattice relates to electronic states",
    paragraphs: [
      "Each carbon atom is bonded to three neighbours in the plane. The remaining p orbital contributes to extended π electronic states. Two inequivalent sites in the primitive cell and the symmetry of the lattice underpin the touching bands near K and K′ in ideal monolayer graphene. A picture of hexagons alone is not a band calculation.",
      "Stacking and rolling change symmetry and boundary conditions, so graphite and nanotubes need their own electronic descriptions. The existing structure switch is a geometric comparison, rather than a prediction of each nanotube's band gap.",
    ],
    reference: "neto2009",
  },
  "graphene-electronics": {
    title: "Mobility, mean free path and scattering are different quantities",
    paragraphs: [
      "Near a Dirac point, E± ≈ ±ℏvF|q|. Group velocity is (1/ℏ)∇kE; it describes the motion of a wave packet. Positive mobility μ relates weak-field drift speed to field magnitude, |vdrift| = μ|E|; electron drift velocity points opposite to the electric field. A large characteristic band velocity does not by itself specify measured device mobility.",
      "A mean free path is the typical distance between relevant scattering events, often written ℓ ≈ vτ for a suitable velocity and scattering time. Phonons, disorder, adsorbates and substrate interactions change transport. L ≪ ℓ suggests a ballistic regime; injection and contacts still give a device finite resistance.",
      "High mobility helps charge move in the ON state. It does not create an intrinsic gap or ensure low digital OFF current. Fermi-level motion changes occupancy; the touching ideal bands remain. The transport activity is a relative-length illustration, not a measured conductance prediction.",
    ],
    reference: "neto2009",
  },
  characterization: {
    title: "What does a scientific image actually establish?",
    paragraphs: [
      "Image contrast depends on the instrument, preparation and analysis. Optical microscopy can locate flakes, AFM measures topography, and TEM can reveal structure when the specimen and resolution support it. Neither a striking image nor a single thickness measurement establishes all of a material's electronic properties.",
      "Combine structural evidence with spectroscopy and electrical measurements. For example, photoluminescence probes optical transitions, while transport depends on geometry, contacts, bias and environment. A complete conclusion needs the original measurement conditions, not just a picture.",
    ],
    reference: "mak2010",
  },
  transistors: {
    title: "From channel charge to measured switching",
    paragraphs: [
      "In a simple above-threshold approximation, the magnitude of induced channel charge per area is Q ≈ Cg(VGS − VT). Gate capacitance, threshold and internal channel voltage determine charge; mobility and geometry govern its transport. Contact drops can reduce both internal gate overdrive and drain bias.",
      "An experimental ON/OFF ratio requires specified gate/drain biases, temperature and a defined OFF-current measurement floor. NanoLab assumes zero cutoff current, so it cannot produce a meaningful measured ON/OFF ratio. Its conceptual switching animation and its numerical current model answer different questions.",
    ],
    reference: "mosfet",
  },
};
