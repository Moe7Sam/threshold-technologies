"use client";

import { useState } from 'react';

type EvidenceItem = {
  id: string;
  label: string;
  visualLabel: string;
  title: string;
  copy: string;
  detail: string;
  image: string;
  alt: string;
  secondaryImage?: string;
  secondaryAlt?: string;
};

const evidence: EvidenceItem[] = [
  {
    id: 'openbim',
    label: 'BIM & Digital Engineering',
    visualLabel: 'OpenBIM / Federated Information',
    title: 'Model context before model claims.',
    copy: 'A reference view from the open Schependomlaan dataset anchors the discussion in an actual OpenBIM source model rather than a fabricated project render.',
    detail: 'The source IFC is retained upstream through Git LFS; v1 uses a lightweight static reference visual instead of shipping a browser viewer.',
    image: '/evidence/mel/openbim/schependomlaan/openbim-model-reference.webp',
    alt: 'Reference rendering from the open Schependomlaan OpenBIM demonstration dataset.',
  },
  {
    id: 'coordination',
    label: 'Technical Review & Coordination',
    visualLabel: 'BCF / Review Evidence',
    title: 'An authentic finding, kept in context.',
    copy: 'The source BCF package contains six issue topics. This original snapshot corresponds to the source topic “Intersections Between Door and Slab.”',
    detail: 'The interface does not infer status, severity, or resolution beyond the BCF material; it demonstrates the evidence trail a structured review can preserve.',
    image: '/evidence/mel/openbim/schependomlaan/bcf-issue-door-slab.webp',
    alt: 'Original BCF issue snapshot titled Intersections Between Door and Slab from the Schependomlaan sample dataset.',
  },
  {
    id: 'information',
    label: 'Information Layers',
    visualLabel: 'Geometry → Information → Review',
    title: 'Information structure is part of delivery quality.',
    copy: 'The source documentation records how property sets changed through Synchro IFC export. This is actual dataset evidence of why model review includes data structure, not only geometry.',
    detail: 'Use the before/after controls to compare the documented parameter structure illustrations without representing a MEL-issued model-health score.',
    image: '/evidence/mel/openbim/schependomlaan/ifc-information-structure-before.webp',
    alt: 'Documented original IFC parameter structure before Synchro export in the Schependomlaan sample dataset.',
    secondaryImage: '/evidence/mel/openbim/schependomlaan/ifc-information-structure-after.webp',
    secondaryAlt: 'Documented IFC parameter structure after Synchro export in the Schependomlaan sample dataset.',
  },
  {
    id: 'assurance',
    label: 'Digital Project Assurance',
    visualLabel: 'Baseline → Change → Verify',
    title: 'Comparison evidence without invented variance.',
    copy: 'The open dataset includes a planned-versus-built comparison workbook. This visual reports only the documented record volume present in its weekly worksheets.',
    detail: 'This is an evidence of available comparison data, not a claim about built conformance, schedule performance, or a calculated assurance result.',
    image: '/evidence/mel/openbim/schependomlaan/comparison-records.svg',
    alt: 'Chart of data-row counts by week from the Schependomlaan planned versus built comparison workbook.',
  },
];

export default function EvidenceLayer() {
  const [selectedId, setSelectedId] = useState(evidence[0].id);
  const [informationAfter, setInformationAfter] = useState(false);
  const selected = evidence.find((item) => item.id === selectedId) ?? evidence[0];
  const source = selected.id === 'information' && informationAfter && selected.secondaryImage
    ? { image: selected.secondaryImage, alt: selected.secondaryAlt ?? selected.alt }
    : { image: selected.image, alt: selected.alt };

  return (
    <section className="section evidence-layer" aria-labelledby="evidence-layer-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">MEL evidence layer / v1</p>
          <h2 id="evidence-layer-title">Open technical evidence, held to its source.</h2>
          <p className="lede">
            An open reference dataset demonstrates the review workflow. It is not a MEL project,
            appointment, delivery, or owned model.
          </p>
        </div>
        <div className="evidence-layer__shell">
          <div className="evidence-layer__controls" role="tablist" aria-label="MEL evidence views">
            {evidence.map((item, index) => (
              <button
                type="button"
                className={item.id === selected.id ? 'is-active' : ''}
                role="tab"
                aria-selected={item.id === selected.id}
                aria-controls="evidence-panel"
                id={`evidence-tab-${item.id}`}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
              >
                <span>{`0${index + 1}`}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div
            className="evidence-layer__panel"
            id="evidence-panel"
            role="tabpanel"
            aria-labelledby={`evidence-tab-${selected.id}`}
          >
            <div className="evidence-layer__visual">
              <img src={source.image} alt={source.alt} loading="lazy" />
              <span>{selected.visualLabel}</span>
            </div>
            <div className="evidence-layer__copy">
              <p className="mono">Reference evidence / Schependomlaan</p>
              <h3>{selected.title}</h3>
              <p>{selected.copy}</p>
              {selected.id === 'information' && (
                <div className="evidence-layer__switch" aria-label="Information structure view">
                  <button type="button" className={!informationAfter ? 'is-active' : ''} onClick={() => setInformationAfter(false)}>Before export</button>
                  <button type="button" className={informationAfter ? 'is-active' : ''} onClick={() => setInformationAfter(true)}>After export</button>
                </div>
              )}
              <details>
                <summary>Evidence notes <span>+</span></summary>
                <p>{selected.detail}</p>
              </details>
              <p className="evidence-layer__attribution">
                OpenBIM demonstration based on the Schependomlaan sample dataset, buildingSMART
                Community Sample Test Files — CC BY 4.0.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
