import type { Metadata } from 'next';
import styles from './profile.module.css';

export const metadata: Metadata = {
  title: 'Mohammad Samir | 5D BIM & Digital Construction',
  description: 'Mohammad Samir is a 5D BIM and Digital Construction Specialist connecting BIM information with quantities, cost and commercial delivery.',
  alternates: { canonical: '/mohammad-samir/' },
  openGraph: {
    title: 'Mohammad Samir | 5D BIM & Digital Construction',
    description: 'BIM management, 5D delivery and commercial integration across major programmes and construction technology products.',
    url: '/mohammad-samir/',
    type: 'profile',
  },
};

const strengths = [
  ['01', '5D BIM delivery', 'Revit parameter strategy, NRM/POMI/CESMM4 classification, model-to-BOQ mapping, quantity validation and CostX-ready information.'],
  ['02', 'BIM management', 'ISO 19650-aware workflows, model QA/QC, federated-model review, clash detection, CDE submissions and multidisciplinary coordination.'],
  ['03', 'Commercial integration', 'Cost planning, BOQs, tender analysis, variations, change control and commercial reporting linked directly to model information.'],
  ['04', 'Automation & data', 'C#, WPF, Dynamo, Power BI and structured-data workflows that make model information measurable, auditable and decision-ready.'],
];

const experience = [
  ['Jun 2026 — Present', 'Founder & 5D BIM / Digital Construction Lead', 'Threshold Technologies FZE LLC', 'Leading BIM, cost-management, field-reporting, education and AI-enabled engineering products connecting Revit, CostX, ACC, Power BI and structured construction data.'],
  ['Jan 2026 — Present', 'Independent 5D BIM & Construction Technology Consultant', 'Independent Practice', 'Designing model-to-BOQ workflows, BIM commercial-readiness tools, quantity-validation processes, BOQ benchmarking and design-change reporting.'],
  ['Jul 2025 — Jan 2026', 'Quantity Surveyor / Cost Consultant', 'Blair Anderson Limited', 'Prepared BOQs, cost plans and detailed measurements across building, infrastructure, structural, MEP and landscape packages using CostX, WinQS and DimX.'],
  ['Jun 2022 — Mar 2025', 'Project Surveyor / Cost Manager — BIM-Enabled Delivery', 'AECOM Middle East', 'Delivered BIM-enabled cost planning, measurement, tendering, change control, model coordination and Power BI reporting across major programmes.'],
  ['Dec 2021 — Jun 2022', 'Quantity Surveyor', 'Fan Al Ebtikar Architectural Engineering Consultancy', 'Prepared early cost plans, supported tender and change reviews, and carried out site quantity verification and progress inspections.'],
  ['2020 — 2022', 'Design / CAD & BIM Technician', 'Al Etihad Engineering Consultancy', 'Produced coordinated Revit models and LOD 200 documentation for 20+ villas and education, hospitality, religious and sports facilities.'],
  ['Apr 2020 — Dec 2020', 'Site Engineer', 'Cityscape Global Engineering Consultants', 'Supported site measurement, cost breakdowns, progress reporting and preliminary infrastructure and highway-alignment studies.'],
];

const projects = [
  ['Dubai International Airport', 'Aviation · AECOM', 'Design-stage measurement, CostX BOQs, estimate reconciliation, value engineering and Power BI reporting for Terminal 2 expansion and multiple airport packages.'],
  ['NEOM — Sindalah & The Line', 'Infrastructure · AECOM', 'Revalidated BOQs and assessed 75+ changes across Sindalah; prepared infrastructure pre-tender estimates across The Line landscape zones.'],
  ['Al Haffar / Aldar Development', '4,000+ villas · AECOM', 'Built a CostX model-mapping workflow across ten villa designs and three finish options, producing model-based BOQs and value-engineering insights.'],
  ['AMIA Airport / DAEP', '50+ km APM systems · AECOM', 'Performed BIM-based quantification for automated people-mover systems and maintenance facilities with benchmark and bidder-comparison dashboards.'],
  ['The Address Residences Dubai Opera', '850+ apartments · AECOM', 'Managed fit-out and MEP variation assessments, reviewed subcontractor claims and as-built information, and supported commercial negotiations.'],
  ['Building & Infrastructure Assignments', 'Blair Anderson', 'Prepared POMI-based BOQs and measured complex structural, reinforcement, MEP, landscape ITS/SCADA and specialist building packages.'],
];

const products = [
  ['BIM Commercial Readiness & 5D Classification Platform', 'CRS v1.1 · 132 checks', 'A structured Commercial Readiness Standard covering model data, geometry, classification, measurement and delivery readiness.'],
  ['DiSam Digital Ultimate Tool', 'Revit · C# · WPF', 'A Revit add-in concept for NRM classification, POMI/WBS coding, BOQ mapping, isolation review, structured export and readiness scoring.'],
  ['Site Report Engine', 'Next.js · Supabase', 'A bilingual construction field-reporting workflow from observation and instruction through verification, close-out and immutable PDF reporting.'],
];

const tools = ['Revit', 'Navisworks Manage', 'CostX', 'Autodesk Construction Cloud', 'Civil 3D', 'Dynamo', 'Power BI', 'C# / WPF', 'WinQS', 'DimX', 'Excel / VBA', 'IFC', 'Next.js', 'Supabase'];

export default function MohammadSamirProfile() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Dubai, UAE · BIM leadership & 5D delivery</p>
          <h1>Mohammad<br /><em>Samir</em></h1>
          <h2>5D BIM & Digital Construction Specialist<br />Cost Manager · BIM–QS Integration</h2>
          <p className={styles.intro}>I connect BIM information with quantities, cost and commercial decisions—turning coordinated models into controlled, measurable and auditable project data.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#expertise">Explore my work <span>↘</span></a>
            <a className={styles.secondary} href="/Mohammad-Samir-BIM-5D-CV.pdf" download>Download CV <span>↓</span></a>
            <a className={styles.secondary} href="https://www.linkedin.com/in/mohammad-ahmad-4518391a0" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
          </div>
        </div>
        <div className={styles.portraitWrap}>
          <div className={styles.portrait}><img src="/mohammad-samir-profile.jpg" alt="Mohammad Samir, 5D BIM and Digital Construction Specialist" /></div>
          <div className={styles.roleNote}><i /><span><small>Career direction</small><strong>BIM Manager · 5D BIM Specialist</strong></span></div>
        </div>
        <div className={styles.stats}>
          <div><strong>6+</strong><span>Years across design,<br />cost & digital delivery</span></div>
          <div><strong>132</strong><span>Commercial-readiness<br />model checks developed</span></div>
          <div><strong>75+</strong><span>NEOM changes<br />commercially assessed</span></div>
          <div><strong>4,000+</strong><span>Villas in a model-based<br />cost workflow</span></div>
        </div>
      </section>

      <section className={styles.statement}>
        <p className={styles.sectionKicker}>What I do</p>
        <h2>From model geometry<br />to <em>commercial clarity.</em></h2>
        <div className={styles.twoCol}><p>Civil Engineer and 5D BIM / cost-management specialist with experience across aviation, infrastructure, residential, mixed-use and digital-product environments in the UAE, Saudi Arabia, Malaysia and Iraq.</p><p>My work brings together quantity surveying, model governance, Revit-to-CostX workflows, BOQ automation, model QA/QC, ACC, Power BI and software product development.</p></div>
      </section>

      <section className={styles.lightSection} id="expertise">
        <header className={styles.sectionHead}><div><p className={styles.sectionKicker}>Core strengths</p><h2>A dual technical<br />and commercial practice.</h2></div><p>Focused on project- and site-based BIM management and 5D BIM opportunities.</p></header>
        <div className={styles.strengthGrid}>{strengths.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.whiteSection}>
        <header className={styles.sectionHead}><div><p className={styles.sectionKicker}>Experience</p><h2>Built across the<br />full project lifecycle.</h2></div><p>From site and design delivery to cost management, BIM coordination and construction technology.</p></header>
        <div className={styles.timeline}>{experience.map(([period, role, company, summary], index) => <article key={`${company}-${period}`}><span>{String(index + 1).padStart(2, '0')}</span><div className={styles.date}>{period}<small>Dubai / International</small></div><div><h3>{role}</h3><h4>{company}</h4><p>{summary}</p></div></article>)}</div>
      </section>

      <section className={styles.lightSection}>
        <header className={styles.sectionHead}><div><p className={styles.sectionKicker}>Selected portfolio</p><h2>Complex programmes.<br />Measured outcomes.</h2></div><p>A selection from a wider aviation, infrastructure, residential, hospitality and mixed-use portfolio.</p></header>
        <div className={styles.projectGrid}>{projects.map(([title, label, text], index) => <article key={title}><div><span>{String(index + 1).padStart(2, '0')}</span><small>{label}</small></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className={styles.darkSection}>
        <header className={styles.sectionHead}><div><p className={styles.sectionKicker}>Products & R&D</p><h2>Engineering workflows,<br />turned into products.</h2></div><p>Developed through Threshold Technologies to improve information quality, cost intelligence and field delivery.</p></header>
        <div className={styles.productList}>{products.map(([title, tag, text]) => <article key={title}><b>+</b><h3>{title}</h3><p>{text}</p><span>{tag}</span></article>)}</div>
      </section>

      <section className={styles.stack}>
        <div><p className={styles.sectionKicker}>Technical stack</p><h2>Tools are selected<br />around the workflow.</h2><p>Standards: RICS NRM 1/2/3 · POMI · CESMM4 · ISO 19650-aware delivery</p></div>
        <div className={styles.toolCloud}>{tools.map(tool => <span key={tool}>{tool}</span>)}</div>
      </section>

      <section className={styles.contact}>
        <p className={styles.sectionKicker}>Contact</p>
        <h2>Let&apos;s connect BIM,<br />cost and delivery.</h2>
        <p>Open to BIM Manager, Digital Delivery and 5D BIM Specialist opportunities.</p>
        <div className={styles.contactLinks}><a href="mailto:mohammad7samir.ahmad@gmail.com">mohammad7samir.ahmad@gmail.com <span>↗</span></a><a href="tel:+971563961932">+971 56 396 1932 <span>↗</span></a><a href="https://www.linkedin.com/in/mohammad-ahmad-4518391a0" target="_blank" rel="noreferrer">LinkedIn profile <span>↗</span></a><a href="/Mohammad-Samir-BIM-5D-CV.pdf" download>Download full CV <span>↓</span></a></div>
      </section>
    </main>
  );
}
