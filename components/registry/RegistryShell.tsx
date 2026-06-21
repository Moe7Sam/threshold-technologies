'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import {
  EvidenceItem,
  RegistryMember,
  cdqsCompetencyStandards,
  certificationName,
  certifications,
  makeRegistryId,
  registryBrand,
  sampleEvidence,
  sampleMember,
} from '@/lib/registry';
import { StoredCertificate, cdqsStorageState, createCertificate, verifyCertificate } from '@/lib/cdqsStore';
import { ProductionReadinessBanner, SetupChecklist, StorageStatus } from '@/components/cdqs/CDQSShell';
import {
  adminApproveRegistry,
  adminListEvidence,
  adminListRegistry,
  adminReviewEvidence,
  loadRegistryEvidence,
  loadRegistryProfile,
  submitRegistryEvidence,
} from '@/lib/registryStore';

function statusLabel(status: string) {
  return status.replace(/_/g, ' ');
}

export function RegistryLanding() {
  return (
    <main className="registry-page">
      <section className="registry-hero">
        <div>
          <p className="kicker">Threshold Technologies</p>
          <h1>Professional competency verification for the built environment.</h1>
          <p>
            The Threshold Professional Registry verifies competency evidence, certificate status
            and public professional standing. It is a registry, not a learning marketplace.
          </p>
          <div className="actions">
            <Link className="btn brass" href="/registry/portal/">
              Student Portal
            </Link>
            <Link className="btn" href="/registry/verify/">
              Verify Professional
            </Link>
          </div>
        </div>
        <aside className="registry-panel dark">
          <span>Registry Standard</span>
          <strong>Employer-verifiable professional standing.</strong>
          <p>
            Built for CDQS Cohort 001 first, with future registry pathways for CBIM and CCI.
          </p>
        </aside>
      </section>

      <section className="registry-section">
        <div className="compact-heading">
          <p className="kicker">Phase 1 Certifications</p>
          <h2>Registry pathways.</h2>
        </div>
        <div className="registry-grid three">
          {certifications.map((cert) => (
            <article key={cert.code}>
              <span>{cert.code}</span>
              <h3>{cert.name}</h3>
              <p>{cert.status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="registry-section registry-band">
        <div className="compact-heading">
          <p className="kicker">CDQS Cohort 001</p>
          <h2>What the registry verifies.</h2>
        </div>
        <div className="registry-standards">
          {cdqsCompetencyStandards.map((standard) => (
            <div key={standard}>
              <b>Evidence Standard</b>
              <span>{standard}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function StudentPortal() {
  const [member, setCurrentMember] = useState<RegistryMember | null>(null);
  const [evidence, setCurrentEvidence] = useState<EvidenceItem[]>([]);
  const [error, setError] = useState('');
  const storage = cdqsStorageState();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token') || '';
    if (!token || !storage.ready) return;
    Promise.all([loadRegistryProfile(token), loadRegistryEvidence(token)])
      .then(([profile, records]) => {
        setCurrentMember(profile);
        setCurrentEvidence(records);
      })
      .catch((exception) => setError(exception instanceof Error ? exception.message : 'Could not load registry profile.'));
  }, []);

  const approved = evidence.filter((item) => item.status === 'approved').length;
  const profileToken = member?.profileToken || '';

  return (
    <main className="registry-page">
      <section className="registry-dashboard">
        <div className="compact-heading">
          <p className="kicker">Student Portal</p>
          <h1>CDQS Cohort 001 registry file.</h1>
        </div>
        {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
        {!member && <p className="cdqs-warning">Open this page from the registry profile link created after CDQS acceptance.</p>}
        {error && <p className="cdqs-error">{error}</p>}
        {member && (
          <>
        <div className="registry-metrics">
          <article><span>Candidate</span><strong>{member.fullName}</strong></article>
          <article><span>Status</span><strong>{statusLabel(member.status)}</strong></article>
          <article><span>Evidence Approved</span><strong>{approved}/{cdqsCompetencyStandards.length}</strong></article>
          <article><span>Registration</span><strong>{member.registrationNumber}</strong></article>
        </div>
        <div className="registry-two-col">
          <ProfileCard member={member} />
          <div className="registry-panel">
            <span>Candidate Actions</span>
            <h2>Submit evidence. Build standing.</h2>
            <p>
              Upload competency evidence for review. Once approved, the certificate and public
              profile become employer-verifiable.
            </p>
            <div className="actions">
              <Link className="btn brass" href={`/registry/evidence/?token=${profileToken}`}>
                Upload Evidence
              </Link>
              <Link className="btn" href={`/registry/profile/?token=${profileToken}`}>
                Public Profile
              </Link>
            </div>
          </div>
        </div>
        <EvidenceTable evidence={evidence} />
          </>
        )}
      </section>
    </main>
  );
}

export function EvidenceUpload() {
  const [submitted, setSubmitted] = useState(false);
  const [profileToken, setProfileToken] = useState('');
  const [error, setError] = useState('');
  const storage = cdqsStorageState();

  useEffect(() => {
    setProfileToken(new URLSearchParams(window.location.search).get('token') || '');
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const file = form.get('file') as File | null;
    const item: EvidenceItem = {
      id: makeRegistryId('TPR-EVIDENCE'),
      memberId: '',
      title: String(form.get('title') || ''),
      category: String(form.get('category') || ''),
      fileName: file?.name || 'uploaded-evidence.pdf',
      notes: String(form.get('notes') || ''),
      status: 'submitted',
      submittedAt: new Date().toISOString().slice(0, 10),
    };

    try {
      await submitRegistryEvidence(profileToken, item);
      setSubmitted(true);
      event.currentTarget.reset();
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Evidence could not be submitted.');
    }
  }

  return (
    <main className="registry-page">
      <section className="registry-form-shell">
        <div>
          <p className="kicker">Competency Evidence Upload</p>
          <h1>Submit professional evidence for registry review.</h1>
          <p>
            This is not coursework storage. Upload only evidence that supports competency
            verification for CDQS Cohort 001.
          </p>
          {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
          {!profileToken && <p className="cdqs-warning">Use the evidence upload link from your student portal.</p>}
        </div>
        <form className="registry-form" onSubmit={submit}>
          <label>Profile token<input required value={profileToken} onChange={(event) => setProfileToken(event.target.value)} /></label>
          <label>Evidence title<input required name="title" placeholder="Digital measurement workbook" /></label>
          <label>Competency category<select name="category"><option>Measurement</option><option>BOQ validation</option><option>Cost reporting</option><option>Variation evidence</option><option>Portfolio case file</option></select></label>
          <label>Evidence file<input name="file" type="file" /></label>
          <label>Reviewer notes<textarea name="notes" rows={5} placeholder="Explain what this evidence demonstrates." /></label>
          <button className="btn brass" type="submit" disabled={!storage.ready || !profileToken}>Submit Evidence</button>
          {submitted && <p className="registry-success">Evidence submitted for admin review.</p>}
          {error && <p className="cdqs-error">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export function AdminReview() {
  const [evidence, setCurrentEvidence] = useState<EvidenceItem[]>([]);
  const [profiles, setProfiles] = useState<RegistryMember[]>([]);
  const [member, setCurrentMember] = useState<RegistryMember | null>(null);
  const [adminPin, setAdminPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState('');
  const storage = cdqsStorageState();

  useEffect(() => {
    setAdminPin(window.sessionStorage.getItem('cdqs_admin_pin') || '');
  }, []);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    try {
      const list = await adminListRegistry(adminPin);
      setProfiles(list);
      setCurrentMember(list[0] || null);
      if (list[0]) setCurrentEvidence(await adminListEvidence(adminPin, list[0].id));
      setAuthorized(true);
      window.sessionStorage.setItem('cdqs_admin_pin', adminPin);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Admin access failed.');
    }
  }

  async function selectProfile(profile: RegistryMember) {
    setCurrentMember(profile);
    setCurrentEvidence(await adminListEvidence(adminPin, profile.id));
  }

  async function updateEvidence(id: string, status: EvidenceItem['status']) {
    if (!storage.ready) {
      setError('Persistent storage is not configured. Admin actions are blocked.');
      return;
    }
    const updated = await adminReviewEvidence(adminPin, id, status);
    setCurrentEvidence((items) => items.map((item) => (item.id === id ? updated : item)));
  }

  async function approveRegistry() {
    if (!member) return;
    if (!storage.ready) {
      setError('Persistent storage is not configured. Admin actions are blocked.');
      return;
    }
    const updated = await adminApproveRegistry(adminPin, member.id);
    setCurrentMember(updated);
    setProfiles((items) => items.map((item) => (item.id === updated.id ? updated : item)));
  }

  return (
    <main className="registry-page">
      <section className="registry-dashboard">
        <StorageStatus />
        <ProductionReadinessBanner />
        <div className="compact-heading">
          <p className="kicker">Admin Review</p>
          <h1>Review evidence and approve registry standing.</h1>
        </div>
        {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
        <SetupChecklist />
        {storage.ready && !authorized && (
          <form className="cdqs-admin-gate" onSubmit={unlock}>
            <label>Admin PIN<input value={adminPin} onChange={(event) => setAdminPin(event.target.value)} type="password" /></label>
            <button className="btn brass" type="submit">Unlock Registry Admin</button>
            {error && <p className="cdqs-error">{error}</p>}
          </form>
        )}
        {authorized && member && (
          <>
        <div className="registry-profile-tabs">
          {profiles.map((profile) => (
            <button key={profile.id} onClick={() => selectProfile(profile)}>{profile.registrationNumber}</button>
          ))}
        </div>
        <div className="registry-two-col">
          <ProfileCard member={member} />
          <div className="registry-panel">
            <span>Review Decision</span>
            <h2>CDQS Cohort 001</h2>
            <p>
              Approve individual evidence items, then issue verified registry standing when the
              competency file is complete.
            </p>
            <button className="btn brass" onClick={approveRegistry}>Approve Registry Standing</button>
          </div>
        </div>
          </>
        )}
        {authorized && (
        <div className="registry-review-list">
          {evidence.map((item) => (
            <article key={item.id}>
              <div>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.fileName} - {item.notes}</p>
              </div>
              <div className="registry-review-actions">
                <b>{statusLabel(item.status)}</b>
                <button onClick={() => updateEvidence(item.id, 'approved')}>Approve</button>
                <button onClick={() => updateEvidence(item.id, 'needs_revision')}>Revision</button>
              </div>
            </article>
          ))}
        </div>
        )}
      </section>
    </main>
  );
}

export function RegistryCertificateGenerator() {
  const [adminPin, setAdminPin] = useState('');
  const [profileToken, setProfileToken] = useState('');
  const [member, setCurrentMember] = useState<RegistryMember | null>(null);
  const [certificate, setCertificate] = useState<StoredCertificate | null>(null);
  const [error, setError] = useState('');
  const storage = cdqsStorageState();

  useEffect(() => {
    setAdminPin(window.sessionStorage.getItem('cdqs_admin_pin') || '');
    setProfileToken(new URLSearchParams(window.location.search).get('token') || '');
  }, []);

  async function loadProfile() {
    setError('');
    const profile = await loadRegistryProfile(profileToken);
    setCurrentMember(profile);
  }

  async function issueCertificate() {
    if (!member) return;
    setError('');
    if (!storage.ready) {
      setError('Persistent storage is not configured. Admin actions are blocked.');
      return;
    }
    try {
      const stored = await createCertificate(
        {
          certificateNumber: `${member.registrationNumber}-CERT`,
          studentName: member.fullName,
          role: member.title,
          cohort: member.cohort,
          issueDate: new Date().toISOString().slice(0, 10),
          verifier: registryBrand.issuer,
        },
        adminPin,
      );
      setCertificate(stored);
      window.sessionStorage.setItem('cdqs_admin_pin', adminPin);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Certificate could not be issued.');
    }
  }

  const verificationUrl =
    typeof window === 'undefined' || !certificate
      ? ''
      : `${window.location.origin}/registry/verify/?token=${certificate.verificationToken}`;
  const profileUrl =
    typeof window === 'undefined' || !member
      ? ''
      : `${window.location.origin}/registry/profile/?token=${member.profileToken}`;
  const qrUrl = verificationUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(verificationUrl)}`
    : '';

  return (
    <main className="registry-page">
      <section className="registry-form-shell">
        <div>
          <StorageStatus />
          <ProductionReadinessBanner />
          <p className="kicker">Certificate Generator</p>
          <h1>Issue a registry-grade CDQS certificate.</h1>
          <p>
            The certificate links to an employer verification page and public professional profile.
          </p>
          {!storage.ready && <p className="cdqs-warning">{storage.message}</p>}
          <div className="registry-certificate">
            <p>{registryBrand.issuer}</p>
            <h2>{member?.fullName || 'Registry Member'}</h2>
            <span>{member ? certificationName(member.certification) : 'Certified Digital Quantity Surveyor'}</span>
            <b>{member?.registrationNumber || 'TPR-CDQS-001'}</b>
            {qrUrl && <img src={qrUrl} alt="Registry verification QR code" />}
          </div>
        </div>
        <div className="registry-form">
          <label>Admin PIN<input value={adminPin} onChange={(event) => setAdminPin(event.target.value)} type="password" /></label>
          <label>Profile token<input value={profileToken} onChange={(event) => setProfileToken(event.target.value)} /></label>
          <button className="btn" type="button" onClick={loadProfile} disabled={!storage.ready || !profileToken}>Load Profile</button>
          <button className="btn brass" type="button" onClick={issueCertificate} disabled={!storage.ready || !member}>Issue Certificate</button>
          <label>Certificate number<input readOnly value={certificate?.certificateNumber || ''} /></label>
          <label>Status<input readOnly value={certificate?.status || ''} /></label>
          <label>Verification URL<textarea readOnly rows={4} value={verificationUrl} /></label>
          <label>Public profile URL<textarea readOnly rows={4} value={profileUrl} /></label>
          {verificationUrl && <Link className="btn brass" href={verificationUrl}>Open Verification</Link>}
          {error && <p className="cdqs-error">{error}</p>}
        </div>
      </section>
    </main>
  );
}

export function RegistryVerification() {
  const [token, setToken] = useState('');
  const [certificate, setCertificate] = useState<StoredCertificate | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentToken = new URLSearchParams(window.location.search).get('token') || '';
    setToken(currentToken);
    if (currentToken) {
      verifyCertificate(currentToken)
        .then(setCertificate)
        .catch((exception) => setError(exception instanceof Error ? exception.message : 'Verification failed.'));
    }
  }, []);

  return (
    <main className="registry-page">
      <section className="registry-verify">
        <p className="kicker">Employer Verification</p>
        <h1>{certificate ? 'Professional standing verified.' : 'Verify a Threshold registry credential.'}</h1>
        {certificate ? (
          <RegistryVerificationCard certificate={certificate} />
        ) : (
          <div className="registry-verification-card">
            <p>Scan a certificate QR code or paste a registry verification token.</p>
            <input value={token} onChange={(event) => setToken(event.target.value)} placeholder="Verification token" />
            {error && <p className="cdqs-error">{error}</p>}
          </div>
        )}
      </section>
    </main>
  );
}

export function PublicProfile() {
  const [token, setToken] = useState('');
  const [member, setCurrentMember] = useState<RegistryMember | null>(null);
  const [evidence, setCurrentEvidence] = useState<EvidenceItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentToken = new URLSearchParams(window.location.search).get('token') || '';
    setToken(currentToken);
    if (currentToken) {
      Promise.all([loadRegistryProfile(currentToken), loadRegistryEvidence(currentToken)])
        .then(([profile, records]) => {
          setCurrentMember(profile);
          setCurrentEvidence(records);
        })
        .catch((exception) => setError(exception instanceof Error ? exception.message : 'Could not load public profile.'));
    }
  }, []);

  const approved = evidence.filter((item) => item.status === 'approved');

  return (
    <main className="registry-page">
      <section className="registry-profile">
        <div className="registry-profile-head">
          <p className="kicker">Public Professional Profile</p>
          <h1>{member?.fullName || 'Professional Profile'}</h1>
          <p>{member ? `${member.title} - ${member.location}` : 'Open this page from a published registry profile link.'}</p>
          {error && <p className="cdqs-error">{error}</p>}
        </div>
        <div className="registry-two-col">
          {member && <ProfileCard member={member} />}
          <div className="registry-panel">
            <span>Professional Evidence</span>
            <h2>Employer-viewable competency record.</h2>
            <ul className="registry-public-list">
              {approved.map((item) => (
                <li key={item.id}>
                  <b>{item.category}</b>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileCard({ member }: { member: RegistryMember }) {
  return (
    <div className="registry-profile-card">
      <span>{member.registrationNumber}</span>
      <h2>{member.fullName}</h2>
      <p>{member.title}</p>
      <dl>
        <div><dt>Company</dt><dd>{member.company}</dd></div>
        <div><dt>Location</dt><dd>{member.location}</dd></div>
        <div><dt>Credential</dt><dd>{member.certification}</dd></div>
        <div><dt>Status</dt><dd>{statusLabel(member.status)}</dd></div>
      </dl>
    </div>
  );
}

function EvidenceTable({ evidence }: { evidence: EvidenceItem[] }) {
  return (
    <div className="registry-table-wrap">
      <table className="registry-table">
        <thead>
          <tr>
            <th>Evidence</th>
            <th>Category</th>
            <th>File</th>
            <th>Status</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {evidence.map((item) => (
            <tr key={item.id}>
              <td>{item.title}<small>{item.notes}</small></td>
              <td>{item.category}</td>
              <td>{item.fileName}</td>
              <td>{statusLabel(item.status)}</td>
              <td>{item.submittedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RegistryVerificationCard({
  certificate,
  compact = false,
}: {
  certificate: StoredCertificate;
  compact?: boolean;
}) {
  return (
    <div className={`registry-verification-card${compact ? ' compact' : ''}`}>
      <span className="registry-valid">{certificate.status === 'active' ? 'Active Registry Credential' : 'Credential Revoked'}</span>
      <h2>{certificate.studentName}</h2>
      <p>{certificate.role}</p>
      <dl>
        <div><dt>Certificate</dt><dd>{certificate.certificateNumber}</dd></div>
        <div><dt>Credential</dt><dd>CDQS</dd></div>
        <div><dt>Certification</dt><dd>Certified Digital Quantity Surveyor</dd></div>
        <div><dt>Issued</dt><dd>{certificate.issueDate}</dd></div>
        <div><dt>Status</dt><dd>{certificate.status}</dd></div>
        <div><dt>Issuer</dt><dd>{registryBrand.issuer}</dd></div>
      </dl>
      {!compact && (
        <>
          <h3>Verified Competency Standards</h3>
          <ul>
            {cdqsCompetencyStandards.map((standard) => <li key={standard}>{standard}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}
